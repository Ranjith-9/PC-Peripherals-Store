import { requireAdmin } from "@/lib/admin";

export async function GET() {
  const session = await requireAdmin();

  if (!session) {
    return Response.json({ admin: false }, { status: 403 });
  }

  return Response.json({
    admin: true,
    userId: session.user.id,
  });
}
