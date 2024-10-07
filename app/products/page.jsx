// "use client"; // Client-side component

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// //import { useSearchParams } from "next/navigation";
// import { FaHeart, FaShoppingCart } from "react-icons/fa";
// import Skeleton from "../components/Skeleton";
// import Carousel from "../components/Carousel";

// /**
//  * Fetches products from the API with pagination.
//  * @async
//  * @param {number} [page=1] - The page number to fetch.
//  * @returns {Promise<Object[]>} The fetched products.
//  * @throws {Error} If the fetch operation fails.
//  */
// async function fetchProducts({page = 1, search = "", category = "", sortBy = ""}) {
//   const skip = (page - 1) * 20; // Skip for pagination
//   const res = await fetch(
//     `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=20&search=${search}&category=${category}&sort=${sortBy}`
//   );
//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }
//   return res.json();
// }

// /**
//  * Fetch categories from the API.
//  * @async
//  * @returns {Promise<Object[]>} The fetched categories.
//  */
// async function fetchCategories() {
//   const res = await fetch("https://next-ecommerce-api.vercel.app/categories");
//   if (!res.ok) throw new Error("Failed to fetch categories");
//   return res.json();
// }

// /**
//  * ProductsPage component that displays a grid of products with pagination.
//  * @returns {JSX.Element} The rendered ProductsPage component.
//  */
// export default function ProductsPage() {
//   // const searchParams = useSearchParams();
//   // const currentPage = parseInt(searchParams.get("page")) || 1;
//   const router = useRouter();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [categories, setCategories] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [sortOption, setSortOption] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     /**
//      * Loads products from the API and updates the component state.
//      * @async
//      */
//     const loadProducts = async () => {
//       try {
//         setLoading(true); // Start loading
//         const productData = await fetchProducts({
//           page: currentPage,
//           search: searchTerm, 
//           category: selectedCategory,
//           sortBy: sortOption,
//         }); // Fetch products
//         setProducts(productData); // Store products in state
//       } catch (err) {
//         setError(err.message); // Handle errors
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     };
//   //   loadProducts();
//   // }, [currentPage]);

//   async function loadCategories() {
//     try {
//       const categoryData = await fetchCategories();
//       setCategories(categoryData);
//       console.log(categoryData);
//     } catch (err) {
//       setError(err.message);
//     }
//   }

//   loadProducts();
//   loadCategories();
// }, [currentPage, searchTerm, selectedCategory, sortOption]);

// const handleSearchChange = (e) => setSearchTerm(e.target.value);
// const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
// const handleSortChange = (e) => setSortOption(e.target.value);

// const handlePageChange = (newPage) => setCurrentPage(newPage);

// const handleResetFilters = () => {
//   setSearchTerm("");
//   setSelectedCategory("");
//   setSortOption("");
//   setCurrentPage(1);
// };

//   // /**
//   //  * Updates the page number in the URL.
//   //  * @param {number} newPage - The new page number to set.
//   //  */
//   // const updatePageInURL = (newPage) => {
//   //   const url = new URL(window.location.href);
//   //   url.searchParams.set("page", newPage); // Update ?page= in URL
//   //   window.history.pushState({}, "", url);
//   // };

//   // const handlePageChange = (newPage) => {
//   //   updatePageInURL(newPage);
//   //   setLoading(true); // Set loading state
//   // };

//   if (loading) {
//     return (
//       <div className="container mx-auto px-8">
//         <h1 className="text-3xl font-bold text-center mt-6 mb-6">Products</h1>

//         {/* Skeleton Grid for Loading State */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {Array(8)
//             .fill(0)
//             .map((_, idx) => (
//               <div key={idx} className="bg-white rounded-lg shadow-md p-4">
//                 <Skeleton height="h-40" />
//                 <Skeleton height="h-6" className="my-2" />
//                 <Skeleton height="h-4" />
//                 <Skeleton height="h-4" />
//               </div>
//             ))}
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-red-500 text-center mt-60 mb-60">
//         {error}: Oops, failed to load products
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-8">
//       <h1 className="text-3xl font-bold text-center mt-6 mb-6">Products</h1>

//       {/* Search, Category, Sort, and Reset */}
//       <div className="flex justify-between mb-4">
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
//         />

//         <select
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//           className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
//         >
//           <option value="">All Categories</option>
//           {categories.map((category, index) => (
//             <option key={index} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>

//         <select
//           value={sortOption}
//           onChange={handleSortChange}
//           className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
//         >
//           <option value="">Sort By</option>
//           <option value="price_asc">Price: Low to High</option>
//           <option value="price_desc">Price: High to Low</option>
//         </select>

//         <button
//           onClick={handleResetFilters}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Reset Filters
//         </button>
//       </div>

//       {/* Products Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg"
//           >
//             {/* Image Carousel */}
//             <Carousel images={product.images} />

//             {/* Product Details */}
//             <h2 className="text-lg font-semibold mb-2 truncate">
//               {product.title}
//             </h2>
//             <p className="mb-2">Brand: {product.brand}</p>
//             <p className="mb-2">${product.price}</p>
//             <p className="text-sm text-gray-600 mb-2">
//               Category: {product.category}
//             </p>

//             {/* Action Buttons */}
//             <div className="flex justify-between text-md items-center mt-4 space-x-2">
//               {/* Add to Cart Button */}
//               <button className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors">
//                 <FaShoppingCart />
//                 <span>Add to Cart</span>
//               </button>

//               {/* Wishlist Heart Icon */}
//               <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
//                 <FaHeart />
//               </button>

//               {/* View Details Button */}
//               <a
//                 href={`/products/${product.id}`}
//                 className="text-white bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
//               >
//                 View Details
//               </a>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center mt-8 space-x-4">
//         <button
//           disabled={currentPage === 1} // Disable when on first page
//           onClick={() => handlePageChange(currentPage - 1)}
//           className={`bg-orange-500 text-white px-4 py-2 rounded-md ${
//             currentPage === 1
//               ? "opacity-50 cursor-not-allowed"
//               : "hover:bg-orange-600"
//           }`}
//         >
//           Previous
//         </button>
//         <span className="text-gray-700">{currentPage}</span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }






import ProductsClient from "./ProductsClient";

/**
 * Generate dynamic metadata for products page.
 */
export async function generateMetadata({ searchParams }) {
  const { category = "", search = "" } = searchParams;

  let title = "Products";
  let description = "Browse our wide range of products.";

  if (category) {
    title = `${category} Products`;
    description = `Browse products in the ${category} category.`;
  } else if (search) {
    title = `Search results for "${search}"`;
    description = `Browse products matching the term "${search}".`;
  }

  return {
    title,
    description,
  };
}

/**
 * This is the Server Component that fetches data on the server side.
 * It passes data to the Client Component for rendering.
 */
export default async function ProductsPage({ searchParams }) {
  const { page = 1, search = "", category = "", sortBy = "" } = searchParams;

  const skip = (page - 1) * 20;

  // Fetch products
  const resProducts = await fetch(
    `https://next-ecommerce-api.vercel.app/products?skip=${skip}&limit=20&search=${search}&category=${category}&sort=${sortBy}`,
    { cache: 'no-store' } // Ensure no caching for fresh data
  );
  const products = await resProducts.json();

  // Fetch categories
  const resCategories = await fetch("https://next-ecommerce-api.vercel.app/categories", { cache: 'no-store' });
  const categories = await resCategories.json();

  // Pass data to the client-side component for rendering and interaction
  return <ProductsClient products={products} categories={categories} currentPage={parseInt(page, 10)} />;
}
