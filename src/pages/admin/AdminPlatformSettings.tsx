import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  BellRing,
  LockKeyhole,
  RefreshCcw,
  Save,
  Settings2,
  ShieldCheck,
  Store,
  WalletCards,
  Wrench,
} from "lucide-react";

import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import {
  getPlatformSettings,
  resetPlatformSettings,
  savePlatformSettings,
} from "../../utility/platformSettingsStorage";

import type { PlatformSettings } from "../../types/platformSettings.types";

function AdminPlatformSettings() {
  const [settings, setSettings] =
    useState<PlatformSettings>(
      getPlatformSettings(),
    );

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) {
      return;
    }

    const timer = window.setTimeout(() => {
      setSaved(false);
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [saved]);

  const updateSetting = <
    K extends keyof PlatformSettings,
  >(
    key: K,
    value: PlatformSettings[K],
  ) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    savePlatformSettings(settings);
    setSaved(true);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "Reset all platform settings to their default values?",
    );

    if (!confirmed) {
      return;
    }

    resetPlatformSettings();

    setSettings(
      getPlatformSettings(),
    );

    setSaved(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium text-blue-600">
            Administration
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900">
            Platform Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage global configuration for the Crypto P2P
            platform.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
          >
            <RefreshCcw size={17} className="mr-2" />
            Reset
          </Button>

          <Button onClick={handleSave}>
            <Save size={17} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <Settings2 className="mt-0.5 shrink-0 text-blue-600" />

          <div>
            <p className="font-semibold text-blue-900">
              Demo platform configuration
            </p>

            <p className="mt-1 text-sm text-blue-700">
              These settings are stored locally in the browser
              for demonstration purposes. In the production
              backend, configuration changes will require
              authorization and will be recorded in the audit
              system.
            </p>
          </div>
        </div>
      </div>

      {/* Save Message */}
      {saved && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          Platform settings saved successfully.
        </div>
      )}

      {/* General */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
            <Settings2 size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              General Platform Settings
            </h2>

            <p className="text-sm text-slate-500">
              Basic platform identity and availability.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Platform Name
            </span>

            <input
              type="text"
              value={settings.platformName}
              onChange={(event) =>
                updateSetting(
                  "platformName",
                  event.target.value,
                )
              }
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <ToggleSetting
            icon={<Wrench size={18} />}
            title="Maintenance Mode"
            description="Temporarily place the platform into maintenance mode."
            checked={settings.maintenanceMode}
            onChange={(value) =>
              updateSetting(
                "maintenanceMode",
                value,
              )
            }
            danger
          />
        </div>
      </Card>

      {/* Trading */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-50 p-3 text-green-600">
            <WalletCards size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Trading & Wallet Controls
            </h2>

            <p className="text-sm text-slate-500">
              Control major financial operations.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ToggleSetting
            title="Trading Enabled"
            description="Allow platform users to trade."
            checked={settings.tradingEnabled}
            onChange={(value) =>
              updateSetting(
                "tradingEnabled",
                value,
              )
            }
          />

          <ToggleSetting
            title="P2P Trading Enabled"
            description="Allow peer-to-peer trading."
            checked={settings.p2pTradingEnabled}
            onChange={(value) =>
              updateSetting(
                "p2pTradingEnabled",
                value,
              )
            }
          />

          <ToggleSetting
            title="Deposits Enabled"
            description="Allow wallet deposits."
            checked={settings.depositsEnabled}
            onChange={(value) =>
              updateSetting(
                "depositsEnabled",
                value,
              )
            }
          />

          <ToggleSetting
            title="Withdrawals Enabled"
            description="Allow wallet withdrawals."
            checked={settings.withdrawalsEnabled}
            onChange={(value) =>
              updateSetting(
                "withdrawalsEnabled",
                value,
              )
            }
          />
        </div>
      </Card>

      {/* KYC & Security */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              KYC & Security
            </h2>

            <p className="text-sm text-slate-500">
              Define verification requirements.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <ToggleSetting
            icon={<LockKeyhole size={18} />}
            title="KYC Required for Trading"
            description="Require identity verification before trading."
            checked={
              settings.requireKycForTrading
            }
            onChange={(value) =>
              updateSetting(
                "requireKycForTrading",
                value,
              )
            }
          />

          <ToggleSetting
            title="KYC Required for Withdrawals"
            description="Require verification before withdrawals."
            checked={
              settings.requireKycForWithdrawals
            }
            onChange={(value) =>
              updateSetting(
                "requireKycForWithdrawals",
                value,
              )
            }
          />

          <ToggleSetting
            title="Security Alerts"
            description="Enable platform security alerts."
            checked={
              settings.securityAlertsEnabled
            }
            onChange={(value) =>
              updateSetting(
                "securityAlertsEnabled",
                value,
              )
            }
          />
        </div>
      </Card>

      {/* Fees */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
            <WalletCards size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Trading Fees
            </h2>

            <p className="text-sm text-slate-500">
              Configure platform trading fees.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <NumberSetting
            label="Maker Fee"
            suffix="%"
            value={settings.makerFeePercent}
            onChange={(value) =>
              updateSetting(
                "makerFeePercent",
                value,
              )
            }
          />

          <NumberSetting
            label="Taker Fee"
            suffix="%"
            value={settings.takerFeePercent}
            onChange={(value) =>
              updateSetting(
                "takerFeePercent",
                value,
              )
            }
          />
        </div>
      </Card>

      {/* P2P Limits */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
            <WalletCards size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              P2P Limits
            </h2>

            <p className="text-sm text-slate-500">
              Configure transaction boundaries.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <NumberSetting
            label="Minimum P2P Order"
            suffix="NGN"
            value={settings.minimumP2POrderNGN}
            onChange={(value) =>
              updateSetting(
                "minimumP2POrderNGN",
                value,
              )
            }
          />

          <NumberSetting
            label="Maximum P2P Order"
            suffix="NGN"
            value={settings.maximumP2POrderNGN}
            onChange={(value) =>
              updateSetting(
                "maximumP2POrderNGN",
                value,
              )
            }
          />

          <NumberSetting
            label="Daily Withdrawal Limit"
            suffix="NGN"
            value={settings.dailyWithdrawalLimitNGN}
            onChange={(value) =>
              updateSetting(
                "dailyWithdrawalLimitNGN",
                value,
              )
            }
          />
        </div>
      </Card>

      {/* Merchant */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-cyan-50 p-3 text-cyan-600">
            <Store size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Merchant Configuration
            </h2>

            <p className="text-sm text-slate-500">
              Configure merchant eligibility.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <ToggleSetting
            title="Merchant Applications"
            description="Allow users to apply for merchant status."
            checked={
              settings.merchantApplicationsEnabled
            }
            onChange={(value) =>
              updateSetting(
                "merchantApplicationsEnabled",
                value,
              )
            }
          />

          <NumberSetting
            label="Minimum Completion Rate"
            suffix="%"
            value={
              settings.merchantMinimumCompletionRate
            }
            onChange={(value) =>
              updateSetting(
                "merchantMinimumCompletionRate",
                value,
              )
            }
          />
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-pink-50 p-3 text-pink-600">
            <BellRing size={20} />
          </div>

          <div>
            <h2 className="font-semibold text-slate-900">
              Notifications
            </h2>

            <p className="text-sm text-slate-500">
              Control platform notification channels.
            </p>
          </div>
        </div>

        <div className="mt-5">
          <ToggleSetting
            title="Email Notifications"
            description="Allow system-generated email notifications."
            checked={
              settings.emailNotificationsEnabled
            }
            onChange={(value) =>
              updateSetting(
                "emailNotificationsEnabled",
                value,
              )
            }
          />
        </div>
      </Card>

      {/* Bottom Save */}
      <div className="flex justify-end border-t border-slate-200 pt-5">
        <Button
          size="lg"
          onClick={handleSave}
        >
          <Save size={18} className="mr-2" />
          Save Platform Settings
        </Button>
      </div>
    </div>
  );
}

interface ToggleSettingProps {
  icon?: ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  danger?: boolean;
}

function ToggleSetting({
  icon,
  title,
  description,
  checked,
  onChange,
  danger = false,
}: ToggleSettingProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
      <div className="flex min-w-0 items-start gap-3">
        {icon && (
          <div className="mt-0.5 shrink-0 text-slate-500">
            {icon}
          </div>
        )}

        <div>
          <p className="font-medium text-slate-900">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? danger
              ? "bg-red-600"
              : "bg-blue-600"
            : "bg-slate-300"
        }`}
        aria-label={title}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

interface NumberSettingProps {
  label: string;
  suffix: string;
  value: number;
  onChange: (value: number) => void;
}

function NumberSetting({
  label,
  suffix,
  value,
  onChange,
}: NumberSettingProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">
        {label}
      </span>

      <div className="relative mt-2">
        <input
          type="number"
          min="0"
          step="0.01"
          value={value}
          onChange={(event) =>
            onChange(
              Number(event.target.value),
            )
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 pr-16 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
          {suffix}
        </span>
      </div>
    </label>
  );
}

export default AdminPlatformSettings;