import { checkUserSession } from "@/utils/user/checkUserSession";

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import { NextRequest } from "next/server";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { user, id } = params;

    const sessionCheck = await checkUserSession(user);
    if (!sessionCheck.isValid) {
      return sessionCheck.response;
    }

    const userExists = await prisma.user.findUnique({
      where: { id: user },
    });
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const goalExists = await prisma.goal.findUnique({
      where: { id },
    });
    if (!goalExists) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    const deletedGoal = await prisma.goal.delete({
      where: { id },
    });

    return NextResponse.json(deletedGoal);
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
