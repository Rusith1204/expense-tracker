const express = require("express"); // Express tool එක ගන්න
const app = express();        // ඒකෙන් අපේ backend app එක හදන්න

// Incoming JSON data read කරන්න
app.use(express.json());            
const PORT = 5000;


app.get("/", (req, res) => {
    res.send("Expense Tracker API is running");
});

app.post("/api/transactions", (req, res) => {
    const transaction = req.body;

    console.log(transaction);

    res.json({
        message: "Transaction received successfully",
        data: transaction
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});