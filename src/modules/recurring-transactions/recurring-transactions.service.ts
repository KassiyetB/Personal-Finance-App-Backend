import { prisma } from "#/lib/prisma.js";

interface CreateRecurringTransactionInput {
    userId: string;
    categoryId: string;
    type: "INCOME" | "EXPENSE";
    name: string;
    amount: number;
    intervalMonths: number;
    startDate: Date;
    endDate?: Date;
}

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