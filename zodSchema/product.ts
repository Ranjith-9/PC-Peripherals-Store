import { z } from "zod";

export const CartProductsSchema = z.object({
  ids: z.array(z.string()).min(1),
});
