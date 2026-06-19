import { Bell, CheckCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

import { employerNotifications as initialNotifications } from "../../../data/mockEmployerData";

export default function EmployerNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

    toast.success("All notifications marked as read.");
  };

  const deleteNotification = (notificationId) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== notificationId)
    );

    toast.success("Notification deleted.");
  };

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount} unread employer notification${
          unreadCount !== 1 ? "s" : ""
        }`}
        action={
          <Button variant="secondary" onClick={markAllRead}>
            <CheckCheck size={18} />
            Mark All Read
          </Button>
        }
      />

      <NotificationList
        notifications={notifications}
        deleteNotification={deleteNotification}
      />
    </div>
  );
}

function NotificationList({ notifications, deleteNotification }) {
  if (notifications.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500 dark:bg-slate-900">
            <Bell size={32} />
          </div>

          <h3 className="mt-5 text-lg font-black">No notifications</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Employer notifications will appear here.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          deleteNotification={deleteNotification}
        />
      ))}
    </div>
  );
}

function NotificationCard({ notification, deleteNotification }) {
  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-black">{notification.title}</h3>

            {!notification.read && <Badge variant="primary">New</Badge>}

            <Badge variant="neutral">{notification.type}</Badge>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
            {notification.message}
          </p>

          <p className="mt-2 text-xs font-bold text-slate-400">
            {notification.time}
          </p>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={() => deleteNotification(notification.id)}
        >
          <Trash2 size={15} />
          Delete
        </Button>
      </div>
    </Card>
  );
}

