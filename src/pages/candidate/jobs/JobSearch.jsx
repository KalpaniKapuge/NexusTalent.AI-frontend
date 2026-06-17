import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import { jobs } from "../../../data/mockCandidateData";

export default function JobSearch() {
  const [search, setSearch] = useState("");
  const [minMatch, setMinMatch] = useState(0);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        job.requiredSkills.some((skill) =>
          skill.toLowerCase().includes(keyword)
        );

      const matchesScore = job.matchScore >= minMatch;

      return matchesSearch && matchesScore;
    });
  }, [search, minMatch]);

  return (
    <div>
      <PageHeader
        title="Browse Jobs"
        subtitle="Search jobs, view AI match scores, compare missing skills, and apply to suitable opportunities."
      />

      <Card className="mb-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_220px]">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
            <Search size={18} className="text-slate-400" />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by job title, company, or skill..."
              className="w-full bg-transparent text-sm font-semibold outline-none"
            />
          </div>

          <select
            value={minMatch}
            onChange={(event) => setMinMatch(Number(event.target.value))}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
          >
            <option value={0}>All Match Scores</option>
            <option value={60}>60% and above</option>
            <option value={70}>70% and above</option>
            <option value={80}>80% and above</option>
          </select>
        </div>
      </Card>

      <div className="grid gap-5">
        {filteredJobs.map((job) => (
          <Card key={job.id} hover>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black">{job.title}</h2>
                  <Badge variant="primary">{job.type}</Badge>
                  <Badge variant="info">{job.mode}</Badge>
                </div>

                <p className="mt-2 text-sm font-bold text-indigo-600">
                  {job.company}
                </p>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {job.location} · {job.salary} · Posted {job.posted}
                </p>

                <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {job.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>

              <div className="w-full shrink-0 lg:w-56">
                <div className="text-center">
                  <div className="text-4xl font-black text-indigo-600">
                    {job.matchScore}%
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    AI Match
                  </div>
                </div>

                <div className="mt-4">
                  <ProgressBar value={job.matchScore} showValue={false} />
                </div>

                <Link to={`/candidate/jobs/${job.id}`} className="mt-5 block">
                  <Button fullWidth>View Details</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}