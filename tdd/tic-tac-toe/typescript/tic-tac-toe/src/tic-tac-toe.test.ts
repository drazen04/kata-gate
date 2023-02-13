import { assert, expect, expectTypeOf, test } from "vitest"

    /*
     Testo
        TickTackToe

        3x3

    player: 2
    1: X, 
    2: O

    Alternare

    W: 3 x X | O, diagonale, orizzontale, verticale

        b = Board([3,3])

    b.play({player, coordinate})

    b.readBoard()

        test
    - given new game then b.readBoard() => ...  ...  ...
    - given new game when b.play({[0,1]}) then b.readBoard() => .X.  ...  ...
    - given new game when b.play({[0,1]}) and b.play({[0,2]}) then b.readBoard() => .XO  ...  ...
    - given b.fill([...]) when b.play({[0,0]}) then b.readBoard() => XXX  .O.  .O. END GAME, X IS WINNER*/

    
type X = number
type Y = number
type Point = [X, Y]
type Players = 'X' | 'O'
type Play = {
    player: Players,
    point: Point
}
type State = [string]
type BoardT = {
    grid: [X, Y],
    initialPlayer: Players
}

test("new-game", () => {
    // given new game then b.readBoard() => ...  ...  ...
    let board = new Board();

    expect(board.read()).toBe(`
    ---
    ---
    ---
    `)
})

test("one-play", () => {
    // given new game then b.readBoard() => ...  ...  ...
    let board = new Board();

    let currentState = play(board.state, {player: 'X', point: [1,2]})

    expect(currentState).toBe(`
    ---
    ---
    ---
    `)
})

function play(state: string, play: Play): string {
    return ""
}

class Board {
    state = ''

    constructor() {
        this.state = `
    ---
    ---
    ---
    `}
    read():string { return this.state}
    play():void {

    }
}


