import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileClock,
  Search,
  ShieldAlert,
  User,
} from "lucide-react";

import Badge from "../../components/common/Badge";
import Card from "../../components/common/Card";

import { adminAuditLogs } from "../../data/adminAuditLogs";

import type {
  AuditLog,
  AuditSeverity,
} from "../../types/audit.types";

function AdminAuditLogs() {
  const [logs] = useState<AuditLog[]>(
    adminAuditLogs,
  );

  const [searchTerm, setSearchTerm] =
    useState("");

  const [severityFilter, setSeverityFilter] =
    useState<"all" | AuditSeverity>("all");

  const [selectedLog, setSelectedLog] =
    useState<AuditLog | null>(null);

  const getSeverityLabel = (
    severity: AuditSeverity,
  ) => {
    switch (severity) {
      case "critical":
        return "Critical";

      case "warning":
        return "Warning";

      default:
        return "Information";
    }
  };

  const getSeverityVariant = (
    severity: AuditSeverity,
  ) => {
    switch (severity) {
      case "critical":
        return "danger" as const;

      case "warning":
        return "warning" as const;

      default:
        return "info" as const;
    }
  };

  const getActionLabel = (
    action: AuditLog["action"],
  ) => {
    return action
      .split("_")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() +
          word.slice(1),
      )
      .join(" ");
  };

  const filteredLogs = useMemo(() => {
    const search =
      searchTerm.toLowerCase().trim();

    return logs.filter((log) => {
      const matchesSearch =
        !search ||
        log.id
          .toLowerCase()
          .includes(search) ||
        log.adminName
          .toLowerCase()
          .includes(search) ||
        log.targetId
          .toLowerCase()
          .includes(search) ||
        log.description
          .toLowerCase()
          .includes(search) ||
        log.action
          .toLowerCase()
          .includes(search);

      const matchesSeverity =
        severityFilter === "all" ||
        log.severity === severityFilter;

      return (
        matchesSearch &&
        matchesSeverity
      );
    });
  }, [
    logs,
    searchTerm,
    severityFilter,
  ]);

  const totalLogs = logs.length;

  const infoCount = logs.filter(
    (log) => log.severity === "info",
  ).length;

  const warningCount = logs.filter(
    (log) => log.severity === "warning",
  ).length;

  const criticalCount = logs.filter(
    (log) => log.severity === "critical",
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Audit Logs
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Monitor important administrative actions
          across the platform.
        </p>
      </div>

      {/* Demo Notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <FileClock className="mt-0.5 shrink-0 text-blue-600" />

          <div>
            <p className="font-semibold text-blue-900">
              Demo audit trail
            </p>

            <p className="mt-1 text-sm text-blue-700">
              These records are demonstration data.
              During backend integration, audit events
              will be generated automatically and stored
              as immutable platform records.
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Events
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalLogs}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <FileClock size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Information
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {infoCount}
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-3 text-green-600">
              <CheckCircle2 size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Warnings
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {warningCount}
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
              <AlertTriangle size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Critical
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {criticalCount}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              <ShieldAlert size={21} />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(
                  event.target.value,
                )
              }
              placeholder="Search audit ID, admin, target or action..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {[
              {
                value: "all",
                label: "All",
              },
              {
                value: "info",
                label: "Information",
              },
              {
                value: "warning",
                label: "Warnings",
              },
              {
                value: "critical",
                label: "Critical",
              },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setSeverityFilter(
                    filter.value as
                      | "all"
                      | AuditSeverity,
                  )
                }
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                  severityFilter ===
                  filter.value
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Desktop Table */}
      <Card className="hidden overflow-hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-262.5">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Administrator
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Target
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Severity
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Details
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {getActionLabel(
                          log.action,
                        )}
                      </p>

                      <p className="text-xs text-slate-400">
                        {log.id}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white">
                        <User size={15} />
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {log.adminName}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-medium capitalize text-slate-700">
                        {log.targetType}
                      </p>

                      <p className="text-xs text-slate-400">
                        {log.targetId}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      variant={getSeverityVariant(
                        log.severity,
                      )}
                    >
                      {getSeverityLabel(
                        log.severity,
                      )}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {new Date(
                      log.createdAt,
                    ).toLocaleString()}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedLog(log)
                      }
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="p-10 text-center text-sm text-slate-500">
            No audit logs match your search.
          </div>
        )}
      </Card>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {filteredLogs.map((log) => (
          <Card
            key={log.id}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  {getActionLabel(
                    log.action,
                  )}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {log.id}
                </p>
              </div>

              <Badge
                variant={getSeverityVariant(
                  log.severity,
                )}
              >
                {getSeverityLabel(
                  log.severity,
                )}
              </Badge>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Administrator
                </p>

                <p className="mt-1 text-sm font-medium text-slate-700">
                  {log.adminName}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Target
                  </p>

                  <p className="mt-1 text-sm font-medium capitalize text-slate-700">
                    {log.targetType}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Target ID
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-slate-700">
                    {log.targetId}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400">
                {new Date(
                  log.createdAt,
                ).toLocaleString()}
              </p>

              <button
                type="button"
                onClick={() =>
                  setSelectedLog(log)
                }
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View Details
              </button>
            </div>
          </Card>
        ))}

        {filteredLogs.length === 0 && (
          <Card className="p-8 text-center text-sm text-slate-500">
            No audit logs match your search.
          </Card>
        )}
      </div>

      {/* Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Audit Event
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {getActionLabel(
                      selectedLog.action,
                    )}
                  </h2>
                </div>

                <Badge
                  variant={getSeverityVariant(
                    selectedLog.severity,
                  )}
                >
                  {getSeverityLabel(
                    selectedLog.severity,
                  )}
                </Badge>
              </div>
            </div>

            <div className="space-y-4 p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Description
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {selectedLog.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Administrator
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedLog.adminName}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Admin ID
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedLog.adminId}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Target
                  </p>

                  <p className="mt-1 text-sm font-semibold capitalize text-slate-700">
                    {selectedLog.targetType}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs text-slate-400">
                    Target ID
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-slate-700">
                    {selectedLog.targetId}
                  </p>
                </div>
              </div>

              {selectedLog.ipAddress && (
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="text-xs text-slate-400">
                    IP Address
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {selectedLog.ipAddress}
                  </p>
                </div>
              )}

              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs text-slate-400">
                  Event Time
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {new Date(
                    selectedLog.createdAt,
                  ).toLocaleString()}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedLog(null)
                }
                className="w-full rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAuditLogs;