import { assert, test } from "vitest"
import { arrayEq, optimalCombinations } from "./conf-wardrobe"

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

test("optimal-solution", () => {
    const elements = [50, 75, 100, 120]
    const targetSize = 250

    const optCombinations = optimalCombinations(targetSize, elements)
    assert(optCombinations[0] === 50)
    assert(optCombinations[1] === 100)
    assert(optCombinations[2] === 100)
    assert(optCombinations.length === 3)
})

test("array-deep-equality", () => {
    const elements1 = [1,2,3]
    const elements2 = [3,2,1]

    assert(arrayEq(elements1, elements2)) 
})
