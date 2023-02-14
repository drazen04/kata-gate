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
 * [x] - given today = 2022/02/01, sellDate = 2022/01/30 when arrange(item.quality) then item.quality loss 2x
 * [x] - given "Aged Brie" when arrange(item.quality) then arrange(item.quality) > item.quality
 * [] - given item.quality = 50 when quality increase then item.quality = 50
 * [] - given "Sulfuras" when day ends then arrange(item.quality) = item.quality
 * [] - when the day ends then arrange(item.sellIn) < item.sellIn
 * [] - when the day ends then arrange(item.quality) < item.quality
 */

type Quality = number
type SellIn = number

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

    const itemResult = arrange(item, {
        predicate: hasNoMoreQuality,
        arrangeFn: sameQuality,
    })

    expect(itemResult.quality).toBe(0)
})

it("should decrease quality 2x faster if sellDate expired", () => {
    const item: Item = {
        name: "salmon",
        quality: 12,
        sellIn: 0,
    }

    const itemResult = arrange(item, {
        predicate: isSellDateExpired,
        arrangeFn: decreaseQualityByTwo,
    })

    expect(itemResult.quality).toBe(10)
})

it("should increase quality if name == 'Aged Brie'", () => {
    const item: Item = {
        name: "Aged Brie",
        quality: 12,
        sellIn: 0,
    }

    const itemResult = arrange(item, { predicate: isAgedBrie, arrangeFn: increaseQualityByOne })

    expect(itemResult.quality).toBe(13)
})

type ArrangeFn = (data?: any) => any
type Predicate = (data?: any) => boolean
type ArrangeCBObj = {
    predicate: Predicate
    arrangeFn: ArrangeFn
}

const isAgedBrie = (item: Item) => item.name === "Aged Brie"
const isSellDateExpired = (item: Item) => item.sellIn === 0
const hasNoMoreQuality = (item: Item) => item.quality === 0

const sameQuality = (item: Item) => item.quality

const increase = (prop: ItemNumberKeys) => (num: number) => (item: Item) => item[prop] + num
const decrease = (prop: ItemNumberKeys) => (num: number) => (item: Item) => item[prop] - num

const increaseQualityBy = increase("quality")
const increaseQualityByOne = increaseQualityBy(1)
const increaseQualityByTwo = increaseQualityBy(2)

const decreaseSellInBy = decrease("sellIn")
const decreaseSellInByOne = decreaseSellInBy(1)

const decreaseQualityBy = decrease("quality")
const decreaseQualityByOne = decreaseQualityBy(1)
const decreaseQualityByTwo = decreaseQualityBy(2)

const increaseSellInBy = (num: number) => (item: Item) => increase("sellIn")
const increaseBy = (num: number) => (value: number) => value + num
const increaseByOne: ArrangeFn = (item: Item) => increaseBy(1)(item.quality)
const increaseByOneT: ArrangeFn = (item: Item) => increaseQualityBy(1)(item)
const increaseByTwo: ArrangeFn = (value: number) => increaseBy(2)(value)

const decreaseBy = (num: number) => (value: number) => value - num
const decreaseByOne: ArrangeFn = (value: number) => () => decreaseBy(1)(value)

function arrange(item: Item, arrangeObj?: ArrangeCBObj): Item {
    return {
        name: item.name,
        quality: arrangeObj
            ? arrangeObj.predicate(item)
                ? arrangeObj.arrangeFn(item)
                : decreaseQualityByOne(item)
            : decreaseQualityByOne(item),
        sellIn: decreaseSellInByOne(item),
    }
}
