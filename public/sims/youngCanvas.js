import { palette, slider, readout, arrow } from "./shared.js";

export default function init({ ctx, controls, getSize, onResize }) {
  const a = slider(controls, { label: "Spalteavstand a", min: 20, max: 120, value: 50 });
  const lam = slider(controls, { label: "Bølgelengde λ", min: 400, max: 700, value: 550 });
  const ro = readout(controls);

  const wl2rgb = (w) => {
    let r, g, b;
    if (w < 440) { r = -(w - 440) / 60; g = 0; b = 1; }
    else if (w < 490) { r = 0; g = (w - 440) / 50; b = 1; }
    else if (w < 510) { r = 0; g = 1; b = -(w - 510) / 20; }
    else if (w < 580) { r = (w - 510) / 70; g = 1; b = 0; }
    else if (w < 645) { r = 1; g = -(w - 645) / 65; b = 0; }
    else { r = 1; g = 0; b = 0; }
    return `rgb(${(r * 255) | 0},${(g * 255) | 0},${(b * 255) | 0})`;
  };

  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    ctx.clearRect(0, 0, W, H);
    const A = +a.input.value, L = +lam.input.value, col = wl2rgb(L);
    // Fringe band on top, then the formula label, then the intensity curve: the label
    // sits in its own gap and never crosses the fringes.
    const gy = H - 22, gh = 70, sh = 70, cy = gy - gh - 24 - sh / 2;
    for (let x = 0; x < W; x++) {
      const theta = ((x - W / 2) / W) * 0.5;
      const I = Math.cos((Math.PI * A * theta) / (L / 550)) ** 2;
      ctx.fillStyle = col; ctx.globalAlpha = I; ctx.fillRect(x, cy - sh / 2, 1, sh);
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = 0; x < W; x++) {
      const theta = ((x - W / 2) / W) * 0.5;
      const I = Math.cos((Math.PI * A * theta) / (L / 550)) ** 2;
      const y = gy - I * gh;
      x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = C.inkDim; ctx.font = "11px ui-monospace, monospace";
    ctx.fillText("intensitet I = 4I₀cos²(πa·sinθ/λ)", 10, gy - gh - 6);
    a.out.textContent = (A / 40).toFixed(1).replace(".", ",") + "×";
    lam.out.textContent = L + " nm";
    // Δy: distance between the central maximum and the next one, drawn under the curve.
    const x0 = W / 2, x1 = W / 2 + 2 * W * (L / 550) / A, ay = gy + 12;
    ctx.strokeStyle = C.inkDim; ctx.lineWidth = 1.5;
    arrow(ctx, (x0 + x1) / 2, ay, x0, ay); arrow(ctx, (x0 + x1) / 2, ay, x1, ay);
    ctx.fillStyle = C.inkDim; ctx.fillText("Δy", (x0 + x1) / 2 - 7, ay - 5);
    ro.innerHTML = "Stripeavstand Δy = λL/a.";
  }

  [a.input, lam.input].forEach((s) => s.addEventListener("input", draw));
  onResize(draw);
  draw();
}
