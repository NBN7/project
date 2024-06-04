import { checkUserSession } from "@/utils/user/checkUserSession";

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import { NextRequest } from "next/server";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { TransactionType } from "@prisma/client";

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
        amount: true,
        savedAmount: true,
        startDate: true,
        dueDate: true,
        completed: true,
      },
    });

    // delete goal if due date has passed and goal is not completed
    for (const goal of goals) {
      if (goal.dueDate < new Date() && !goal.completed) {
        await prisma.goal.delete({ where: { id: goal.id } });
      }
    }

    // update saved amount for each goal
    for (const goal of goals) {
      const transactionSum = await prisma.transaction.aggregate({
        where: {
          userId: user,
          isForGoal: true,
          goalId: goal.id,
          date: {
            gte: goal.startDate.toISOString(),
            lte: goal.dueDate.toISOString(),
          },
          type: TransactionType.income,
        },
        _sum: {
          amount: true,
        },
      });

      const newSavedAmount = transactionSum._sum.amount || 0;

      // update goal if saved amount has changed
      await prisma.goal.update({
        where: { id: goal.id },
        data: {
          completed: newSavedAmount >= goal.amount,
          savedAmount:
            newSavedAmount !== goal.savedAmount && !goal.completed
              ? newSavedAmount
              : undefined,
        },
      });
    }

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
    const { title, amount, startDate, dueDate } = await req.json();
    const { user } = params;

    const sessionCheck = await checkUserSession(user);
    if (!sessionCheck.isValid) {
      return sessionCheck.response;
    }

    // buscar transacciones de ingreso entre startDate y dueDate
    const transactionSum = await prisma.transaction.aggregate({
      where: {
        userId: user,
        date: {
          gte: startDate,
          lte: dueDate,
        },
        type: TransactionType.income,
      },
      _sum: {
        amount: true,
      },
    });

    const newGoal = await prisma.goal.create({
      data: {
        userId: user,
        title,
        amount,
        startDate,
        dueDate,
        savedAmount: transactionSum._sum.amount || 0,
      },
    });

    return NextResponse.json(newGoal);
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
