using birthday_greetings_csharp.Model;

namespace birthday_greetings_csharp.Core;

public class Grim
{
    public static string createMess(Celebrated celebrated, string templateMessage)
    {
        return templateMessage.Replace("<first_name>", celebrated.firstName);
    }
}