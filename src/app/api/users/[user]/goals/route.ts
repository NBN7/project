import { checkUserSession } from "@/utils/user/checkUserSession";

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import { NextRequest } from "next/server";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: NextRequest, { params }: { params: Params }) {
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

    const goals = await prisma.goal.findMany({
      where: { userId: user },
      orderBy: { startDate: "desc" },
      select: {
        id: true,
        title: true,
        description: true,
        amount: true,
        savedAmount: true,
        startDate: true,
        dueDate: true,
        completed: true,
      },
    });

    // update saved amount for each goal
    goals.forEach(async (goal) => {
      const transactionSum = await prisma.transaction.aggregate({
        where: {
          userId: user,
          date: {
            gte: goal.startDate.toISOString(),
            lte: goal.dueDate.toISOString(),
          },
          type: "income",
        },
        _sum: {
          amount: true,
        },
      });

      const newSavedAmount = transactionSum._sum.amount || 0;

      if (newSavedAmount !== goal.savedAmount) {
        await prisma.goal.update({
          where: { id: goal.id },
          data: { savedAmount: newSavedAmount },
        });
      }
    });

    return NextResponse.json(goals);
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

export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
  } catch (error) {}
}
