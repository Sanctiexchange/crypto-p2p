import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Clock3,
  KeyRound,
  LockKeyhole,
  Monitor,
  Smartphone,
  ShieldCheck,
  ShieldAlert,
} from "lucide-react";

import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

function Security() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Security
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
          Protect your account and manage your authentication
          settings.
        </p>
      </div>

      {/* Security Status */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <ShieldCheck size={25} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">
                  Account Protected
                </h2>

                <Badge variant="success">
                  Secure
                </Badge>
              </div>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Your account currently has the recommended
                basic security protections enabled.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-green-50 px-4 py-3">
            <p className="text-xs font-semibold text-green-700">
              Security Score
            </p>

            <p className="mt-1 text-lg font-bold text-green-800">
              85%
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 bg-slate-50 p-5 sm:p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600">
              Security level
            </span>

            <span className="text-xs font-bold text-slate-900">
              Good
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-[85%] rounded-full bg-green-500" />
          </div>
        </div>
      </Card>

      {/* Authentication */}
      <Card className="mb-6 overflow-hidden">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h2 className="text-sm font-bold text-slate-900">
            Authentication
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Manage the methods used to protect access to your
            account.
          </p>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <KeyRound size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                Password
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Your password was last changed 30 days ago.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            Change Password
          </Button>
        </div>

        {/* 2FA */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <LockKeyhole size={19} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">
                  Two-Factor Authentication
                </p>

                <Badge variant="warning">
                  Not Enabled
                </Badge>
              </div>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Add an additional authentication step to
                protect your account.
              </p>
            </div>
          </div>

          <Button
            size="sm"
            className="w-full sm:w-auto"
          >
            Enable 2FA
          </Button>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
              <CheckCircle2 size={19} />
            </div>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900">
                Email Verification
              </p>

              <p className="mt-1 break-all text-xs leading-5 text-slate-500">
                sanctus@example.com
              </p>
            </div>
          </div>

          <Badge variant="success">
            Verified
          </Badge>
        </div>
      </Card>

      {/* Login Activity */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Login Activity
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Review devices that recently accessed your
              account.
            </p>
          </div>

          <button
            type="button"
            className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            View All
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Current device */}
        <div className="flex items-start gap-4 border-b border-slate-100 p-5 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Monitor size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Windows Computer
              </p>

              <Badge variant="success">
                Current Device
              </Badge>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Chrome • Windows
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <span>Current session</span>
              <span>•</span>
              <span>Lagos, Nigeria</span>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
            <Smartphone size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Mobile Device
              </p>

              <span className="text-xs text-slate-400">
                2 days ago
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500">
              Chrome Mobile • Android
            </p>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <span>Lagos, Nigeria</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Security Alerts */}
      <Card className="mb-6 overflow-hidden">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle
              size={19}
              className="text-yellow-500"
            />

            <h2 className="text-sm font-bold text-slate-900">
              Security Alerts
            </h2>
          </div>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Important notifications related to your account
            security.
          </p>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start gap-3 rounded-lg border border-yellow-100 bg-yellow-50 p-4">
            <ShieldAlert
              size={18}
              className="mt-0.5 shrink-0 text-yellow-600"
            />

            <div>
              <p className="text-sm font-semibold text-yellow-800">
                Two-factor authentication is disabled
              </p>

              <p className="mt-1 text-xs leading-5 text-yellow-700">
                Enable 2FA to add an additional layer of
                protection to your account.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Security Event */}
      <Card className="mb-6 p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Clock3
            size={19}
            className="mt-0.5 shrink-0 text-slate-400"
          />

          <div>
            <p className="text-sm font-semibold text-slate-900">
              Recent Security Activity
            </p>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Password authentication successful from your
              current device.
            </p>

            <p className="mt-2 text-xs text-slate-400">
              Today • Current session
            </p>
          </div>
        </div>
      </Card>

      {/* Demo Notice */}
      <Card className="border-blue-100 bg-blue-50 p-4 sm:p-5">
        <p className="text-sm font-semibold text-blue-800">
          Security Demo
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-700">
          Security settings are currently simulated for this
          frontend prototype. Real password changes, 2FA,
          session management, authentication and security
          alerts will be connected to the backend later.
        </p>
      </Card>
    </div>
  );
}

export default Security;