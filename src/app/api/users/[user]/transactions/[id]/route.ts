import { checkUserSession } from "@/utils/user/checkUserSession";

import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

import { NextRequest } from "next/server";
import type { Params } from "next/dist/shared/lib/router/utils/route-matcher";

import { TransactionType } from "@prisma/client";

export async function GET(req: NextRequest, { params }: { params: Params }) {
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

    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
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

    const transactionExists = await prisma.transaction.findUnique({
      where: { id },
    });
    if (!transactionExists) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    // if the transaction is an income decrement the user's balance
    if (transactionExists.type === TransactionType.income) {
      await prisma.user.update({
        where: { id: user },
        data: {
          balance: {
            decrement: transactionExists.amount,
          },
        },
      });
    }

    // if the transaction is an expense increment the user's balance
    if (transactionExists.type === TransactionType.expense) {
      await prisma.user.update({
        where: { id: user },
        data: {
          balance: {
            increment: transactionExists.amount,
          },
        },
      });
    }

    await prisma.transaction.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Transaction deleted" });
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
