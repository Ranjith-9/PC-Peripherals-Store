import type { Session } from "@/types/user";
import { getServerSession } from "next-auth/next";

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  //const session: Session | null = await getServerSession(); // Fetch session data on the server side

  return <>{children}</>;
}
