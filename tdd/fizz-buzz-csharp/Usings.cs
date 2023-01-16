global using Xunit;

public class Using
{
    public static string FilterMultiple(int i)
    {
        if (i % 3 == 0 && i % 5 == 0)
        {
            return "FizzBuzz";
        }
        if (i % 3 == 0)
        {
            return "Buzz";
        }
        
        if (i % 5 == 0)
        {
            return "Fizz";
        }
        
        return i.ToString();
    }
}