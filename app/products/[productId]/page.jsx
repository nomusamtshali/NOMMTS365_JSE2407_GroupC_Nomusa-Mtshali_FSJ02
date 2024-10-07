"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Skeleton from "../../components/Skeleton";
import Image from "next/image";

/**
 * Fetches product details from the API based on the productId
 *
 * @param {string} productId - The ID of the product to fetch
 * @returns {Promise<object>} - A promise that resolves to the product details
 * @throws Will throw an error if the product is not found
 */
async function fetchProduct(productId) {
  const response = await fetch(
    `https://next-ecommerce-api.vercel.app/products/${productId}`
  );
  if (!response.ok) {
    throw new Error("Product not found");
  }
  return response.json();
}

/**
 * ProductDetail Component
 *
 * Displays detailed information about a product including images, description, price, and reviews.
 * It handles fetching the product data from the API and includes a loading state using a skeleton loader.
 *
 * @component
 * @returns {JSX.Element} - The rendered product detail page
 */
export default function ProductDetail() {
  const { productId } = useParams(); // get productId from the URL
  const [product, setProduct] = useState(null); // store product details
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // track the current image index for the carousel
  const [sortOption, setSortOption] = useState("date"); // Sort option: 'date' or 'rating'
  const [sortedReviews, setSortedReviews] = useState([]);

  useEffect(() => {
    if (!productId) return;

    /**
     * Fetch and load product data from the API
     */
    async function loadProduct() {
      try {
        setLoading(true); // show loading indicator
        const productData = await fetchProduct(productId); // fetch product data
        setProduct(productData); // save product data to state
        setSortedReviews(productData.reviews);
      } catch (err) {
        setError(err.message); // save error message to state
      } finally {
        setLoading(false); // stop loading
      }
    }
    loadProduct();
  }, [productId]);

  // Handle sorting of reviews
  useEffect(() => {
    if (product && product.reviews) {
      let sorted = [...product.reviews];
      if (sortOption === "date") {
        sorted = sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
      } else if (sortOption === "rating") {
        sorted = sorted.sort((a, b) => b.rating - a.rating);
      }
      setSortedReviews(sorted);
    }
  }, [sortOption, product]);

  /**
   * Handle switching to the next image in the carousel
   */
  const handleNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  /**
   * Handle switching to the previous image in the carousel
   */
  const handlePrevious = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton height="h-96" width="w-96" className="mx-auto" />
        <Skeleton height="h-8" className="mt-4" />
        <Skeleton height="h-6" className="mt-2" />
        <Skeleton height="h-4" className="mt-2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-80 mb-80">
        {error}: Oops, failed to load product details
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => window.history.back()}
        className="bg-orange-500 text-white px-4 py-2 mb-8 rounded-md hover:bg-orange-600 transition-colors"
      >
        Back to Products
      </button>

      {/* main layout: center image, details below, reviews on the right */}
      <div className="lg:flex lg:justify-between">
        {/* centered product image and info */}
        <div className="lg:w-2/3 lg:flex lg:flex-col items-center text-center">
          {/* image carousel */}
          <div className="relative mb-8">
            {product.images.length > 1 ? (
              <>
                <Image
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="h-96 w-96 object-contain mx-auto rounded-lg shadow-lg"
                />
                {/* previous button */}
                <button
                  className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                  onClick={handlePrevious}
                >
                  ‹
                </button>
                {/* next Button */}
                <button
                  className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                  onClick={handleNext}
                >
                  ›
                </button>
              </>
            ) : (
              <img
                src={product.images[0]}
                alt={product.title}
                className="h-96 w-96 object-cover mx-auto rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* product details */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-2xl text-gray-600 mb-2">${product.price}</p>
            <p className="text-md text-gray-500 mb-2">
              Category: {product.category}
            </p>
            <p className="text-md text-gray-500 mb-4">
              Tags: {product.tags.join(", ")}
            </p>

            <div className="flex flex-col items-center space-y-2">
              <p className="text-yellow-500">Rating: {product.rating} / 5</p>
              <p className="text-gray-600">Stock: {product.stock}</p>
              <p className="text-gray-600">
                Availability: {product.availabilityStatus}
              </p>
            </div>
          </div>
        </div>

        {/* product reviews on the right */}
        <div className="lg:w-1/3 lg:ml-8 mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews: </h2>

          {/* Sorting Options */}
          <div className="mb-4">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
            >
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          {sortedReviews.length > 0 ? (
            sortedReviews.map((review) => (
              <div
                key={review.id}
                className="border p-4 rounded-lg shadow-lg mb-4"
              >
                <p className="font-bold text-md mb-2">
                  {review.reviewerName} - ({review.reviewerEmail})
                </p>
                <p className="text-gray-600 mb-2">
                  {new Date(review.date).toLocaleDateString()}
                </p>
                <p>{review.comment}</p>
                <p className="text-yellow-500 mt-2">
                  Rating: {review.rating} / 5
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No reviews available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Skeleton from "../../components/Skeleton";

// async function fetchProduct(productId) {
//   const response = await fetch(
//     `https://next-ecommerce-api.vercel.app/products/${productId}`
//   );
//   if (!response.ok) {
//     throw new Error("Product not found");
//   }
//   return response.json();
// }

// export default function ProductDetail() {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [sortOption, setSortOption] = useState("date"); // Sort option: 'date' or 'rating'
//   const [sortedReviews, setSortedReviews] = useState([]);

//   useEffect(() => {
//     if (!productId) return;

//     async function loadProduct() {
//       try {
//         setLoading(true);
//         const productData = await fetchProduct(productId);
//         setProduct(productData);
//         setSortedReviews(productData.reviews); // Set reviews initially
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadProduct();
//   }, [productId]);

//   // Handle sorting of reviews
//   useEffect(() => {
//     if (product && product.reviews) {
//       let sorted = [...product.reviews];
//       if (sortOption === "date") {
//         sorted = sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
//       } else if (sortOption === "rating") {
//         sorted = sorted.sort((a, b) => b.rating - a.rating);
//       }
//       setSortedReviews(sorted);
//     }
//   }, [sortOption, product]);

//   if (loading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <Skeleton height="h-96" width="w-96" className="mx-auto" />
//         <Skeleton height="h-8" className="mt-4" />
//         <Skeleton height="h-6" className="mt-2" />
//         <Skeleton height="h-4" className="mt-2" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 mt-80 mb-80">
//         {error}: Oops, failed to load product details
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <button
//         onClick={() => window.history.back()}
//         className="bg-orange-500 text-white px-4 py-2 mb-8 rounded-md hover:bg-orange-600 transition-colors"
//       >
//         Back to Products
//       </button>

//       <div className="lg:flex lg:justify-between">
//         <div className="lg:w-2/3 lg:flex lg:flex-col items-center text-center">
//           <div className="relative mb-8">
//             {product.images.length > 1 ? (
//               <>
//                 <img
//                   src={product.images[currentImageIndex]}
//                   alt={product.title}
//                   className="h-96 w-96 object-contain mx-auto rounded-lg shadow-lg"
//                 />
//                 <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded" onClick={handlePrevious}>
//                   ‹
//                 </button>
//                 <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded" onClick={handleNext}>
//                   ›
//                 </button>
//               </>
//             ) : (
//               <img
//                 src={product.images[0]}
//                 alt={product.title}
//                 className="h-96 w-96 object-cover mx-auto rounded-lg shadow-lg"
//               />
//             )}
//           </div>

//           <div className="text-center">
//             <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.title}</h1>
//             <p className="text-gray-700 mb-4">{product.description}</p>
//             <p className="text-2xl text-gray-600 mb-2">${product.price}</p>
//             <p className="text-md text-gray-500 mb-2">Category: {product.category}</p>
//             <p className="text-md text-gray-500 mb-4">Tags: {product.tags.join(", ")}</p>

//             <div className="flex flex-col items-center space-y-2">
//               <p className="text-yellow-500">Rating: {product.rating} / 5</p>
//               <p className="text-gray-600">Stock: {product.stock}</p>
//               <p className="text-gray-600">Availability: {product.availabilityStatus}</p>
//             </div>
//           </div>
//         </div>

//         <div className="lg:w-1/3 lg:ml-8 mt-8 lg:mt-0">
//           <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

//           {/* Sorting Options */}
//           <div className="mb-4">
//             <select
//               value={sortOption}
//               onChange={(e) => setSortOption(e.target.value)}
//               className="border border-gray-300 rounded px-4 py-2 w-full"
//             >
//               <option value="date">Sort by Date</option>
//               <option value="rating">Sort by Rating</option>
//             </select>
//           </div>

//           {sortedReviews.length > 0 ? (
//             sortedReviews.map((review) => (
//               <div key={review.id} className="border p-4 rounded-lg shadow-lg mb-4">
//                 <p className="font-bold text-md mb-2">
//                   {review.reviewerName} - ({review.reviewerEmail})
//                 </p>
//                 <p className="text-gray-600 mb-2">
//                   {new Date(review.date).toLocaleDateString()}
//                 </p>
//                 <p>{review.comment}</p>
//                 <p className="text-yellow-500 mt-2">Rating: {review.rating} / 5</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-600">No reviews available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
