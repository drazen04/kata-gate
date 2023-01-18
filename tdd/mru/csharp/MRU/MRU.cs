namespace MRU;

public class MRU
{
    private readonly int capacity;
    private List<string> items = new List<string>() {};

    public MRU(int capacity)
    {
        this.capacity = capacity;
    }

    public List<string> ReadItems()
    {
        return items;
    }

    public void AddAsHead(string item)
    {
        if (items.Contains(item)) return;
        items.Insert(0, item);
        items = items.Take(capacity).ToList();
    }
}