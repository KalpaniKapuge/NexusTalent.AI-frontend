import { CheckCircle2, FileText, UploadCloud } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/ProgressBar";

export default function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only PDF and DOCX files are allowed.");
      return;
    }

    setSelectedFile(file);
    setUploaded(false);
    setProgress(0);
  };

  const simulateUpload = () => {
    if (!selectedFile) {
      toast.error("Please select a resume first.");
      return;
    }

    setProgress(0);
    setUploaded(false);

    const interval = setInterval(() => {
      setProgress((current) => {
        if (current >= 100) {
          clearInterval(interval);
          setUploaded(true);
          toast.success("Resume uploaded and sent for AI extraction.");
          return 100;
        }

        return current + 20;
      });
    }, 350);
  };

  return (
    <div>
      <PageHeader
        title="Resume Upload"
        subtitle="Upload your PDF or DOCX resume. NexusTalent.AI will extract skills, education, experience, and certifications."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-indigo-300 bg-indigo-50/50 p-10 text-center transition hover:bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/30">
            <UploadCloud size={48} className="text-indigo-600" />

            <h3 className="mt-5 text-xl font-black">Upload your resume</h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
              Drag and drop is coming later. For now, click here and select a
              PDF or DOCX resume file.
            </p>

            <input
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {selectedFile && (
            <div className="mt-6 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <FileText className="text-indigo-600" size={22} />

                <div>
                  <h4 className="font-black">{selectedFile.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <ProgressBar value={progress} label="Upload Progress" />
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={simulateUpload}>Upload & Analyze Resume</Button>

            {uploaded && (
              <Link to="/candidate/resume-review">
                <Button variant="secondary">Review Extracted Data</Button>
              </Link>
            )}
          </div>
        </Card>

        <Card title="AI Extraction Process">
          <div className="space-y-4">
            {[
              "Resume file validation",
              "Text extraction",
              "Skill detection",
              "Education and experience extraction",
              "Candidate profile update",
            ].map((step, index) => (
              <div key={step} className="flex gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-xs font-black text-indigo-600 dark:bg-indigo-950/30">
                  {index + 1}
                </div>

                <div className="text-sm font-bold">{step}</div>
              </div>
            ))}
          </div>

          {uploaded && (
            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 p-4 text-sm font-black text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
              <CheckCircle2 size={18} />
              Ready for resume review
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}