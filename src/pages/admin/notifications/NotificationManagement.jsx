import { Bell, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import { adminNotifications } from "../../../data/mockAdminData";

export default function NotificationManagement() {
  const [notifications, setNotifications] = useState(adminNotifications);

  const markAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, read: true }))
    );
    toast.success("All notifications marked as read.");
  };

  return (
    <div>
      <PageHeader
        title="Notifications"
        subtitle="Track admin alerts for employer verification, resume reviews, and AI operations."
        action={
          <Button variant="secondary" onClick={markAllRead}>
            <CheckCircle2 size={18} />
            Mark All Read
          </Button>
        }
      />

      <div className="grid gap-5">
        {notifications.map((notification) => (
          <Card key={notification.id} hover>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
                <Bell size={22} />
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-black">{notification.title}</h2>
                  {!notification.read && <Badge variant="primary">New</Badge>}
                  <Badge variant="neutral">{notification.type}</Badge>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {notification.message}
                </p>

                <p className="mt-3 text-xs font-bold text-slate-400">
                  {notification.time}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
