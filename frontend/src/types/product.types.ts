export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  quantity: number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
