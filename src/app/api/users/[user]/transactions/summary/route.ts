import { checkUserSession } from "@/utils/checkUserSession";

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
      where: {
        id: user,
      },
    });
    if (!userExists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const year = new Date().getFullYear();
    const transactions = await prisma.transaction.groupBy({
      where: {
        userId: user,
        date: {
          gte: `${year}-01-01`,
          lte: `${year}-12-31`,
        },
      },
      by: ["type", "date"],
      _sum: {
        amount: true,
      },
    });

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const summary = Array.from({ length: 12 }, (_, i) => ({
      month: monthNames[i],
      income: 0,
      expense: 0,
    }));

    transactions.forEach((transaction) => {
      const monthIndex = parseInt(transaction.date.split("-")[1], 10) - 1;
      if (transaction.type === "income") {
        summary[monthIndex].income += transaction._sum.amount || 0;
      } else {
        summary[monthIndex].expense += transaction._sum.amount || 0;
      }
    });

    return NextResponse.json(summary);
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
