// Shared helpers for the TFY4195 optics simulations. These live in the COURSE
// repo (not the framework); sim modules import them via a sibling URL:
//   import { arrow, palette, slider, readout, MONO } from "./shared.js";

export const MONO = "12px ui-monospace, 'JetBrains Mono', monospace";

/** Filled-arrowhead line. */
export function arrow(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 7 * Math.cos(a - 0.4), y2 - 7 * Math.sin(a - 0.4));
  ctx.lineTo(x2 - 7 * Math.cos(a + 0.4), y2 - 7 * Math.sin(a + 0.4));
  ctx.closePath();
  ctx.fillStyle = ctx.strokeStyle;
  ctx.fill();
}

/**
 * Colour palette. Theme-aware names (ink/line/accent) read the framework's CSS
 * custom properties so the figures follow light/dark; the categorical hues are
 * fixed values chosen to read on both backgrounds.
 */
export function palette() {
  const cs = getComputedStyle(document.documentElement);
  const v = (n, fb) => cs.getPropertyValue(n).trim() || fb;
  return {
    accent: v("--accent", "#2f6df6"),
    ink: v("--fg", "#11141a"),
    inkDim: v("--muted", "#5b6472"),
    inkFaint: v("--muted", "#8b94a6"),
    line: v("--border", "#e3e7ee"),
    line2: v("--border-strong", "#cfd6e2"),
    cyan: "#0891b2",
    green: "#16a34a",
    red: "#e0445b",
    orange: "#e08a1e",
    violet: "#8b5cf6",
    yellow: "#d4a017",
  };
}

/** Build a labelled range slider in `controls`; returns { input, out }. */
export function slider(controls, { label, min, max, value, step = 1 }) {
  const wrap = document.createElement("label");
  const out = document.createElement("output");
  const text = document.createElement("span");
  text.textContent = label + " ";
  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.step = step;
  input.value = value;
  const top = document.createElement("span");
  top.append(text, out);
  wrap.append(top, input);
  controls.append(wrap);
  return { input, out };
}

/** A full-width readout line under the controls. */
export function readout(controls) {
  const d = document.createElement("div");
  d.className = "sim-readout";
  controls.append(d);
  return d;
}

/** A pill button (used for scenario switchers / steppers). */
export function button(parent, label) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "sim-btn";
  b.textContent = label;
  parent.append(b);
  return b;
}
