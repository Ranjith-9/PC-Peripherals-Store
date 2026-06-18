import CheckOut from "@/components/CheckOut";
import { getAddress } from "@/services/product";
import type { Session } from "@/types/user";
import { getServerSession } from "next-auth/next";

export default async function CheckOutPage() {
  const session: Session | null = await getServerSession(); // Fetch session data on the server side
  const addresses = await getAddress(session?.user.email || ""); // Fetch addresses for the logged-in user
  return (
    <>
      <CheckOut session={session} addresses={addresses} />
    </>
  );
}
