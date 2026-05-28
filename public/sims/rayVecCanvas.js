import { arrow, palette } from "./shared.js";

export default function init({ ctx, getSize, onResize }) {
  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    const cy = H * 0.66, mx = 18;
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = C.line2; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.fillStyle = C.inkFaint; ctx.font = "11px ui-monospace, monospace";
    ctx.fillText("optisk akse", W - 92, cy + 15);
    const x0 = mx + 10, y0 = cy + 34, x1 = W - mx - 12, y1 = cy - 78, m = (y1 - y0) / (x1 - x0);
    const xC = x0 + (cy - y0) / m, xRef = Math.round(W * 0.62), yRef = y0 + m * (xRef - x0);
    ctx.strokeStyle = C.inkFaint; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(xRef, cy - 94); ctx.lineTo(xRef, cy + 22); ctx.stroke(); ctx.setLineDash([]);
    ctx.strokeStyle = C.accent; ctx.lineWidth = 2; arrow(ctx, x0, y0, x1, y1);
    ctx.strokeStyle = C.green; ctx.fillStyle = C.green; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(xRef, cy); ctx.lineTo(xRef, yRef); ctx.stroke();
    ctx.font = "14px ui-monospace, monospace"; ctx.fillText("y", xRef + 7, (cy + yRef) / 2 + 5);
    ctx.strokeStyle = C.orange; ctx.fillStyle = C.orange; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(xC, cy, 30, 0, Math.atan2(m, 1), true); ctx.stroke();
    ctx.fillText("α", xC + 36, cy - 8);
    ctx.fillStyle = C.accent; ctx.beginPath(); ctx.arc(xRef, yRef, 3.5, 0, 7); ctx.fill();
    ctx.fillStyle = C.inkDim; ctx.font = "12px ui-monospace, monospace";
    ctx.fillText("stråle = (y, α)", xRef + 11, yRef - 5);
  }
  onResize(draw);
  draw();
}
