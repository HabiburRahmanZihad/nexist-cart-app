import { CartSidebar } from "@/components/cart/CartSidebar";
import { WishlistSidebar } from "@/components/wishlist/WishlistSidebar";
import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ReduxProvider } from "@/providers/ReduxProvider";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nexist — Scalable LMS & Cutting-Edge Software",
    template: "%s — Nexist",
  },
  description:
    "Nexist builds scalable Learning Management Systems and cutting-edge custom software for businesses and educators worldwide. Empowering digital transformation through innovative technology.",
  keywords: ["LMS", "custom software", "e-learning", "digital transformation", "Next.js", "TypeScript"],
  icons: {
    icon: "https://res.cloudinary.com/dvq3pcykn/image/upload/v1777486297/logo_vnhpx6.jpg",
    apple: "https://res.cloudinary.com/dvq3pcykn/image/upload/v1777486297/logo_vnhpx6.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} dark h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col bg-background">
        <ReduxProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartSidebar />
          <WishlistSidebar />
          <Toaster position="bottom-right" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
