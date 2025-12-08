import { Product } from "../types/ui";

export const columns: Array<{ key: keyof Product; label: string }> = [
  { key: "title", label: "Title" },
  { key: "brand", label: "Brand" },
  { key: "price", label: "Price" },
];