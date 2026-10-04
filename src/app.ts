import express from "express";
const app = express();

import transactionRoutes from "#/modules/transactions/transaction.routes.js"
import recurringTransactionRoutes from "#/modules/recurring-transactions/recurring-transactions.routes.js"
import categoryRoutes from '#/modules/categories/categories.routes.js'
import userRoutes from '#/modules/auth/auth.routes.js'
import cors from "cors"

// Middelware
app.use(cors({
    origin: "http://localhost:5173",
}))
app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/recurring-transactions", recurringTransactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", userRoutes);

export default app;