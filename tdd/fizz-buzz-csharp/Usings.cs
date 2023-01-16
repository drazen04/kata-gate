global using Xunit;

public class Using
{
    public static string Transform(int mul, List<Divisor> divisors)
    {
        var label = divisors
            .Where(divisor => IsMultipleOf(mul, divisor.div))
            .Aggregate("", (acc, divisor) => acc + divisor.label );

        return !String.IsNullOrEmpty(label) ? label : mul.ToString();
    }

    public static Boolean IsMultipleOf(int num, int divisor)
    {
        return num % divisor == 0;
    }
}

public record Divisor(int div, string label);