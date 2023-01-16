global using Xunit;

public class Using
{
    public static string FilterMultiple(int i)
    {
        Divisor divisor3 = new Divisor(3, "Buzz");
        Divisor divisor5 = new Divisor(5, "Fizz");

        List<Divisor> divisors = new List<Divisor>() { divisor5, divisor3 };

        var label = "";
        divisors.ForEach(divisor =>
        {
            if (i % divisor.div == 0)
            {
                label += divisor.label;
            }
        });
        
        /*
        if (i % divisor5.div == 0)
        {
            label = divisor5.label;
        }

        if (i % divisor3.div == 0)
        {
            label += divisor3.label;
        }
        */

        return !String.IsNullOrEmpty(label) ? label : i.ToString();
    }
}

public record Divisor(int div, string label);