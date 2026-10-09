const express = require("express"); // Express tool එක ගන්න
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();        // ඒකෙන් අපේ backend app එක හදන්න

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

app.post("/api/transactions", (req, res) => {
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

    res.status(200).json({
        message: "Transaction validated successfully",
        data: { type, amount, category, description }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});