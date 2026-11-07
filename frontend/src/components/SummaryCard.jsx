import { TrendingDown, TrendingUp, Wallet } from "lucide-react";

const iconMap = {
  balance: Wallet,
  income: TrendingUp,
  expense: TrendingDown,
};

function SummaryCard({ title, amount, change, type }) {
  const Icon = iconMap[type];

  const positive = type !== "expense";

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111b2d] p-5 transition hover:border-slate-700">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{title}</p>

        <div className="rounded-xl bg-indigo-500/10 p-3">
          <Icon size={21} className="text-indigo-400" />
        </div>
      </div>

      <h2 className="mt-5 text-2xl font-bold tracking-tight text-white">
        {amount}
      </h2>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`text-xs font-semibold ${
            positive ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {change}
        </span>

        <span className="text-xs text-slate-500">
          compared to last month
        </span>
      </div>
    </div>
  );
}

export default SummaryCard;