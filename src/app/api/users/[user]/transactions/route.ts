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

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: user,
      },
      select: {
        id: true,
        amount: true,
        type: true,
        description: true,
        date: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return NextResponse.json(transactions);
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
    const { description, type, amount, date } = await req.json();
    const { user } = params;

    const convertedAmount = Number(amount.toFixed(2));

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

    const transaction = await prisma.transaction.create({
      data: {
        userId: user,
        description,
        type,
        amount: convertedAmount,
        date,
      },
    });

    // sum or subtract the amount from the user's balance
    if (type === TransactionType.income) {
      await prisma.user.update({
        where: { id: user },
        data: {
          balance: {
            increment: convertedAmount,
          },
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user },
        data: {
          balance: {
            decrement: convertedAmount,
          },
        },
      });
    }

    return NextResponse.json(transaction);
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
