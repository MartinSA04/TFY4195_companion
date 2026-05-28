import { palette, slider, readout } from "./shared.js";

export default function init({ ctx, controls, getSize, onResize }) {
  const N = slider(controls, { label: "Antall spalter N", min: 1, max: 8, value: 1 });
  const b = slider(controls, { label: "Spaltebredde b", min: 20, max: 120, value: 40 });
  const a = slider(controls, { label: "Spalteavstand a", min: 60, max: 240, value: 120 });
  const ro = readout(controls);

  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    ctx.clearRect(0, 0, W, H);
    const NN = +N.input.value, B = +b.input.value / 1000, A = +a.input.value / 1000;
    const gy = H - 26, gh = H - 60;
    // single-slit envelope
    ctx.strokeStyle = C.orange; ctx.globalAlpha = 0.55; ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 4]); ctx.beginPath();
    for (let x = 0; x < W; x++) {
      const u = ((x - W / 2) / W) * Math.PI * 8, beta = B * u * 60;
      const env = beta === 0 ? 1 : (Math.sin(beta) / beta) ** 2;
      const y = gy - env * gh;
      x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
    // full pattern
    ctx.strokeStyle = C.accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 0; x < W; x++) {
      const u = ((x - W / 2) / W) * Math.PI * 8, beta = B * u * 60, alpha = A * u * 60;
      const env = beta === 0 ? 1 : (Math.sin(beta) / beta) ** 2;
      const gr = Math.abs(Math.sin(alpha)) < 1e-6 ? NN * NN : (Math.sin(NN * alpha) / Math.sin(alpha)) ** 2;
      const I = (env * gr) / (NN * NN), y = gy - Math.min(1, I) * gh;
      x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = C.inkDim; ctx.font = "11px ui-monospace, monospace";
    ctx.fillText("I = I₀(sinβ/β)²·(sinNα/sinα)²   — stiplet: enkeltspalt-konvolutt", 10, 18);
    N.out.textContent = NN;
    b.out.textContent = +b.input.value;
    a.out.textContent = +a.input.value;
    ro.innerHTML =
      `N = <b>${NN}</b> spalt${NN > 1 ? "er" : ""}. ` +
      (NN === 1
        ? "Ren enkeltspalt: bred sentraltopp, minima ved b·sinθ=mλ."
        : `${NN - 1} minima og ${NN - 2 < 0 ? 0 : NN - 2} sekundærmaksima mellom hovedmaksima. Smalere spalt b ⇒ bredere konvolutt; større a ⇒ tettere hovedtopper.`);
  }

  [N.input, b.input, a.input].forEach((s) => s.addEventListener("input", draw));
  onResize(draw);
  draw();
}
