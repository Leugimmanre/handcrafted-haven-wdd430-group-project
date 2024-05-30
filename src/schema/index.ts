import { z } from "zod";

export const SearchSchema = z.object({
  search: z
    .string()
    .trim()
    .min(1, { message: "The search cannot be empty" }),
});

export const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Product Name cannot be empty" }),
  price: z
    .string()
    .trim()
    .transform((value) => parseFloat(value))
    .refine((value) => value > 0, { message: "Invalid price" })
    .or(z.number().min(1, { message: "Category is Mandatory" })),
  description: z
    .string()
    .trim()
    .min(1, { message: "Description cannot be empty" }),
  categoryId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "Category is Mandatory" })
    .or(z.number().min(1, { message: "Category is Mandatory" })),
  artisanId: z
    .string()
    .trim()
    .transform((value) => parseInt(value))
    .refine((value) => value > 0, { message: "Artisan is Mandatory" })
    .or(z.number().min(1, { message: "Artisan is Mandatory" })),
  image: z.string().min(1, { message: "Image is mandatory" }),
});
