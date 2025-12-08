import { UIOption } from "@/app/types/ui";
import axiosClient from "./axiosClient";
import { BASE_URL } from "./base";

export const fetchProducts = async (): Promise<UIOption[]> => {
  const res = await axiosClient.get("/");
  return res.data.products.map((p: any) => ({
    label: p.title,
    value: p.id,
  }));
};

export const searchProductOptions = async (
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<UIOption[]> => {
  if (!query) return [];
  const skip = (page - 1) * limit;

  const res = await axiosClient.get(`/search?q=${query}&limit=${limit}&skip=${skip}`);

  return (
    res.data?.products?.map((p: any) => ({
      label: p.title,
      value: p.id,
    })) ?? []
  );
};

export const searchProducts = async (
  query: string,
  page: number = 1,
  limit: number = 10
): Promise<{ products: any[]; total: number }> => {
  const skip = (page - 1) * limit;

  const res = await axiosClient.get(`/search?q=${query}&limit=${limit}&skip=${skip}`);

  return {
    products: res.data?.products ?? [],
    total: res.data?.total ?? 0,
  };
};
