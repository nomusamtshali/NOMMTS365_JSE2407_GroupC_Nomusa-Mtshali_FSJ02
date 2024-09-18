import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto text-center py-16 px-4">
      <h1 className="text-5xl font-bold mb-6">Welcome to MaxiMart!</h1>
      <p className="text-lg text-gray-700 mt-10 mb-12">
        Your one-stop shop for the best products at unbeatable prices. Browse
        through our collection of fashion, electronics, and more.
      </p>

      {/* Navigate to Products Button */}
      <Link href="/products">
        <button className="bg-green-500 text-white px-6 py-4 mt-6 rounded-md hover:bg-green-600 transition-colors">
          Browse Our Products
        </button>
      </Link>

      {/* Store Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="p-14 bg-white shadow-lg rounded-md">
          <h3 className="text-xl font-semibold mb-4">Free Shipping</h3>
          <p className="text-gray-600">
            Enjoy free shipping on all orders over $50.
          </p>
        </div>

        <div className="p-14 bg-white shadow-lg rounded-md">
          <h3 className="text-xl font-semibold mb-4">24/7 Customer Support</h3>
          <p className="text-gray-600">
            We are here to help you, anytime, any day.
          </p>
        </div>

        <div className="p-14 bg-white shadow-lg rounded-md">
          <h3 className="text-xl font-semibold mb-4">Money-Back Guarantee</h3>
          <p className="text-gray-600">
            Not satisfied? Get a full refund within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
