import { NextRequest, NextResponse } from "next/server";
import { checkProducts } from "@/services/product";
import { decrementStock, setOrders } from "@/services/order";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const productIds = data.cartItems.map((item: any) => item.productId);

    const products = await checkProducts(productIds);

    const productMap = new Map(
      products.map((product: any) => [product.id, product]),
    );

    for (const item of data.cartItems) {
      const product: any = productMap.get(item.productId);
      const subTotalClient = item.quantity * item.price;

      if (!product) {
        return NextResponse.json(
          { error: "product doesnt exist" },
          { status: 400 },
        );
      }

      const subTotalServer = item.quantity * product.price;

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: "product out of stock" },
          { status: 400 },
        );
      }

      if (subTotalClient !== subTotalServer) {
        return NextResponse.json(
          { error: "Product price mismatch" },
          { status: 400 },
        );
      }
    }

    const result = await db.$transaction(
      async (tx: Prisma.TransactionClient) => {
        const order = await setOrders(
          tx,
          session.user.id,
          data,
          data.cartItems,
        );
        await decrementStock(tx, data.cartItems);

        return order;
      },
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
