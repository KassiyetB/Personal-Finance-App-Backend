import { prisma } from "#/lib/prisma.js";

interface CreateTransactionInput {
  userId: string;
  categoryId: string;
  type: "INCOME" | "EXPENSE";
  name: string;
  amount: number;
  date: Date;
}

export async function createTransaction(
  data: CreateTransactionInput
) {
  return prisma.transaction.create({
    data: {
      userId: data.userId,
      categoryId: data.categoryId,
      type: data.type,
      name: data.name,
      amount: data.amount,
      date: data.date,
      source: "MANUAL",
    },
  });
}

export async function getTransactions(
  userId: string
) {
  return prisma.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      category: true,
    },
  });
}