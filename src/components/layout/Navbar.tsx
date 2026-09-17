import {
  Bell,
  ChevronDown,
  Menu,
  ShieldCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onMenuClick?: () => void;
}

function Navbar({ onMenuClick }: NavbarProps) {
  const navigate = useNavigate();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-lg font-bold text-white">₿</span>
            </div>

            <span className="hidden text-lg font-bold text-slate-900 sm:block">
              Crypto P2P
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          <div className="hidden items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600 md:flex">
            <ShieldCheck size={17} />
            <span>Secure</span>
          </div>

          <button
              type="button"
              onClick={() => navigate("/notifications")}
              className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Notifications"
          >
            <Bell size={21} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

          <button className="flex items-center gap-2 rounded-lg px-2 py-2 hover:bg-slate-100">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              SE
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Sanctus
              </p>
              <p className="text-xs text-slate-500">
                Verified User
              </p>
            </div>

            <ChevronDown size={17} className="hidden text-slate-500 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;