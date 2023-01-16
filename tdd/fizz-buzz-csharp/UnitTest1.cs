namespace fizz_buzz_csharp;

public class UnitTest1
{
    /**
     * - [X] 9,18 - "Buzz" case: n % 3 == 0
     * - [X] 25,50 - "Fizz" case: n % 5 == 0
     * - [X] 15,30 - "FizzBuzz" case: n % 3 && n % 5 == 0
     * - [] 1,17,97 - "1", "17" ecc. for any other case
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
}