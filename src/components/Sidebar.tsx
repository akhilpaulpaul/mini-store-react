import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword
  } = useFilter();
  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "Fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  }

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category); 
  }

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  }

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword('');
  }

  return (
    <div className="w-64 h-screen p-4 bg-gradient-to-b from-cyan-100 to-blue-400">
      <h1 className="text-2xl font-bold mb-6 mt-3">New Life Store</h1>
      <section>
        <input
          type="text"
          className="border-2 rounded px-2 py-2 mb-4"
          placeholder="Search Product"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="flex justify-center items-center">
          <input
            type="text"
            className="border-2 mr-2 px-4 py-3 mb-3 w-full"
            placeholder="Min"
            value={minPrice ?? ''}
            onChange={handleMinPriceChange}

          />
          <input
            type="text"
            className="border-2 px-4 py-3 mb-3 w-full"
            placeholder="Max"
            value={maxPrice ?? ''}
            onChange={handleMaxPriceChange}
          />
        </div>
        <section>
          <div className="category-list">
            <h2 className="text-xl font-bold mb-3">Categories</h2>
            {categories.map((category, index) => (
              <label key={index} className="block mb-2">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleRadioChangeCategories(category)}
                  className="mr-2 w-[16px] h-[16px]"
                  checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </label>
            ))}
          </div>
        </section>
        <section>
          <div className="my-4">
            <h2 className="text-xl font-semibold mb-3">Keywords</h2>
            <div>
              {keywords.map((keyword, index) => (
                <button 
                  key={index}
                  onClick={() => handleKeywordClick(keyword)}
                  className="block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-gray-200"
                >
                  {keyword.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </section>
        <button onClick={handleReset} className="w-full py-2 px-4 bg-black text-white rounded mt-4">Reset Filters</button>
      </section>
    </div>
  );
};

export default Sidebar;
