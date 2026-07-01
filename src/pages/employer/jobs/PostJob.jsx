import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

const fieldClass =
  "w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-orange-600 dark:border-zinc-800 dark:bg-black";

const labelClass = "mb-2 block text-sm font-black";

export default function PostJob() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    title: "",
    department: "",
    type: "Full-time",
    mode: "Hybrid",
    location: "",
    salary: "",
    deadline: "",
    skills: "",
    description: "",
  });

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const skillsList = form.skills
    .split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);

  const goNext = () => {
    if (step === 1 && (!form.title || !form.department || !form.location)) {
      toast.error("Please fill job title, department, and location.");
      return;
    }

    if (step === 2 && (!form.skills || !form.description)) {
      toast.error("Please add required skills and job description.");
      return;
    }

    setStep((current) => current + 1);
  };

  const goBack = () => {
    setStep((current) => current - 1);
  };

  const publishJob = () => {
    toast.success("Job posted successfully.");
    navigate("/employer/jobs");
  };

   return (
    <div>
      <PageHeader
        title="Post a Job"
        subtitle="Create a new job posting manually or generate a professional job description using AI."
        action={
          <Button
            variant="secondary"
            onClick={() => navigate("/employer/ai-job-description")}
          >
            <Sparkles size={18} />
            Generate with AI
          </Button>
        }
      />

      <Card>
        <StepIndicator step={step} />

        {step === 1 && (
          <BasicInfoStep form={form} updateForm={updateForm} />
        )}

        {step === 2 && (
          <RequirementsStep form={form} updateForm={updateForm} />
        )}

        {step === 3 && (
          <ReviewStep form={form} skillsList={skillsList} />
        )}

        <div className="mt-8 flex flex-wrap justify-between gap-3">
          <Button variant="secondary" disabled={step === 1} onClick={goBack}>
            <ArrowLeft size={18} />
            Back
          </Button>

          {step < 3 ? (
            <Button onClick={goNext}>
              Continue
              <ArrowRight size={18} />
            </Button>
          ) : (
            <Button onClick={publishJob}>
              <CheckCircle2 size={18} />
              Publish Job
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function StepIndicator({ step }) {
  return (
    <div className="mb-8 flex justify-center gap-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-black ${
            step >= item
              ? "bg-orange-600 text-white"
              : "bg-slate-100 text-slate-400 dark:bg-slate-800"
          }`}
        >
          {step > item ? <CheckCircle2 size={16} /> : item}
        </div>
      ))}
    </div>
  );
}

function BasicInfoStep({ form, updateForm }) {
  return (
    <div>
      <h2 className="text-2xl font-black">Basic Job Information</h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Add the main job details that candidates will see first.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label className={labelClass}>Job Title</label>
          <input
            value={form.title}
            onChange={(event) => updateForm("title", event.target.value)}
            placeholder="Example: Junior React Developer"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass}>Department</label>
          <input
            value={form.department}
            onChange={(event) => updateForm("department", event.target.value)}
            placeholder="Example: Engineering"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass}>Job Type</label>
          <select
            value={form.type}
            onChange={(event) => updateForm("type", event.target.value)}
            className={fieldClass}
          >
           
                     <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Contract</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Work Mode</label>
          <select
            value={form.mode}
            onChange={(event) => updateForm("mode", event.target.value)}
            className={fieldClass}
          >
            <option>On-site</option>
            <option>Hybrid</option>
            <option>Remote</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Location</label>
          <input
            value={form.location}
            onChange={(event) => updateForm("location", event.target.value)}
            placeholder="Example: Colombo, Sri Lanka"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass}>Salary Range</label>
          <input
            value={form.salary}
            onChange={(event) => updateForm("salary", event.target.value)}
            placeholder="Example: LKR 120,000 - 180,000"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass}>Application Deadline</label>
          <input
            value={form.deadline}
            onChange={(event) => updateForm("deadline", event.target.value)}
            type="date"
            className={fieldClass}
          />
        </div>
      </div>
    </div>
  );
}

function RequirementsStep({ form, updateForm }) {
  return (
    <div>
      <h2 className="text-2xl font-black">Requirements & Description</h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Add the required skills and full job description for candidates.
      </p>

      <div className="mt-6 grid gap-4">
        <div>
          <label className={labelClass}>Required Skills</label>

          <input
            value={form.skills}
            onChange={(event) => updateForm("skills", event.target.value)}
            placeholder="Example: React, JavaScript, REST API, Git"
            className={fieldClass}
          />

          <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Separate each skill using comma.
          </p>
        </div>

        <div>
          <label className={labelClass}>Job Description</label>

          <textarea
            value={form.description}
            onChange={(event) => updateForm("description", event.target.value)}
            rows={9}
            placeholder="Write job responsibilities, requirements, and expectations..."
            className={`${fieldClass} leading-7`}
          />
        </div>
      </div>
    </div>
  );
}

function ReviewStep({ form, skillsList }) {
  return (
    <div>
      <h2 className="text-2xl font-black">Review & Publish</h2>

      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Check the job details before publishing.
      </p>

      <div className="mt-6 rounded-[2rem] border border-slate-200 p-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-2xl font-black">
            {form.title || "Untitled Job"}
          </h3>

          <Badge variant="primary">{form.type}</Badge>
          <Badge variant="info">{form.mode}</Badge>
        </div>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          {form.department || "Department"} · {form.location || "Location"} ·{" "}
          {form.salary || "Salary not added"}
        </p>

        <div className="mt-5">
          <h4 className="mb-3 text-sm font-black">Required Skills</h4>

          <div className="flex flex-wrap gap-2">
            {skillsList.length > 0 ? (
              skillsList.map((skill) => (
                <Badge key={skill} variant="primary">
                  {skill}
                </Badge>
              ))
            ) : (
              <Badge variant="warning">No skills added</Badge>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h4 className="mb-3 text-sm font-black">Job Description</h4>

          <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-600 dark:bg-slate-950 dark:text-slate-300">
            {form.description || "No description added."}
          </p>
        </div>

        <div className="mt-5 rounded-lg bg-orange-50 p-4 text-sm font-bold text-orange-700 dark:bg-orange-950/30 dark:text-orange-300">
          Deadline: {form.deadline || "Not selected"}
        </div>
      </div>
    </div>
  );
}


