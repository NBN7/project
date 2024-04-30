import { checkUserSession } from "@/utils/user/checkUserSession";

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import { NextRequest } from "next/server";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    const { user } = params;

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

    const switchTheme = await prisma.user.update({
      data: {
        theme: userExists.theme === "DARK" ? "LIGHT" : "DARK",
      },
      where: {
        id: user,
      },
    });

    return NextResponse.json(switchTheme);
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
