# Nicole Zhang Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current animated card portfolio with a close, responsive replica of mufeedcm.com's compact text-first design while retaining Nicole's eight projects, project imagery, and contact links.

**Architecture:** Keep the Next.js App Router site as a single-page static export, but split static project content, theme behavior, and the page presentation into focused modules. React state controls the active project preview; a small theme utility and client component synchronize system preference, local storage, and the root `dark` class without introducing application state or a backend.

**Tech Stack:** Next.js 15.5, React 19, TypeScript 5, Tailwind CSS 4 plus focused global CSS, Next Image, Vitest, Testing Library, jsdom

**Spec:** `docs/superpowers/specs/2026-08-20-mufeed-inspired-portfolio-redesign.md`

## Global Constraints

- Reuse the current Next.js app and all eight existing project image assets.
- Retain every project's current title, description, tag list, URL, image, and ordering.
- Keep `mailto:nicolexzha@gmail.com`, `https://github.com/n427`, and `https://www.linkedin.com/in/nicolexzhang/`.
- Do not add writings, fabricated work, testimonials, analytics, a CMS, project detail pages, the Dieter Rams quote, or language about simplicity/minimalism.
- Remove the animated background, custom cursor, large cards, decorative grids, gradients, and unrelated motion from the rendered page.
- Preserve `output: "export"`, the production `/portfolio` base path, and unoptimized images in `next.config.mjs`.
- Support 320px through large desktop widths, visible keyboard focus, meaningful image alt text, touch navigation, dark mode, theme persistence, and reduced motion.
- Avoid unrelated dependency upgrades.

## File Structure

- Create `src/app/projects.ts` — typed static project records and imported project imagery.
- Create `src/app/theme.ts` — pure theme preference types and resolution helpers.
- Create `src/app/theme-toggle.tsx` — client-side theme synchronization and accessible toggle.
- Create `src/app/page.test.tsx` — content, link, preview, and accessibility behavior tests.
- Create `src/app/theme.test.tsx` — theme helper and toggle behavior tests.
- Create `vitest.config.mts` and `vitest.setup.ts` — jsdom and Testing Library configuration.
- Modify `src/app/page.tsx` — compact intro, project list/preview, contact, and footer composition.
- Modify `src/app/globals.css` — complete light/dark visual system, responsive layout, focus, preview, and reduced-motion rules.
- Modify `src/app/layout.tsx` — Nicole-specific metadata, font variables, and pre-hydration theme script.
- Modify `package.json` and lockfile — add the test command and test-only dependencies.

---

### Task 1: Test Harness and Project Content Model

**Files:**
- Create: `vitest.config.mts`
- Create: `vitest.setup.ts`
- Create: `src/app/projects.ts`
- Create: `src/app/page.test.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `Project` with `title`, `description`, `tags`, `href`, and `image` fields.
- Produces: `PROJECTS: readonly Project[]`, consumed by `PortfolioPage` and `ProjectList` in Task 3.

- [ ] **Step 1: Install the test-only dependencies and add the test script**

Run:

```bash
npm install --save-dev vitest@^3.2.4 jsdom@^26.1.0 @testing-library/react@^16.3.0 @testing-library/jest-dom@^6.6.3
```

Add to `package.json` scripts:

```json
"test": "vitest run"
```

Expected: `package.json` and `package-lock.json` contain only the new test dependencies plus the new script.

- [ ] **Step 2: Configure Vitest and Testing Library**

Create `vitest.config.mts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Write the failing portfolio content test**

Create `src/app/page.test.tsx` with the initial test:

```tsx
import { describe, expect, it } from "vitest";
import { PROJECTS } from "./projects";

describe("portfolio content", () => {
  it("retains all eight projects in the approved order", () => {
    expect(PROJECTS.map((project) => project.title)).toEqual([
      "Tagged — Weekly Photo Challenges",
      "Jobflow — AI Resume Customizer",
      "Peekaboo — AI Visibility Analytics",
      "Produ — SWE Soft-Skills Evaluator",
      "Visual Cognition Lab — Research Dashboard",
      "Dyrt — Waste Audit Tracking Platform",
      "Meta Glasses — Smart Glasses Prototypes",
      "PostaCare — Postnatal Depression Screening",
    ]);
  });

  it("provides a destination, image, description, and tags for every project", () => {
    expect(PROJECTS).toHaveLength(8);
    for (const project of PROJECTS) {
      expect(project.href).toMatch(/^https:\/\//);
      expect(project.description.length).toBeGreaterThan(20);
      expect(project.tags.length).toBeGreaterThan(0);
      expect(project.image).toBeTruthy();
    }
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test -- src/app/page.test.tsx`

Expected: FAIL because `./projects` does not exist.

- [ ] **Step 5: Extract the exact project records into the typed module**

Create `src/app/projects.ts` with the exact retained records:

```ts
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
```

- [ ] **Step 6: Run the content tests**

Run: `npm test -- src/app/page.test.tsx`

Expected: 2 tests PASS.

- [ ] **Step 7: Commit the content boundary**

```bash
git add package.json package-lock.json vitest.config.mts vitest.setup.ts src/app/projects.ts src/app/page.test.tsx
git commit -m "test: lock portfolio project content"
```

---

### Task 2: Persistent Theme Control

**Files:**
- Create: `src/app/theme.ts`
- Create: `src/app/theme-toggle.tsx`
- Create: `src/app/theme.test.tsx`

**Interfaces:**
- Produces: `Theme = "light" | "dark"`.
- Produces: `resolveTheme(savedTheme: string | null, prefersDark: boolean): Theme`.
- Produces: `applyTheme(theme: Theme): void`.
- Produces: `ThemeToggle(): JSX.Element`, consumed by the footer in Task 3.

- [ ] **Step 1: Write failing tests for preference resolution and accessible toggling**

Create `src/app/theme.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { resolveTheme } from "./theme";
import { ThemeToggle } from "./theme-toggle";

describe("resolveTheme", () => {
  it("prefers a saved valid theme over the system preference", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("falls back to the system preference", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });
});

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false })));
  });

  it("toggles and persists the active theme", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Switch to dark theme" }));
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
  });
});
```

- [ ] **Step 2: Run the theme tests to verify they fail**

Run: `npm test -- src/app/theme.test.tsx`

Expected: FAIL because `theme.ts` and `theme-toggle.tsx` do not exist.

- [ ] **Step 3: Implement the pure theme helpers**

Create `src/app/theme.ts`:

```ts
export type Theme = "light" | "dark";

export function resolveTheme(savedTheme: string | null, prefersDark: boolean): Theme {
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return prefersDark ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
}
```

- [ ] **Step 4: Implement the accessible client toggle**

Create `src/app/theme-toggle.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { applyTheme, resolveTheme, type Theme } from "./theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const next = resolveTheme(
      localStorage.getItem("theme"),
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
    setTheme(next);
    applyTheme(next);
  }, []);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}>
      theme: <span aria-hidden="true">{theme}</span>
    </button>
  );
}
```

- [ ] **Step 5: Run the theme tests**

Run: `npm test -- src/app/theme.test.tsx`

Expected: 3 tests PASS with no React act warnings.

- [ ] **Step 6: Commit the theme control**

```bash
git add src/app/theme.ts src/app/theme-toggle.tsx src/app/theme.test.tsx
git commit -m "feat: add persistent portfolio theme control"
```

---

### Task 3: Compact Portfolio Page and Project Preview

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `PROJECTS` and `Project` from `src/app/projects.ts`.
- Consumes: `ThemeToggle` from `src/app/theme-toggle.tsx`.
- Produces: default `PortfolioPage` with `Intro`, `ProjectList`, `ProjectRow`, `ProjectPreview`, `Contact`, and `Footer` units.

- [ ] **Step 1: Add failing page behavior tests**

Append to `src/app/page.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import PortfolioPage from "./page";

describe("PortfolioPage", () => {
  it("renders Nicole's intro, contact links, and all projects", () => {
    render(<PortfolioPage />);
    expect(screen.getByRole("heading", { level: 1, name: "Hi, I'm Nicole," })).toBeVisible();
    expect(screen.getAllByTestId("project-link")).toHaveLength(8);
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute("href", "https://github.com/n427");
    expect(screen.getByRole("link", { name: "linkedin" })).toHaveAttribute("href", "https://www.linkedin.com/in/nicolexzhang/");
    expect(screen.getByRole("link", { name: "nicolexzha@gmail.com" })).toHaveAttribute("href", "mailto:nicolexzha@gmail.com");
  });

  it("reveals the matching screenshot on project focus", () => {
    render(<PortfolioPage />);
    const tagged = screen.getByRole("link", { name: /Tagged — Weekly Photo Challenges/ });
    fireEvent.focus(tagged);
    expect(screen.getByRole("img", { name: "Tagged — Weekly Photo Challenges preview" })).toBeVisible();
    fireEvent.blur(tagged);
    expect(screen.queryByRole("img", { name: "Tagged — Weekly Photo Challenges preview" })).not.toBeInTheDocument();
  });

  it("does not render the reference author's content", () => {
    render(<PortfolioPage />);
    expect(screen.queryByText(/Dieter Rams/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Good design is as little design/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/writings/i)).not.toBeInTheDocument();
  });
});
```

Mock `next/image` at the top of the test file so static image imports render predictably in jsdom:

```tsx
import { vi } from "vitest";

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt={alt} {...props} />,
}));
```

- [ ] **Step 2: Run the page tests to verify the old design fails**

Run: `npm test -- src/app/page.test.tsx`

Expected: FAIL because the old page lacks the approved heading, test IDs, compact preview behavior, theme component, and lowercase accessible contact names.

- [ ] **Step 3: Replace the page with the compact semantic composition**

Replace `src/app/page.tsx` with a client component that:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { PROJECTS, type Project } from "./projects";
import { ThemeToggle } from "./theme-toggle";

function Intro() {
  return (
    <header className="intro">
      <h1>Hi, I&apos;m Nicole,</h1>
      <p>
        I&apos;m a product-minded builder studying Computer Science &amp; Business Administration at USC. I design and ship consumer products, career tools, analytics platforms, and research software.
      </p>
    </header>
  );
}

function ProjectRow({ project, onActive }: { project: Project; onActive: (project: Project | null) => void }) {
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
        <span className="project-copy"><strong>{project.title}</strong><span>{project.description}</span></span>
        <span className="project-tags">{project.tags.join(" · ")}</span>
        <span className="external-mark" aria-hidden="true">↗</span>
      </a>
    </li>
  );
}
```

Implement `ProjectList` with `useState<Project | null>`, an `<ul>` mapping all `PROJECTS`, and a `ProjectPreview` that returns `null` when inactive and otherwise renders:

```tsx
<figure className="project-preview" aria-live="polite">
  <Image src={project.image} alt={`${project.title} preview`} sizes="(min-width: 900px) 22rem, 0px" priority={false} />
</figure>
```

Complete the page with these exact contact and footer structures:

```tsx
function Contact() {
  return (
    <section className="contact-section" aria-labelledby="contact-title">
      <h2 id="contact-title">contact</h2>
      <p>
        Connect with me on <a href="https://github.com/n427" target="_blank" rel="noreferrer">github</a>
        {" · "}<a href="https://www.linkedin.com/in/nicolexzhang/" target="_blank" rel="noreferrer">linkedin</a>
        {" or reach me at "}<a href="mailto:nicolexzha@gmail.com">nicolexzha@gmail.com</a>.
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
```

The projects heading copy is `projects` and its subtitle is `products, experiments, and tools I've helped bring to life.` The contact sentence must link the exact three approved destinations, using accessible link text `github`, `linkedin`, and `nicolexzha@gmail.com`.

- [ ] **Step 4: Run the page behavior tests**

Run: `npm test -- src/app/page.test.tsx`

Expected: all 5 content and page tests PASS.

- [ ] **Step 5: Run lint before committing**

Run: `npm run lint`

Expected: PASS with no unused imports from Framer Motion, Lucide, the old UI card/button components, profile imagery, or removed effects.

- [ ] **Step 6: Commit the semantic page**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "feat: rebuild portfolio as compact project index"
```

---

### Task 4: Reference-Matched Visual System, Metadata, and Final Verification

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: semantic class names from Task 3.
- Produces: responsive light/dark visual presentation and pre-hydration theme initialization.

- [ ] **Step 1: Replace the generic theme and card styles with the approved tokens**

Replace `src/app/globals.css` with Tailwind's import plus a focused system based on these exact tokens:

```css
@import "tailwindcss";

:root {
  --page: #f7f7f5;
  --ink: #171714;
  --muted: #6d6d66;
  --rule: #d9d9d2;
  --soft: #ecece7;
  --focus: #315c9b;
  --content: 42rem;
  color-scheme: light;
}

:root.dark {
  --page: #191918;
  --ink: #f1f1ec;
  --muted: #a6a69e;
  --rule: #3b3b37;
  --soft: #242422;
  --focus: #8db4ec;
  color-scheme: dark;
}

* { box-sizing: border-box; }
html { background: var(--page); }
body {
  margin: 0;
  background: var(--page);
  color: var(--ink);
  font-family: var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif;
  font-size: 15px;
  line-height: 1.55;
  text-rendering: optimizeLegibility;
}
a { color: inherit; }
a:focus-visible, button:focus-visible { outline: 2px solid var(--focus); outline-offset: 4px; }
.site-shell { width: min(var(--content), calc(100% - 2rem)); margin: 0 auto; padding: 7rem 0 2rem; }
.intro h1 { margin: 0 0 .9rem; font-size: clamp(1.45rem, 4vw, 1.8rem); line-height: 1.2; letter-spacing: -.035em; }
.intro p { max-width: 39rem; margin: 0; color: var(--muted); font-size: 1rem; }
.projects-section, .contact-section { margin-top: 5.5rem; }
.section-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; margin-bottom: .35rem; }
.section-heading h2 { margin: 0; font-size: 1.05rem; }
.section-heading p, .contact-section > p { margin: 0; color: var(--muted); }
.project-list { position: relative; margin: 1.15rem 0 0; padding: 0; list-style: none; border-top: 1px solid var(--rule); }
.project-row { position: relative; display: grid; grid-template-columns: minmax(0, 1fr) auto 1rem; gap: 1rem; align-items: start; padding: 1rem 0; border-bottom: 1px solid var(--rule); text-decoration: none; }
.project-copy { display: grid; gap: .2rem; }
.project-copy strong { font-size: .94rem; font-weight: 600; }
.project-copy > span { color: var(--muted); font-size: .88rem; }
.project-tags { color: var(--muted); font-family: var(--font-geist-mono), monospace; font-size: .7rem; white-space: nowrap; }
.external-mark { color: var(--muted); transition: transform 150ms ease, color 150ms ease; }
.project-row:hover .external-mark, .project-row:focus-visible .external-mark { color: var(--ink); transform: translate(2px, -2px); }
.project-preview { position: fixed; z-index: 10; left: calc(50% + 23rem); top: 50%; width: min(22rem, calc(50vw - 25rem)); margin: 0; transform: translateY(-50%); pointer-events: none; animation: preview-in 160ms ease-out both; }
.project-preview img { display: block; width: 100%; height: auto; border: 1px solid var(--rule); background: var(--soft); }
.contact-section a { text-underline-offset: .2em; text-decoration-thickness: 1px; }
footer { display: flex; justify-content: space-between; gap: 1rem; margin-top: 7rem; padding-top: 1rem; border-top: 1px solid var(--rule); color: var(--muted); font-family: var(--font-geist-mono), monospace; font-size: .72rem; }
.theme-toggle { border: 0; padding: 0; background: transparent; color: inherit; font: inherit; cursor: pointer; }
.theme-toggle:hover { color: var(--ink); }
@keyframes preview-in { from { opacity: 0; transform: translate(10px, -50%); } to { opacity: 1; transform: translate(0, -50%); } }
```

Add responsive rules that stack project metadata under 640px, reduce the shell's top padding, and hide `.project-preview` below 900px. Add `@media (prefers-reduced-motion: reduce)` to remove preview and arrow transitions/animations.

- [ ] **Step 2: Add exact portfolio metadata and the no-flash theme bootstrap**

Update `src/app/layout.tsx` metadata:

```ts
export const metadata: Metadata = {
  title: "Nicole Zhang — Product Builder",
  description: "Selected products, experiments, and software by Nicole Zhang.",
};
```

Keep Geist Sans and Geist Mono, apply both variables to `<body>`, add `suppressHydrationWarning` to `<html>`, and insert this script as the first body child:

```tsx
<script
  dangerouslySetInnerHTML={{
    __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){}})()`,
  }}
/>
```

- [ ] **Step 3: Run the complete automated verification**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all tests PASS, ESLint reports no errors, and Next.js produces the static export successfully under the existing `/portfolio` deployment configuration.

- [ ] **Step 4: Start the site and inspect responsive layouts**

Run: `npm run dev`

Inspect at 1440×900, 768×1024, and 320×700. Confirm:

- The desktop column width, generous section spacing, small typography, hairline project rows, contact sentence, and theme footer closely match `https://mufeedcm.com/`.
- The mobile page has no horizontal overflow; tags wrap below descriptions and previews are hidden.
- All eight project rows remain visible and open their retained destinations.
- Hover and keyboard focus show the correct screenshot at desktop width.
- Tab focus is clearly visible, and the theme control persists after reload.
- Dark mode uses charcoal and off-white rather than pure black and white.
- With reduced motion enabled, the screenshot appears without animation.
- No writings, profile portrait, card grid, decorative background, quote, or reference-author copy appears.

- [ ] **Step 5: Remove one unnecessary visual accessory if the final page is busier than the reference**

Compare the running page with the reference. If both the external arrow and project preview compete for attention, remove the arrow while preserving the preview; otherwise make no change. Re-run `npm test && npm run lint` after any adjustment.

- [ ] **Step 6: Commit the final visual integration**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: match compact reference portfolio design"
```

- [ ] **Step 7: Confirm the worktree is clean**

Run: `git status --short`

Expected: no output.
