import {
  CheckCircle2,
  ChevronRight,
  Mail,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";

import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

function Profile() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-blue-600">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Profile
        </h1>

        <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
          Manage your personal information and account
          verification details.
        </p>
      </div>

      {/* Profile Overview */}
      <Card className="mb-6 overflow-hidden">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-slate-900 text-2xl font-bold text-white">
              SE
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Sanctus Ekeh
                </h2>

                <Badge variant="success">
                  Verified
                </Badge>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                @sanctus
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Member since September 2026
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Verification */}
        <div className="bg-green-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 size={19} />
            </div>

            <div>
              <p className="text-sm font-bold text-green-800">
                Identity Verified
              </p>

              <p className="mt-1 text-xs leading-5 text-green-700">
                Your account verification is complete.
                Verified accounts may access additional
                P2P trading features.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Personal Information */}
      <Card className="mb-6 p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-sm font-bold text-slate-900">
            Personal Information
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Your basic account information.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <User
                size={16}
                className="text-slate-400"
              />

              <span className="text-xs font-semibold text-slate-500">
                Full Name
              </span>
            </div>

            <p className="wrap-break-words text-sm font-semibold text-slate-900">
              Sanctus Ekeh
            </p>
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <Mail
                size={16}
                className="text-slate-400"
              />

              <span className="text-xs font-semibold text-slate-500">
                Email Address
              </span>
            </div>

            <p className="break-all text-sm font-semibold text-slate-900">
              sanctus@example.com
            </p>
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <Phone
                size={16}
                className="text-slate-400"
              />

              <span className="text-xs font-semibold text-slate-500">
                Phone Number
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-900">
              +234 801 234 5678
            </p>
          </div>

          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2">
              <ShieldCheck
                size={16}
                className="text-slate-400"
              />

              <span className="text-xs font-semibold text-slate-500">
                Account ID
              </span>
            </div>

            <p className="break-all text-sm font-semibold text-slate-900">
              CRP-USER-001
            </p>
          </div>
        </div>
      </Card>

      {/* Verification */}
      <Card className="mb-6 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <ShieldCheck
                size={19}
                className="text-blue-600"
              />

              <h2 className="text-sm font-bold text-slate-900">
                Identity Verification
              </h2>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Verification helps protect your account and
              provides access to additional platform
              features.
            </p>
          </div>

          <Badge variant="success">
            Verified
          </Badge>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              Identity
            </p>

            <p className="mt-1 text-sm font-semibold text-green-600">
              Verified
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              Phone
            </p>

            <p className="mt-1 text-sm font-semibold text-green-600">
              Verified
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              Email
            </p>

            <p className="mt-1 text-sm font-semibold text-green-600">
              Verified
            </p>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="overflow-hidden">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h2 className="text-sm font-bold text-slate-900">
            Account Settings
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Manage additional account options.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 border-b border-slate-100 p-5 text-left transition hover:bg-slate-50 sm:p-6"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Security
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Password, two-factor authentication and
                login activity.
              </p>
            </div>

            <ChevronRight
              size={18}
              className="shrink-0 text-slate-400"
            />
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-slate-50 sm:p-6"
          >
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Preferences
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Manage language, currency and notification
                preferences.
              </p>
            </div>

            <ChevronRight
              size={18}
              className="shrink-0 text-slate-400"
            />
          </button>
        </div>
      </Card>

      {/* Demo Notice */}
      <Card className="mt-6 border-blue-100 bg-blue-50 p-4 sm:p-5">
        <p className="text-sm font-semibold text-blue-800">
          Demo Account
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-700">
          Profile information is currently simulated for
          this frontend prototype. Real identity verification,
          account updates and user authentication will be
          connected when the backend is implemented.
        </p>
      </Card>
    </div>
  );
}

export default Profile;