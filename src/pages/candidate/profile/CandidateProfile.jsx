import {
  Award,
  Briefcase,
  ExternalLink,
  GraduationCap,
  Link,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import PageHeader from "../../../components/common/PageHeader";
import Card from "../../../components/common/Card";
import Badge from "../../../components/common/Badge";
import Button from "../../../components/common/Button";
import ProgressBar from "../../../components/common/ProgressBar";
import SkillTag from "../../../components/ai/SkillTag";

import { candidateProfile } from "../../../data/mockCandidateData";

export default function CandidateProfile() {
  return (
    <div>
      <PageHeader
        title="My Profile"
        subtitle="Manage your professional profile, skills, education, experience, and profile visibility."
        action={<Button>Edit Profile</Button>}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-fuchsia-600 text-3xl font-black text-white shadow-xl shadow-indigo-500/30">
              KK
            </div>

            <div className="flex-1">
              <h2 className="text-3xl font-black">{candidateProfile.name}</h2>

              <p className="mt-1 text-sm font-bold text-indigo-600">
                {candidateProfile.title}
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400">
                {candidateProfile.bio}
              </p>

              <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <MapPin size={16} />
                  {candidateProfile.location}
                </span>

                <span className="flex items-center gap-2">
                  <Mail size={16} />
                  {candidateProfile.email}
                </span>

                <span className="flex items-center gap-2">
                  <Phone size={16} />
                  {candidateProfile.phone}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Badge variant="primary">{candidateProfile.citizenship}</Badge>

                <Badge variant="info">
                  <Link size={13} className="mr-1" />
                  LinkedIn
                </Badge>

                <Badge variant="neutral">
                  <ExternalLink size={13} className="mr-1" />
                  GitHub
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Profile Completion">
          <div className="text-center">
            <div className="text-5xl font-black text-indigo-600">
              {candidateProfile.profileCompletion}%
            </div>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Complete profile to improve AI job matching.
            </p>

            <div className="mt-5">
              <ProgressBar value={candidateProfile.profileCompletion} />
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Skills">
          <div className="flex flex-wrap gap-3">
            {candidateProfile.skills.map((skill) => (
              <SkillTag
                key={skill.name}
                name={skill.name}
                level={skill.level}
                type={skill.score >= 70 ? "matched" : "weak"}
              />
            ))}
          </div>
        </Card>

        <Card title="Education">
          <div className="space-y-4">
            {candidateProfile.education.map((item) => (
              <div
                key={item.degree}
                className="flex gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
              >
                <GraduationCap className="text-indigo-600" size={22} />

                <div>
                  <h3 className="font-black">{item.degree}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.institution} · {item.period}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Experience">
          <div className="space-y-4">
            {candidateProfile.experience.map((item) => (
              <div
                key={item.role}
                className="flex gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
              >
                <Briefcase className="text-indigo-600" size={22} />

                <div>
                  <h3 className="font-black">{item.role}</h3>
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
                    {item.company} · {item.period}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Certifications">
          <div className="space-y-4">
            {candidateProfile.certifications.map((item) => (
              <div
                key={item.name}
                className="flex gap-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-950"
              >
                <Award className="text-indigo-600" size={22} />

                <div>
                  <h3 className="font-black">{item.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.provider} · {item.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
