import { NextRequest, NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { checkProducts } from "@/services/product";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  console.log("session object from server", session);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();

  const productIds = data.cartItems.map((item: any) => item.productId);

  const products = await checkProducts(productIds);

  const productMap = new Map(
    products.map((product: any) => [product.id, product])
  );

  for (const item of data.cartItems) {
    const product: any = productMap.get(item.productId);
    const subTotalClient = item.quantity * item.price;

    if (!product) {
      return NextResponse.json(
        { error: "product doesnt exist" },
        { status: 400 }
      );
    }

    const subTotalServer = item.quantity * product.price;

    if (product.stock < item.quantity) {
      return NextResponse.json(
        { error: "product out of stock" },
        { status: 400 }
      );
    }

    if (subTotalClient !== subTotalServer) {
      return NextResponse.json(
        { error: "Product price mismatch" },
        { status: 400 }
      );
    }
  }

  const options = {
    amount: data.totalAmount * 100,
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  };

  const order = await razorpay.orders.create(options);

  console.log("order from backend", order);

  return NextResponse.json(order);
}
