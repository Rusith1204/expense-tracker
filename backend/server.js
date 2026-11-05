
const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
require("dotenv").config();

const Transaction = require("./models/Transaction");

const app = express();
const PORT = 5000;

// DNS configuration
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Middleware
app.use(express.json());

// Root API
app.get("/", (req, res) => {
    res.send("Expense Tracker Backend is running successfully!");
});

// POST - Create Transaction
app.post("/api/transactions", async (req, res) => {
    const { type, amount, category, description } = req.body;

    if (type !== "income" && type !== "expense") {
        return res.status(400).json({
            message: "Type must be income or expense"
        });
    }

    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({
            message: "Amount must be a positive number"
        });
    }

    if (typeof category !== "string" || category.trim() === "") {
        return res.status(400).json({
            message: "Category is required"
        });
    }

    if (typeof description !== "string") {
        return res.status(400).json({
            message: "Description must be a string"
        });
    }

    try {
        const transaction = new Transaction({
            type,
            amount,
            category: category.trim(),
            description
        });

        await transaction.save();

        return res.status(201).json({
            message: "Transaction saved successfully",
            data: transaction
        });

    } catch (error) {
        console.error("Transaction save failed:", error);

        return res.status(500).json({
            message: "Failed to save transaction"
        });
    }
});

// GET - All Transactions
app.get("/api/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            message: "Transactions retrieved successfully",
            data: transactions
        });

    } catch (error) {
        console.error("Failed to retrieve transactions:", error);

        return res.status(500).json({
            message: "Failed to retrieve transactions"
        });
    }
});

// GET - Transaction by ID
app.get("/api/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid transaction ID"
            });
        }

        const transaction = await Transaction.findById(id);

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        return res.status(200).json({
            message: "Transaction retrieved successfully",
            data: transaction
        });

    } catch (error) {
        console.error("Failed to retrieve transaction:", error);

        return res.status(500).json({
            message: "Failed to retrieve transaction"
        });
    }
});

// PUT - Update Transaction
app.put("/api/transactions/:id", async (req, res) => {
    const { id } = req.params;
    const { type, amount, category, description } = req.body;

    // Validate transaction ID
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({
            message: "Invalid transaction ID"
        });
    }

    // Validate transaction type
    if (type !== "income" && type !== "expense") {
        return res.status(400).json({
            message: "Type must be income or expense"
        });
    }

    // Validate amount
    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({
            message: "Amount must be a positive number"
        });
    }

    // Validate category
    if (typeof category !== "string" || category.trim() === "") {
        return res.status(400).json({
            message: "Category is required"
        });
    }

    // Validate description
    if (typeof description !== "string") {
        return res.status(400).json({
            message: "Description must be a string"
        });
    }

    try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            {
                type,
                amount,
                category: category.trim(),
                description
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedTransaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        return res.status(200).json({
            message: "Transaction updated successfully",
            data: updatedTransaction
        });

    } catch (error) {
        console.error("Transaction update failed:", error);

        return res.status(500).json({
            message: "Failed to update transaction"
        });
    }
});

// DELETE - Delete Transaction
app.delete("/api/transactions/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Validate transaction ID
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid transaction ID"
            });
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).json({
                message: "Transaction not found"
            });
        }

        return res.status(200).json({
            message: "Transaction deleted successfully",
            data: deletedTransaction
        });

    } catch (error) {
        console.error("Transaction delete failed:", error);

        return res.status(500).json({
            message: "Failed to delete transaction"
        });
    }
});

// Start server after successful MongoDB connection
async function startServer() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("MongoDB connection failed!");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code || "Not available");

        process.exit(1);
    }
}

startServer();
