namespace fizz_buzz_csharp;

public class UnitTest1
{
    [Fact]
    public void Buzz()
    {
        var multiple3 = 9;
        Assert.Equal("Buzz", Using.FilterMultiple(multiple3));
    }
}