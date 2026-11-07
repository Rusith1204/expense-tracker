import {
  Utensils,
  Car,
  ShoppingBag,
  House,
  CircleDollarSign,
} from "lucide-react";

const transactions = [
  {
    id: 1,
    title: "Grocery Shopping",
    category: "Food",
    date: "Nov 06, 2026",
    amount: "- Rs. 5,500",
    type: "expense",
    icon: ShoppingBag,
  },
  {
    id: 2,
    title: "Monthly Salary",
    category: "Salary",
    date: "Nov 05, 2026",
    amount: "+ Rs. 100,000",
    type: "income",
    icon: CircleDollarSign,
  },
  {
    id: 3,
    title: "Lunch",
    category: "Food",
    date: "Nov 04, 2026",
    amount: "- Rs. 1,200",
    type: "expense",
    icon: Utensils,
  },
  {
    id: 4,
    title: "Bus & Taxi",
    category: "Transport",
    date: "Nov 03, 2026",
    amount: "- Rs. 2,000",
    type: "expense",
    icon: Car,
  },
  {
    id: 5,
    title: "Monthly Rent",
    category: "Housing",
    date: "Nov 02, 2026",
    amount: "- Rs. 15,000",
    type: "expense",
    icon: House,
  },
];

function TransactionTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111b2d]">
      <div className="flex items-center justify-between p-5">
        <div>
          <h3 className="font-semibold text-white">Recent Transactions</h3>
          <p className="mt-1 text-xs text-slate-500">
            Your latest financial activities
          </p>
        </div>

        <span className="text-xs font-medium text-indigo-400">
          Latest 5
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead className="border-y border-slate-800 bg-slate-900/40">
            <tr className="text-xs text-slate-500">
              <th className="px-5 py-4 font-medium">Transaction</th>
              <th className="px-5 py-4 font-medium">Category</th>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 text-right font-medium">Amount</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {transactions.map((transaction) => {
              const Icon = transaction.icon;

              return (
                <tr key={transaction.id} className="transition hover:bg-slate-800/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-800 p-2">
                        <Icon size={17} className="text-slate-300" />
                      </div>

                      <span className="text-sm font-medium text-white">
                        {transaction.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {transaction.category}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {transaction.date}
                  </td>

                  <td
                    className={`px-5 py-4 text-right text-sm font-semibold ${
                      transaction.type === "income"
                        ? "text-emerald-400"
                        : "text-white"
                    }`}
                  >
                    {transaction.amount}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;