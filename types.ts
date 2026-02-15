
export type ViewId = 'home' | 'shop' | 'product' | 'lookbook' | 'custom' | 'about';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage?: string; // New property for image swap effect
  color: string;
  description?: string;
  features?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
