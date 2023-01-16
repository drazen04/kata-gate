import { assert, test } from "vitest"
import { optimalSize } from "./conf-wardrobe"

/**
 * Customize wardrobe by combining individual wardrobe elements.
 * The wardrobe elements are available in the following sizes:
 *  - 50cm,
 *  - 75cm,
 *  - 100cm,
 *  - 120cm.
 * The wall on which the wardrobe elements are placed has a total length of:
 *  - 250cm.
 * With which combinations of wardrobe elements can you make the most of the space?
 * Write a function that returns all combinations of wardrobe elements that exactly fill the wall.
 *
 */

test("bootstrap", () => {
    const elements = [50, 75, 100, 120]
    const targetSize = 250

    const optCombination = optimalSize(targetSize, elements)
    assert(optCombination[0] === 50)
    assert(optCombination[1] === 100)
    assert(optCombination[2] === 100)
    assert(optCombination.length === 3)
})
