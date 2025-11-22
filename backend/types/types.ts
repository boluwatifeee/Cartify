export interface Review {
  id?: string;
  user: string;
  name: string;
  rating: number;
  comment: string;
  date?: string;
}

export interface Product {
  id?: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  reviews: Review[];
  countInStock?: number;
}
