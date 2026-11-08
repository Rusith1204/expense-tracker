import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Food", value: 35, color: "#818cf8" },
  { name: "Transport", value: 20, color: "#34d399" },
  { name: "Shopping", value: 25, color: "#fbbf24" },
  { name: "Bills", value: 20, color: "#f472b6" },
];

function CategoryChart() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111b2d] p-5">
      <h3 className="font-semibold text-white">Expense Categories</h3>

      <p className="mt-1 text-xs text-slate-500">
        Spending distribution
      </p>

      <div className="mt-3 h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={82}
              paddingAngle={4}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                backgroundColor: "#111b2d",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value) => [`${value}%`, "Spending"]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />

            <span className="text-xs text-slate-400">{item.name}</span>
            <span className="ml-auto text-xs font-semibold text-white">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryChart;