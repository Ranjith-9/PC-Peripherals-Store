import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";

export async function setOrders(
  tx: Prisma.TransactionClient,
  userId: string,
  data: any,
  cartItems: any,
) {
  return await tx.order.create({
    data: {
      userId: userId,

      paymentMethod: data.paymentMethod,
      shippingMethod: data.shippingMethod,

      totalAmount: data.totalAmount,

      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,

      items: {
        create: cartItems.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.price,
          subtotal: item.price * item.quantity,
        })),
      },
    },
  });
}

export async function decrementStock(
  tx: Prisma.TransactionClient,
  cartItems: any[],
) {
  for (const item of cartItems) {
    await tx.product.update({
      where: { id: item.productId },
      data: {
        stock: {
          decrement: item.quantity,
        },
      },
    });
  }
}

export async function getOrders() {
  return await db.order.findMany({
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}
