const express = require("express"); // Express tool එක ගන්න
const app = express();              // ඒකෙන් අපේ backend app එක හදන්න
const PORT = 5000;


app.get("/", (req, res) => {
    res.send("Expense Tracker API is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});