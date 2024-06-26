import "slick-carousel/slick/slick.css";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "./css/globals.css";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title:{
    template:"shopping_mart",
    default:"Hart Mart - A place for all",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-bodyFont w-full bg-main-bg text-darkText">
        <Layout>
          <Header />
          {children}
          <Footer />
        </Layout>
      </body>
    </html>
  );
}
