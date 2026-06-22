import { CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";
import ProgressBar from "../../../components/common/ProgressBar";
import { resumeExtractionReviews } from "../../../data/mockAdminData";

function statusVariant(status) {
  if (status === "Approved") return "success";
  if (status === "Pending") return "warning";
  return "danger";
}

export default function ResumeExtractionReview() {
  const [reviews, setReviews] = useState(resumeExtractionReviews);

  const updateStatus = (reviewId, status) => {
    setReviews((current) =>
      current.map((review) =>
        review.id === reviewId ? { ...review, status, reviewedBy: "Admin" } : review
      )
    );
    toast.success(`Resume extraction marked as ${status}.`);
  };

  return (
    <div>
      <PageHeader
        title="Resume Extraction Review"
        subtitle="Validate extracted resume skills before they are used in matching and recommendations."
      />

      <div className="grid gap-5">
        {reviews.map((review) => (
          <Card key={review.id} hover>
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-black">{review.candidateName}</h2>
                  <Badge variant={statusVariant(review.status)}>{review.status}</Badge>
                </div>

                <p className="mt-2 text-sm font-bold text-indigo-600">
                  {review.fileName}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
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
                  onClick={() => updateStatus(review.id, "Approved")}
                >
                  <CheckCircle2 size={16} />
                  Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={() => updateStatus(review.id, "Needs Review")}
                >
                  <XCircle size={16} />
                  Needs Review
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
