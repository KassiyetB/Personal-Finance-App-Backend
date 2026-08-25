import { prisma } from "#/lib/prisma.js";

export async function generateTransactionsForMonth(
  userId: string,
  year: number,
  month: number,
) {
  const recurringTransactions =
  await prisma.recurringTransaction.findMany({
    where: {
      userId,
      active: true,
    },
  });

  const targetMonth = new Date(
    year,
    month - 1,
    1,
  );

  for (const recurring of recurringTransactions) {
    const startDate = recurring.startDate;

    const monthDifference = getMonthDifference(startDate, targetMonth);

    // If the requested month is before the recurring transaction started, ignore it.
    if (monthDifference < 0) {
      continue;
    }

    // Find out, if we generate for the target month or not according to the interval Month
    if (monthDifference % recurring.intervalMonths !== 0) {
      continue;
    }

    // Check the end date, to make sure, if we generate or not
    if (recurring.endDate && targetMonth > recurring.endDate) {
      continue;
    }

    const transactionDate = new Date(
      Date.UTC(
        year,
        month - 1,
        recurring.startDate.getUTCDate(),
      ),
    );

    // Prevent duplicates, check if the generating transaction already exists for same date
    const existingTransaction =
      await prisma.transaction.findFirst({
        where: {
          recurringTransactionId: recurring.id,
          date: transactionDate,
        },
      });

    if (existingTransaction) {
      continue;
    }

    // If everything is passed
    await prisma.transaction.create({
      data: {
        userId: recurring.userId,
        categoryId: recurring.categoryId,
        recurringTransactionId: recurring.id,
        type: recurring.type,
        name: recurring.name,
        amount: recurring.amount,
        date: transactionDate,
        source: "RECURRING",
      },
    });
  }
}

function getMonthDifference(
  startDate: Date,
  targetDate: Date,
) {
  return (
    (targetDate.getFullYear() - startDate.getFullYear()) * 12 +
    (targetDate.getMonth() - startDate.getMonth())
  );
}