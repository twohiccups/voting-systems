import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import 'flag-icons/css/flag-icons.min.css'; // <-- global import
import { Footer } from "./components/Footer";

const inter = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400"],
});



export const metadata: Metadata = {
  title: "Voting Systems",
  description: "Browse and compare different voting systems — from plurality to proportional representation. Learn how elections shape outcomes and power.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${inter.variable}  antialiased space-y-6`}
      >
        {children}
        <Footer />
      </body>


    </html>
  );
}
