global using Xunit;

public class Using
{
    public static string FilterMultiple(int i)
    {
        return i % 3 == 0 ? "Buzz" : "";
    }
}