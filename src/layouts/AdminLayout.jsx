import DashboardLayout from "./DashboardLayout";
import { adminNav } from "../components/navigation/adminNav";

export default function AdminLayout() {
  return (
    <DashboardLayout
      navItems={adminNav}
      userRole="admin"
      portalName="Admin Portal"
      portalSubtitle="System Management"
    />
  );
}