import {
  ArrowLeftRight,
  BarChart3,
  ChevronRight,
  CircleDollarSign,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Wallet,
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    {
      label: "P2P Marketplace",
      icon: CircleDollarSign,
    },
    {
      label: "Orders",
      icon: ArrowLeftRight,
    },
    {
      label: "Wallet",
      icon: Wallet,
    },
    {
      label: "Transactions",
      icon: BarChart3,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-50 w-64 border-r border-slate-200 bg-white transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">
          
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 lg:hidden">
            <span className="font-semibold text-slate-900">
              Menu
            </span>

            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Main Menu
            </p>

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
                    item.active
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon size={19} />
                    {item.label}
                  </span>

                  {item.active && <ChevronRight size={16} />}
                </button>
              );
            })}

            <div className="my-5 border-t border-slate-100" />

            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account
            </p>

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
              <ShieldCheck size={19} />
              Security
            </button>

            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900">
              <Settings size={19} />
              Settings
            </button>
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="rounded-xl bg-slate-900 p-4 text-white">
              <p className="text-sm font-semibold">
                Need help?
              </p>

              <p className="mt-1 text-xs text-slate-400">
                Contact our support team.
              </p>

              <button className="mt-3 text-xs font-semibold text-blue-400">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;