import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", income: 85000, expenses: 42000 },
  { month: "Feb", income: 92000, expenses: 51000 },
  { month: "Mar", income: 88000, expenses: 46000 },
  { month: "Apr", income: 105000, expenses: 55000 },
  { month: "May", income: 98000, expenses: 49000 },
  { month: "Jun", income: 110000, expenses: 58000 },
];

function ExpenseChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111b2d] p-5">
      <div className="mb-6">
        <h3 className="font-semibold text-white">
          Income vs Expenses
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Monthly financial overview
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid
              stroke="#263449"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#64748b"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#111b2d",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="income"
              name="Income"
              fill="#818cf8"
              radius={[5, 5, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#34d399"
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ExpenseChart;