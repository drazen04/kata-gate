namespace fizz_buzz_csharp;

public class UnitTest1
{
    /**
     * - [X] 9,18 - "Buzz" case: n % 3 == 0
     * - [X] 25,50 - "Fizz" case: n % 5 == 0
     * - [X] 15,30 - "FizzBuzz" case: n % 3 && n % 5 == 0
     * - [X] 17,97 - "17", "97" ecc. for any other case
     */
    [Fact]
    public void Buzz()
    {
        Assert.Equal("Buzz", Using.FilterMultiple(9));
        Assert.Equal("Buzz", Using.FilterMultiple(18));
    }
    
    [Fact]
    public void Fizz()
    {
        Assert.Equal("Fizz", Using.FilterMultiple(25));
        Assert.Equal("Fizz", Using.FilterMultiple(50));
    }
    
    [Fact]
    public void FizzBuzz()
    {
        Assert.Equal("FizzBuzz", Using.FilterMultiple(15));
        Assert.Equal("FizzBuzz", Using.FilterMultiple(30));
    }

    [Fact]
    public void Num()
    {
        Assert.Equal("17", Using.FilterMultiple(17));
        Assert.Equal("97", Using.FilterMultiple(97));
    }
}