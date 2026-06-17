import { ArrowLeft, CheckCircle2, Send, XCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import MatchScoreCard from "../../../components/ai/MatchScoreCard";
import SkillTag from "../../../components/ai/SkillTag";

import { jobs } from "../../../data/mockCandidateData";

export default function JobDetail() {
  const { jobId } = useParams();

  const job = jobs.find((item) => item.id === Number(jobId)) || jobs[0];

  const applyJob = () => {
    toast.success("Application submitted successfully.");
  };

  return (
    <div>
      <Link
        to="/candidate/jobs"
        className="mb-5 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-indigo-600 dark:text-slate-400"
      >
        <ArrowLeft size={16} />
        Back to jobs
      </Link>

      <PageHeader
        title={job.title}
        subtitle={`${job.company} · ${job.location} · ${job.type} · ${job.mode}`}
        action={
          <Button onClick={applyJob}>
            <Send size={18} />
            Apply Now
          </Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card title="Job Overview">
            <div className="flex flex-wrap gap-3">
              <Badge variant="primary">{job.industry}</Badge>
              <Badge variant="info">{job.salary}</Badge>
              <Badge variant="neutral">{job.applicants} applicants</Badge>
              <Badge variant="success">Posted {job.posted}</Badge>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500 dark:text-slate-400">
              {job.description}
            </p>
          </Card>

          <Card title="Responsibilities">
            <div className="space-y-3">
              {job.responsibilities.map((item) => (
                <div key={item} className="flex gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 text-emerald-600"
                  />
                  <p className="text-sm font-bold">{item}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Required Skills">
            <div className="flex flex-wrap gap-3">
              {job.requiredSkills.map((skill) => (
                <SkillTag key={skill} name={skill} />
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <MatchScoreCard score={job.matchScore} />

          <Card title="Matched Skills">
            <div className="flex flex-wrap gap-3">
              {job.matchedSkills.map((skill) => (
                <SkillTag key={skill} name={skill} type="matched" />
              ))}
            </div>
          </Card>

          <Card title="Missing Skills">
            <div className="space-y-3">
              {job.missingSkills.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-3 rounded-2xl bg-red-50 p-3 text-sm font-bold text-red-700 dark:bg-red-950/30 dark:text-red-300"
                >
                  <XCircle size={16} />
                  {skill}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}