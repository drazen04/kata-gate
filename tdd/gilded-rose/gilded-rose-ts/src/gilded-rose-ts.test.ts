import { expect, describe, it, test } from "vitest"

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
 * [x] - given "Backstage pass" when there are 10 days or less then item.quality = increaseQualityByTwo(item)
 * [x] - given "Backstage pass" when there are 5 days or less then item.quality = increaseQualityByThree(item)
 * [] - when the day ends then arrange(item.sellIn) < item.sellIn
 * [] - when the day ends then arrange(item.quality) < item.quality
 */

type Quality = number
type SellIn = number

type SpecialCase = "Aged Brie" | "Sulfuras" | "Backstage pass"

type Item = {
    name: string
    quality: Quality
    sellIn: SellIn
}

type ItemNumberKeys = keyof Omit<Item, "name">

const degradation = 1

it("should decrease quality and sellin", () => {
    const item: Item = {
        name: "salmon",
        quality: 10,
        sellIn: 11,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(9)
    expect(itemResult.sellIn).toBe(10)
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

it("should decrease quality 2x faster if sellDate expired", () => {
    const item: Item = {
        name: "Salmon",
        quality: 12,
        sellIn: 0,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(10)
})

it("should not decrease quality 2x faster if sellDate expired", () => {
    const item: Item = {
        name: "Salmon",
        quality: 12,
        sellIn: 0,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(10)
})

it("should increase quality if name == 'Aged Brie'", () => {
    const item: Item = {
        name: "Aged Brie",
        quality: 12,
        sellIn: 0,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(13)
})

it("should not increase quality if quality == 50", () => {
    const item: Item = {
        name: "Aged Brie",
        quality: 50,
        sellIn: 0,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(50)
})

it("should not decrease quality if name == 'Sulfuras'", () => {
    const item: Item = {
        name: "Sulfuras",
        quality: 23,
        sellIn: 0,
    }

    const itemResult = arrange(item)

    expect(itemResult.quality).toBe(23)
})

describe("Backstage pass", () => {
    it("should set quality = 0 if sellIn == 0 (concert is done)", () => {
        const item: Item = {
            name: "Backstage pass",
            quality: 23,
            sellIn: 0,
        }

        const itemResult = arrange(item)

        expect(itemResult.quality).toBe(0)
    })

    it("should increase twice if sellIn > 5 && sellIn <= 10", () => {
        const item: Item = {
            name: "Backstage pass",
            quality: 23,
            sellIn: 9,
        }

        const itemResult = arrange(item)

        expect(itemResult.quality).toBe(25)
    })

    it("should increase 3x if sellIn <= 5 ", () => {
        const item: Item = {
            name: "Backstage pass",
            quality: 23,
            sellIn: 1,
        }

        const itemResult = arrange(item)

        expect(itemResult.quality).toBe(26)
    })
})

const isAgedBrie = (item: Item) => item.name === "Aged Brie"
const isSulfuras = (item: Item) => item.name === "Sulfuras"
const isSellDateExpired = (item: Item) => item.sellIn === 0
const hasNoMoreQuality = (item: Item) => item.quality === 0

const sameQuality = (item: Item) => item.quality

const increase = (prop: ItemNumberKeys) => (num: number) => (item: Item) => item[prop] + num
const decrease = (prop: ItemNumberKeys) => (num: number) => (item: Item) => item[prop] - num

const increaseQualityBy = increase("quality")
const increaseQualityByOne = increaseQualityBy(1)
const increaseQualityByTwo = increaseQualityBy(2)
const increaseQualityByThree = increaseQualityBy(3)

const decreaseSellInBy = decrease("sellIn")
const decreaseSellInByOne = decreaseSellInBy(1)

const decreaseQualityBy = decrease("quality")
const decreaseQualityByOne = decreaseQualityBy(1)
const decreaseQualityByTwo = decreaseQualityBy(2)

function arrange(item: Item): Item {
    return {
        name: item.name,
        quality: calculateQualityT(item),
        sellIn: decreaseSellInByOne(item),
    }
}

function calculateQualityT(item: Item): number {
    switch (item.name) {
        case "Aged Brie":
            return calculateQualityA(item)
        case "Sulfuras":
            return calculateQualityS(item)
        case "Backstage pass":
            return calculateQualityB(item)
        default:
            return calculateDefault(item)
    }
}

function calculateQualityA(item: Item): number {
    if (item.quality > 0 && item.quality < 50) {
        return increaseQualityByOne(item)
    }
    return item.quality
}

function calculateQualityS(item: Item) {
    if (item.quality > 0 && item.quality < 50) {
        return sameQuality(item)
    }
    return item.quality
}

function calculateQualityB(item: Item) {
    if (item.quality > 0 && item.quality < 50) {
        if (item.sellIn === 0) return 0
        return item.sellIn > 5 && 5 <= 10
            ? increaseQualityByTwo(item)
            : item.sellIn <= 5
            ? increaseQualityByThree(item)
            : increaseQualityByOne(item)
    }
    return item.quality
}

function calculateDefault(item: Item) {
    if (item.quality > 0 && item.quality < 50) {
        return isSellDateExpired(item) ? decreaseQualityByTwo(item) : decreaseQualityByOne(item)
    }
    return sameQuality(item)
}
