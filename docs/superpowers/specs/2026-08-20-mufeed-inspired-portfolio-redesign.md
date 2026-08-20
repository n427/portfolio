# Nicole Zhang Portfolio Redesign

## Objective

Redesign Nicole Zhang's portfolio as a close visual replica of the compact, text-first presentation on mufeedcm.com while keeping Nicole's identity, project content, links, and imagery. The result should feel like Nicole's site using the reference's visual language, not a copy of its author's biography, writing, or design philosophy.

## Audience and page job

The audience is recruiters, collaborators, founders, and product or engineering teams evaluating Nicole's work. The page's single job is to introduce Nicole quickly and make all eight projects easy to scan and open.

## Content

### Introduction

The page opens with "Hi, I'm Nicole," followed by a short factual introduction describing her as a product-minded builder working across consumer products, career tools, analytics, and research software. It must not include the reference site's biography or language about simplicity and minimalism.

### Projects

Keep the existing projects in their current order:

1. Tagged — Weekly Photo Challenges
2. Jobflow — AI Resume Customizer
3. Peekaboo — AI Visibility Analytics
4. Produ — SWE Soft-Skills Evaluator
5. Visual Cognition Lab — Research Dashboard
6. Dyrt — Waste Audit Tracking Platform
7. Meta Glasses — Smart Glasses Prototypes
8. PostaCare — Postnatal Depression Screening

Each project retains its current description, tags, image, and destination URL. The default presentation is a compact linked row. On pointer hover or keyboard focus, a restrained floating image preview appears without changing the row's layout. On touch devices, the list remains fully usable without relying on previews.

### Contact

Keep Nicole's current email, GitHub, and LinkedIn destinations. Present them as an inline sentence matching the reference site's contact treatment.

### Footer

Show Nicole's name, the current year, and a light/dark theme control. Do not include a quote, imitation version number, or attribution suggesting Nicole authored the reference site.

## Visual system

The implementation should closely match the reference site's proportions and restraint.

- **Color:** near-white page background, near-black primary text, muted gray secondary text, fine neutral rules, and understated link underlines. Dark mode inverts these relationships with a charcoal background rather than pure black.
- **Typography:** use a readable system sans-serif stack with a compact monospace face for tags, dates, and theme controls. Type remains modest in size; hierarchy comes from weight, spacing, and alignment.
- **Layout:** a single narrow reading column centered on wide screens and padded on small screens. Sections are separated by generous vertical whitespace rather than cards or colored panels.
- **Project rows:** title and description lead; tags sit beneath or alongside according to available width. Fine separators encode the list structure. No rounded cards, gradients, shadows, decorative grids, or custom cursor.
- **Signature detail:** project screenshots reveal beside the project list on hover or focus, connecting the reference's text-led density to Nicole's visually rich existing work.

## Structure and components

The home page will be decomposed into focused units:

- `ThemeToggle` manages the explicit light/dark preference, persists it locally, and respects the system preference when no choice exists.
- `Intro` renders Nicole's opening copy.
- `ProjectList` owns the project data and renders every `ProjectRow`.
- `ProjectRow` provides the external link, description, tags, focus behavior, and preview trigger.
- `ProjectPreview` renders the active screenshot for pointer and keyboard users.
- `Contact` renders Nicole's social and email links.
- `Footer` renders ownership, year, and theme control.

Project information remains local static data. No API or server state is introduced.

## Interaction and accessibility

- All external destinations use semantic links and indicate that they open outside the portfolio.
- Keyboard focus receives a clear visible treatment and activates the same project preview as pointer hover.
- Theme state initializes without a distracting flash and is announced through an accessible button label.
- Motion is limited to one short opacity/translation transition for project previews and disabled when `prefers-reduced-motion` is set.
- Images have useful alt text and do not block navigation if they fail to load.
- The layout remains readable from 320px wide through large desktop screens.

## Metadata

Set the document title and description to Nicole Zhang and her portfolio. Remove generic create-next-app metadata. Preserve the existing deployment configuration unless a build issue requires a narrowly scoped correction.

## Implementation boundaries

- Reuse the current Next.js app and existing project image assets.
- Replace the current animated background, custom cursor, large card system, and multi-section visual treatment.
- Remove dependencies from the page only when they are no longer used; avoid unrelated dependency upgrades.
- Do not add a writings section, fabricated work, testimonials, analytics, a CMS, or new project detail pages.

## Verification

Before completion:

1. Run the repository's lint command.
2. Run a production build.
3. Inspect desktop and mobile layouts in a browser.
4. Verify all eight project links and all three contact links are present.
5. Test keyboard navigation, project preview focus behavior, theme persistence, dark mode, and reduced motion.
6. Compare the final desktop page against mufeedcm.com for layout density, spacing, typography hierarchy, and footer treatment while confirming that only Nicole's content remains.
