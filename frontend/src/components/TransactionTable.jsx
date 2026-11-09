import {
  Utensils,
  Car,
  ShoppingBag,
  House,
  CircleDollarSign,
  Receipt,
} from "lucide-react";

function TransactionTable({ transactions }) {
  const getIcon = (category) => {
    const icons = {
      Food: Utensils,
      Transport: Car,
      Shopping: ShoppingBag,
      Housing: House,
      Salary: CircleDollarSign,
    };

    return icons[category] || Receipt;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#111b2d]">
      <div className="flex items-center justify-between p-5">
        <div>
          <h3 className="font-semibold text-white">
            Recent Transactions
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Your latest financial activities
          </p>
        </div>

        <span className="text-xs font-medium text-indigo-400">
          Latest {transactions.length}
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
              const Icon = getIcon(transaction.category);

              return (
                <tr
                  key={transaction._id}
                  className="transition hover:bg-slate-800/30"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-slate-800 p-2">
                        <Icon size={17} className="text-slate-300" />
                      </div>

                      <span className="text-sm font-medium text-white">
                        {transaction.description || transaction.category}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {transaction.category}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-400">
                    {formatDate(transaction.date)}
                  </td>

                  <td
                    className={`px-5 py-4 text-right text-sm font-semibold ${
                      transaction.type === "income"
                        ? "text-emerald-400"
                        : "text-rose-400"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"} Rs.{" "}
                    {Number(transaction.amount).toLocaleString("en-US")}
                  </td>
                </tr>
              );
            })}

            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-5 py-8 text-center text-sm text-slate-500"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionTable;