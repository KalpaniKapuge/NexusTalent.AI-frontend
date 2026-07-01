import {
  Ban,
  CheckCircle2,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

import { adminUsers } from "../../../data/mockAdminData";

function getStatusVariant(status) {
  if (status === "Active") return "success";
  if (status === "Pending") return "warning";
  if (status === "Suspended") return "danger";

  return "neutral";
}

function getRoleVariant(role) {
  if (role === "Admin") return "primary";
  if (role === "Employer") return "info";
  if (role === "Candidate") return "success";

  return "neutral";
}

export default function ManageUsers() {
  const [users, setUsers] = useState(adminUsers);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = role === "All" || user.role === role;

      const matchesStatus = status === "All" || user.status === status;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, status]);

  const updateUserStatus = (userId, newStatus) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: newStatus,
            }
          : user
      )
    );

    toast.success(`User marked as ${newStatus}.`);
  };

  const deleteUser = (userId) => {
    setUsers((current) => current.filter((user) => user.id !== userId));
    toast.success("User removed from list.");
  };

  const createUser = () => {
    toast.success("Create user form will be connected with backend later.");
  };

  return (
    <div>
      <PageHeader
        title="Manage Users"
        subtitle="View, search, filter, activate, suspend, and manage all system users."
        action={
          <Button onClick={createUser}>
            <UserPlus size={18} />
            Add User
          </Button>
        }
      />

      <UserSummary users={users} />

      <UserFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
      />

      <UserList
        users={filteredUsers}
        updateUserStatus={updateUserStatus}
        deleteUser={deleteUser}
      />
    </div>
  );
}

function UserSummary({ users }) {
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const pendingUsers = users.filter((user) => user.status === "Pending").length;
  const suspendedUsers = users.filter(
    (user) => user.status === "Suspended"
  ).length;

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-4">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Users size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{users.length}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Total Users
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
            <CheckCircle2 size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{activeUsers}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Active
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300">
            <ShieldCheck size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{pendingUsers}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Pending
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300">
            <Ban size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{suspendedUsers}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Suspended
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function UserFilters({ search, setSearch, role, setRole, status, setStatus }) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 xl:grid-cols-[1fr_200px_200px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          <option>Candidate</option>
          <option>Employer</option>
          <option>Admin</option>
        </select>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Suspended</option>
        </select>
      </div>
    </Card>
  );
}

function UserList({ users, updateUserStatus, deleteUser }) {
  if (users.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No users found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing your search text, role filter, or status filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          updateUserStatus={updateUserStatus}
          deleteUser={deleteUser}
        />
      ))}
    </div>
  );
}

function UserCard({ user, updateUserStatus, deleteUser }) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-600 text-lg font-semibold text-white">
            {user.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-black">{user.name}</h2>

              <Badge variant={getRoleVariant(user.role)}>{user.role}</Badge>

              <Badge variant={getStatusVariant(user.status)}>
                {user.status}
              </Badge>
            </div>

            <p className="mt-2 text-sm font-bold text-orange-600">
              {user.email}
            </p>

            <div className="mt-3 grid gap-2 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-2">
              <span>Joined: {user.joinedDate}</span>
              <span>Last Login: {user.lastLogin}</span>
            </div>
          </div>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-3 xl:w-auto">
          <Button
            variant="secondary"
            onClick={() => updateUserStatus(user.id, "Active")}
          >
            <CheckCircle2 size={16} />
            Activate
          </Button>

          <Button
            variant="danger"
            onClick={() => updateUserStatus(user.id, "Suspended")}
          >
            <Ban size={16} />
            Suspend
          </Button>

          <Button variant="danger" onClick={() => deleteUser(user.id)}>
            <Trash2 size={16} />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}

