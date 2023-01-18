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
     * - given MRU {"bar", "foo"} when addItems("foo") then readItems() -> {"foo", "bar"}
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
        mru.AddAsHead("foo");
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
        mru.AddAsHead("foo");
        mru.AddAsHead("bar");
        
        // Act
        mru.AddAsHead("foo");
        
        // Assert
        Assert.Equal(1, mru.ReadItems().Count( x => x == "foo" ));
    }
    
    [Fact]
    public void ExistingItemOnTop()
    {
        //- given MRU {"bar", "foo"} when addItems("foo") then readItems() -> {"foo", "bar"}
        // Arrange
        var mru = new MRU(6);
        mru.AddAsHead("bar");
        mru.AddAsHead("foo");
        
        // Act
        mru.AddAsHead("foo");
        
        // Assert
        Assert.Equal("foo", mru.ReadItems()[0]);
    }


    [Fact]
    public void ItemIsOrdered()
    {
        //- given MRU {"foo", "bar"} when addItems("buzz") then readItems() -> {"buzz", "foo", "bar"}
        // Arrange
        var mru = new MRU(6);

        // Act
        mru.AddAsHead("foo");
        mru.AddAsHead("bar");
        mru.AddAsHead("buzz");

        // Assert
        var expected = new List<string>() { "buzz", "bar", "foo" };
        Assert.Equal(expected, mru.ReadItems());
    }
    
    [Fact]
    public void ExtraItem()
    {
        // given MRU {"buzz", "foo", "bar", ..., "twenty", "last"}
        // when addItems("otherItem")
        // then readItems() -> {"otherItems", "foo", "bar",... "twenty"}
        
        // Arrange
        var mru = new MRU(6);
        mru.AddAsHead("buzz");
        mru.AddAsHead("foo");
        mru.AddAsHead("bar");
        mru.AddAsHead("joy");
        mru.AddAsHead("mark");
        mru.AddAsHead("wesley");
        
        // Act
        mru.AddAsHead("otherItem");
        
        // Assert
        Assert.Contains("otherItem", mru.ReadItems());
        Assert.DoesNotContain("buzz", mru.ReadItems());
    }
    
}