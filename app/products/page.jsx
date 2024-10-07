import ProductsClient from "./ProductsClient";

// /**
//  * Generate dynamic metadata for products page.
//  */
// export async function generateMetadata({ searchParams }) {
//   const { category = "", search = "" } = searchParams;

//   let title = "Products";
//   let description = "Browse our wide range of products.";

//   if (category) {
//     title = `${category} Products`;
//     description = `Browse products in the ${category} category.`;
//   } else if (search) {
//     title = `Search results for "${search}"`;
//     description = `Browse products matching the term "${search}".`;
//   }

//   return {
//     title,
//     description,
//   };
// }

/**
 * page specific meta tags
 */
export async function generateMetadata() {
  return {
    title: "MaxiMart - Products",
    description: "Discover the best products at unbeatable prices.",
    openGraph: {
      type: "website",
      url: "https://metatags.io/",
      title: "MaxiMart",
      description:
        "Your one-stop shop for the best products at unbeatable prices. Browse through our collection of fashion, electronics, and more.",
      images: [
        {
          url: "https://metatags.io/images/meta-tags.png",
          width: 1200,
          height: 630,
          alt: "MaxiMart",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      url: "https://metatags.io/",
      title: "MaxiMart",
      description:
        "Your one-stop shop for the best products at unbeatable prices. Browse through our collection of fashion, electronics, and more.",
      images: ["https://metatags.io/images/meta-tags.png"],
    },
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
