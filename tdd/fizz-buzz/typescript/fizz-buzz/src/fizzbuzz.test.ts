import { assert, test } from "vitest"
import { trasformNumbers, trasform } from "./fizzbuzz"

/**
 * Your task
    - Write a program that prints one line for each number from 1 to 100
    - Usually just print the number itself.
    - For multiples of three print Fizz instead of the number
    - For the multiples of five print Buzz instead of the number
    - For numbers which are multiples of both three and five print FizzBuzz instead of the number
 */

/**
 * [X] - 6,36 --> multiples of three print Fizz
 * [X] - 25,50 - 0multiples of five print Buzz
 * [X] - 15,30 - multiples of both three and five print FizzBuzz
 * [X] - 1,23 - just print the number itself
 */

test("one-match", () => {
    const divisors = [
        { div: 3, label: "Match" },
        { div: 5, label: "Buzz" },
    ]

    const num = 6

    const result = trasform(divisors, num)

    assert(result === "Match")

    const num2 = 36

    const result2 = trasform(divisors, num2)

    assert(result2 === "Match")
})

test("multiple-match", () => {
    const divisors = [
        { div: 3, label: "Fizz" },
        { div: 5, label: "Buzz" },
        { div: 7, label: "Bang" },
    ]

    const num = 15

    const result = trasform(divisors, num)

    assert(result === "FizzBuzz")

    const num2 = 30

    const result2 = trasform(divisors, num2)

    assert(result2 === "FizzBuzz")
})

test("no-match", () => {
    const divisors = [
        { div: 3, label: "Fizz" },
        { div: 5, label: "Buzz" },
    ]

    const num = 1

    const result = trasform(divisors, num)

    assert(result === "1")

    const num2 = 23

    const result2 = trasform(divisors, num2)

    assert(result2 === "23")
})

test("range-correctness", () => {
    const divisors = [
        { div: 3, label: "Fizz" },
        { div: 5, label: "Buzz" },
    ]

    const trasformations = trasformNumbers(3, divisors)

    assert(trasformations.length === 3)
    assert(trasformations[0] === "1")
    assert(trasformations[1] === "2")
    assert(trasformations[2] === "Fizz")
})
