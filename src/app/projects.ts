import type { StaticImageData } from "next/image";
import taggedImg from "@/public/tagged.png";
import jobflowImg from "@/public/jobflow.png";
import peekabooImg from "@/public/peekaboo.png";
import produImg from "@/public/produ.png";
import vclImg from "@/public/vcl.png";
import dyrtImg from "@/public/newDyrt.png";
import metaGlassesImg from "@/public/newMeta.png";
import postacareImg from "@/public/newPostacare.png";

export type Project = {
  title: string;
  description: string;
  tags: readonly string[];
  href: string;
  image: StaticImageData;
};

export const PROJECTS = [
  {
    title: "Tagged — Weekly Photo Challenges",
    description: "Social app with server-based tags, streaks, punishments, and a Yearbook archive.",
    tags: ["SwiftUI", "Firebase", "Cloud Functions"],
    href: "https://apps.apple.com/ca/app/tagged/id6749673242",
    image: taggedImg,
  },
  {
    title: "Jobflow — AI Resume Customizer",
    description: "Chrome extension and dashboard that customizes resumes & cover letters.",
    tags: ["PM", "React", "Chrome Extension"],
    href: "https://www.myjobflow.com",
    image: jobflowImg,
  },
  {
    title: "Peekaboo — AI Visibility Analytics",
    description: "SaaS for AEO: audits, competitive analysis, and rankings tracking for site search visibility.",
    tags: ["Consulting", "Growth", "AEO"],
    href: "https://www.aipeekaboo.com/",
    image: peekabooImg,
  },
  {
    title: "Produ — SWE Soft-Skills Evaluator",
    description: "MVP to help managers to help interns level up teamwork, initiative, and communication via a centralized dashboard.",
    tags: ["React", "Supabase", "UI/UX"],
    href: "https://tryprodu.com/",
    image: produImg,
  },
  {
    title: "Visual Cognition Lab — Research Dashboard",
    description: "The University of British Columbia's main platform for VCL researchers to track & share their progress.",
    tags: ["React", "MongoDB", "Research"],
    href: "https://www.viscoglab.psych.ubc.ca/",
    image: vclImg,
  },
  {
    title: "Dyrt — Waste Audit Tracking Platform",
    description: "Developed an audit tool for Intuit Dome and built analytics dashboards to monitor diversion metrics.",
    tags: ["PM", "Data Analytics", "Dashboarding"],
    href: "https://dyrt.co/",
    image: dyrtImg,
  },
  {
    title: "Meta Glasses — Smart Glasses Prototypes",
    description: "Led a consulting team evaluating Meta smart glasses use cases by building interactive prototypes.",
    tags: ["Strategy", "User Research", "Figma"],
    href: "https://btg-glasses.netlify.app/",
    image: metaGlassesImg,
  },
  {
    title: "PostaCare — Postnatal Depression Screening",
    description: "Built a postnatal depression screening platform for WIC offices, streamlining patient intake workflows.",
    tags: ["React", "OpenAI API", "Health Tech"],
    href: "https://n427.github.io/postacare/",
    image: postacareImg,
  },
] as const satisfies readonly Project[];
