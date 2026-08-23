/*
  Warnings:

  - A unique constraint covering the columns `[recurringTransactionId,date]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Transaction_recurringTransactionId_date_key" ON "Transaction"("recurringTransactionId", "date");
