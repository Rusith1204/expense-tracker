import {
  LayoutDashboard,
  ArrowLeftRight,
  ChartPie,
  Settings,
  Wallet,
  ChevronLeft,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Transactions", icon: ArrowLeftRight },
  { label: "Reports", icon: ChartPie },
  { label: "Settings", icon: Settings },
];

function Sidebar() {
  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-slate-800 bg-[#0d1423] p-5">
      <div className="mb-12 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-500 p-2.5">
          <Wallet size={23} className="text-white" />
        </div>

        <div>
          <h2 className="text-lg font-bold text-white">ExpenseFlow</h2>
          <p className="text-xs text-slate-500">Personal Finance</p>
        </div>
      </div>

      <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Menu
      </p>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                index === 0
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={19} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <p className="text-sm font-semibold text-white">Need help?</p>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Keep track of your finances and manage your budget.
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
        <span>ExpenseFlow v1.0</span>
        <ChevronLeft size={16} />
      </div>
    </aside>
  );
}

export default Sidebar;