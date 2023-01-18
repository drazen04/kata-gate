using birthday_greetings_csharp.Core;
using birthday_greetings_csharp.Model;

namespace birthday_greetings_csharp;

public class UnitTest1
{
    /**
     * As you’re a very friendly person, you would like to send a birthday note to all the friends you have.
     * But you have a lot of friends and a bit lazy, it may take some times to write all the notes by hand.
     * The good news is that computers can do it automatically for you.
     * Imagine you have a flat file with all your friends :
     *  last_name, first_name, date_of_birth, email
     *  Doe, John, 1982/10/08, john.doe@foobar.com
     *  Ann, Mary, 1975/09/11, mary.ann@foobar.com
     * And you want to send them a happy birthday email on their birth date :
     *  Subject: Happy birthday!
     *  Happy birthday, dear <first_name>!
     *
     * How would this software look like ? Try to implement it so you can easily change :
     * - the way you retrieve the friends data (for instance, try switching to a SQLite Db)
     * - the way you send the note : (for instance, imagine you want to send SMS instead of emails)
     *
     * What kind of tests would you write ? Would you use Mocks ?
     */
    
    /**
     * - format message
     * - Tom 14/03/1987, Bob 23/07/1987, when it's 14/03/2023 then send message only to Tom
     * - pick friends by date
     * - send
     */
    [Fact]
    public void Test1()
    {
        DateOnly dateOnly = DateOnly.FromDateTime(DateTime.Now);
    }
    
    [Fact]
    public void FormatMessage()
    {
        var messageTemplate = "Happy birthday, dear <first_name>!";
        var name = "Marco";
        var lastName = "Doe";
        var email = "m.doe@test.it";
        if (DateOnly.TryParse("1980/01/01", out DateOnly result))
        {
            Console.WriteLine($"Parsed DateOnly: {result}");
        }
        var celebrated = new Celebrated(name, lastName, result, email);

        var expected = "Happy birthday, dear Marco!";
        var composedMessage = Grim.createMess(celebrated, messageTemplate);
        
        Assert.Equal(expected, composedMessage);
    }
}