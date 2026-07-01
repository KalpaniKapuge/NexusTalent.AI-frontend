import {
  Building2,
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

import { employerCompany } from "../../../data/mockEmployerData";

export default function CompanyProfile() {
  const handleSave = () => {
    toast.success("Company profile updated successfully.");
  };

  return (
    <div>
      <PageHeader
        title="Company Workspace Profile"
        subtitle="Manage your company identity, employer brand, contact details, and platform verification status."
        action={<Button onClick={handleSave}>Save Changes</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex flex-col gap-6 md:flex-row">
            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-orange-600 text-white shadow-sm">
              <Building2 size={42} />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-black">
                  {employerCompany.name}
                </h2>

                <Badge variant="success">
                  <ShieldCheck size={13} className="mr-1" />
                  {employerCompany.verificationStatus}
                </Badge>
              </div>

              <p className="mt-2 text-sm font-semibold text-orange-600">
                {employerCompany.industry}
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                {employerCompany.description}
              </p>

              <div className="mt-5 grid gap-3 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-2">
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {employerCompany.location}
                </span>

                <span className="flex items-center gap-2">
                  <Mail size={16} />
                  {employerCompany.email}
                </span>

                <span className="flex items-center gap-2">
                  <Phone size={16} />
                  {employerCompany.phone}
                </span>

                <span className="flex items-center gap-2">
                  <Globe size={16} />
                  {employerCompany.website}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Workspace Summary">
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-900">
              <div className="text-sm font-bold text-slate-500">
                Company Size
              </div>

              <div className="mt-1 flex items-center gap-2 font-black">
                <Users size={18} className="text-orange-600" />
                {employerCompany.size}
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-4 dark:bg-zinc-900">
              <div className="text-sm font-bold text-slate-500">
                Founded
              </div>

              <div className="mt-1 font-black">
                {employerCompany.founded}
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
              <div className="text-sm font-black text-emerald-700 dark:text-emerald-300">
                Verified company workspace
              </div>

              <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-300/80">
                Candidates can trust job postings published by this company.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Editable Company Details">
          <div className="grid gap-4">
            <input
              defaultValue={employerCompany.name}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />

            <input
              defaultValue={employerCompany.industry}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />

            <input
              defaultValue={employerCompany.website}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />

            <textarea
              rows={5}
              defaultValue={employerCompany.description}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />
          </div>
        </Card>

        <Card title="Contact Information">
          <div className="grid gap-4">
            <input
              defaultValue={employerCompany.email}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />

            <input
              defaultValue={employerCompany.phone}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />

            <input
              defaultValue={employerCompany.location}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />

            <Button onClick={handleSave}>Update Company Profile</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
