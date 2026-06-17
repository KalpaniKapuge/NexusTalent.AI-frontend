import { CheckCheck, Trash2 } from "lucide-react";
import { useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";

import { notifications as initialNotifications } from "../../../data/mockCandidateData";

export default function CandidateNotifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read: true,
      }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  };

  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle={`${unreadCount} unread notification${
          unreadCount !== 1 ? "s" : ""
        }`}
        action={
          <Button variant="secondary" onClick={markAllRead}>
            <CheckCheck size={18} />
            Mark All Read
          </Button>
        }
      />

      <div className="grid gap-4">
        {notifications.map((notification) => (
          <Card key={notification.id}>
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
        ))}
      </div>
    </div>
  );
}