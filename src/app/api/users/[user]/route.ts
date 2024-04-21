import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import { NextRequest } from "next/server";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { checkUserSession } from "@/utils/checkUserSession";

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { user } = params;

    const session = await getServerSession(authOptions);
    if (!session || session?.user.role !== "ADMIN") {
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

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  const session = await getServerSession(authOptions);

  const { user } = params;
  const { name, role } = await req.json();

  try {
    // if the user is not an admin they can only update their own name
    if (session?.user.role !== "ADMIN") {
      const sessionCheck = await checkUserSession(user);
      if (!sessionCheck.isValid) {
        return sessionCheck.response;
      }

      const updatedUser = await prisma.user.update({
        where: { id: user },
        data: { name },
      });

      return NextResponse.json(updatedUser);
    }

    // if the user is an admin they can update any user's name and role
    if (!session || session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userExists = await prisma.user.findUnique({
      where: { id: user },
    });
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: user },
      data: { name, role },
    });

    return NextResponse.json(updatedUser);
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
