import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/providers/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { CartSidebar } from "@/components/cart/CartSidebar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
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
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <ReduxProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartSidebar />
          <Toaster position="bottom-right" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
