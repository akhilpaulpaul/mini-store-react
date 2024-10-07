import { useEffect, useState } from "react";
import { Tally3 } from "lucide-react";
import axios from "axios";

import { useFilter } from "./FilterContext";
import BookCard from "./BookCard";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.log("Error fetching data");
      });
  }, [currentPage, keyword]);

  const getFilteredProducts = () => {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);
      case "cheap":
        return filteredProducts.sort((a, b) => a.price - b.price);
      case "popular":
        return filteredProducts.sort((a, b) => (b.rating = a.rating));

      default:
        return filteredProducts;
    }
  };

  const totalProducts = 100;
  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
    }
  }

  const getPaginationButtons = () => {
    const buttons: number[] = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage - 2 < 1) {
        endPage = Math.min(totalPages, endPage + (2 - currentPage - 1));
    }

    if (currentPage + 2 > totalPages) {
        startPage = Math.min(1, startPage - (2  - totalPages - currentPage));
    }

    for (let page = startPage; page <= endPage; page++) {
        buttons.push(page);
    }

    return buttons;
  }
  const filteredProducts = getFilteredProducts();

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm-w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative my-5">
            <button
              className="border px-4 py-2 rounded-full flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                <button
                  onClick={() => setFilter("Cheap")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Cheap
                </button>
                <button
                  onClick={() => setFilter("expensive")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Expensive
                </button>
                <button
                  onClick={() => setFilter("popular")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-200"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>
        {filteredProducts && filteredProducts.length > 0 ? 
        (
            <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {filteredProducts.map(product => (
                    <BookCard key={product.id} id={product.id} title={product.title} image={product.thumbnail} price={product.price} />
                ))}
            </div>
        ) : (
            <div className="text-2xl text-center text-gray-500">
                No products found.
            </div>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)} 
                className="border px-4 py-2 mx-2 rounded-full"
            >
                Previous
            </button>
            <div className="flex flex-wrap justify-center">
                {getPaginationButtons().map(page => (
                    <button key={page} onClick={() => handlePageChange(page)} className={`border px-4 py-2 mx-1 rounded-full ${page === currentPage ? 'bg-black text-white' : ''}`}>{page}</button>
                ))}
            </div>
            <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)} 
                className="border px-4 py-2 mx-2 rounded-full"
            >
                Next
            </button>
        </div>
      </div>
    </section>
  );
};

export default MainContent;
