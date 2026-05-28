import { palette, slider, readout } from "./shared.js";

export default function init({ ctx, controls, getSize, onResize }) {
  const f1s = slider(controls, { label: "Brennvidde f₁", min: 40, max: 220, value: 90 });
  const f2s = slider(controls, { label: "Brennvidde f₂", min: 40, max: 220, value: 70 });
  const ds = slider(controls, { label: "Linseavstand D", min: 20, max: 320, value: 150 });
  const ro = readout(controls);

  const So = 130, Tail = 150, apt = 34, y0 = 24;

  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    const cy = H * 0.5;
    ctx.clearRect(0, 0, W, H);
    const F1 = +f1s.input.value, F2 = +f2s.input.value, D = +ds.input.value;
    const Lscene = So + D + Tail, mx = 22, sc = (W - 2 * mx) / Lscene;
    const X = (x) => mx + x * sc, Y = (y) => cy - y * sc;
    const x1 = So, x2 = So + D, xEnd = Lscene;
    const vArrow = (px, yBase, yTip, col) => {
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(px, yBase); ctx.lineTo(px, yTip); ctx.stroke();
      const dir = yTip < yBase ? -1 : 1;
      ctx.beginPath(); ctx.moveTo(px, yTip); ctx.lineTo(px - 4, yTip - dir * 7);
      ctx.lineTo(px + 4, yTip - dir * 7); ctx.closePath(); ctx.fill();
    };
    ctx.strokeStyle = C.line2; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    const drawLens = (xs, label) => {
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(X(xs), Y(apt)); ctx.lineTo(X(xs), Y(-apt)); ctx.stroke();
      ctx.fillStyle = C.accent; ctx.globalAlpha = 0.1;
      ctx.beginPath(); ctx.ellipse(X(xs), cy, 7, apt * sc, 0, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
      ctx.fillStyle = C.inkDim; ctx.font = "11px ui-monospace, monospace";
      ctx.fillText(label, X(xs) - 7, Y(apt) - 6);
    };
    drawLens(x1, "L₁"); drawLens(x2, "L₂");
    ctx.fillStyle = C.cyan;
    [x1 - F1, x1 + F1, x2 - F2, x2 + F2].forEach((p) => {
      const px = X(p);
      if (px > 0 && px < W) { ctx.beginPath(); ctx.arc(px, cy, 2.5, 0, 7); ctx.fill(); }
    });
    vArrow(X(0), cy, Y(y0), C.green);
    const tip = y0, inv = (v) => (Math.abs(v) < 1e-9 ? 1e9 : 1 / v), outB = [];
    [-apt * 0.8, -apt * 0.4, 0, apt * 0.4, apt * 0.8].forEach((yt) => {
      const a0 = (yt - tip) / So;
      const yA = tip + a0 * So, a1 = a0 - yA / F1, yB = yA + a1 * D, a2 = a1 - yB / F2, yC = yB + a2 * Tail;
      ctx.strokeStyle = C.accent; ctx.globalAlpha = 0.8; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(X(0), Y(tip)); ctx.lineTo(X(x1), Y(yA));
      ctx.lineTo(X(x2), Y(yB)); ctx.lineTo(X(xEnd), Y(yC)); ctx.stroke();
      outB.push(yB);
    });
    ctx.globalAlpha = 1;
    const si1 = inv(1 / F1 - 1 / So), m1 = -si1 / So;
    const so2 = D - si1, si2 = inv(1 / F2 - 1 / so2), m2 = -si2 / so2, mtot = m1 * m2, yi2 = mtot * tip;
    const ximg = x2 + si2, virtual = si2 < 0, col = C.orange;
    const imgVisible = isFinite(ximg) && Math.abs(si2) < 1e7 && ximg > 0 && ximg < xEnd;
    if (imgVisible) {
      if (virtual) {
        ctx.save(); ctx.setLineDash([4, 4]); ctx.strokeStyle = col; ctx.globalAlpha = 0.45; ctx.lineWidth = 1;
        outB.forEach((yB) => { ctx.beginPath(); ctx.moveTo(X(x2), Y(yB)); ctx.lineTo(X(ximg), Y(yi2)); ctx.stroke(); });
        ctx.globalAlpha = 1; vArrow(X(ximg), cy, Y(yi2), col); ctx.restore();
        ctx.fillStyle = C.inkDim; ctx.font = "10px ui-monospace, monospace";
        ctx.fillText("virtuelt bilde", X(ximg) - 30, cy + (yi2 > 0 ? 14 : -7));
      } else {
        vArrow(X(ximg), cy, Y(yi2), col);
        ctx.fillStyle = C.inkDim; ctx.font = "10px ui-monospace, monospace";
        ctx.fillText("bilde", X(ximg) - 12, cy + (yi2 > 0 ? 14 : -7));
      }
    }
    const Amx = 1 - D / F1, Bmx = D, Cc = -1 / F1 - 1 / F2 + D / (F1 * F2), Del = 1 - D / F2;
    const det = Amx * Del - Bmx * Cc, afoc = Math.abs(Cc) < 1.2e-4, feff = afoc ? Infinity : -1 / Cc;
    f1s.out.textContent = F1 + " enh";
    f2s.out.textContent = F2 + " enh";
    ds.out.textContent = D + " enh";
    let msg = `M = L₂·T(D)·L₁ = [ [${Amx.toFixed(2)}, ${Bmx.toFixed(0)}], [${Cc.toFixed(4)}, ${Del.toFixed(2)}] ] · det = <b>${det.toFixed(2)}</b>. `;
    msg += afoc
      ? `<b>C ≈ 0 ⇒ afokalt</b> system — vinkelforstørrelse D = <b>${Del.toFixed(2)}</b>.`
      : `effektiv f = −1/C = <b>${feff.toFixed(0)} enh</b>. Endebilde: <b>${virtual ? "virtuelt" : "reelt"}</b>, m = <b>${mtot.toFixed(2)}</b> ${imgVisible ? (virtual ? "(stiplet pil)" : "(oransje pil)") : "(utenfor figuren)"}.`;
    ro.innerHTML = msg;
  }

  [f1s.input, f2s.input, ds.input].forEach((s) => s.addEventListener("input", draw));
  onResize(draw);
  draw();
}
