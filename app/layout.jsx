import "./styles/globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
