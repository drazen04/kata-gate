import { trasformNumbers } from "./fizzbuzz"

const divisors = [
    { div: 3, label: "Fizz" },
    { div: 5, label: "Buzz" },
    { div: 7, label: "Bang" },
]

const trasformedValue = trasformNumbers(100, divisors)

trasformedValue.forEach((value) => console.log(value))
