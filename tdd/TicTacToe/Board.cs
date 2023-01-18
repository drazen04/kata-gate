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

    public static Board FromState(string state, char nextPlayer)
    {
        var board = new Board(state);
        board.currentPlayer = nextPlayer;
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

    private Boolean CheckColumns()
    {
        var first = CheckVertical(0);
        var second = CheckVertical(1);
        var third = CheckVertical(2);
        return first || second || third;
    }
    
    private Boolean CheckRows()
    {
        var first = CheckRow(0);
        var second = CheckRow(1);
        var third = CheckRow(2);
        return first || second || third;
    }
    
    private Boolean CheckVertical()
    {
        var rows = GetRows();
        return Enumerable.Range(0, 3).Select(i => rows[i][i]).All(x => x == currentPlayer)
            || Enumerable.Range(0, 3).Select(i => rows[i][2 - i]).All(x => x == currentPlayer);
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
        var checkColumns = CheckColumns();
        var checkRows = CheckRows();
        var checkVertical = CheckVertical();
        //if (rows[0][0] == rows[1][0] && rows[1][0] == rows[2][0])
        if(checkColumns || checkRows || checkVertical)
        {
            state += Environment.NewLine + currentPlayer + " Wins";
        }
    }
    
    private bool CheckVertical(int column)
    {
        var checkEquals = GetRows()
            .Select(row => row[column])
            .All(x => x == currentPlayer);
        return checkEquals;
    }
    
    private bool CheckRow(int row)
    {
        var checkEquals = GetRows()[row].ToCharArray()
            .Select(column => column)
            .All(x => x == currentPlayer);
        return checkEquals;
    }
}