export function transform(arr: any[], num: number): string {

    const finalValue = arr.filter( el => isMultipleOf(num, el.div) ).reduce((accumulator, currentValue) => accumulator += currentValue.label , "");

    if (finalValue !== "") return finalValue

    return num.toString()
}

const isMultipleOf = (num: number, div: number): boolean => num % div == 0;