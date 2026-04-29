import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/shared/Navbar";
import { CartSidebar } from "@/components/cart/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nexist — Premium Shopping",
  description:
    "A curated collection of premium products. Add to cart, manage your selections, and shop with confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <ReduxProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <CartSidebar />
          <Toaster position="bottom-right" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
