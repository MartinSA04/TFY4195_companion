# Roadmap — TFY4195 Optikk companion

From a polished **reference page** → a **study tool students rely on to get through the course**.

## Direction (decided 2026-05-23)

- **Infrastructure: stay fully static.** GitHub Pages, `localStorage` only, no backend. Static-friendly add-ons are fair game: installable offline PWA, JSON export/import for cross-device, GitHub-based feedback/comments.
- **Scope: this semester's cohort (V2026).** Content stays course-specific; not a multi-course platform.
- **Priorities: all four** — grind past exams · retain & recall · quick reference · build intuition.

> **Timing reality.** Exam files moved from Nov/Dec (2018–2020) to **late May** (2021 onward: `220528`, `230524`). The V2026 exam is most likely **late May / early June 2026**. The four priorities have very different runways — two are cheap and help during cram week, two are content-heavy and pay off later. Sequenced accordingly below.

---

## Phase 0 — Enabling refactor (do first, regardless)  *(✅ done)*

Content currently lives as ~1700 lines of inline HTML strings in `app.js`. Every priority reads the same underlying material, so the highest-leverage move is to **separate content from rendering** — even for one cohort. No build step; plain ES-module data files imported by `app.js`.

- **Question bank** (`questions.js`) — each item as data: `{module, topic, type: MC|calc, difficulty, source: "Exam 2022 Q3", answer, explanation}`. Powers quizzes, mock exams, weak-area tracking, and flashcards from one source.
- **Formula registry** (`formulas.js`) — `{id, latex, desc, symbols, module, onSheet, mustMemorize}`. The `onSheet` / `★ pugg` flags already exist inline; promoting them to data powers the formula-sheet page and flashcards for free.
- **Versioned `localStorage` state layer + JSON export/import** — the no-backend answer to cross-device: back up progress, reopen on another device.

Effort: **M** (mechanical). Skipping it means bolting four features onto string soup.

---

## Priority 1 — Quick reference  *(cheapest, highest daily use — ship pre-exam)*  *(🔨 in progress)*

- **Consolidated formula-sheet page** — every formula in one scannable view, grouped by module, with a filter toggle **“on the provisional sheet” vs “★ must memorize.”** Copy-LaTeX on click. **S** (after Phase 0).
- **Symbol glossary page** — the course-specific symbols (`s_o`, `f_o/f_e`, TE/TM, `𝓡`, `Λ`, …), searchable. **S**.
- **Ctrl-K command palette / search** across modules, formulas, glossary, questions (client-side index, no deps). **S–M**.
- **Print stylesheet** — clean paper printout of a module or the formula sheet for revision. **S**.

## Priority 2 — Grind past exams  *(highest exam value, content-heavy)*

- **Manual ray-tracing guide (RT module)** — ruler-and-pencil construction rules for lenses and mirrors (the hand-drawn *strålegang* that's a near-guaranteed by-hand exam task). **S, content.** *(🔨 in progress)*
- **Past-exam problem bank** — digitize the 2018–2025 sets in `course_content/` using the existing `reveal` pattern: statement → attempt → step-by-step solution → boxed answer. Tag by topic; surface as *“Past-exam problems on this topic”* in each module.
- **Mock-exam mode** — timed, assembled from the bank, mirroring the real format (MC/matching + 2 hand-calculation problems), self-graded with score history.
- Cost: **code M, content L.** Digitizing PDFs + writing trustworthy solutions is the real work; most likely to slip past *this* exam, but the most valuable long-lived asset.

## Priority 3 — Retain & recall  *(quick win once Phase 0 is done)*  *(🔨 in progress)*

- **Spaced-repetition flashcards** (Leitner / SM-2-lite, `localStorage`). Decks auto-generated from the formula registry (name ↔ formula ↔ *when to use it*), concept cards, and recurring **MC traps** (e.g. the “photon obeys Fermi–Dirac?” bait). “Due today” badge in the top bar. **M**.
- **Learning-goal confidence + weak-area dashboard** — self-rate each learning goal; combine with quiz/mock scores to route to the right cards/problems. **M**.

## Priority 4 — Build intuition  *(existing strength — extend after the exam)*

- More **simulations**, each paired with an **exam-style challenge** + check button: Michelson fringe-counting, thin-film color, Malus/Brewster polarization, prism/rainbow. **M each**.
- **“Build-your-own optical system” matrix sandbox** — add elements, see the system matrix computed live. Extends the two-lens ray-tracer and targets the recurring “match system ↔ matrix” question.

---

## Cross-cutting (all static)

- **PWA** (manifest + service worker) → installable, fully offline, KaTeX cached. **S–M**.
- **Feedback loop** — “flag this answer” link opening a prefilled GitHub issue, and/or **Giscus** comments per module (GitHub Discussions, free). Correctness is everything for exam content.
- **QA in CI** (GitHub Actions; hosting stays static) — assert every KaTeX expression renders, every MC question has exactly one correct answer, no dead links.

---

## Recommended sequence

- **Exam is days away** → ship only cheap, high-use wins: **Phase 0 (formula registry only) → formula-sheet page → Ctrl-K search → flashcards.**
- **More runway** → Phase 0 → Quick reference → Retain & recall → PWA + feedback → Past-exam bank → more sims.

The bottleneck across all of this is **content authoring, not code** — digitizing exams and writing solutions is where the hours go.

---

## Effort key

`S` ≈ hours · `M` ≈ a day to a few · `L` ≈ multi-day / ongoing (mostly content).
