import { arrow, palette, slider, readout, MONO } from "./shared.js";

export default function init({ ctx, controls, getSize, onResize }) {
  const so = slider(controls, { label: "Objektavstand sₒ", min: 20, max: 320, value: 180 });
  const f = slider(controls, { label: "Brennvidde f", min: 40, max: 160, value: 90 });
  const ro = readout(controls);

  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    const cx = W * 0.5, cy = H * 0.5;
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
      ctx.beginPath(); ctx.arc(cx + p[0], cy, 3, 0, 7); ctx.fill();
      ctx.fillText(p[1], cx + p[0] - 4, cy + 18);
    });
    const ho = 55, ox = cx - SO;
    ctx.strokeStyle = C.green; ctx.lineWidth = 2.5; arrow(ctx, ox, cy, ox, cy - ho);
    const si = 1 / (1 / F - 1 / SO);
    const m = -si / SO, hi = m * ho, ix = cx + si, real = si > 0;
    const tipX = ox, tipY = cy - ho;
    ctx.lineWidth = 1.4;
    // ray 1: parallel then through F'
    ctx.strokeStyle = C.yellow; ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.moveTo(tipX, tipY); ctx.lineTo(cx, tipY);
    const iy2 = cy - hi, slope = (iy2 - tipY) / (ix - cx);
    const run = real ? si : Math.min(W - cx, 400);
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
    so.out.textContent = (SO / 30).toFixed(1) + "·f-enheter";
    f.out.textContent = (F / 30).toFixed(1) + " enh";
    const type = !isFinite(si) ? "i uendelig" : real ? "reelt, invertert" : "virtuelt, opprett";
    ro.innerHTML =
      `Med 1/sₒ + 1/sᵢ = 1/f: bildeavstand sᵢ = <b>${isFinite(si) ? (si / 30).toFixed(2) : "∞"}</b> f-enheter, ` +
      `forstørrelse m = <b>${isFinite(m) ? m.toFixed(2) : "∞"}</b>. Bildet er <b>${type}</b>.`;
  }

  [so.input, f.input].forEach((s) => s.addEventListener("input", draw));
  onResize(draw);
  draw();
}
