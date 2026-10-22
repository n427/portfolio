"use client";

import React from "react";
import {
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  RESEARCH,
  type WorkItem,
} from "./projects";
import { ThemeToggle } from "./theme-toggle";
import { AmbientWeb } from "./ambient-web";

function Intro() {
  return (
    <header className="intro">
      <h1>Hi, I&apos;m Nicole!</h1>
      <p>
        I&apos;m a product-minded builder studying Computer Science &amp; Business
        Administration at USC. I work across applied AI, data products,
        research software, and consumer experiences.
      </p>
    </header>
  );
}

function WorkRow({ item }: { item: WorkItem }) {
  const content = (
    <>
      <span className="project-copy">
        <strong>{item.title}</strong>
        {(item.role || item.date) && (
          <span className="work-meta">
            {item.role}
            {item.role && item.date ? " · " : ""}
            {item.date}
          </span>
        )}
        <span>{item.description}</span>
      </span>
      <span className="project-tags">{item.tags.join(" · ")}</span>
      {item.href && (
        <>
          <span className="external-mark" aria-hidden="true">↗</span>
          <span className="sr-only">opens in a new tab</span>
        </>
      )}
    </>
  );

  return (
    <li data-testid="work-item">
      {item.href ? (
        <a
          data-testid="project-link"
          className="project-row"
          href={item.href}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </a>
      ) : (
        <div className="project-row project-row-static">{content}</div>
      )}
    </li>
  );
}

function WorkSection({
  id,
  title,
  description,
  items,
}: {
  id: string;
  title: string;
  description: string;
  items: readonly WorkItem[];
}) {
  return (
    <section className="work-section" aria-labelledby={`${id}-title`}>
      <div className="section-heading">
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{description}</p>
      </div>
      <ul className="project-list">
        {items.map((item) => (
          <WorkRow key={item.title} item={item} />
        ))}
      </ul>
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
          github<span className="sr-only"> opens in a new tab</span>
        </a>
        {" · "}
        <a href="https://www.linkedin.com/in/nicolexzhang/" target="_blank" rel="noreferrer">
          linkedin<span className="sr-only"> opens in a new tab</span>
        </a>
        {" or reach me at "}
        <a href="mailto:nicolexzha@gmail.com">nicolexzha@gmail.com</a>.
      </p>
    </section>
  );
}

export default function PortfolioPage() {
  return (
    <>
      <AmbientWeb />
      <main className="site-shell">
        <Intro />
      <WorkSection
        id="education"
        title="education"
        description="coursework, scholarships, and competitions."
        items={EDUCATION}
      />
      <WorkSection
        id="experience"
        title="experience"
        description="teams where I built, shipped, and learned."
        items={EXPERIENCE}
      />
      <WorkSection
        id="research"
        title="research"
        description="tools and systems built alongside researchers."
        items={RESEARCH}
      />
      <WorkSection
        id="projects"
        title="projects"
        description="products and experiments I helped bring to life."
        items={PROJECTS}
      />
      <Contact />
        <footer>
          <span>© 2026 Nicole Zhang</span>
          <ThemeToggle />
        </footer>
      </main>
    </>
  );
}
