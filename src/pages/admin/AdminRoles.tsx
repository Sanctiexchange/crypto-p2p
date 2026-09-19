import { useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  Shield,
  ShieldCheck,
  UserCog,
  Users,
  X,
} from "lucide-react";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import { adminRoles } from "../../data/adminRoles";
import { adminUsers } from "../../data/adminUsers";

import type {
  AdminPermission,
  AdminRole,
} from "../../types/adminRole.types";

function AdminRoles() {
  const [selectedRole, setSelectedRole] =
    useState<AdminRole>("super_admin");

  const [selectedAdmin, setSelectedAdmin] =
    useState<string | null>(null);

  const role = adminRoles.find(
    (item) => item.id === selectedRole,
  );

  const roleUsers = useMemo(
    () =>
      adminUsers.filter(
        (admin) => admin.role === selectedRole,
      ),
    [selectedRole],
  );

  const permissionGroups: {
    title: string;
    permissions: AdminPermission[];
  }[] = [
    {
      title: "Dashboard",
      permissions: ["dashboard.view"],
    },
    {
      title: "Users",
      permissions: [
        "users.view",
        "users.manage",
      ],
    },
    {
      title: "Merchants",
      permissions: [
        "merchants.view",
        "merchants.manage",
      ],
    },
    {
      title: "Advertisements",
      permissions: [
        "advertisements.view",
        "advertisements.manage",
      ],
    },
    {
      title: "Orders",
      permissions: [
        "orders.view",
        "orders.manage",
      ],
    },
    {
      title: "Disputes",
      permissions: [
        "disputes.view",
        "disputes.manage",
      ],
    },
    {
      title: "Financial Management",
      permissions: [
        "finance.view",
        "finance.manage",
      ],
    },
    {
      title: "KYC & Verification",
      permissions: [
        "kyc.view",
        "kyc.manage",
      ],
    },
    {
      title: "Audit Logs",
      permissions: ["audit.view"],
    },
    {
      title: "Platform Settings",
      permissions: [
        "settings.view",
        "settings.manage",
      ],
    },
    {
      title: "Administrator Management",
      permissions: [
        "admins.view",
        "admins.manage",
      ],
    },
  ];

  const permissionLabel = (
    permission: AdminPermission,
  ) => {
    const [, action] = permission.split(".");

    return action === "view"
      ? "View"
      : "Manage";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Roles & Permissions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage administrator roles and access levels.
        </p>
      </div>

      {/* Demo Notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 shrink-0 text-blue-600" />

          <div>
            <p className="font-semibold text-blue-900">
              Demo role management
            </p>

            <p className="mt-1 text-sm text-blue-700">
              Role permissions are currently represented in
              frontend demo data. The backend will enforce
              authorization and permissions in production.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Roles
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {adminRoles.length}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Shield size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Administrators
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {adminUsers.length}
              </p>
            </div>

            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
              <Users size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Active Admins
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {
                  adminUsers.filter(
                    (admin) =>
                      admin.status === "active",
                  ).length
                }
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3 text-green-600">
              <UserCog size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Available Permissions
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                20
              </p>
            </div>

            <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
              <ShieldCheck size={21} />
            </div>
          </div>
        </Card>
      </div>

      {/* Roles */}
      <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
        {/* Role List */}
        <Card className="p-3">
          <div className="px-3 py-3">
            <h2 className="font-semibold text-slate-900">
              Administrator Roles
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Select a role to inspect permissions.
            </p>
          </div>

          <div className="space-y-1">
            {adminRoles.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setSelectedRole(item.id)
                }
                className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left transition ${
                  selectedRole === item.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold">
                    {item.name}
                  </p>

                  <p className="mt-0.5 text-xs opacity-70">
                    {item.permissions.length} permissions
                  </p>
                </div>

                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </Card>

        {/* Selected Role */}
        <Card className="p-5">
          {role && (
            <>
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Shield size={22} />
                  </div>

                  <div>
                    <h2 className="text-lg font-bold text-slate-900">
                      {role.name}
                    </h2>

                    <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                      {role.description}
                    </p>
                  </div>
                </div>

                <Badge variant="info">
                  {`${role.permissions.length} permissions`}
                </Badge>
              </div>

              {/* Permissions */}
              <div className="mt-5">
                <h3 className="font-semibold text-slate-900">
                  Permissions
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {permissionGroups.map(
                    (group) => (
                      <div
                        key={group.title}
                        className="rounded-xl border border-slate-200 p-4"
                      >
                        <p className="text-sm font-semibold text-slate-900">
                          {group.title}
                        </p>

                        <div className="mt-3 space-y-2">
                          {group.permissions.map(
                            (permission) => {
                              const enabled =
                                role.permissions.includes(
                                  permission,
                                );

                              return (
                                <div
                                  key={permission}
                                  className="flex items-center justify-between"
                                >
                                  <span className="text-sm text-slate-600">
                                    {permissionLabel(
                                      permission,
                                    )}
                                  </span>

                                  {enabled ? (
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                                      <Check
                                        size={14}
                                      />
                                    </span>
                                  ) : (
                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                                      <X
                                        size={14}
                                      />
                                    </span>
                                  )}
                                </div>
                              );
                            },
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Assigned Admins */}
              <div className="mt-6 border-t border-slate-200 pt-5">
                <h3 className="font-semibold text-slate-900">
                  Administrators with this role
                </h3>

                <div className="mt-4 space-y-3">
                  {roleUsers.length > 0 ? (
                    roleUsers.map((admin) => (
                      <div
                        key={admin.id}
                        className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                            {admin.name
                              .split(" ")
                              .map(
                                (word) =>
                                  word[0],
                              )
                              .join("")
                              .slice(0, 2)}
                          </div>

                          <div>
                            <p className="font-medium text-slate-900">
                              {admin.name}
                            </p>

                            <p className="text-sm text-slate-500">
                              {admin.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge
                            variant={
                              admin.status ===
                              "active"
                                ? "success"
                                : "danger"
                            }
                          >
                            {admin.status}
                          </Badge>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setSelectedAdmin(
                                admin.id,
                              )
                            }
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                      No administrators currently use this
                      role.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Admin Details Modal */}
      {selectedAdmin && (
        <AdminDetailsModal
          adminId={selectedAdmin}
          onClose={() =>
            setSelectedAdmin(null)
          }
        />
      )}
    </div>
  );
}

interface AdminDetailsModalProps {
  adminId: string;
  onClose: () => void;
}

function AdminDetailsModal({
  adminId,
  onClose,
}: AdminDetailsModalProps) {
  const admin = adminUsers.find(
    (item) => item.id === adminId,
  );

  const role = adminRoles.find(
    (item) => item.id === admin?.role,
  );

  if (!admin || !role) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-slate-200 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Administrator
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900">
                {admin.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {admin.email}
              </p>
            </div>

            <Badge
              variant={
                admin.status === "active"
                  ? "success"
                  : "danger"
              }
            >
              {admin.status}
            </Badge>
          </div>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-400">
              Assigned Role
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {role.name}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {role.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs text-slate-400">
                Admin ID
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {admin.id}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 p-3">
              <p className="text-xs text-slate-400">
                Permissions
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {role.permissions.length}
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 p-3">
            <p className="text-xs text-slate-400">
              Last Login
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {new Date(
                admin.lastLogin,
              ).toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminRoles;