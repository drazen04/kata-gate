namespace fizz_buzz_csharp;

public class UnitTest1
{
    /**
     * - [X] 9,18 - "Buzz" case: n % 3 == 0
     * - [X] 25,50 - "Fizz" case: n % 5 == 0
     * - [X] 15,30 - "FizzBuzz" case: n % 3 && n % 5 == 0
     * - [X] 17,97 - "17", "97" ecc. for any other case
     */
    private static readonly List<Divisor> Divisors = new List<Divisor>()
    {
        new (5, "Fizz"),
        new (3, "Buzz")
    };
    
    [Fact]
    public void Buzz()
    {
        Assert.Equal("Buzz", Using.TransformMultiple(9, Divisors));
        Assert.Equal("Buzz", Using.TransformMultiple(18, Divisors));
    }
    
    [Fact]
    public void Fizz()
    {
        Assert.Equal("Fizz", Using.TransformMultiple(25, Divisors));
        Assert.Equal("Fizz", Using.TransformMultiple(50, Divisors));
    }
    
    [Fact]
    public void FizzBuzz()
    {
        Assert.Equal("FizzBuzz", Using.TransformMultiple(15, Divisors));
        Assert.Equal("FizzBuzz", Using.TransformMultiple(30, Divisors));
    }

    [Fact]
    public void Num()
    {
        Assert.Equal("17", Using.TransformMultiple(17, Divisors));
        Assert.Equal("97", Using.TransformMultiple(97, Divisors));
    }
}