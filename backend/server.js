const express = require("express"); // Express tool එක ගන්න
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();        // ඒකෙන් අපේ backend app එක හදන්න
const Transaction = require("./models/Transaction");

// Incoming JSON data read කරන්න
app.use(express.json());            
const PORT = 5000;

const dns = require("dns");
dns.setServers(["8.8.8.8"]);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });


app.get("/", (req, res) => {
    res.send("Expense Tracker Backend is running successfully!");
});

app.post("/api/transactions", async (req, res) => {
    const { type, amount, category, description } = req.body;

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
    const transaction = new Transaction({
        type,
        amount,
        category,
        description
    });

    await transaction.save();

    res.status(201).json({
        message: "Transaction saved successfully",
        data: transaction
    });

} catch (error) {
    console.error("Transaction save failed:", error.message);

    res.status(500).json({
        message: "Failed to save transaction"
    });
}
});
app.get("/api/transactions", async (req, res) => {
    try {
        const transactions = await Transaction.find();

        res.status(200).json({
            message: "Transactions retrieved successfully",
            data: transactions
        });

    } catch (error) {
        console.error("Failed to retrieve transactions:", error.message);

        res.status(500).json({
            message: "Failed to retrieve transactions"
        });
    }
});

app.get("/api/transactions/:id", async (req, res) => {
    try {
        const id = req.params.id;

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

        res.status(200).json({
            message: "Transaction retrieved successfully",
            data: transaction
        });

    } catch (error) {
        console.error("Failed to retrieve transaction:", error.message);

        res.status(500).json({
            message: "Failed to retrieve transaction"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});