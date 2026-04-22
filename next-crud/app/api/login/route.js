import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const valid = await bcrypt.compare(body.password, user.password);

  if (!valid) {
    return Response.json({ error: "Wrong password" }, { status: 401 });
  }

  return Response.json({
    message: "Login success",
    user: { id: user.id, email: user.email },
  });
}