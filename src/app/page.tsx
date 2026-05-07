"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";

// NEW — static imports (these resolve to hashed files and respect assetPrefix/basePath)
import profilePic from "@/public/profile1.jpg";
import taggedImg   from "@/public/tagged.png";
import jobflowImg  from "@/public/jobflow.png";
import peekabooImg from "@/public/peekaboo.png";
import produImg    from "@/public/produ.png";
import vclImg      from "@/public/vcl.png";
import dyrtImg     from "@/public/newDyrt.png";
import metaGlassesImg from "@/public/newMeta.png";
import postacareImg from "@/public/newPostacare.png";

const PROJECTS = [
  {
    title: "Tagged — Weekly Photo Challenges",
    desc: "Social app with server-based tags, streaks, punishments, and a Yearbook archive.",
    tags: ["SwiftUI", "Firebase", "Cloud Functions"],
    href: "https://apps.apple.com/ca/app/tagged/id6749673242",
    image: taggedImg
  },
  {
    title: "Jobflow — AI Resume Customizer",
    desc: "Chrome extension and dashboard that customizes resumes & cover letters.",
    tags: ["PM", "React", "Chrome Extension"],
    href: "https://www.myjobflow.com",
    image: jobflowImg
  },
  {
    title: "Peekaboo — AI Visibility Analytics",
    desc: "SaaS for AEO: audits, competitive analysis, and rankings tracking for site search visibility.",
    tags: ["Consulting", "Growth", "AEO"],
    href: "https://www.aipeekaboo.com/",
    image: peekabooImg
  },
  {
    title: "Produ — SWE Soft-Skills Evaluator",
    desc: "MVP to help managers to help interns level up teamwork, initiative, and communication via a centralized dashboard.",
    tags: ["React", "Supabase", "UI/UX"],
    href: "https://tryprodu.com/",
    image: produImg
  },
  {
    title: "Visual Cognition Lab — Research Dashboard",
    desc: "The University of British Columbia's main platform for VCL researchers to track & share their progress.",
    tags: ["React", "MongoDB", "Research"],
    href: "https://www.viscoglab.psych.ubc.ca/",
    image: vclImg,
  },
  {
    title: "Dyrt — Waste Audit Tracking Platform",
    desc: "Developed an audit tool for Intuit Dome and built analytics dashboards to monitor diversion metrics.",
    tags: ["PM", "Data Analytics", "Dashboarding"],
    href: "https://dyrt.co/",
    image: dyrtImg
  },
  {
    title: "Meta Glasses — Smart Glasses Prototypes",
    desc: "Led a consulting team evaluating Meta smart glasses use cases by building interactive prototypes.",
    tags: ["Strategy", "User Research", "Figma"],
    href: "https://btg-glasses.netlify.app/",
    image: metaGlassesImg
  },
  {
    title: "PostaCare — Postnatal Depression Screening",
    desc: "Built a postnatal depression screening platform for WIC offices, streamlining patient intake workflows.",
    tags: ["React", "OpenAI API", "Health Tech"],
    href: "https://n427.github.io/postacare/",
    image: postacareImg
  },
];

function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const move = (e: MouseEvent) => {
      el.animate(
        { transform: `translate(${e.clientX}px, ${e.clientY}px)` },
        { duration: 250, fill: "forwards" }
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-[2] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/70"
    />
  );
}

function InteractiveBG() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const gridSize = 18;
  const minor = "rgba(15, 23, 42, 0.16)";
  const major = "rgba(15, 23, 42, 0.26)";
  const dot   = "rgba(15, 23, 42, 0.16)";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        maskImage:
          "radial-gradient(520px 520px at var(--mx) var(--my), rgba(0,0,0,0.75) 0%, transparent 62%)",
        WebkitMaskImage:
          "radial-gradient(520px 520px at var(--mx) var(--my), rgba(0,0,0,0.75) 0%, transparent 62%)",
        background: "linear-gradient(180deg, #ffffff, #f8fbff 50%, #f3f7ff 100%)",
      }}>
      <div className="absolute inset-0" style={{
        opacity: 0,
        animation: "gridIn 500ms ease-out 120ms forwards",
        backgroundImage: [
          `repeating-linear-gradient(to right, ${minor} 0 1px, transparent 1px ${gridSize}px)`,
          `repeating-linear-gradient(to bottom, ${minor} 0 1px, transparent 1px ${gridSize}px)`,
          `repeating-linear-gradient(to right, transparent 0 ${gridSize * 5 - 1}px, ${major} ${gridSize * 5 - 1}px ${gridSize * 5}px)`,
          `repeating-linear-gradient(to bottom, transparent 0 ${gridSize * 5 - 1}px, ${major} ${gridSize * 5 - 1}px ${gridSize * 5}px)`,
          `radial-gradient(${dot} 1px, transparent 1.5px)`
        ].join(","),
        backgroundSize: `
          ${gridSize}px ${gridSize}px,
          ${gridSize}px ${gridSize}px,
          ${gridSize * 5}px ${gridSize * 5}px,
          ${gridSize * 5}px ${gridSize * 5}px,
          ${gridSize}px ${gridSize}px`,
        mixBlendMode: "multiply",
      }} />

      <WaterPartVeil veilOpacity={0.82} repaintAlpha={0.05} cutRadius={28} maxSegs={70} edgeBlur={18} />
    </div>
  );
}


function WaterPartVeil({
  veilOpacity = 0.82,
  repaintAlpha = 0.05,
  cutRadius = 28,
  maxSegs = 70,
  edgeBlur = 18,
}: {
  veilOpacity?: number;
  repaintAlpha?: number;
  cutRadius?: number;
  maxSegs?: number;
  edgeBlur?: number;
}) {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const raf = React.useRef<number | null>(null);
  const segs = React.useRef<
    { x: number; y: number; len: number; angle: number; r: number; life: number }[]
  >([]);
  const last = React.useRef<{ x: number; y: number } | null>(null);

  const settings = React.useRef({ veilOpacity, repaintAlpha, cutRadius, maxSegs, edgeBlur });
  React.useEffect(() => {
    settings.current = { veilOpacity, repaintAlpha, cutRadius, maxSegs, edgeBlur };
  }, [veilOpacity, repaintAlpha, cutRadius, maxSegs, edgeBlur]);

  React.useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let w = 0, h = 0;
    const dpr: number =
    typeof window !== "undefined"
      ? Math.min(Math.max((window.devicePixelRatio || 1), 1), 2)
      : 1;

    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(255,255,255,${settings.current.veilOpacity})`;
      ctx.fillRect(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY;
      if (!last.current) { last.current = { x, y }; return; }
      const dx = x - last.current.x, dy = y - last.current.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 2) return;

      const angle = Math.atan2(dy, dx);
      const len = Math.min(160, dist * 1.25);
      const r = settings.current.cutRadius;
      segs.current.push({ x, y, len, angle, r, life: 1 });
      if (segs.current.length > settings.current.maxSegs) segs.current.shift();
      last.current = { x, y };
    };
    window.addEventListener("mousemove", onMove);

    const drawCapsule = (cx: number, cy: number, len: number, angle: number, radius: number, alpha: number) => {
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(angle);
      const w2 = len / 2, r2 = radius;
      const grad = ctx.createLinearGradient(-w2, 0, w2, 0);
      grad.addColorStop(0, `rgba(0,0,0,${alpha * 0.9})`);
      grad.addColorStop(0.5, `rgba(0,0,0,${alpha})`);
      grad.addColorStop(1, `rgba(0,0,0,${alpha * 0.9})`);
      ctx.fillStyle = grad;

      ctx.beginPath();
      ctx.moveTo(-w2, -r2);
      ctx.lineTo(w2, -r2);
      ctx.arc(w2, 0, r2, -Math.PI / 2, Math.PI / 2);
      ctx.lineTo(-w2, r2);
      ctx.arc(-w2, 0, r2, Math.PI / 2, -Math.PI / 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = `rgba(255,255,255,${settings.current.repaintAlpha})`;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "destination-out";
      ctx.filter = `blur(${settings.current.edgeBlur}px)`;
      for (let i = segs.current.length - 1; i >= 0; i--) {
        const s = segs.current[i];
        s.life *= 0.92;
        if (s.life < 0.08) { segs.current.splice(i, 1); continue; }
        drawCapsule(s.x, s.y, s.len * 0.98, s.angle, s.r * 1.1, 0.9 * s.life);
      }

      ctx.filter = "none";
      for (let i = 0; i < segs.current.length; i++) {
        const s = segs.current[i];
        drawCapsule(s.x, s.y, s.len * (0.92 + 0.08 * s.life), s.angle, s.r * (0.9 + 0.1 * s.life), 1 * s.life);
      }

      ctx.globalCompositeOperation = "source-over";
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []); 

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0" />;
}

function ParallaxLayer({
  depth,
  className,
}: {
  depth: number;
  className?: string;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx); 
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my]);

  const tx = useSpring(useTransform(mx, (v) => v * depth * 30), {
    stiffness: 120,
    damping: 20,
  });
  const ty = useSpring(useTransform(my, (v) => v * depth * 30), {
    stiffness: 120,
    damping: 20,
  });

  return (
    <motion.div aria-hidden style={{ translateX: tx, translateY: ty }} className={className} />
  );
}

function GlobalParallax() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <ParallaxLayer
        depth={0.08}
        className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-sky-300/45 to-indigo-300/25 blur-3xl"
      />
      <ParallaxLayer
        depth={-0.06}
        className="absolute top-1/3 -right-20 h-[24rem] w-[24rem] rounded-full bg-gradient-to-tl from-cyan-300/35 to-blue-200/25 blur-3xl"
      />
      <ParallaxLayer
        depth={0.12}
        className="absolute -bottom-24 left-10 h-[22rem] w-[22rem] rounded-full bg-gradient-to-br from-violet-300/30 to-sky-200/20 blur-3xl"
      />
      <ParallaxLayer
        depth={-0.15}
        className="absolute top-10 right-1/3 h-40 w-40 rounded-full bg-sky-200/40 blur-2xl"
      />
      <ParallaxLayer
        depth={0.2}
        className="absolute bottom-28 left-1/3 h-52 w-52 rounded-full bg-indigo-200/35 blur-2xl"
      />
    </div>
  );
}

function useMouseTilt() {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; 
      const py = (e.clientY - rect.top) / rect.height; 
      x.set(px);
      y.set(py);
      (el as HTMLElement).style.setProperty("--mouse-x", `${px * 100}%`);
      (el as HTMLElement).style.setProperty("--mouse-y", `${py * 100}%`);
    };
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", () => {
      x.set(0.5);
      y.set(0.5);
    });
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  const rotateX = useTransform(y, [0, 1], [8, -8]);
  const rotateY = useTransform(x, [0, 1], [-8, 8]);
  const shineX = useTransform(x, [0, 1], [0, 100]);
  const shineY = useTransform(y, [0, 1], [0, 100]);
  const glare = useMotionTemplate`radial-gradient(600px circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.55), transparent 40%)`;

  return { ref, rotateX, rotateY, glare };
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative scroll-mt-24 lg:scroll-mt-28 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          {title} <Sparkles className="inline h-6 w-6 text-sky-500/90" />
        </h2>
        {subtitle && <p className="mt-3 text-slate-600">{subtitle}</p>}
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        <a href="#top" className="text-slate-900 font-semibold tracking-tight">
          Nicole Zhang
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#projects" className="text-slate-600 hover:text-slate-900">
            Projects
          </a>
          <a href="#about" className="text-slate-600 hover:text-slate-900">
            About
          </a>
          <a href="#contact" className="text-slate-600 hover:text-slate-900">
            Contact
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="bg-slate-900 text-white hover:bg-slate-800">
            <a href="#contact">Let’s talk</a>
          </Button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const rotate = useMotionValue(0);
  const skew = useMotionValue(0);
  const r = useSpring(rotate, { stiffness: 100, damping: 20 });
  const s = useSpring(skew, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const dx = (e.clientX - cx) / cx;
      rotate.set(dx * 4);
      skew.set(dx * 2);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rotate, skew]);

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-7 lg:pr-12">
            <motion.h1
              style={{ rotate: r, skewX: s }}
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900"
            >
             Clear products, clean execution.
            </motion.h1>
            <p className="mt-4 max-w-xl text-slate-600 font-bold">
              Computer Science & Business Administration @ The University of Southern California
            </p>
            <p className="mt-4 max-w-xl text-slate-600">
              I design and build practical web & mobile products, from social apps to AI tools, focusing on clear roadmaps, fast iteration, and clean UI.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="bg-sky-600 hover:bg-sky-600/90">
                <a href="#projects">
                  Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-slate-300 text-slate-900 hover:bg-slate-50"
              >
                <a href="#about">About me</a>
              </Button>
            </div>
            <div className="mt-5 flex items-center gap-5 text-slate-500">
              <span className="inline-flex items-center gap-1 text-sm">
                <MapPin className="h-4 w-4" /> Los Angeles, CA
              </span>
              <a
                href="https://github.com/n427"
                className="hover:text-slate-900"
                target="_blank"
                rel="noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nicolexzhang/"
                className="hover:text-slate-900"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#contact" className="hover:text-slate-900">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="relative md:col-span-5 justify-self-end">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-visible"
            >
               <motion.div
                className="relative h-64 w-64 sm:h-72 sm:w-72 rounded-full ring-2 ring-sky-200/70 shadow-lg shadow-sky-200/40 overflow-hidden bg-gradient-to-br from-white to-slate-50"
                 style={{ rotate: r }}
               >
                 <Image
                    src={profilePic}
                    alt="Nicole — profile"
                    fill
                    className="object-cover"
                    priority
                    sizes="(min-width: 768px) 18rem, 16rem"
                  />
               </motion.div>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(120px circle at 50% 40%, rgba(59,130,246,0.18), transparent 60%)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BootFade() {
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "1";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 600ms ease-out";
      el.style.opacity = "0";
    });

    const onEnd = () => el.remove();
    el.addEventListener("transitionend", onEnd);
    return () => el.removeEventListener("transitionend", onEnd);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[999] bg-white pointer-events-none"
    />
  );
}

function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  const { ref, rotateX, rotateY, glare } = useMouseTilt();

  return (
    <motion.a
      href={p.href}
      target="_blank"
      rel="noreferrer"
      className="group block"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, backgroundImage: glare }}
        className="[transform-style:preserve-3d] will-change-transform rounded-2xl bg-gradient-to-b from-white to-white p-0.5 shadow-xl shadow-slate-200/60"
      >
        <Card className="rounded-2xl overflow-hidden bg-white/90 backdrop-blur border border-slate-200 transition-transform duration-300 group-hover:-translate-y-0.5">
          <div className="relative h-48 w-full overflow-hidden">
            {p.image ? (
              <Image
                src={p.image}   // now a StaticImageData from the imports above
                alt={p.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500">
                <Sparkles className="h-12 w-12" />
              </div>
            )}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                backgroundImage:
                  "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59,130,246,0.18), transparent 40%)",
              }}
            />
          </div>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                {p.title}
              </h3>
              <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-slate-700 transition-colors" />
            </div>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              {p.desc}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] uppercase tracking-wide text-slate-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.a>
  );
}

function Projects() {
  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="Click a card to open the project in a new tab."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" title="About Me">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 md:p-8">
          <p className="text-slate-700 leading-relaxed">
            Hi! I’m Nicole — a product-minded builder who enjoys shipping polished experiences and measuring what matters. I’ve built consumer social (Tagged), career tools (Jobflow), and analytics products (Produ). I love clean UI, strong systems, and feedback loops.
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-slate-600 sm:grid-cols-2">
            <li>• SwiftUI, React, Typescript, Firebase, Supabase</li>
            <li>• A/B testing, analytics, growth, copy</li>
            <li>• Design systems, motion, micro-interactions</li>
            <li>• Shipping mindset: iterate → measure → refine</li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <Section
      id="contact"
      title="Let’s Work Together"
      subtitle="Reach out for collabs, internships, or just to chat!"
    >
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-slate-900 text-white hover:bg-slate-800">
            <a href="mailto:nicolexzha@gmail.com">
              <Mail className="mr-2 h-4 w-4" /> nicolexzha@gmail.com
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-slate-300 text-slate-900 hover:bg-slate-50"
          >
            <a href="https://github.com/n427" target="_blank" rel="noreferrer">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-slate-300 text-slate-900 hover:bg-slate-50"
          >
            <a
              href="https://www.linkedin.com/in/nicolexzhang/"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </a>
          </Button>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Nicole Zhang. Built with ♥.
      </div>
    </Section>
  );
}

export default function PortfolioPage() {
  return (
    <div id="top" className="min-h-screen bg-white text-slate-900">
      <BootFade />
      <CursorDot />
      <InteractiveBG />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Projects />
        <About />
        <Footer />
      </div>
    </div>

  );
}
