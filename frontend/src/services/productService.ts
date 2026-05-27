import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
  ApiResponse,
} from "../types/product.types";

const BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api/products";

const handleRes = async <T>(res: Response): Promise<T> => {
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

export const productService = {
  getAll: () =>
    fetch(BASE_URL).then((r) => handleRes<ApiResponse<Product[]>>(r)),

  create: (data: CreateProductDTO) =>
    fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => handleRes<ApiResponse<Product>>(r)),

  update: (id: string, data: UpdateProductDTO) =>
    fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => handleRes<ApiResponse<Product>>(r)),

  delete: (id: string) =>
    fetch(`${BASE_URL}/${id}`, { method: "DELETE" }).then((r) =>
      handleRes<ApiResponse<null>>(r),
    ),
};
