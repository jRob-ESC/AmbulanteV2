import { z } from "zod";
import { CATEGORIAS } from "../components/ProductForm"

const Price = z
  .string()
  .min(1, { error: "El precio es obligatorio" })
  .pipe(
    z.transform((val) => Number(val))
  )
  .pipe(
    z.number().gt(0, { error: "El precio debe ser mayor a 0" })
  );

export const productSchema = z.object({
    name: z.string()
        .min(1, "El nombre es obligatorio"),

    price: Price,

    category: z.enum(CATEGORIAS, {
        error: "Selecciona una categoria"
    }),
})

export type productRequest = z.infer<typeof productSchema>;