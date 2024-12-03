export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description?: string; // Campos opcionales
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}
