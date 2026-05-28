This is the TFY4195 Optikk study guide — a course repo that pins the study-companion framework (local `link:../../../private/study_companion` during dev; a GitHub tag in production).
- DO NOT add components, pages, or toolchain config — the framework injects all of it.
- Author ONLY under content/: course.yaml (metadata, formulas, exams) and sections/*.mdx (content).
- To change the design or add widgets, change the FRAMEWORK repo and bump the pin here.
- Run: pnpm dev (preview), pnpm build (static output to dist/).
- Deploys to optikk.martinsundal.no. The legacy hand-built site (app.js / index.html) is being migrated into content/; content is ported FROM app.js.
- Do not commit unless asked — the maintainer verifies locally first.
