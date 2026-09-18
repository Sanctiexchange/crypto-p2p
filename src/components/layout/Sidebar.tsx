import {
  ArrowLeftRight,
  BarChart3,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  Megaphone,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Wallet,
  X,
  ShieldAlert,
  Users,
  Store,
} from "lucide-react";

import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      label: "P2P Marketplace",
      icon: CircleDollarSign,
      path: "/p2p",
    },
    {
      label: "Orders",
      icon: ArrowLeftRight,
      path: "/orders",
    },
    {
      label: "Wallet",
      icon: Wallet,
      path: "/wallet",
    },
    {
      label: "Transactions",
      icon: BarChart3,
      path: "/transactions",
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-50 w-64 border-r border-slate-200 bg-green transition-transform duration-300 ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-full flex-col">

          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 lg:hidden">
            <span className="font-semibold text-slate-900">
              Menu
            </span>

            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-slate-100"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-4">

            {/* Main Menu */}
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Main Menu
            </p>

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  onClick={onClose}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="flex items-center gap-3">
                        <Icon size={19} />
                        {item.label}
                      </span>

                      {isActive && (
                        <ChevronRight size={16} />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}

            {/* Merchant */}
              <div className="my-5 border-t border-slate-100" />

            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Administration
            </p>
                {/*Admin */}
            <NavLink
                to="/admin"
                onClick={onClose}
                end
                className={({ isActive }) =>
                 `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`
  }
>
  {({ isActive }) => (
    <>
      <span className="flex items-center gap-3">
        <ShieldAlert size={19} />
        Admin Dashboard
      </span>

      {isActive && (
        <ChevronRight size={16} />
      )}
    </>
  )}
</NavLink>

<NavLink
  to="/admin/users"
  onClick={onClose}
  className={({ isActive }) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`
  }
>
  {({ isActive }) => (
    <>
      <span className="flex items-center gap-3">
        <Users size={19} />
        Users
      </span>

      {isActive && (
        <ChevronRight size={16} />
      )}
    </>
  )}
</NavLink>
{/* Admin Merchants */}
<NavLink
  to="/admin/merchants"
  onClick={onClose}
  className={({ isActive }) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`
  }
>
  {({ isActive }) => (
    <>
      <span className="flex items-center gap-3">
        <Store size={19} />
        Merchants
      </span>

      {isActive && (
        <ChevronRight size={16} />
      )}
    </>
  )}
</NavLink>

{/* Admin Advertisements */}
<NavLink
  to="/admin/advertisements"
  onClick={onClose}
  className={({ isActive }) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`
  }
>
  {({ isActive }) => (
    <>
      <span className="flex items-center gap-3">
        <Megaphone size={19} />
        Advertisements
      </span>

      {isActive && (
        <ChevronRight size={16} />
      )}
    </>
  )}
</NavLink>


{/* Admin Orders */}
<NavLink
  to="/admin/orders"
  onClick={onClose}
  className={({ isActive }) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`
  }
>
  {({ isActive }) => (
    <>
      <span className="flex items-center gap-3">
        <ShoppingBag size={19} />
        Orders & Trades
      </span>

      {isActive && (
        <ChevronRight size={16} />
      )}
    </>
  )}
</NavLink>

{/* Admin disputes */}
<NavLink
  to="/admin/disputes"
  onClick={onClose}
  className={({ isActive }) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-blue-50 text-blue-600"
        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
    }`
  }
>
  {({ isActive }) => (
    <>
      <span className="flex items-center gap-3">
        <ShieldAlert size={19} />
        Disputes
      </span>

      {isActive && (
        <ChevronRight size={16} />
      )}
    </>
  )}
</NavLink>


            {/* Merchant */}
            <div className="my-5 border-t border-slate-100" />

            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Merchant
            </p>

            <NavLink
              to="/merchant"
              onClick={onClose}
              end
              className={({ isActive }) =>
                `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-3">
                    <ShoppingBag size={19} />
                    Merchant Dashboard
                  </span>

                  {isActive && (
                    <ChevronRight size={16} />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/merchant/ads"
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-3">
                    <Megaphone size={19} />
                    My Advertisements
                  </span>

                  {isActive && (
                    <ChevronRight size={16} />
                  )}
                </>
              )}
            </NavLink>

            <NavLink
              to="/merchant/orders"
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center gap-3">
                    <ShoppingBag size={19} />
                    Merchant Orders
                  </span>

                  {isActive && (
                    <ChevronRight size={16} />
                  )}
                </>
              )}
            </NavLink>

            {/* Account */}
            <div className="my-5 border-t border-slate-100" />

            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Account
            </p>

            <NavLink
              to="/settings/payment-methods"
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <CreditCard size={19} />
              Payment Methods
            </NavLink>

            <NavLink
              to="/security"
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <ShieldCheck size={19} />
              Security
            </NavLink>

            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`
              }
            >
              <Settings size={19} />
              Settings
            </NavLink>
          </nav>

          {/* Support */}
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