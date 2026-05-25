export interface ProductAttributes {
  dpi: string;
  rgb: boolean;
  brand: string;
  weight: string;
  connectivity: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
  attributes: ProductAttributes;
  createdAt: Date;
}
