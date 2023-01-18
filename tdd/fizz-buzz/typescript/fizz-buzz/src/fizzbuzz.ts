const isMultipleOf = (num: number, div: number): boolean => num % div === 0

export function trasform(divisors: any[], num: number): string {
    const stringFromDivisors = divisors
        .filter((divisor) => isMultipleOf(num, divisor.div))
        .reduce((acc, currDiv) => (acc += currDiv.label), "")

    return stringFromDivisors !== "" ? stringFromDivisors : num.toString()
}

export function trasformNumbers(rangeNumbers: number, divisors: any[]) {
    return Array.from({ length: rangeNumbers }, (_, i) => i + 1).map((num) => trasform(divisors, num))
}
