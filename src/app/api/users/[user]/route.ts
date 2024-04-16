import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import { NextRequest } from "next/server";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { user } = params;

    const session = await getServerSession(authOptions);
    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userExists = await prisma.user.findUnique({
      where: { id: user },
    });
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const deletedUser = await prisma.user.delete({
      where: { id: user },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
