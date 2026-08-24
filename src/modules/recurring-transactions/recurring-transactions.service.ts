import { prisma } from "#/lib/prisma.js";
import type { CreateRecurringTransactionInput, UpdateRecurringTransactionInput } from "./recurring-transactions.schema.js"

export async function createRecurringTransaction(
    data: CreateRecurringTransactionInput
) {
    return prisma.recurringTransaction.create({
        data: {
            userId: data.userId,
            categoryId: data.categoryId,
            type: data.type,
            name: data.name,
            amount: data.amount,
            intervalMonths: data.intervalMonths,
            startDate: data.startDate,
            ...(data.endDate !== undefined && {
            endDate: data.endDate,
            })
        },
    });
}

export async function getRecurringTransactions(
    userId: string,
) {
    return prisma.recurringTransaction.findMany({
        where:{
            userId
        },
        include:{
            category: true
        },
        orderBy: {
            startDate: "asc"
        }
    })
}

export async function getRecurringTransactionById(
    id: string,
    userId: string    
) {
    return prisma.recurringTransaction.findFirst({
        where:{
            id,
            userId
        },
        include:{
            category: true
        }
    })
}

export async function updateRecurringTransaction(
    id: string,
    userId: string,
    data: UpdateRecurringTransactionInput
) {
    const existingRecurringTransaction =
    await prisma.recurringTransaction.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingRecurringTransaction) {
        return null;
    }

    const startDate =
        data.startDate ?? existingRecurringTransaction.startDate;

    const endDate =
        data.endDate ?? existingRecurringTransaction.endDate;

    if (endDate && endDate < startDate) {
        throw new Error(
        "endDate must be after startDate",
        );
    }

    return prisma.recurringTransaction.update({
        where: {
        id,
        },
        data: {
        ...(data.categoryId !== undefined && {
            categoryId: data.categoryId,
        }),

        ...(data.type !== undefined && {
            type: data.type,
        }),

        ...(data.name !== undefined && {
            name: data.name,
        }),

        ...(data.amount !== undefined && {
            amount: data.amount,
        }),

        ...(data.intervalMonths !== undefined && {
            intervalMonths: data.intervalMonths,
        }),

        ...(data.startDate !== undefined && {
            startDate: data.startDate,
        }),

        ...(data.endDate !== undefined && {
            endDate: data.endDate,
        }),

        ...(data.active !== undefined && {
            active: data.active,
        }),
        },

        include: {
        category: true,
        },
    });
}