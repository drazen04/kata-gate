export const ARRANGE_ITEM_UNIT = 10

interface ItemInterface {
    arrange(item: Item): Item
}

class AgedBrie implements ItemInterface {
    arrange(item: Item): Item {
        return {
            name: item.name,
            quality: this.calculateQuality(item),
            sellIn: decreaseSellInByUnit(item),
        }
    }
    calculateQuality(item: Item) {
        return _with(increaseQualityByUnit, true)(item)
    }
}

class Sulfuras implements ItemInterface {
    arrange(item: Item): Item {
        return {
            name: item.name,
            quality: this.calculate(item),
            sellIn: decreaseSellInByUnit(item),
        }
    }
    calculate(item: Item) {
        return _with(sameQuality)(item)
    }
}

class BackstagePass implements ItemInterface {
    arrange(item: Item): Item {
        return {
            name: item.name,
            quality: this.calculate(item),
            sellIn: decreaseSellInByUnit(item),
        }
    }
    calculate(item: Item) {
        return _with(this.applyCondition, true)(item)
    }

    applyCondition(item: Item) {
        if (item.sellIn === 0) return 0
        return item.sellIn > 5 && 5 <= 10
            ? increaseQualityTwice(item)
            : item.sellIn <= 5
            ? increaseQualityTriple(item)
            : increaseQualityByUnit(item)
    }
}

class BaseItem implements ItemInterface {
    arrange(item: Item): Item {
        return {
            name: item.name,
            quality: this.calculate(item),
            sellIn: item.sellIn === 0 ? 0 : decreaseSellInByUnit(item),
        }
    }
    calculate(item: Item) {
        return _with(this.applyCondition)(item)
    }

    applyCondition(item: Item) {
        return isSellDateExpired(item) ? decreaseQualityTwice(item) : decreaseQualityByUnit(item)
    }
}

class Conjured implements ItemInterface {
    arrange(item: Item): Item {
        return {
            name: item.name,
            quality: this.calculate(item),
            sellIn: decreaseSellInByUnit(item),
        }
    }
    calculate(item: Item) {
        return _with(decreaseQualityTwice)(item)
    }
}

export type Item = {
    name: string
    quality: Quality
    sellIn: SellIn
}

type Quality = number
type SellIn = number

type ItemNumberKeys = keyof Omit<Item, "name">

export function arrange(item: Item): Item {
    switch (item.name) {
        case "Aged Brie":
            return new AgedBrie().arrange(item)
        case "Sulfuras":
            return new Sulfuras().arrange(item)
        case "Backstage pass":
            return new BackstagePass().arrange(item)
        case "Conjured":
            return new Conjured().arrange(item)
        default:
            return new BaseItem().arrange(item)
    }
}

function _with(f: (_: Item) => number, increase: boolean = false): (_: Item) => number {
    return (item) => {
        const qualityUpdated = f(item)
        if ((increase && item.quality >= 50) || qualityUpdated >= 50) return 50
        if ((!increase && item.quality <= 0) || qualityUpdated <= 0) return 0
        return qualityUpdated
    }
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
