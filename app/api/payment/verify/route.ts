import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { decrementStock, setOrders } from "@/services/order";
import { checkProducts } from "@/services/product";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";
import { authOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, data } =
    await req.json();

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 400 },
    );
  }

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

  const result = await db.$transaction(async (tx: Prisma.TransactionClient) => {
    const order = await setOrders(tx, session.user.id, data, data.cartItems);
    await decrementStock(tx, data.cartItems);

    return order;
  });

  return NextResponse.json(result);
}
