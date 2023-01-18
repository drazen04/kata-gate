namespace TicTacToe;

public class Board
{
    private string state;
    private char currentPlayer = 'X';

    public Board()
    {
        state = @"
---
---
---
";
    }

    public string Print()
    {
        return state;
    }

    public void Play(int x, int y)
    {
        signPlayerInBoard(x, y, currentPlayer);

        switchPlayer();
    }

    private void signPlayerInBoard(int x, int y, char player)
    {
        var yAxes = state.Split(Environment.NewLine, StringSplitOptions.RemoveEmptyEntries);
        var row = yAxes[y];
        var newRow = row.ToCharArray();
        newRow[x] = player;
        yAxes[y] = string.Concat(newRow);
        state = string.Join(Environment.NewLine, yAxes);
    }

    private void switchPlayer()
    {
        currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
    }
}