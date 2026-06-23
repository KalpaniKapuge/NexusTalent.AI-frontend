import {
  CheckCircle2,
  FileSearch,
  Search,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";

import { resumeExtractionReviews } from "../../../data/mockAdminData";

function getStatusVariant(status) {
  if (status === "Approved") return "success";
  if (status === "Pending") return "warning";
  if (status === "Needs Review") return "danger";

  return "neutral";
}

export default function ResumeExtractionReview() {
  const [reviews, setReviews] = useState(resumeExtractionReviews);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.candidateName.toLowerCase().includes(search.toLowerCase()) ||
        review.fileName.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || review.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [reviews, search, status]);

  const updateReviewStatus = (reviewId, newStatus) => {
    setReviews((current) =>
      current.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              status: newStatus,
              reviewedBy: "Admin",
            }
          : review
      )
    );

    toast.success(`Resume extraction marked as ${newStatus}.`);
  };

   return (
    <div>
      <PageHeader
        title="Resume Extraction Review"
        subtitle="Review AI-extracted resume data, validate extracted skills, and approve or flag records for correction."
      />

      <ReviewSummary reviews={reviews} />

      <ReviewFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <ReviewList
        reviews={filteredReviews}
        updateReviewStatus={updateReviewStatus}
      />
    </div>
  );
}

function ReviewSummary({ reviews }) {
  const approvedCount = reviews.filter(
    (review) => review.status === "Approved"
  ).length;

  const pendingCount = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const needsReviewCount = reviews.filter(
    (review) => review.status === "Needs Review"
  ).length;

  return (
    <div className="mb-6 grid gap-5 md:grid-cols-3">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
            <ShieldCheck size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{approvedCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Approved
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300">
            <FileSearch size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{pendingCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Pending
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-300">
            <XCircle size={24} />
          </div>

          <div>
            <div className="text-2xl font-black">{needsReviewCount}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Needs Review
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function ReviewFilters({ search, setSearch, status, setStatus }) {
  return (
    <Card className="mb-6">
      <div className="grid gap-4 md:grid-cols-[1fr_220px]">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 dark:border-slate-800">
          <Search size={18} className="text-slate-400" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search candidate name or resume file..."
            className="w-full bg-transparent text-sm font-semibold outline-none"
          />
        </div>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none dark:border-slate-800 dark:bg-slate-900"
        >
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
          <option>Needs Review</option>
        </select>
      </div>
    </Card>
  );
}

function ReviewList({ reviews, updateReviewStatus }) {
  if (reviews.length === 0) {
    return (
      <Card>
        <div className="py-12 text-center">
          <h3 className="text-lg font-black">No resume reviews found</h3>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try changing search text or status filter.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-5">
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
          updateReviewStatus={updateReviewStatus}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, updateReviewStatus }) {
  return (
    <Card hover>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-black">{review.candidateName}</h2>

            <Badge variant={getStatusVariant(review.status)}>
              {review.status}
            </Badge>
          </div>

          <p className="mt-2 text-sm font-bold text-indigo-600">
            {review.fileName}
          </p>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Reviewed by: {review.reviewedBy}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {review.extractedSkills.map((skill) => (
              <Badge key={skill} variant="primary">
                {skill}
              </Badge>
            ))}
          </div>

          <div className="mt-4 max-w-md">
            <ProgressBar
              label="Extraction Confidence"
              value={review.confidence}
              showValue
              tone={review.confidence >= 85 ? "success" : "warning"}
            />
          </div>
        </div>

        <div className="grid w-full gap-2 sm:grid-cols-2 xl:w-auto">
          <Button
            variant="secondary"
            onClick={() => updateReviewStatus(review.id, "Approved")}
          >
            <CheckCircle2 size={16} />
            Approve
          </Button>

          <Button
            variant="danger"
            onClick={() => updateReviewStatus(review.id, "Needs Review")}
          >
            <XCircle size={16} />
            Needs Review
          </Button>
        </div>
      </div>
    </Card>
  );
}

