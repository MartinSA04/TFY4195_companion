import { arrow, palette, slider, readout } from "./shared.js";

// Lengths are in cm. The x-axis scales to the stage width, as in rayCanvas.js,
// so the object is on screen at every width; heights stay in px. Scaling one
// axis keeps every ray straight and every intersection where it was.
const SO_MAX = 10.5;
const fmt = (v, d) => v.toFixed(d).replace(".", ",").replace("-", "−");

export default function init({ ctx, controls, getSize, onResize }) {
  const so = slider(controls, { label: "Objektavstand sₒ", min: 0.5, max: SO_MAX, value: 6, step: 0.1 });
  const f = slider(controls, { label: "Brennvidde f", min: 1.5, max: 5.5, value: 3, step: 0.1 });
  const ro = readout(controls);

  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    const cx = W * 0.5, cy = H * 0.5;
    // px per cm: 30 when the stage is wide enough, less on a narrow stage.
    const u = Math.min(30, (cx - 24) / SO_MAX);
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = C.line2; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    const SO = +so.input.value, F = +f.input.value;
    // lens
    ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(cx, cy - 95); ctx.lineTo(cx, cy + 95); ctx.stroke();
    ctx.fillStyle = C.accent; ctx.globalAlpha = 0.1;
    ctx.beginPath(); ctx.ellipse(cx, cy, 9, 95, 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = C.cyan; ctx.font = "11px ui-monospace, monospace";
    [[-F, "F"], [F, "F'"]].forEach((p) => {
      ctx.beginPath(); ctx.arc(cx + p[0] * u, cy, 3, 0, 7); ctx.fill();
      ctx.fillText(p[1], cx + p[0] * u - 4, cy + 18);
    });
    const ho = 55, ox = cx - SO * u;
    ctx.strokeStyle = C.green; ctx.lineWidth = 2.5; arrow(ctx, ox, cy, ox, cy - ho);
    // sₒ = f puts the image at infinity: both rays leave the lens parallel.
    const atFocus = Math.abs(SO - F) < 1e-6;
    const si = atFocus ? Infinity : 1 / (1 / F - 1 / SO);
    const m = atFocus ? -Infinity : -si / SO, hi = m * ho, ix = cx + si * u, real = si > 0;
    const tipX = ox, tipY = cy - ho;
    ctx.lineWidth = 1.4;
    // ray 1: parallel to the axis, then through F' (true for every sₒ)
    ctx.strokeStyle = C.yellow; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.moveTo(tipX, tipY); ctx.lineTo(cx, tipY);
    const slope = ho / (F * u);
    const run = real && isFinite(si) ? Math.min(si * u, 4 * W) : W - cx;
    ctx.lineTo(cx + run, tipY + slope * run); ctx.stroke(); ctx.globalAlpha = 1;
    // ray 2: through centre
    ctx.strokeStyle = C.cyan; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.moveTo(tipX, tipY);
    const s2 = (cy - tipY) / (cx - tipX); ctx.lineTo(W, tipY + s2 * (W - tipX));
    ctx.stroke(); ctx.globalAlpha = 1;
    if (isFinite(ix) && Math.abs(ix - cx) < W) {
      ctx.strokeStyle = real ? C.red : C.orange; ctx.setLineDash(real ? [] : [5, 4]);
      ctx.lineWidth = 2.5; arrow(ctx, ix, cy, ix, cy - hi); ctx.setLineDash([]);
    }
    ctx.fillStyle = C.inkDim; ctx.font = "12px ui-monospace, monospace";
    ctx.fillText("objekt", ox - 18, cy + 34);
    so.out.textContent = fmt(SO, 1) + " cm";
    f.out.textContent = fmt(F, 1) + " cm";
    const type = !isFinite(si) ? "i uendelig" : real ? "reelt, invertert" : "virtuelt, opprett";
    ro.innerHTML =
      `Med 1/sₒ + 1/sᵢ = 1/f: bildeavstand sᵢ = <b>${isFinite(si) ? fmt(si, 2) : "∞"}</b>${isFinite(si) ? " cm" : ""}, ` +
      `forstørrelse m = <b>${isFinite(m) ? fmt(m, 2) : "∞"}</b>. Bildet er <b>${type}</b>.`;
  }

  [so.input, f.input].forEach((s) => s.addEventListener("input", draw));
  onResize(draw);
  draw();
}
