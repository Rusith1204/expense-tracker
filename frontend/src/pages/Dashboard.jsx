import { useEffect, useState } from "react";
import { Bell, CalendarDays, Search } from "lucide-react";

import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import ExpenseChart from "../components/ExpenseChart";
import CategoryChart from "../components/CategoryChart";
import TransactionTable from "../components/TransactionTable";

import { getTransactions } from "../services/transactionService";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const totalIncome = transactions
  .filter((transaction) => transaction.type === "income")
  .reduce((total, transaction) => total + Number(transaction.amount), 0);

const totalExpenses = transactions
  .filter((transaction) => transaction.type === "expense")
  .reduce((total, transaction) => total + Number(transaction.amount), 0);

const totalBalance = totalIncome - totalExpenses;

const formatCurrency = (amount) =>
  `Rs. ${amount.toLocaleString("en-US")}`;

  return (
    <div className="flex min-h-screen bg-[#090e1a] text-white">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1 p-5 md:p-8">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Welcome back!</p>
            <h1 className="mt-1 text-2xl font-bold text-white md:text-3xl">
              Dashboard
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Here's what's happening with your finances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-[#111b2d] px-4 py-3 text-sm text-slate-400 sm:flex">
              <Search size={17} />
              <span>Search...</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#111b2d] p-3 text-slate-400">
              <Bell size={19} />
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
              R
            </div>
          </div>
        </header>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">
            Financial Overview
          </h2>

          <div className="flex items-center gap-2 rounded-xl border border-slate-800 bg-[#111b2d] px-3 py-2 text-xs text-slate-400">
            <CalendarDays size={15} />
            November 2026
          </div>
        </div>

        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
  <SummaryCard
    title="Total Balance"
    amount={formatCurrency(totalBalance)}
    change="Live data"
    type="balance"
  />

  <SummaryCard
    title="Total Income"
    amount={formatCurrency(totalIncome)}
    change="Live data"
    type="income"
  />

  <SummaryCard
    title="Total Expenses"
    amount={formatCurrency(totalExpenses)}
    change="Live data"
    type="expense"
  />
</section>
        </section>

        <section className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ExpenseChart />
          </div>

          <CategoryChart />
        </section>

        <section>
          {loading ? (
            <div className="rounded-2xl border border-slate-800 bg-[#111b2d] p-8 text-center text-slate-400">
              Loading transactions...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-500/30 bg-[#111b2d] p-8 text-center text-rose-400">
              {error}
            </div>
          ) : (
            <TransactionTable transactions={transactions} />
          )}
        </section>

        <footer className="mt-8 border-t border-slate-800 pt-5 text-center text-xs text-slate-600">
          ExpenseFlow © 2026. Personal Finance Tracker.
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;