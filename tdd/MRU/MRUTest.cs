namespace MRU;

public class MRUTest
{
    /**
     * -- Most Recently Used --
     * - 10 elements
     * - put on top already used element
     * - last element used goes on top
     * - remove last element in list (mru)
     */
    
    /**
     * - given MRU {} when readItems() then {}
     * - given MRU {} when addItems("foo") then readItems() -> {"foo"}
     * - given MRU {"foo", "bar"} when addItems("foo") then readItems() -> {"foo", "bar"}
     * - given MRU {"foo", "bar"} when addItems("buzz") then readItems() -> {"buzz", "foo", "bar"}
     * - given MRU {"buzz", "foo", "bar", ..., "twenty", "last"} when addItems("otherItem") then readItems() -> {"otherItems", "foo", "bar",... "twenty"}
     */
    
    [Fact]
    public void EmptyList()
    {
        var mru = new MRU(6);
        var result = mru.ReadItems();
        
        Assert.Empty(result);
    }
    
    [Fact]
    public void AddItem()
    {
        var mru = new MRU(6);
        mru.AddItem("foo");
        var result = mru.ReadItems();
            
        var expected = new List<string>() { "foo" };
        
        Assert.Equal(expected, result);
    }
    
    [Fact]
    public void ExistingItem()
    {
        //- given MRU {"foo", "bar"} when addItems("foo") then readItems() -> {"foo", "bar"}
        // Arrange
        var mru = new MRU(6);
        mru.AddItem("foo");
        mru.AddItem("bar");
        
        // Act
        mru.AddItem("foo");
        
        // Assert
        Assert.Equal(1, mru.ReadItems().Count( x => x == "foo" ));
    }
    
    
    [Fact]
    public void ItemIsOrdered()
    {
        //- given MRU {"foo", "bar"} when addItems("buzz") then readItems() -> {"buzz", "foo", "bar"}
        // Arrange
        var mru = new MRU(6);
        mru.AddItem("foo");
        mru.AddItem("bar");
        
        // Act
        mru.AddItem("buzz");
        
        /**
         * foo
         * bar - foo
         * buzz - foo - bar
         */
        
        // Assert
        var expected = new List<string>() { "buzz", "foo", "bar" };
        Assert.Equal(expected, mru.ReadItems());
        
        var mru2 = new MRU(6);
        mru2.AddItem("foo");
        
        // Act
        mru2.AddItem("bar");
        
        // Assert
        var expected2 = new List<string>() { "bar", "foo" };
        Assert.Equal(expected2, mru2.ReadItems());
    }
    
    [Fact]
    public void Bla()
    {
        // given MRU {"buzz", "foo", "bar", ..., "twenty", "last"}
        // when addItems("otherItem")
        // then readItems() -> {"otherItems", "foo", "bar",... "twenty"}
        
        // Arrange
        var mru = new MRU(6);
        mru.AddItem("buzz");
        mru.AddItem("foo");
        mru.AddItem("bar");
        mru.AddItem("joy");
        mru.AddItem("mark");
        mru.AddItem("wesley");
        
        // Act
        mru.AddItem("otherItem");
        
        // Assert
        Assert.Contains("otherItem", mru.ReadItems());
        Assert.DoesNotContain("wesley", mru.ReadItems());
    }
    
}