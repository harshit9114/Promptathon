import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cacao Noir | Future of Freshness",
  description: "Premium Scrollytelling e-commerce for Cacao Noir juice.",
};

import { AppProvider } from "@/context/AppContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
