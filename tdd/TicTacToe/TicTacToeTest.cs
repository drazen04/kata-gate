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

        var expected = @"
---
---
---
";
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
    public void Whoa()
    {
        // given b.fill([...]) when b.play({[0,0]}) then b.readBoard() => XXX  .O.  .O. END GAME, X IS WINNER
        var b = new Board();

        b.Play(0,0); // X
        b.Play(1,1); // O
        b.Play(0,1); // X
        b.Play(2,1); // O
        b.Play(0,2); // X
        
        var boardState = b.Print();

        var expected = Trim(@"
X--
XOO
X--
X Wins");
        Assert.Equal(expected, boardState);
    }

    private string Trim(string stringToTrim)
    {
        return stringToTrim.Trim(Environment.NewLine.ToCharArray());
    }
}