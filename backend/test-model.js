const Transaction = require("./models/Transaction");

async function testValidation() {
    const transaction = new Transaction({
        type: "expense",
        amount: 500,
        category: "Food",
        description: "Lunch"
    });

    try {
        await transaction.validate();
        console.log("Validation successful!");
    } catch (error) {
        console.log("Validation failed:", error.message);
    }
}

testValidation();