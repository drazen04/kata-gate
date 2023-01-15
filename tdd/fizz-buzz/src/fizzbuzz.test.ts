import { assert, test } from "vitest"
import { transform } from "./fizzbuzz"

/**
 * 
 * [X] - 6,9 --> "Fizz"
 * [X] - 10,20 --> "Buzz"
 * [X] - 30 --> "FizzBuzz"
 * [X] - 1 --> "1"
 * 
 * new task
 * - 7,14 --> "Bang"
 * - 21 --> "FizzBang"
 * - 40 --> "BuzzBang"
 * - 105 --> "FizzBuzzBang"
 * 
 * new task
 * contains number --> 3 & 7 in 37
 */

test("OneMatch", () => {
    const divisors = [
        { div: 3, label: "Fizz" },
        { div: 5, label: "Buzz" }
    ]

    assert(transform(divisors, 6) === "Fizz")
    assert(transform(divisors, 9) === "Fizz")
})

test("MultipleMatch", () => {
    const divisors = [
        { div: 3, label: "Fizz" },
        { div: 5, label: "Buzz" },
        { div: 7, label: "Bang" }
    ]

    assert(transform(divisors, 30) === "FizzBuzz")
    assert(transform(divisors, 60) === "FizzBuzz")
    assert(transform(divisors, 105) === "FizzBuzzBang")
})

test("NoMatch", () => {
    const divisors = [
        { div: 3, label: "Fizz" },
        { div: 5, label: "Buzz" }
    ]

    assert(transform(divisors, 1) === "1")
    assert(transform(divisors, 97) === "97")
})