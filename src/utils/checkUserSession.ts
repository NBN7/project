// this is a function to check if the user is logged
// and if the user is the same as the user in the session

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const checkUserSession = async (userId: string) => {
  const session = await getServerSession(authOptions);
  if (!session || session.user.id !== userId) {
    return {
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
      isValid: false,
    };
  }
  return { isValid: true };
};
