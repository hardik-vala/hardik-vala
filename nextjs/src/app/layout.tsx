import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from "next";
import { Literata, Roboto } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const literata = Literata({
  variable: "--font-literata",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hardik Vala",
  description: "Technical founder. YC S23, ex-Google, ex-Apple.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navigationItems = [
    { name: "Blog", link: "/blog" },
    { name: "Projects", link: "/projects" },
  ];

  return (
    <html lang="en">
      <body className={`${roboto.variable} ${literata.variable}`}>
        <div className="flex justify-center">
          <div className="w-[90%] justify-left md:w-[60%]">
            <header className="flex items-center text-md">
              <Navigation navigationItems={navigationItems} />
            </header>
            <main>{children}</main>
            <Footer />
            <Analytics />
          </div>
        </div>
      </body>
    </html>
  );
}
