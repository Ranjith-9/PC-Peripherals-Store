import Providers from "@/providers/Provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Providers>{children}</Providers>
    </>
  );
}
