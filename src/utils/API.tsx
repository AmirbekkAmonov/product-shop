import { Product, ProductsResponse } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

export const getProducts = async (limit: number = 12, skip: number = 0): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error('Mahsulotlar yuklanmadi');
  }
  return response.json();
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('Mahsulot topilmadi');
  }
  return response.json();
};
