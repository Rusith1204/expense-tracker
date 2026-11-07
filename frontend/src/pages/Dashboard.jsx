import {
  Bell,
  CalendarDays,
  Search,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import SummaryCard from "../components/SummaryCard";
import ExpenseChart from "../components/ExpenseChart";
import CategoryChart from "../components/CategoryChart";
import TransactionTable from "../components/TransactionTable";

function Dashboard() {
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
          <SummaryCard
            title="Total Balance"
            amount="Rs. 65,000"
            change="+12.5%"
            type="balance"
          />

          <SummaryCard
            title="Total Income"
            amount="Rs. 100,000"
            change="+8.2%"
            type="income"
          />

          <SummaryCard
            title="Total Expenses"
            amount="Rs. 35,000"
            change="-3.4%"
            type="expense"
          />
        </section>

        <section className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <ExpenseChart />
          </div>

          <CategoryChart />
        </section>

        <section>
          <TransactionTable />
        </section>

        <footer className="mt-8 border-t border-slate-800 pt-5 text-center text-xs text-slate-600">
          ExpenseFlow © 2026. Personal Finance Tracker.
        </footer>
      </main>
    </div>
  );
}

export default Dashboard;