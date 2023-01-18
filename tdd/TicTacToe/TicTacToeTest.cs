namespace TicTacToe;

public class TicTacToeTest
{
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
    
    [Fact]
    public void NewGame()
    {
        var b = new Board();

        var boardState = b.Print();
// 0,2 - 1,1 - 2,0
        var expected = Trim(@"
---
---
---
");
        Assert.Equal(expected, boardState);
    }
    
    [Fact]
    public void FirstPlay()
    {
        // given new game when b.play({[0,1]}) then b.readBoard() => .X.  ...  ...
        var b = new Board();

        b.Play(0,1);
        var boardState = b.Print();

        var expected = Trim(@"
---
X--
---
");
        Assert.Equal(expected, boardState);
    }
    
    [Fact]
    public void MultiplePlays()
    {
        // given new game when b.play({[0,1]}) and b.play({[0,2]}) then b.readBoard() => .XO  ...  ...
        var b = new Board();

        b.Play(0,1);
        b.Play(1,2);
        b.Play(2,0);
        var boardState = b.Print();

        var expected = Trim(@"
--X
X--
-O-
");
        Assert.Equal(expected, boardState);
    }
    
    [Fact]
    public void WinnerFirstColumn()
    {
        // given b.fill([...]) when b.play({[0,0]}) then b.readBoard() => XXX  .O.  .O. END GAME, X IS WINNER
        var b = Board.FromState(@"
X--
XOO
---", 'X');
        
        b.Play(0,2);
        
        var boardState = b.Print();

        var expected = Trim(@"
X--
XOO
X--
X Wins");
        Assert.Equal(expected, boardState);
    }
    
    [Fact]
    public void WinnerLastColumn()
    {
        // given b.fill([...]) when b.play({[0,0]}) then b.readBoard() => XXX  .O.  .O. END GAME, X IS WINNER
        var b = Board.FromState(@"
--X
OOX
---", 'X');

        b.Play(2,2);
        
        var boardState = b.Print();

        var expected = Trim(@"
--X
OOX
--X
X Wins");
        Assert.Equal(expected, boardState);
    }

    [Fact]
    public void WinnerFirstRow()
    {
        var initialState = Trim(@"
OO-
X-X
---");
        
        var b = Board.FromState(initialState, 'O');
        b.Play(2, 0);
        
        var boardState = b.Print();
        
        var expected = Trim(@"
OOO
X-X
---
O Wins");

        Assert.Equal(expected, boardState);
    }

    
    [Fact]
    public void WinnerDiagonal()
    {
        var initialState = Trim(@"
--O
XOX
---");
        
        var b = Board.FromState(initialState, 'O');
        b.Play(0, 2);
        
        var boardState = b.Print();
        
        var expected = Trim(@"
--O
XOX
O--
O Wins");

        Assert.Equal(expected, boardState);
    }

    private string Trim(string stringToTrim)
    {
        return stringToTrim.Trim(Environment.NewLine.ToCharArray());
    }
}