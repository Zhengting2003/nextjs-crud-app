import { prisma } from "@/lib/prisma";

export async function PUT(req, { params }) {
  const { id } = await params;

  const body = await req.json();

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: {
      email: body.email,
    },
  });

  return Response.json(user);
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  const userId = Number(id);

  if (!userId) {
    return Response.json(
      { error: "Invalid ID" },
      { status: 400 }
    );
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  return Response.json({ message: "Deleted" });
}