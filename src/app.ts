import express from "express";
const app = express();

import transactionRoutes from '#/modules/transactions/transaction.routes.js'
import recurringTransactionRoutes from '#/modules/recurring-transactions/recurring-transactions.routes.js'

// Middelware
app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/recurring-transactions", recurringTransactionRoutes);

export default app;