"use client";

import Image from "next/image";
import React, { useState } from "react";
import { PROJECTS, type Project } from "./projects";
import { ThemeToggle } from "./theme-toggle";

function Intro() {
  return (
    <header className="intro">
      <h1>Hi, I&apos;m Nicole,</h1>
      <p>
        I&apos;m a product-minded builder studying Computer Science &amp; Business
        Administration at USC. I design and ship consumer products, career tools,
        analytics platforms, and research software.
      </p>
    </header>
  );
}

function ProjectRow({
  project,
  onActive,
}: {
  project: Project;
  onActive: (project: Project | null) => void;
}) {
  return (
    <li>
      <a
        data-testid="project-link"
        className="project-row"
        href={project.href}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => onActive(project)}
        onMouseLeave={() => onActive(null)}
        onFocus={() => onActive(project)}
        onBlur={() => onActive(null)}
      >
        <span className="project-copy">
          <strong>{project.title}</strong>
          <span>{project.description}</span>
        </span>
        <span className="project-tags">{project.tags.join(" · ")}</span>
        <span className="external-mark" aria-hidden="true">
          ↗
        </span>
      </a>
    </li>
  );
}

function ProjectPreview({ project }: { project: Project | null }) {
  if (!project) {
    return null;
  }

  return (
    <figure className="project-preview" aria-live="polite">
      <Image
        src={project.image}
        alt={`${project.title} preview`}
        sizes="(min-width: 900px) 22rem, 0px"
        priority={false}
      />
    </figure>
  );
}

function ProjectList() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section className="projects-section" aria-labelledby="projects-title">
      <div>
        <h2 id="projects-title">projects</h2>
        <p>products, experiments, and tools I&apos;ve helped bring to life.</p>
      </div>
      <ul>
        {PROJECTS.map((project) => (
          <ProjectRow key={project.title} project={project} onActive={setActiveProject} />
        ))}
      </ul>
      <ProjectPreview project={activeProject} />
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <h2 id="contact-title">contact</h2>
      <p>
        Connect with me on{" "}
        <a href="https://github.com/n427" target="_blank" rel="noreferrer">
          github
        </a>
        {" · "}
        <a
          href="https://www.linkedin.com/in/nicolexzhang/"
          target="_blank"
          rel="noreferrer"
        >
          linkedin
        </a>
        {" or reach me at "}
        <a href="mailto:nicolexzha@gmail.com">nicolexzha@gmail.com</a>.
      </p>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <main className="site-shell">
      <Intro />
      <ProjectList />
      <Contact />
      <footer>
        <span>© {new Date().getFullYear()} Nicole Zhang</span>
        <ThemeToggle />
      </footer>
    </main>
  );
}
