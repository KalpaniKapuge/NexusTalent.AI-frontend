import { CalendarDays, Clock, Save, UserRound } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import Button from "../../../components/common/Button";
import Card from "../../../components/common/Card";
import PageHeader from "../../../components/common/PageHeader";
import { employerCandidates, employerJobs } from "../../../data/mockEmployerData";

const defaultForm = {
  candidateId: String(employerCandidates[0]?.id || ""),
  jobId: String(employerJobs[0]?.id || ""),
  interviewType: "Technical Interview",
  date: "2026-06-27",
  time: "10:00",
  mode: "Google Meet",
  interviewer: "Kasun Fernando",
  notes: "",
};

export default function ScheduleInterview() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(defaultForm);

  const updateField = (field, value) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.candidateId || !formData.jobId || !formData.date || !formData.time) {
      toast.error("Candidate, job, date, and time are required.");
      return;
    }

    toast.success("Interview scheduled successfully.");
    navigate("/employer/interviews");
  };

  return (
    <div>
      <PageHeader
        title="Schedule Interview"
        subtitle="Create an interview invitation for a shortlisted candidate."
      />

      <Card>
        <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-2">
          <FormField label="Candidate" icon={UserRound}>
            <select
              value={formData.candidateId}
              onChange={(event) => updateField("candidateId", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            >
              {employerCandidates.map((candidate) => (
                <option key={candidate.id} value={candidate.id}>
                  {candidate.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Job">
            <select
              value={formData.jobId}
              onChange={(event) => updateField("jobId", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            >
              {employerJobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Interview Type">
            <select
              value={formData.interviewType}
              onChange={(event) =>
                updateField("interviewType", event.target.value)
              }
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            >
              <option>Technical Interview</option>
              <option>HR Interview</option>
              <option>Final Interview</option>
            </select>
          </FormField>

          <FormField label="Mode">
            <select
              value={formData.mode}
              onChange={(event) => updateField("mode", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            >
              <option>Google Meet</option>
              <option>Microsoft Teams</option>
              <option>On-site</option>
            </select>
          </FormField>

          <FormField label="Date" icon={CalendarDays}>
            <input
              type="date"
              value={formData.date}
              onChange={(event) => updateField("date", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />
          </FormField>

          <FormField label="Time" icon={Clock}>
            <input
              type="time"
              value={formData.time}
              onChange={(event) => updateField("time", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />
          </FormField>

          <FormField label="Interviewer">
            <input
              value={formData.interviewer}
              onChange={(event) => updateField("interviewer", event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
            />
          </FormField>

          <div className="lg:col-span-2">
            <FormField label="Notes">
              <textarea
                rows={5}
                value={formData.notes}
                onChange={(event) => updateField("notes", event.target.value)}
                placeholder="Add interview focus areas, questions, or internal notes."
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black"
              />
            </FormField>
          </div>

          <div className="flex flex-wrap justify-end gap-3 lg:col-span-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/employer/interviews")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save size={16} />
              Schedule Interview
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function FormField({ label, icon: Icon, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-zinc-200">
        {Icon && <Icon size={16} />}
        {label}
      </span>
      {children}
    </label>
  );
}
