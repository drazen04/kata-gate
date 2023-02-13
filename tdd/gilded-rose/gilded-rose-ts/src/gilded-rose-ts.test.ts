import { expect, test } from "vitest";

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
 * [] - given one item then modify(item.quality)
 * [] - given one item then modify(item.sellIn)
 * [] - given item.quality = 0 when modify(item.quality) then item.quality = 0
 * [] - when the day ends then modify(item.sellIn) < item.sellIn
 * [] - when the day ends then modify(item.quality) < item.quality
 * [] - given sell by date passed when result = modifyX2(item.quality) then result = item.quality - (2 * lossQualityConst)
 * [] - given "Aged Brie" when modify(item.quality) then modify(item.quality) > item.quality
 * [] - given item.quality = 50 when quality increase then item.quality = 50
 * [] - given "Sulfuras" when day ends then modify(item.quality) = item.quality
 */

type Item = {
  quality: number;
  sellIn: number;
};

test("blaua", () => {
  expect(2).toBe(2);
});
