"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Use router from 'next/navigation'
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Carousel from "../components/Carousel";
import Skeleton from "../components/Skeleton";

/**
 * This is the Client Component where search, pagination, and sorting are handled.
 */
export default function ProductsClient({ products, categories, currentPage, fetchError }) {
  const router = useRouter(); // Initialize the router
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(currentPage);

    // Handle reset filters, search, and sorting
    const handleResetFilters = () => {
        setSearchTerm("");
        setSelectedCategory("");
        setSortOption("");
        setPage(1);
        // Update URL to reset all filters (removing query params)
        router.push("/products");
      };

  // Effect to update the URL based on current state and trigger navigation
  useEffect(() => {
    const params = new URLSearchParams({
      page,
      search: searchTerm || "",  // Fallback to empty string if no search term
      category: selectedCategory || "", // Fallback to empty string
      sortBy: sortOption || "", // Fallback to empty string
    }).toString();

    router.push(`/products?${params}`); // Navigate with the new query params
  }, [searchTerm, selectedCategory, sortOption, page, router]); // Depend on all state variables

  // Handle search submission (trigger on form submit)
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    setPage(1); // Reset to first page
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value); // Update sort option state
    setPage(1); // Reset to first page
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Update category state
    setPage(1); // Reset to first page
  };

  if (fetchError) {
    return <div className="text-red-500 text-center mt-20">{fetchError}</div>
  }

  return (
    <div className="container mx-auto px-8">
      <h1 className="text-3xl font-bold text-center mt-6 mb-6">Products</h1>

      {/* Search, Category(filter), Sort, and Reset */}
      <form onSubmit={handleSearchSubmit} className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
        />

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortOption}
          onChange={handleSortChange} 
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
        >
          <option value="">Sort By</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

       {/* Reset Filters Button */}
       <button
        onClick={handleResetFilters}
        className="bg-red-500 text-white px-4 py-2 mb-4 rounded hover:bg-red-600 transition-colors"
      >
        Reset Filters
      </button>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              {/* Image Carousel */}
              <Carousel images={product.images} />

              {/* Product Details */}
              <h2 className="text-lg font-semibold mb-2 truncate">{product.title}</h2>
              <p className="mb-2">Brand: {product.brand}</p>
              <p className="mb-2">${product.price}</p>
              <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>

              {/* Action Buttons */}
              <div className="flex justify-between text-md items-center mt-4 space-x-2">
                {/* Add to Cart Button */}
                <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
                  <FaShoppingCart />
                  <span>Add to Cart</span>
                </button>

                {/* Wishlist Heart Icon */}
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                  <FaHeart />
                </button>

                {/* View Details Button */}
                <a
                  href={`/products/${product.id}`}
                  className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  View Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <Skeleton /> // Display loading state or empty result state
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`bg-orange-500 text-white px-4 py-2 rounded-md ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-orange-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">{page}</span>
        <button
          onClick={() => setPage(page + 1)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}
