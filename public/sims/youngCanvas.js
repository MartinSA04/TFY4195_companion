import { palette, slider, readout } from "./shared.js";

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
    const cy = H * 0.42, sh = 70;
    for (let x = 0; x < W; x++) {
      const theta = ((x - W / 2) / W) * 0.5;
      const I = Math.cos((Math.PI * A * theta) / (L / 550)) ** 2;
      ctx.fillStyle = col; ctx.globalAlpha = I; ctx.fillRect(x, cy - sh / 2, 1, sh);
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath();
    const gy = H - 22, gh = 70;
    for (let x = 0; x < W; x++) {
      const theta = ((x - W / 2) / W) * 0.5;
      const I = Math.cos((Math.PI * A * theta) / (L / 550)) ** 2;
      const y = gy - I * gh;
      x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = C.inkDim; ctx.font = "11px ui-monospace, monospace";
    ctx.fillText("intensitet I = 4I₀cos²(πa·sinθ/λ)", 10, gy - gh - 6);
    a.out.textContent = (A / 40).toFixed(1) + "×";
    lam.out.textContent = L + " nm";
    const farge = L < 490 ? "blått" : L < 560 ? "grønt" : L < 590 ? "gult" : "rødt";
    ro.innerHTML = `Stripeavstand Δy = λL/a. Større spalteavstand <b>a</b> ⇒ tettere striper; lengre bølgelengde <b>λ</b> ⇒ bredere striper. (${L} nm ≈ ${farge} lys.)`;
  }

  [a.input, lam.input].forEach((s) => s.addEventListener("input", draw));
  onResize(draw);
  draw();
}
