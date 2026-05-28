import { palette, button } from "./shared.js";

const MONO = (px) => `${px}px ui-monospace, monospace`;

const RG_STEPS = {
  conv: [
    "Oppsett: aksen, en positiv (samlende) linse, brennpunktene F og F′, og et objekt utenfor 2F.",
    "Stråle 1 — parallellstrålen: parallelt inn med aksen, brytes gjennom bakre brennpunkt F′.",
    "Stråle 2 — sentralstrålen: rett gjennom linsesentrum, helt ubrutt.",
    "Stråle 3 (kontroll): inn gjennom fremre F, ut parallelt med aksen.",
    "Bildet ligger der strålene krysser — reelt, invertert og forminsket.",
  ],
  div: [
    "Oppsett: en negativ (sprende) linse med brennpunktene F og F′, og et objekt foran.",
    "Stråle 1 — parallellstrålen: brytes utover som om den kom fra fremre brennpunkt (stiplet bakover).",
    "Stråle 2 — sentralstrålen: rett gjennom linsesentrum.",
    "Bildet ligger der de stiplede bakover-forlengelsene møtes — virtuelt, opprett og forminsket.",
  ],
  concave: [
    "Oppsett: et konkavt (samlende) speil med brennpunkt F og krumningssenter C. Lyset reflekteres tilbake mot venstre.",
    "Stråle 1 — parallellstrålen: reflekteres gjennom brennpunktet F.",
    "Stråle 2 — vertexstrålen: treffer speilets midtpunkt og reflekteres symmetrisk om aksen.",
    "Bildet ligger der de reflekterte strålene krysser — reelt, invertert og forminsket.",
  ],
  convex: [
    "Oppsett: et konvekst (sprende) speil. Brennpunkt F og senter C ligger bak speilet.",
    "Stråle 1 — parallellstrålen: reflekteres som om den kom fra F bak speilet (stiplet).",
    "Stråle 2 — vertexstrålen: reflekteres symmetrisk om aksen.",
    "Bildet ligger bak speilet der de stiplede forlengelsene møtes — virtuelt, opprett og forminsket.",
  ],
  double: [
    "Oppsett: to positive linser L₁ og L₂ med hver sine brennpunkt, og et objekt til venstre for L₁.",
    "Tegn to stråler gjennom L₁ — parallellstrålen og sentralstrålen.",
    "Der de krysser mellom linsene ligger mellombildet I₁ (det L₁ ville laget alene).",
    "Strålene fortsetter og brytes på nytt i L₂ — sikt mot det endelige bildet.",
    "Endelig bilde I₂ — her reelt, opprett (to inversjoner) og forstørret.",
  ],
};

const SCN_LABELS = {
  conv: "Positiv linse", div: "Negativ linse", concave: "Konkavt speil",
  convex: "Konvekst speil", double: "Dobbel linse",
};

export default function init({ ctx, controls, getSize, onResize }) {
  let scn = "conv", step = 0;
  const maxStepOf = (s) => RG_STEPS[s].length - 1;

  // --- controls ---
  const scnRow = document.createElement("div");
  scnRow.style.cssText = "flex-basis:100%;display:flex;flex-wrap:wrap;gap:.4rem";
  const chips = {};
  Object.keys(RG_STEPS).forEach((k) => {
    const b = button(scnRow, SCN_LABELS[k]);
    b.setAttribute("aria-pressed", k === scn ? "true" : "false");
    b.addEventListener("click", () => {
      scn = k; step = 0;
      Object.entries(chips).forEach(([kk, bb]) => bb.setAttribute("aria-pressed", kk === scn ? "true" : "false"));
      draw();
    });
    chips[k] = b;
  });
  controls.append(scnRow);

  const stepText = document.createElement("div");
  stepText.className = "sim-readout";
  stepText.setAttribute("aria-live", "polite");
  controls.append(stepText);

  const navRow = document.createElement("div");
  navRow.style.cssText = "flex-basis:100%;display:flex;align-items:center;gap:.6rem";
  const prevBtn = button(navRow, "‹ Forrige");
  const countEl = document.createElement("span");
  countEl.style.cssText = "font-size:.85rem;color:var(--muted);font-variant-numeric:tabular-nums";
  navRow.append(countEl);
  const nextBtn = button(navRow, "Neste steg ›");
  const resetBtn = button(navRow, "Tilbakestill");
  controls.append(navRow);

  // --- drawing helpers ---
  const yAt = (A, B, x) => A.y + ((B.y - A.y) * (x - A.x)) / (B.x - A.x);

  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    ctx.clearRect(0, 0, W, H);

    const axis = (cy) => {
      ctx.strokeStyle = C.line2; ctx.lineWidth = 1; ctx.setLineDash([2, 4]);
      ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke(); ctx.setLineDash([]);
    };
    const lensGlyph = (x, cy, hh, diverging) => {
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5; ctx.setLineDash([]);
      ctx.beginPath(); ctx.moveTo(x, cy - hh); ctx.lineTo(x, cy + hh); ctx.stroke();
      ctx.lineWidth = 2; const a = 7;
      [[cy - hh, 1], [cy + hh, -1]].forEach((p) => {
        const yy = p[0], dir = p[1] * (diverging ? -1 : 1);
        ctx.beginPath(); ctx.moveTo(x - a, yy + dir * a); ctx.lineTo(x, yy); ctx.lineTo(x + a, yy + dir * a); ctx.stroke();
      });
    };
    const mirrorArc = (Mx, cy, f) => {
      const R = Math.abs(2 * f), Cc = Mx - 2 * f, ang = Math.asin(Math.min(0.94, 92 / R));
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5; ctx.setLineDash([]); ctx.beginPath();
      if (f > 0) ctx.arc(Cc, cy, R, -ang, ang);
      else ctx.arc(Cc, cy, R, Math.PI - ang, Math.PI + ang);
      ctx.stroke();
    };
    const focal = (x, cy, label) => {
      ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.arc(x, cy, 3, 0, 7); ctx.fill();
      ctx.fillStyle = C.inkFaint; ctx.font = MONO(11); ctx.fillText(label, x - 4, cy + 16);
    };
    const objectArrow = (Ox, cy, ho) => {
      ctx.strokeStyle = C.green; ctx.lineWidth = 2.5; ctx.setLineDash([]); arr(Ox, cy, Ox, cy - ho);
      ctx.fillStyle = C.inkDim; ctx.font = MONO(12); ctx.fillText("objekt", Ox - 16, cy + 16);
    };
    const imageArrow = (Ix, cy, hi, real, label) => {
      ctx.strokeStyle = real ? C.red : C.orange; ctx.lineWidth = 2.5; ctx.setLineDash(real ? [] : [5, 4]);
      arr(Ix, cy, Ix, cy - hi); ctx.setLineDash([]);
      ctx.fillStyle = C.inkDim; ctx.font = MONO(12); ctx.fillText(label, Ix + 5, cy + 16);
    };
    const arr = (x1, y1, x2, y2) => {
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      const a = Math.atan2(y2 - y1, x2 - x1);
      ctx.beginPath(); ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - 7 * Math.cos(a - 0.4), y2 - 7 * Math.sin(a - 0.4));
      ctx.lineTo(x2 - 7 * Math.cos(a + 0.4), y2 - 7 * Math.sin(a + 0.4));
      ctx.closePath(); ctx.fillStyle = ctx.strokeStyle; ctx.fill();
    };
    const ray = (tip, hit, P, fwd, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = 1.7; ctx.setLineDash([]);
      if (tip.x !== hit.x || tip.y !== hit.y) {
        ctx.beginPath(); ctx.moveTo(tip.x, tip.y); ctx.lineTo(hit.x, hit.y); ctx.stroke();
      }
      const dx = P.x - hit.x, dy = P.y - hit.y;
      if (Math.sign(dx) === fwd) {
        ctx.beginPath(); ctx.moveTo(hit.x, hit.y); ctx.lineTo(hit.x + dx * 1.18, hit.y + dy * 1.18); ctx.stroke();
      } else {
        const target = fwd > 0 ? W : 0, t = (hit.x - target) / (dx || 1e-6);
        ctx.beginPath(); ctx.moveTo(hit.x, hit.y); ctx.lineTo(target, hit.y - dy * t); ctx.stroke();
        ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(hit.x, hit.y); ctx.lineTo(P.x, P.y); ctx.stroke(); ctx.setLineDash([]);
      }
    };

    const renderLens = (cfg, ms) => {
      const cy = H / 2, Lx = cfg.Lx * W, F = cfg.F * W, Ox = cfg.Ox * W, ho = cfg.ho;
      const so = Lx - Ox, si = 1 / (1 / F - 1 / so), Ix = Lx + si, m = -si / so, hi = m * ho, real = si > 0;
      const tip = { x: Ox, y: cy - ho }, P = { x: Ix, y: cy - hi };
      axis(cy); lensGlyph(Lx, cy, 90, cfg.diverging);
      focal(Math.min(Lx - F, Lx + F), cy, "F"); focal(Math.max(Lx - F, Lx + F), cy, "F'");
      objectArrow(Ox, cy, ho);
      if (ms >= 1) ray(tip, { x: Lx, y: tip.y }, P, 1, C.yellow);
      if (ms >= 2) ray(tip, { x: Lx, y: cy }, P, 1, C.cyan);
      if (!cfg.diverging && ms >= 3) { const hy = yAt(tip, { x: Lx - F, y: cy }, Lx); ray(tip, { x: Lx, y: hy }, P, 1, C.violet); }
      if (ms >= (cfg.diverging ? 3 : 4)) imageArrow(Ix, cy, hi, real, "bilde");
    };
    const renderMirror = (cfg, ms) => {
      const cy = H / 2, Mx = cfg.Mx * W, f = cfg.f * W, Ox = cfg.Ox * W, ho = cfg.ho;
      const so = Mx - Ox, si = 1 / (1 / f - 1 / so), Ix = Mx - si, m = -si / so, hi = m * ho, real = si > 0;
      const tip = { x: Ox, y: cy - ho }, P = { x: Ix, y: cy - hi };
      axis(cy); mirrorArc(Mx, cy, f);
      focal(Mx - f, cy, "F"); focal(Mx - 2 * f, cy, "C");
      objectArrow(Ox, cy, ho);
      if (ms >= 1) ray(tip, { x: Mx, y: tip.y }, P, -1, C.yellow);
      if (ms >= 2) ray(tip, { x: Mx, y: cy }, P, -1, C.cyan);
      if (ms >= 3) imageArrow(Ix, cy, hi, real, "bilde");
    };
    const renderDouble = (ms) => {
      const cy = H / 2, L1x = 0.24 * W, L2x = 0.56 * W, f1 = 0.1 * W, f2 = 0.08 * W, ho = 38, Ox = 0.04 * W;
      const so1 = L1x - Ox, si1 = 1 / (1 / f1 - 1 / so1), m1 = -si1 / so1, hi1 = m1 * ho, P1 = { x: L1x + si1, y: cy - hi1 };
      const so2 = L2x - (L1x + si1), si2 = 1 / (1 / f2 - 1 / so2), m2 = -si2 / so2, hi2 = m2 * hi1, P2 = { x: L2x + si2, y: cy - hi2 }, real2 = si2 > 0;
      axis(cy); lensGlyph(L1x, cy, 90, false); lensGlyph(L2x, cy, 90, false);
      ctx.fillStyle = C.inkFaint; ctx.font = MONO(12); ctx.fillText("L₁", L1x - 7, cy - 96); ctx.fillText("L₂", L2x - 7, cy - 96);
      focal(L1x - f1, cy, "F"); focal(L1x + f1, cy, "F'"); focal(L2x - f2, cy, "F"); focal(L2x + f2, cy, "F'");
      objectArrow(Ox, cy, ho);
      const tip = { x: Ox, y: cy - ho }, A1 = { x: L1x, y: tip.y }, A2 = { x: L2x, y: yAt(A1, P1, L2x) }, B1 = { x: L1x, y: cy }, B2 = { x: L2x, y: yAt(B1, P1, L2x) };
      if (ms >= 1) {
        ctx.setLineDash([]); ctx.lineWidth = 1.7;
        ctx.strokeStyle = C.yellow; ctx.beginPath(); ctx.moveTo(tip.x, tip.y); ctx.lineTo(A1.x, A1.y); ctx.lineTo(A2.x, A2.y); ctx.stroke();
        ctx.strokeStyle = C.cyan; ctx.beginPath(); ctx.moveTo(tip.x, tip.y); ctx.lineTo(B1.x, B1.y); ctx.lineTo(B2.x, B2.y); ctx.stroke();
      }
      if (ms >= 2) {
        ctx.fillStyle = C.orange; ctx.beginPath(); ctx.arc(P1.x, P1.y, 3, 0, 7); ctx.fill();
        ctx.strokeStyle = C.orange; ctx.lineWidth = 2; ctx.setLineDash([4, 3]); arr(P1.x, cy, P1.x, P1.y); ctx.setLineDash([]);
        ctx.fillStyle = C.inkDim; ctx.font = MONO(12); ctx.fillText("I₁", P1.x + 4, cy - 4);
      }
      if (ms >= 3) { ray(A2, A2, P2, 1, C.yellow); ray(B2, B2, P2, 1, C.cyan); }
      if (ms >= 4) imageArrow(L2x + si2, cy, hi2, real2, "I₂");
    };

    const CFG = {
      conv: { diverging: false, Lx: 0.4, F: 0.13, Ox: 0.114, ho: 52 },
      div: { diverging: true, Lx: 0.5, F: -0.15, Ox: 0.2, ho: 50 },
      concave: { Mx: 0.62, f: 0.16, Ox: 0.18, ho: 50 },
      convex: { Mx: 0.52, f: -0.16, Ox: 0.18, ho: 50 },
    };
    if (scn === "double") renderDouble(step);
    else if (scn === "concave" || scn === "convex") renderMirror(CFG[scn], step);
    else renderLens(CFG[scn], step);

    stepText.textContent = RG_STEPS[scn][step] || "";
    countEl.textContent = `Steg ${step + 1} / ${RG_STEPS[scn].length}`;
    prevBtn.disabled = step <= 0;
    nextBtn.disabled = step >= maxStepOf(scn);
  }

  const setStep = (s) => { step = Math.max(0, Math.min(maxStepOf(scn), s)); draw(); };
  prevBtn.addEventListener("click", () => setStep(step - 1));
  nextBtn.addEventListener("click", () => setStep(step + 1));
  resetBtn.addEventListener("click", () => setStep(0));

  onResize(draw);
  draw();
}
