global using Xunit;

public class Using
{
    public static string FilterMultiple(int i)
    {
        if (i % 3 == 0)
        {
            return "Buzz";
        }
        
        return i % 5 == 0 ? "Fizz" : "";
    }
}