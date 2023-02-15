import { expect, describe, it, test } from "vitest"
import { doubleIt } from "./domain/calculation"
import { Item, ARRANGE_ITEM_UNIT, arrange } from "./domain/core"

// Gilded-Rose
// System
// Items props
// SellIn: number of days to sell item
// Quality: item value
// end of the day System.lower(SellIn) && System.lower(Quality)

// Features
// Once the sell by date has passed, Quality degrades twice as fast
// The Quality of an item is never negative
// “Aged Brie” actually increases in Quality the older it gets
// The Quality of an item is never more than 50
// “Sulfuras”, being a legendary item, never has to be sold or decreases in Quality
// ======= Second =========
// “Backstage passes”, like aged brie, increases in Quality as its SellIn value approaches;
//    Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
//    Quality drops to 0 after the concert

// Task
// Add “Conjured” items
// “Conjured” items degrade in Quality twice as fast as normal items

/**
 * TEST
 * [x] - given one item then arrange(item.quality) < item.quality
 * [x] - given one item then arrange(item.sellIn) < item.sellIn
 * [x] - given item.quality = 0 when arrange(item.quality) then item.quality = 0
 * [x] - given today = 2022/02/01, sellDate = 2022/01/30 when arrange(item.quality) then item.quality loss 2x
 * [x] - given "Aged Brie" when arrange(item.quality) then arrange(item.quality) > item.quality
 * [x] - given item.quality = 50 when quality increase then item.quality = 50
 * [x] - given "Sulfuras" when day ends then arrange(item.quality) = item.quality
 * [x] - given "Backstage pass" when concert is done then item.quality = 0
 * [x] - given "Backstage pass" when there are 10 days or less then item.quality = increaseQualityTwice(item)
 * [x] - given "Backstage pass" when there are 5 days or less then item.quality = increaseQualityByThree(item)
 * [x] - given "Conjured" when arrange(item) then item.quality = decreaseQualtyTwice(item)
 * [] - when the day ends then arrange(item.sellIn) < item.sellIn
 * [] - when the day ends then arrange(item.quality) < item.quality
 */

it("should decrease quality and sellin", () => {
    const item: Item = {
        name: "salmon",
        quality: 10,
        sellIn: 11,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(item.quality - ARRANGE_ITEM_UNIT)
    expect(itemResult.sellIn).toBe(item.sellIn - ARRANGE_ITEM_UNIT)
})

it("should not decrease quality anymore if quality is 0", () => {
    const item: Item = {
        name: "salmon",
        quality: 0,
        sellIn: 2,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(0)
})

it("faster decrease", () => {
    const outdatedSellIn = 0
    const item: Item = {
        name: "SalmonX",
        quality: 50,
        sellIn: outdatedSellIn,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(qualityTestExpectedOnDecrease(item.quality - doubleIt(ARRANGE_ITEM_UNIT)))
})

it("quality increase", () => {
    const item: Item = {
        name: "Aged Brie",
        quality: 24,
        sellIn: 0,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(qualityTestExpectedOnIncrease(item.quality + ARRANGE_ITEM_UNIT))
})

test("quality not exceeded", () => {
    const item: Item = {
        name: "Aged Brie",
        quality: 23,
        sellIn: 0,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(qualityTestExpectedOnIncrease(item.quality + ARRANGE_ITEM_UNIT))
})

test("quality remain the same", () => {
    const sameQuality = 23
    const item: Item = {
        name: "Sulfuras",
        quality: sameQuality,
        sellIn: 0,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(sameQuality)
})

describe("Backstage pass", () => {
    it("should have no quality when concert is done", () => {
        const item: Item = {
            name: "Backstage pass",
            quality: 23,
            sellIn: 0,
        }

        const itemResult = arrange(item)

        expect(itemResult.quality).toBe(0)
    })

    it("should increase if normal sellIn value", () => {
        const item: Item = {
            name: "Backstage pass",
            quality: 23,
            sellIn: 9,
        }

        const itemResult = arrange(item)

        expect(itemResult.quality).toBe(qualityTestExpectedOnIncrease(item.quality + doubleIt(ARRANGE_ITEM_UNIT)))
    })

    it("should increase if lowest sellin value", () => {
        const item: Item = {
            name: "Backstage pass",
            quality: 23,
            sellIn: 1,
        }

        const itemResult = arrange(item)

        expect(itemResult.quality).toBe(qualityTestExpectedOnIncrease(item.quality + 3 * ARRANGE_ITEM_UNIT))
    })
})

it("should decrease twice quality if name == 'Conjured'", () => {
    const item: Item = {
        name: "Conjured",
        quality: 23,
        sellIn: 0,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(item.quality - doubleIt(ARRANGE_ITEM_UNIT))
})

function qualityTestExpectedOnDecrease(quality: number) {
    return quality <= 0 ? 0 : quality
}

function qualityTestExpectedOnIncrease(quality: number) {
    return quality >= 50 ? 50 : quality
}
