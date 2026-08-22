import dotenv from 'dotenv';
dotenv.config();

import express from "express";
const app = express();

// Middelware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});