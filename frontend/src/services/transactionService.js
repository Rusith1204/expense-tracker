const API_URL = "/api/transactions";

export async function getTransactions() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to retrieve transactions");
  }

  const result = await response.json();

  return result.data;
}