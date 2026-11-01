import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        account: {
          select: {
            accountName: true,
          },
        },
      },
      orderBy: {
        transactionDate: "desc",
      },
      take: 5,
    });

    return NextResponse.json({
      success: true,
      data: transactions.map((transaction) => ({
        id: transaction.id,
        date: transaction.transactionDate,
        description: transaction.description,
        type: transaction.type,
        account: transaction.account.accountName,
        amount: transaction.amount.toString(),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch transactions:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch transactions.",
      },
      { status: 500 },
    );
  }
}