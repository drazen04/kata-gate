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
        if (items.Contains(item)) return;
        if (items.Count != 0)
        {
            /*var temp = items[0];
            items[0] = item;
            if (items.Count + 1 <= capacity)
            {
                items.Add(temp);
            }*/
            AddAsHead(item);

        }
        else
        {
            items.Add(item);
        }
    }

    private void AddAsHead(string item)
    {
        var temp = items[0];
        items[0] = item;
        if (items.Count + 1 <= capacity)
        {
            items.Add(temp);
        }
    }
}