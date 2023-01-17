namespace MRU;

public class MRU
{
    private readonly int capacity;
    private readonly List<string> items = new List<string>() {};

    public MRU(int capacity)
    {
        this.capacity = capacity;
    }

    public List<string> ReadItems()
    {
        return items;
    }

    public void AddItem(string item)
    {
        if (!items.Contains(item))
        {
            if (items.Count != 0)
            {
                var temp = items[0];
                items[0] = item;
                if (items.Count + 1 <= 6)
                {
                    items.Add(temp);
                }
            }
            else
            {
                items.Add(item);
            }
        }
    }
}