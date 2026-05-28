import { defineConfig } from "astro/config";
import studyCompanion from "study-companion";

export default defineConfig({
  site: "https://optikk.martinsundal.no",
  integrations: [studyCompanion()],
});
