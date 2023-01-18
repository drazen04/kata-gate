namespace TicTacToe;

public class Board
{
    private string state;
    private char currentPlayer = 'X';
    private const string EmptyState = @"
---
---
---
";

    public Board(): this(EmptyState)
    {

    }

    private Board(string state)
    {
        this.state = state.Trim(Environment.NewLine.ToCharArray());
    }

    public static Board FromState(string state)
    {
        var board = new Board(state);
        return board;
    }

    public string Print()
    {
        return state;
    }

    public void Play(int x, int y)
    {
        SignPlayerInBoard(x, y, currentPlayer);
        CheckWinner();
        SwitchPlayer();
    }

    private void SignPlayerInBoard(int x, int y, char player)
    {
        var rows = GetRows();
        var row = rows[y];
        var newRow = row.ToCharArray();
        newRow[x] = player;
        rows[y] = string.Concat(newRow);
        state = string.Join(Environment.NewLine, rows);
    }

    private string[] GetRows()
    {
        return  state.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
    }

    private void SwitchPlayer()
    {
        currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    }

    private void CheckWinner()
    {
        /*var checkEquals = GetRows()
            .Select( row => row[0])
            .GroupBy( x => x)
            // 2 [ key: 'X', count: 3, key: 'O', cunt: 2 ]
            .Any( x => x.Count() == 3);*/
        var checkEquals = CheckColumns();
        //if (rows[0][0] == rows[1][0] && rows[1][0] == rows[2][0])
        if(checkEquals)
        {
            state += Environment.NewLine + currentPlayer + " Wins";
        }
    }

    private Boolean CheckColumns()
    {
        var first = CheckVertical(0);
        var second = CheckVertical(1);
        var third = CheckVertical(2);
        return first || second || third;
    }


    private bool CheckVertical(int column)
    {
        var checkEquals = GetRows()
            .Select(row => row[column])
            .All(x => x == currentPlayer);
        return checkEquals;
    }
}