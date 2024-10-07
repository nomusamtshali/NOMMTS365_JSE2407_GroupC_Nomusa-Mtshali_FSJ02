import "./styles/globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

export const metadata = {
  title: "MaxiMart",
  description:
    "Your one-stop shop for the best products at unbeatable prices. Browse through our collection of fashion, electronics, and more.",
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

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-48x48.png"
          sizes="48x48"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-gray-100">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
