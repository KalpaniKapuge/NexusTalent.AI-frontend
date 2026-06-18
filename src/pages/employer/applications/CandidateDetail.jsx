function ApplicationList({
  candidates,
  updateCandidateStatus,
  generateFeedback,
}) {
  if (candidates.length === 0) {
    return (
      <Card>
        <div className="py-10 text-center">
          <h3 className="text-lg font-black">No applications found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing your search text.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {candidates.map((candidate) => (
        <CandidateApplicationCard
          key={candidate.id}
          candidate={candidate}
          updateCandidateStatus={updateCandidateStatus}
          generateFeedback={generateFeedback}
        />
      ))}
    </div>
  );
}

function CandidateApplicationCard({
  candidate,
  updateCandidateStatus,
  generateFeedback,
}) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{candidate.name}</h2>

            <Badge variant={getStatusVariant(candidate.status)}>
              {candidate.status}
            </Badge>
          </div>

          <p className="mt-2 text-sm font-bold text-indigo-600">
            {candidate.title}
          </p>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            {candidate.location} · Applied {candidate.appliedDate}
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            {candidate.summary}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {candidate.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>

        <div className="w-full xl:w-72">
          <ProgressBar
            label="AI Match Score"
            value={candidate.score}
            showValue
            tone={candidate.score >= 80 ? "success" : "warning"}
          />

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Link to={`/employer/candidates/${candidate.id}`}>
              <Button variant="secondary" fullWidth>
                <Eye size={16} />
                View
              </Button>
            </Link>

            <Button
              fullWidth
              onClick={() =>
                updateCandidateStatus(candidate.id, "Shortlisted")
              }
            >
              <UserCheck size={16} />
              Shortlist
            </Button>

            <Button
              variant="danger"
              fullWidth
              onClick={() => updateCandidateStatus(candidate.id, "Rejected")}
            >
              <UserX size={16} />
              Reject
            </Button>

            <Button
              variant="secondary"
              fullWidth
              onClick={() => generateFeedback(candidate.name)}
            >
              <MessageSquare size={16} />
              Feedback
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

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

                  <Badge
                    variant={
                      candidate.status === "Shortlisted"
                        ? "success"
                        : candidate.status === "Rejected"
                        ? "danger"
                        : "warning"
                    }
                  >
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
              <ProgressBar
                label="Skill Score"
                value={candidate.skillScore}
                showValue
              />

              <ProgressBar
                label="Experience Score"
                value={candidate.experienceScore}
                tone="info"
                showValue
              />

              <ProgressBar
                label="Education Score"
                value={candidate.educationScore}
                tone="success"
                showValue
              />

              <ProgressBar
                label="Certification Score"
                value={candidate.certificationScore}
                tone="warning"
                showValue
              />

              <ProgressBar
                label="Semantic Similarity"
                value={candidate.semanticScore}
                tone="primary"
                showValue
              />
            </div>
          </Card>

                    <Card title="Education & Experience">
            <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <div className="text-sm font-bold text-slate-500">
                  Education
                </div>

                <div className="mt-1 font-black">
                  {candidate.education}
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950">
                <div className="text-sm font-bold text-slate-500">
                  Experience
                </div>

                <div className="mt-1 font-black">
                  {candidate.experience}
                </div>
              </div>
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



 