export const ARRANGE_ITEM_UNIT = 1

export type Item = {
    name: string
    quality: Quality
    sellIn: SellIn
}

type Quality = number
type SellIn = number

type ItemNumberKeys = keyof Omit<Item, "name">

export function arrange(item: Item): Item {
    return {
        name: item.name,
        quality: calculateQualityT(item),
        sellIn: decreaseSellInByUnit(item),
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
        case "Conjured":
            return calculateQualityC(item)
        default:
            return calculateDefault(item)
    }
}

function calculateQualityA(item: Item): number {
    if (rangeOf(item.quality)(0, 50)) {
        return increaseQualityByUnit(item)
    }
    return item.quality
}

function calculateQualityS(item: Item) {
    if (rangeOf(item.quality)(0, 50)) {
        return sameQuality(item)
    }
    return item.quality
}

function calculateQualityB(item: Item) {
    if (rangeOf(item.quality)(0, 50)) {
        if (item.sellIn === 0) return 0
        return item.sellIn > 5 && 5 <= 10
            ? increaseQualityTwice(item)
            : item.sellIn <= 5
            ? increaseQualityTriple(item)
            : increaseQualityByUnit(item)
    }
    return item.quality
}

function calculateQualityC(item: Item) {
    if (rangeOf(item.quality)(0, 50)) {
        return decreaseQualityTwice(item)
    }
    return sameQuality(item)
}

function calculateDefault(item: Item) {
    if (rangeOf(item.quality)(0, 50)) {
        return isSellDateExpired(item) ? decreaseQualityTwice(item) : decreaseQualityByUnit(item)
    }
    return sameQuality(item)
}

const isSellDateExpired = (item: Item) => item.sellIn === 0

const sameQuality = (item: Item) => item.quality

const increase = (prop: ItemNumberKeys) => (num: number) => (item: Item) => item[prop] + num
const decrease = (prop: ItemNumberKeys) => (num: number) => (item: Item) => item[prop] - num

export const doubleIt = (num: number) => num * 2
export const tripleIt = (num: number) => num * 3

const increaseQualityBy = increase("quality")
const increaseQualityByUnit = increaseQualityBy(ARRANGE_ITEM_UNIT)
const increaseQualityTwice = increaseQualityBy(doubleIt(ARRANGE_ITEM_UNIT))
const increaseQualityTriple = increaseQualityBy(tripleIt(ARRANGE_ITEM_UNIT))

const decreaseSellInBy = decrease("sellIn")
const decreaseSellInByUnit = decreaseSellInBy(ARRANGE_ITEM_UNIT)

const decreaseQualityBy = decrease("quality")
const decreaseQualityByUnit = decreaseQualityBy(ARRANGE_ITEM_UNIT)
const decreaseQualityTwice = decreaseQualityBy(doubleIt(ARRANGE_ITEM_UNIT))

const rangeOf = (numToCheck: number) => (start: number, end: number) => numToCheck > start && numToCheck < end
