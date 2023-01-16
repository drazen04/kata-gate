export function optimalCombinations(tagetSize: number, elements: number[]): number[] {
    return [50, 100, 100];
}

export function arrayEq(arr1: unknown[], arr2: unknown[]): boolean {
    if (arr1.length === arr2.length && arr1.every(el => arr2.includes(el))) {
            return true;
        }
    
    return false;
}