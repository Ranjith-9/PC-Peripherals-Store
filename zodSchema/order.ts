import { z } from "zod";

export const CreateOrderSchema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  addressLine1: z.string().min(5),
  addressLine2: z.string().optional(),
  phone: z.string().regex(/^[0-9]{10}$/),
  city: z.string().min(2),
  state: z.string().min(2),
  postalCode: z.string().length(6),
  isDefault: z.boolean(),
});

export const IncreaseItemZod = z.object({
  productId: z.string(),
  currentQuantity: z.number(),
});
