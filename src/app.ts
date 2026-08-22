import express from "express";
const app = express();

import transactionRoutes from '#/modules/transactions/transaction.routes.js'

// Middelware
app.use(express.json());

app.use("/api/transactions", transactionRoutes);

export default app;