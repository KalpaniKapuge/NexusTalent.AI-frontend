import {
  ArrowLeft,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  UserCheck,
  UserX,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";
import MatchScoreCard from "../../../components/ai/MatchScoreCard";
import SkillTag from "../../../components/ai/SkillTag";
import { employerCandidates } from "../../../data/mockEmployerData";

export default function CandidateDetail() {
  const { candidateId } = useParams();

  const candidate =
    employerCandidates.find((item) => item.id === Number(candidateId)) ||
    employerCandidates[0];

  const shortlistCandidate = () => {
    toast.success(`${candidate.name} shortlisted successfully.`);
  };

  const rejectCandidate = () => {
    toast.success(`${candidate.name} rejected successfully.`);
  };

  const generateFeedback = () => {
    toast.success("Personalized feedback generated successfully.");
  };

  return (
    <div>
      <Link
        to="/employer/applications"
        className="mb-5 inline-flex items-center gap-2 text-sm font-black text-slate-500 hover:text-indigo-600 dark:text-slate-400"
      >
        <ArrowLeft size={16} />
        Back to applications
      </Link>

      <PageHeader
        title={candidate.name}
        subtitle={candidate.title}
        action={
          <div className="flex flex-wrap gap-3">
            <Button onClick={shortlistCandidate}>
              <UserCheck size={18} />
              Shortlist
            </Button>

            <Button variant="danger" onClick={rejectCandidate}>
              <UserX size={18} />
              Reject
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <Card>
            <div className="flex flex-col gap-6 md:flex-row">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-3xl font-black text-white">
                {candidate.name
                  .split(" ")
                  .map((name) => name[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-3xl font-black">{candidate.name}</h2>
                  <Badge variant={getStatusVariant(candidate.status)}>
                    {candidate.status}
                  </Badge>
                </div>

                <p className="mt-1 text-sm font-bold text-indigo-600">
                  {candidate.title}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {candidate.summary}
                </p>

                <div className="mt-5 grid gap-3 text-sm text-slate-500 dark:text-slate-400 sm:grid-cols-2">
                  <span className="flex items-center gap-2">
                    <Mail size={16} />
                    {candidate.email}
                  </span>
                  <span className="flex items-center gap-2">
                    <Phone size={16} />
                    {candidate.phone}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={16} />
                    {candidate.location}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          <Card title="AI Score Breakdown">
            <div className="space-y-5">
              <ProgressBar label="Skill Score" value={candidate.skillScore} />
              <ProgressBar
                label="Experience Score"
                value={candidate.experienceScore}
                tone="info"
              />
              <ProgressBar
                label="Education Score"
                value={candidate.educationScore}
                tone="success"
              />
              <ProgressBar
                label="Certification Score"
                value={candidate.certificationScore}
                tone="warning"
              />
              <ProgressBar
                label="Semantic Similarity"
                value={candidate.semanticScore}
              />
            </div>
          </Card>

          <Card title="Education & Experience">
            <div className="space-y-4">
              <ProfileFact label="Education" value={candidate.education} />
              <ProfileFact label="Experience" value={candidate.experience} />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <MatchScoreCard score={candidate.score} />

          <Card title="Matched Skills">
            <div className="flex flex-wrap gap-3">
              {candidate.matchedSkills.map((skill) => (
                <SkillTag key={skill} name={skill} type="matched" />
              ))}
            </div>
          </Card>

          <Card title="Missing Skills">
            <div className="space-y-3">
              {candidate.missingSkills.map((skill) => (
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

          <Card title="Decision Actions">
            <div className="space-y-3">
              <Button fullWidth onClick={shortlistCandidate}>
                <CheckCircle2 size={18} />
                Shortlist Candidate
              </Button>

              <Button fullWidth variant="danger" onClick={rejectCandidate}>
                <XCircle size={18} />
                Reject Candidate
              </Button>

              <Button fullWidth variant="secondary" onClick={generateFeedback}>
                Generate Feedback
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ProfileFact({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
      <div className="text-sm font-bold text-slate-500">{label}</div>
      <div className="mt-1 font-black">{value}</div>
    </div>
  );
}

function getStatusVariant(status) {
  if (status === "Shortlisted") return "success";
  if (status === "Rejected") return "danger";
  return "warning";
}
