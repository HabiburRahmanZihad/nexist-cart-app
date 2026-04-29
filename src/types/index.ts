export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  badge?: "Best Seller" | "New" | "Sale" | "Hot";
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export type Category =
  | "All"
  | "Electronics"
  | "Fashion"
  | "Home"
  | "Sports"
  | "Books";
