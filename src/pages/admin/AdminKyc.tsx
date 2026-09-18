import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileText,
  Search,
  ShieldCheck,
  UserCheck,
  XCircle,
} from "lucide-react";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import { adminKycApplications } from "../../data/adminKycApplications";

import type {
  KycApplication,
  KycStatus,
} from "../../types/kyc.types";

function AdminKyc() {
  const [applications, setApplications] = useState<KycApplication[]>(
    adminKycApplications,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | KycStatus>(
    "all",
  );

  const [selectedApplication, setSelectedApplication] =
    useState<KycApplication | null>(null);

  const getStatusLabel = (status: KycStatus) => {
    switch (status) {
      case "approved":
        return "Approved";
      case "rejected":
        return "Rejected";
      case "more_info_required":
        return "More Information Required";
      default:
        return "Pending";
    }
  };

  const getStatusVariant = (
    status: KycStatus,
  ) => {
    switch (status) {
      case "approved":
        return "success" as const;
      case "rejected":
        return "danger" as const;
      case "more_info_required":
        return "warning" as const;
      default:
        return "info" as const;
    }
  };

  const filteredApplications = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return applications.filter((application) => {
      const matchesSearch =
        !search ||
        application.id.toLowerCase().includes(search) ||
        application.username.toLowerCase().includes(search) ||
        application.displayName.toLowerCase().includes(search) ||
        application.email.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const pendingCount = applications.filter(
    (item) => item.status === "pending",
  ).length;

  const approvedCount = applications.filter(
    (item) => item.status === "approved",
  ).length;

  const rejectedCount = applications.filter(
    (item) => item.status === "rejected",
  ).length;

  const moreInfoCount = applications.filter(
    (item) => item.status === "more_info_required",
  ).length;

  const updateApplication = (
    application: KycApplication,
    status: KycStatus,
    note: string,
  ) => {
    setApplications((current) =>
      current.map((item) =>
        item.id === application.id
          ? {
              ...item,
              status,
              reviewedAt: new Date().toISOString(),
              adminNote: note,
            }
          : item,
      ),
    );

    setSelectedApplication(null);
  };

  const handleApprove = (
    application: KycApplication,
  ) => {
    updateApplication(
      application,
      "approved",
      "Identity verification approved by administrator.",
    );
  };

  const handleReject = (
    application: KycApplication,
  ) => {
    const reason = window.prompt(
      "Enter the reason for rejecting this KYC application:",
    );

    if (!reason?.trim()) {
      return;
    }

    updateApplication(
      application,
      "rejected",
      reason.trim(),
    );
  };

  const handleMoreInfo = (
    application: KycApplication,
  ) => {
    const note = window.prompt(
      "What additional information should the user provide?",
    );

    if (!note?.trim()) {
      return;
    }

    updateApplication(
      application,
      "more_info_required",
      note.trim(),
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Administration
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          KYC & Verification
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Review and manage user identity verification
          applications.
        </p>
      </div>

      {/* Demo Notice */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 shrink-0 text-blue-600" />

          <div>
            <p className="font-semibold text-blue-900">
              Demo verification management
            </p>

            <p className="mt-1 text-sm text-blue-700">
              Document information shown here is mock data.
              Actual identity verification and document
              storage will be handled securely by the backend
              during integration.
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
                Pending Review
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {pendingCount}
              </p>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
              <Clock3 size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Approved
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {approvedCount}
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
                Rejected
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {rejectedCount}
              </p>
            </div>

            <div className="rounded-lg bg-red-50 p-3 text-red-600">
              <XCircle size={21} />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                More Information
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {moreInfoCount}
              </p>
            </div>

            <div className="rounded-lg bg-yellow-50 p-3 text-yellow-600">
              <FileCheck2 size={21} />
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
                setSearchTerm(event.target.value)
              }
              placeholder="Search ID, username, name or email..."
              className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {[
              { value: "all", label: "All" },
              { value: "pending", label: "Pending" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
              {
                value: "more_info_required",
                label: "More Info",
              },
            ].map((filter) => (
              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setStatusFilter(
                    filter.value as "all" | KycStatus,
                  )
                }
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${
                  statusFilter === filter.value
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
          <table className="w-full min-w-250">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Applicant
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Country
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Documents
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Submitted
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredApplications.map((application) => (
                <tr
                  key={application.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="font-semibold text-slate-900">
                        {application.displayName}
                      </p>

                      <p className="text-sm text-slate-500">
                        @{application.username}
                      </p>

                      <p className="text-xs text-slate-400">
                        {application.email}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {application.country}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <FileText size={16} />
                      {application.documents.length} documents
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      variant={getStatusVariant(
                        application.status,
                      )}
                    >
                      {getStatusLabel(application.status)}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {new Date(
                      application.submittedAt,
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setSelectedApplication(application)
                      }
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="p-10 text-center text-sm text-slate-500">
            No KYC applications match your search.
          </div>
        )}
      </Card>

      {/* Mobile Cards */}
      <div className="space-y-4 lg:hidden">
        {filteredApplications.map((application) => (
          <Card
            key={application.id}
            className="p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  {application.displayName}
                </p>

                <p className="text-sm text-slate-500">
                  @{application.username}
                </p>

                <p className="truncate text-xs text-slate-400">
                  {application.email}
                </p>
              </div>

              <Badge
                variant={getStatusVariant(
                  application.status,
                )}
              >
                {getStatusLabel(application.status)}
              </Badge>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Country
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {application.country}
                </p>
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">
                  Documents
                </p>

                <p className="mt-1 font-medium text-slate-700">
                  {application.documents.length}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                {new Date(
                  application.submittedAt,
                ).toLocaleDateString()}
              </p>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setSelectedApplication(application)
                }
              >
                Review
              </Button>
            </div>
          </Card>
        ))}

        {filteredApplications.length === 0 && (
          <Card className="p-8 text-center text-sm text-slate-500">
            No KYC applications match your search.
          </Card>
        )}
      </div>

      {/* Review Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="border-b border-slate-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    KYC Application
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {selectedApplication.displayName}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    @{selectedApplication.username} ·{" "}
                    {selectedApplication.email}
                  </p>
                </div>

                <Badge
                  variant={getStatusVariant(
                    selectedApplication.status,
                  )}
                >
                  {getStatusLabel(
                    selectedApplication.status,
                  )}
                </Badge>
              </div>
            </div>

            <div className="space-y-5 p-5">
              {/* Applicant */}
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                    <UserCheck size={20} />
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      Applicant Information
                    </p>

                    <p className="text-sm text-slate-500">
                      {selectedApplication.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="font-semibold text-slate-900">
                  Submitted Documents
                </h3>

                <div className="mt-3 space-y-3">
                  {selectedApplication.documents.map(
                    (document) => (
                      <div
                        key={document.id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
                            <FileText size={19} />
                          </div>

                          <div>
                            <p className="font-medium text-slate-900">
                              {document.name}
                            </p>

                            <p className="text-xs text-slate-500">
                              Submitted{" "}
                              {new Date(
                                document.submittedAt,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant={
                            document.status ===
                            "verified"
                              ? "success"
                              : document.status ===
                                "rejected"
                              ? "danger"
                              : "warning"
                          }
                        >
                          {document.status}
                        </Badge>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Admin Note */}
              {selectedApplication.adminNote && (
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                  <p className="text-sm font-semibold text-yellow-900">
                    Admin Note
                  </p>

                  <p className="mt-1 text-sm text-yellow-800">
                    {selectedApplication.adminNote}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() =>
                    setSelectedApplication(null)
                  }
                >
                  Close
                </Button>

                <Button
                  variant="secondary"
                  onClick={() =>
                    handleMoreInfo(
                      selectedApplication,
                    )
                  }
                >
                  Request More Info
                </Button>

                <Button
                  variant="danger"
                  onClick={() =>
                    handleReject(
                      selectedApplication,
                    )
                  }
                >
                  Reject
                </Button>

                <Button
                  onClick={() =>
                    handleApprove(
                      selectedApplication,
                    )
                  }
                >
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminKyc;