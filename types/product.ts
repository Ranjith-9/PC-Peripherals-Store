export interface ProductAttributes {
  dpi: string;
  rgb: boolean;
  brand: string;
  weight: string;
  connectivity: string;
}

export interface Product {
  name: string;
  id: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  createdAt: Date;
  attributes: string | number | boolean | null;
  slug: string | null;
  isActive: boolean | null;
}
