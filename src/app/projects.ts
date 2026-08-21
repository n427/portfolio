import type { StaticImageData } from "next/image";
import taggedImg from "@/public/tagged.png";
import jobflowImg from "@/public/jobflow.png";
import peekabooImg from "@/public/peekaboo.png";
import produImg from "@/public/produ.png";
import vclImg from "@/public/vcl.png";
import dyrtImg from "@/public/newDyrt.png";
import metaGlassesImg from "@/public/newMeta.png";
import postacareImg from "@/public/newPostacare.png";

export type WorkItem = {
  title: string;
  description: string;
  tags: readonly string[];
  role?: string;
  date?: string;
  href?: string;
  image?: StaticImageData;
};

export const INTERNSHIPS = [
  {
    title: "Meridian AI",
    role: "Incoming AI Software Engineer",
    date: "Sep 2026",
    description: "Joining Meridian AI to build and ship applied AI systems in a production engineering environment.",
    tags: ["AI Engineering", "Software Engineering", "Python"],
  },
  {
    title: "Evolution Design Lab",
    href: "https://styalos.com",
    role: "Applied AI Engineer",
    date: "May 2026 to present",
    description: "Built semantic image search for 1,000+ material swatches and automated AI workflows for renders, design breakdowns, and sketches.",
    tags: ["Python", "OpenCV", "Vision Models"],
  },
  {
    title: "Jobflow: AI Resume Customizer",
    role: "Software Engineer, AI Products",
    date: "Jun 2025 to Aug 2025",
    description: "Built AI personalization features and integrated a vision-language model into a resume customization workflow.",
    tags: ["Python", "JavaScript", "Vision-Language Models"],
    href: "https://www.myjobflow.com",
    image: jobflowImg,
  },
  {
    title: "Peekaboo: AI Visibility Analytics",
    role: "Product and Growth Consultant",
    description: "Worked on audits, competitive analysis, and ranking visibility for an AI search analytics platform.",
    tags: ["Consulting", "Growth", "AEO"],
    href: "https://www.aipeekaboo.com/",
    image: peekabooImg,
  },
  {
    title: "Produ: SWE Soft-Skills Evaluator",
    role: "Full-Stack Software Engineer",
    date: "Jun 2025 to Aug 2025",
    description: "Built a workforce analytics platform, automated performance summaries, and created data pipelines for real-time feedback analysis.",
    tags: ["React", "Python", "Supabase"],
    href: "https://tryprodu.com/",
    image: produImg,
  },
  {
    title: "Dyrt: Waste Audit Tracking Platform",
    role: "Software Engineer, Data Products",
    date: "Jan 2026 to present",
    description: "Built SQL data infrastructure and real-time dashboards used by venue teams to monitor waste diversion metrics.",
    tags: ["SQL", "Data Products", "Analytics"],
    href: "https://dyrt.co/",
    image: dyrtImg,
  },
] as const satisfies readonly WorkItem[];

export const RESEARCH = [
  {
    title: "USC Image Processing and Informatics Lab",
    role: "Incoming Machine Learning Researcher",
    date: "Sep 2026",
    description: "CURVE research on knowledge-based radiation therapy planning for head and neck cancer using multi-organ constellation matching.",
    tags: ["Machine Learning", "Medical Imaging", "Research"],
  },
  {
    title: "Visual Cognition Lab: Research Dashboard",
    description: "Built the University of British Columbia lab's platform for researchers to track and share their progress.",
    tags: ["React", "MongoDB", "Research"],
    href: "https://www.viscoglab.psych.ubc.ca/",
    image: vclImg,
  },
] as const satisfies readonly WorkItem[];

export const PROJECTS = [
  {
    title: "Tagged: Weekly Photo Challenges",
    description: "Social app with server-based tags, streaks, punishments, and a Yearbook archive.",
    tags: ["SwiftUI", "Firebase", "Cloud Functions"],
    href: "https://apps.apple.com/ca/app/tagged/id6749673242",
    image: taggedImg,
  },
  {
    title: "Meta Glasses: Smart Glasses Prototypes",
    description: "Led a consulting team evaluating Meta smart glasses use cases by building interactive prototypes.",
    tags: ["Strategy", "User Research", "Figma"],
    href: "https://btg-glasses.netlify.app/",
    image: metaGlassesImg,
  },
  {
    title: "PostaCare: Postnatal Depression Screening",
    description: "Built a screening platform for WIC offices that processed 200+ assessments and reduced screening time by 70%.",
    tags: ["React", "OpenAI API", "Health Tech"],
    href: "https://n427.github.io/postacare/",
    image: postacareImg,
  },
] as const satisfies readonly WorkItem[];

export const WORK_ITEMS: readonly WorkItem[] = [
  ...INTERNSHIPS,
  ...RESEARCH,
  ...PROJECTS,
];
