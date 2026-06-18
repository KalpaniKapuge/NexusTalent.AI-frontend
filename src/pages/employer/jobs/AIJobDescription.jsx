import { Copy, Loader2, Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Button from "../../../components/common/Button";
import Badge from "../../../components/common/Badge";

const fieldClass =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-600 dark:border-slate-800 dark:bg-slate-950";

const labelClass = "mb-2 block text-sm font-black";

export default function AIJobDescription() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "Junior React Developer",
    skills: "React, JavaScript, REST API, Git, Tailwind CSS",
    experience: "0 - 2 years",
    tone: "Professional",
  });

  const [generatedText, setGeneratedText] = useState("");

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const generateDescription = async () => {
    if (!form.title || !form.skills || !form.experience) {
      toast.error("Please fill job title, skills, and experience level.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const skillsList = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const generated = `We are looking for a motivated ${form.title} to join our engineering team. The ideal candidate should have knowledge of ${skillsList.join(
      ", "
    )} and should be comfortable working in a collaborative software development environment.

Key Responsibilities:
- Develop responsive and user-friendly web interfaces.
- Integrate frontend applications with REST APIs.
- Work with designers and backend developers to deliver high-quality features.
- Write clean, reusable, and maintainable code.
- Participate in code reviews and improve application performance.

Required Skills:
${skillsList.map((skill) => `- ${skill}`).join("\n")}

Experience:
- ${form.experience} of relevant academic, internship, freelance, or professional experience.

Preferred Candidate:
- Strong problem-solving mindset.
- Good communication skills.
- Ability to learn quickly and work with modern development tools.
- Interest in building scalable real-world software systems.

This role is suitable for candidates who are eager to learn, solve real-world problems, and grow as modern software engineers.`;

    setGeneratedText(generated);
    setLoading(false);

    toast.success("AI job description generated.");
  };

  const copyDescription = async () => {
    if (!generatedText) {
      toast.error("No description to copy.");
      return;
    }

    await navigator.clipboard.writeText(generatedText);
    toast.success("Job description copied.");
  };

  return (
    <div>
      <PageHeader
        title="AI Job Description Generator"
        subtitle="Generate a professional job description using job title, required skills, experience level, and preferred writing tone."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <InputPanel
          form={form}
          updateForm={updateForm}
          loading={loading}
          generateDescription={generateDescription}
        />

        <OutputPanel
          form={form}
          generatedText={generatedText}
          copyDescription={copyDescription}
        />
      </div>
    </div>
  );
}

function InputPanel({ form, updateForm, loading, generateDescription }) {
  return (
    <Card title="Job Inputs">
      <div className="space-y-5">
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
          <label className={labelClass}>Required Skills</label>

          <textarea
            value={form.skills}
            onChange={(event) => updateForm("skills", event.target.value)}
            rows={4}
            placeholder="Example: React, JavaScript, REST API, Git"
            className={`${fieldClass} leading-7`}
          />

          <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Separate each skill using comma.
          </p>
        </div>

        <div>
          <label className={labelClass}>Experience Level</label>

          <input
            value={form.experience}
            onChange={(event) => updateForm("experience", event.target.value)}
            placeholder="Example: 0 - 2 years"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass}>Writing Tone</label>

          <select
            value={form.tone}
            onChange={(event) => updateForm("tone", event.target.value)}
            className={fieldClass}
          >
            <option>Professional</option>
            <option>Friendly</option>
            <option>Formal</option>
            <option>Startup Style</option>
          </select>
        </div>

        <Button fullWidth onClick={generateDescription} disabled={loading}>
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Wand2 size={18} />
              Generate Description
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

function OutputPanel({ form, generatedText, copyDescription }) {
  return (
    <Card className="xl:col-span-2" title="Generated Job Description">
      {!generatedText ? (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-300">
            <Sparkles size={34} />
          </div>

          <h3 className="mt-5 text-lg font-black">
            Your AI description will appear here
          </h3>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            Fill the job inputs and click generate. You can copy the generated
            job description after it appears.
          </p>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <Badge variant="primary">{form.title}</Badge>
            <Badge variant="info">{form.tone}</Badge>
            <Badge variant="success">AI Generated</Badge>
          </div>

          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
            {generatedText}
          </pre>

          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="secondary" onClick={copyDescription}>
              <Copy size={18} />
              Copy Description
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

