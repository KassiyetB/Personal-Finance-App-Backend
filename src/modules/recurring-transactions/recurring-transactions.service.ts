import { prisma } from "#/lib/prisma.js";
import type { CreateRecurringTransactionInput } from "./recurring-transactions.schema.js"

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