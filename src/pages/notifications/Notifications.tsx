import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Trash2,
  Wallet,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";

import type {
  Notification,
  NotificationType,
} from "../../types/notification.types";

import {
  deleteNotification,
  getNotifications,
  initializeNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../../utility/notificationStorage";

import { notifications as defaultNotifications } from "../../data/notifications";

function Notifications() {
  const [
    notificationList,
    setNotificationList,
  ] = useState<Notification[]>([]);

  const [filter, setFilter] =
    useState<
      "all" | NotificationType
    >("all");

  useEffect(() => {
    const data =
      initializeNotifications(
        defaultNotifications,
      );

    setNotificationList(data);
  }, []);

  const refreshNotifications = () => {
    setNotificationList(
      getNotifications(),
    );
  };

  const unreadCount =
    notificationList.filter(
      (notification) =>
        !notification.isRead,
    ).length;

  const filteredNotifications =
    notificationList.filter(
      (notification) =>
        filter === "all" ||
        notification.type === filter,
    );

  const getIcon = (
    type: NotificationType,
  ) => {
    switch (type) {
      case "order":
        return (
          <CheckCircle2
            size={20}
          />
        );

      case "payment":
        return (
          <CreditCard
            size={20}
          />
        );

      case "wallet":
        return (
          <Wallet size={20} />
        );

      case "security":
        return (
          <ShieldCheck
            size={20}
          />
        );

      case "system":
        return (
          <AlertTriangle
            size={20}
          />
        );
    }
  };

  const getIconStyle = (
    type: NotificationType,
  ) => {
    switch (type) {
      case "order":
        return "bg-blue-50 text-blue-600";

      case "payment":
        return "bg-yellow-50 text-yellow-600";

      case "wallet":
        return "bg-green-50 text-green-600";

      case "security":
        return "bg-purple-50 text-purple-600";

      case "system":
        return "bg-slate-100 text-slate-600";
    }
  };

  const getTypeLabel = (
    type: NotificationType,
  ) => {
    const labels: Record<
      NotificationType,
      string
    > = {
      order: "P2P Order",
      payment: "Payment",
      wallet: "Wallet",
      security: "Security",
      system: "System",
    };

    return labels[type];
  };

  const formatDate = (
    date: string,
  ) => {
    return new Date(
      date,
    ).toLocaleString("en-NG", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleRead = (
    notificationId: string,
  ) => {
    markNotificationAsRead(
      notificationId,
    );

    refreshNotifications();
  };

  const handleMarkAllRead = () => {
    markAllNotificationsAsRead();

    refreshNotifications();
  };

  const handleDelete = (
    notificationId: string,
  ) => {
    deleteNotification(
      notificationId,
    );

    refreshNotifications();
  };

  return (
    <div className="mx-auto w-full max-w-5xl">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Bell
              size={22}
              className="text-blue-600"
            />

            <h1 className="text-2xl font-bold text-slate-900">
              Notifications
            </h1>

            {unreadCount > 0 && (
              <Badge variant="info">
                {unreadCount} unread
              </Badge>
            )}
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Stay updated on your account and P2P activity.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={
              handleMarkAllRead
            }
            className="w-full sm:w-auto"
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex gap-1 overflow-x-auto p-2">
          {[
            {
              label: "All",
              value: "all",
            },
            {
              label: "P2P Orders",
              value: "order",
            },
            {
              label: "Payments",
              value: "payment",
            },
            {
              label: "Wallet",
              value: "wallet",
            },
            {
              label: "Security",
              value: "security",
            },
            {
              label: "System",
              value: "system",
            },
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() =>
                setFilter(
                  item.value as
                    | "all"
                    | NotificationType,
                )
              }
              className={`shrink-0 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                filter === item.value
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Notification List */}
      {filteredNotifications.length ===
      0 ? (
        <Card className="p-10 text-center sm:p-14">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Bell
              size={25}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-lg font-bold text-slate-900">
            No notifications
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            There are no notifications in this category.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredNotifications.map(
            (notification) => (
              <Card
                key={notification.id}
                className={`overflow-hidden p-4 sm:p-5 ${
                  !notification.isRead
                    ? "border-blue-100 bg-blue-50/30"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${getIconStyle(
                      notification.type,
                    )}`}
                  >
                    {getIcon(
                      notification.type,
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="wrap-break-words text-sm font-bold text-slate-900">
                            {notification.title}
                          </h2>

                          {!notification.isRead && (
                            <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                          )}
                        </div>

                        <Badge variant="neutral">
                          {getTypeLabel(
                            notification.type,
                          )}
                        </Badge>
                      </div>

                      <span className="shrink-0 text-xs text-slate-400">
                        {formatDate(
                          notification.createdAt,
                        )}
                      </span>
                    </div>

                    <p className="mt-2 wrap-break-words text-sm leading-6 text-slate-600">
                      {notification.message}
                    </p>

                    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                      {!notification.isRead && (
                        <button
                          type="button"
                          onClick={() =>
                            handleRead(
                              notification.id,
                            )
                          }
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 sm:w-auto"
                        >
                          Mark as Read
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            notification.id,
                          )
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500 hover:border-red-200 hover:bg-red-50 hover:text-red-600 sm:w-auto"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ),
          )}
        </div>
      )}

      {/* Demo Notice */}
      <Card className="mt-6 border-blue-100 bg-blue-50 p-4 sm:p-5">
        <p className="text-sm font-semibold text-blue-800">
          Notification Demo
        </p>

        <p className="mt-1 text-xs leading-5 text-blue-700">
          Notifications are currently simulated and stored
          locally in your browser. Real-time notifications
          will be connected to the backend later.
        </p>
      </Card>
    </div>
  );
}

export default Notifications;