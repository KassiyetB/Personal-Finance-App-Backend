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
  userId: string,
  month?: string
) {
  let dateFilter = {};

  if (month) {
    const start = new Date(`${month}-01T00:00:00.000Z`);

    const end = new Date(start);
    end.setUTCMonth(end.getUTCMonth() + 1);

    dateFilter = {
      date: {
        gte: start, // greater or equal
        lt: end, // less than
      },
    };
  }

  return prisma.transaction.findMany({
    where: {
      userId,
      ...dateFilter,
    },

    orderBy: {
      date: "desc",
    },

    include: {
      category: true,
    },
  });
}

export async function getTransactionById(
  id: string,
  userId: string,
) {
  return prisma.transaction.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      category: true,
    },
  });
}

interface UpdateTransactionInput {
  type?: "INCOME" | "EXPENSE";
  name?: string;
  amount?: number;
  date?: Date;
  categoryId?: string;
}

export async function updateTransaction(
  id: string,
  userId: string,
  data: UpdateTransactionInput
) {
  const existingTransaction = await prisma.transaction.findFirst({
    where: {
      id,
      userId
    },
  });

  if (!existingTransaction) {
    return null;
  }

  return prisma.transaction.update({
    where: {
      id,
    },
    data: {
      ...(data.type !== undefined && {
        type: data.type,
      }),
      ...(data.name !== undefined && {
        name: data.name,
      }),
      ...(data.amount !== undefined && {
        amount: data.amount,
      }),
      ...(data.date !== undefined && {
        date: data.date,
      }),
      ...(data.categoryId !== undefined && {
        categoryId: data.categoryId,
      }),
    },
    include: {
      category: true,
    },
  });

}