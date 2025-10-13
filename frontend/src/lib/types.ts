export type productStatus = "ACTIVE" | "INACTIVE" | "DRAFT";

export interface Product {
  id: number;
  name: string;
  costPrice: number;
  salesPrice: number;
  stockMin: number;
  stockMax: number;
  currentStock: number;
  productStatus: productStatus;
  category: string;
}

export interface CreateProductRequest {
  name: string;
  costPrice: number;
  salesPrice: number;
  stockMin: number;
  stockMax: number;
  currentStock: number;
  productStatus: string;
  category: string;
}

export interface UpdateProductRequest {
  name?: string;
  costPrice?: number;
  salesPrice?: number;
  stockMin?: number;
  stockMax?: number;
  currentStock?: number;
  productStatus?: string;
  category?: string;
}
