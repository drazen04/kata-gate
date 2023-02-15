import { ARRANGE_ITEM_UNIT, Item, ItemNumberKeys } from "./core"

export const increase = (prop: ItemNumberKeys) => (num: number) => (item: Item) => item[prop] + num
export const decrease = (prop: ItemNumberKeys) => (num: number) => (item: Item) => item[prop] - num

export const doubleIt = (num: number) => num * 2
export const tripleIt = (num: number) => num * 3

const rangeOf = (numToCheck: number) => (start: number, end: number) => numToCheck > start && numToCheck < end

export const increaseQualityBy = increase("quality")
export const increaseQualityByUnit = increaseQualityBy(ARRANGE_ITEM_UNIT)
export const increaseQualityTwice = increaseQualityBy(doubleIt(ARRANGE_ITEM_UNIT))
export const increaseQualityTriple = increaseQualityBy(tripleIt(ARRANGE_ITEM_UNIT))

export const decreaseSellInBy = decrease("sellIn")
export const decreaseSellInByUnit = decreaseSellInBy(ARRANGE_ITEM_UNIT)

export const decreaseQualityBy = decrease("quality")
export const decreaseQualityByUnit = decreaseQualityBy(ARRANGE_ITEM_UNIT)
export const decreaseQualityTwice = decreaseQualityBy(doubleIt(ARRANGE_ITEM_UNIT))

export const isSellDateExpired = (item: Item) => item.sellIn === 0

export const sameQuality = (item: Item) => item.quality
