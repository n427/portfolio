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

export const EDUCATION = [
  {
    title: "University of Southern California",
    role: "B.S. Computer Science and Business Administration",
    date: "Expected May 2028",
    description: "CURVE Research Scholar, W.V.T. Rusch Engineering Scholar, McKinsey Case Competition winner, and Marshall AI Product Innovation Competition winner.",
    tags: ["GPA 3.84"],
  },
] as const satisfies readonly WorkItem[];

export const EXPERIENCE = [
  {
    title: "Meridian Inc",
    role: "Incoming AI Product Management Intern",
    date: "2027",
    description: "Joining the product team to help shape and ship AI products.",
    tags: ["Product Management", "Applied AI"],
  },
  {
    title: "Business Technology Group: Meta Glasses Strategy",
    role: "Strategy Consultant",
    date: "Sep 2025 to present",
    description: "Lead a 4-person team advising Meta on emerging product strategy, structuring 10+ Meta Glasses opportunities by customer value, market potential, and technical feasibility.",
    tags: ["Strategy", "User Research", "Prototyping"],
    href: "https://btg-glasses.netlify.app/",
    image: metaGlassesImg,
  },
  {
    title: "Evolution Design Lab",
    role: "Applied AI Engineer Intern",
    date: "May 2026 to Sep 2026",
    description: "Built Python and OpenCV semantic image search across 1,000+ material swatches, cutting retrieval from minutes to seconds.",
    tags: ["Python", "OpenCV", "Vision Models"],
    href: "https://www.stylaos.com/",
  },
  {
    title: "Dyrt: Waste Audit Tracking Platform",
    role: "Software Engineer Intern, Data Products",
    date: "Jan 2026 to Sep 2026",
    description: "Architected a SQL data model processing 1,500+ monthly records and shipped real-time dashboards used by 10 venue managers.",
    tags: ["SQL", "Data Products", "Analytics"],
    href: "https://dyrt.co/",
    image: dyrtImg,
  },
  {
    title: "USC Annenberg, Dean's Office",
    role: "Strategy and Automation Analyst",
    date: "Apr 2026 to Aug 2026",
    description: "Automated monthly budgeting into 30 recurring spreadsheets and rebuilt peer reflection distribution for 200 students.",
    tags: ["Automation", "AI Workflows", "Operations"],
    href: "https://annenberg.usc.edu/",
  },
  {
    title: "Produ: SWE Soft-Skills Evaluator",
    role: "Full-Stack Software Engineer Intern",
    date: "Jun 2025 to Aug 2025",
    description: "Built a workforce analytics platform for 30+ users, serverless ETL pipelines, and automated performance summaries from unstructured feedback.",
    tags: ["React", "Python", "Supabase"],
    href: "https://tryprodu.com/",
    image: produImg,
  },
  {
    title: "Jobflow: AI Resume Customizer",
    role: "Software Engineer Intern, AI Products",
    date: "Jun 2025 to Aug 2025",
    description: "Integrated a vision-language model into the resume customization workflow and turned analysis of 25+ platforms into product insights.",
    tags: ["Python", "JavaScript", "Vision-Language Models"],
    href: "https://www.myjobflow.com",
    image: jobflowImg,
  },
  {
    title: "Peekaboo: AI Visibility Analytics",
    role: "Strategy and Growth Analyst",
    date: "Jun 2025 to Aug 2025",
    description: "Turned 1,000+ weekly visibility data points across 30+ accounts into positioning and go-to-market recommendations.",
    tags: ["Strategy", "Growth", "AEO"],
    href: "https://www.aipeekaboo.com/",
    image: peekabooImg,
  },
] as const satisfies readonly WorkItem[];

export const RESEARCH = [
  {
    title: "USC Image Processing and Informatics Lab",
    role: "Machine Learning Researcher",
    date: "Sep 2026 to present",
    description: "CURVE research on knowledge-based radiation therapy planning for head and neck cancer using multi-organ constellation matching.",
    tags: ["Machine Learning", "Medical Imaging", "Research"],
    href: "https://ipilab.usc.edu/",
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
    title: "Flipd: USC Student Marketplace",
    role: "Founder",
    date: "Launched May 2026",
    description: "Buy and sell marketplace for USC students with student email verification, passwordless sign-in, and an AI safety layer that scores profiles.",
    tags: ["Marketplace", "Trust and Safety", "AI"],
    href: "https://flipdcampus.com/",
  },
  {
    title: "PostaCare: Postnatal Depression Screening",
    role: "Expanding to more sites",
    description: "Redesigned a screening workflow into a React tablet app across 10 WIC offices, processing 200+ assessments and cutting screening time by 70%.",
    tags: ["React", "Python", "Health Tech"],
    href: "https://n427.github.io/postacare/",
    image: postacareImg,
  },
  {
    title: "Tagged: Weekly Photo Challenges",
    description: "Social app with server-based tags, streaks, punishments, and a Yearbook archive.",
    tags: ["SwiftUI", "Firebase", "Cloud Functions"],
    href: "https://apps.apple.com/ca/app/tagged/id6749673242",
    image: taggedImg,
  },
] as const satisfies readonly WorkItem[];

export const WORK_ITEMS: readonly WorkItem[] = [
  ...EDUCATION,
  ...EXPERIENCE,
  ...RESEARCH,
  ...PROJECTS,
];
