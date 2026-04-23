import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

// GET all users
export async function GET() {
  const users = await prisma.user.findMany({
    orderBy: { id: "desc" },
  });

  const safeUsers = users.map(({ password, ...user }) => user);

  return Response.json(safeUsers);
}

// CREATE user
export async function POST(req) {
  const body = await req.json();

  if (!body.email || !body.password) {
    return Response.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  const hashed = await bcrypt.hash(body.password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashed,
      },
    });

    const { password, ...safeUser } = user;
    return Response.json(safeUser);

  } catch (error) {
    return Response.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }
}