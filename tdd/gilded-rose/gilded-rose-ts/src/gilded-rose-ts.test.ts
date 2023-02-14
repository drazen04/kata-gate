import { expect, it, test } from "vitest"

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
 * [] - when the day ends then arrange(item.sellIn) < item.sellIn
 * [] - when the day ends then arrange(item.quality) < item.quality
 * [] - given today = 2022/02/01, sellDate = 2022/01/30 when arrange(item.quality) then item.quality loss 2x
 * [] - given "Aged Brie" when arrange(item.quality) then arrange(item.quality) > item.quality
 * [] - given item.quality = 50 when quality increase then item.quality = 50
 * [] - given "Sulfuras" when day ends then arrange(item.quality) = item.quality
 */
type Quality = number
type SellIn = number

type Item = {
    name: string
    quality: Quality
    sellIn: SellIn
    sellDate: Date
}

it("should lower quality and sellin", () => {
    const item: Item = {
        name: "salmon",
        quality: 10,
        sellIn: 11,
        sellDate: new Date("2022/02/25"),
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(9)
    expect(itemResult.sellIn).toBe(10)
})

it("should not lower anymore if quality is 0", () => {
    const item: Item = {
        name: "salmon",
        quality: 0,
        sellIn: 2,
        sellDate: new Date("2022/02/16"),
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(0)
})

it("given quality = 0 should not lower anymore", () => {
    const item: Item = {
        name: "salmon",
        quality: 0,
        sellIn: 2,
        sellDate: new Date("2022/02/16"),
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(0)
})

function arrange(item: Item): Item {
    return {
        name: item.name,
        quality: item.quality > 0 ? item.quality - 1 : 0,
        sellIn: item.sellIn - 1,
        sellDate: item.sellDate,
    }
}
