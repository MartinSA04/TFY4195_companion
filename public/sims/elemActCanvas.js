import { arrow, palette } from "./shared.js";

export default function init({ ctx, getSize, onResize }) {
  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    const pw = W / 3, cy = H * 0.52;
    ctx.clearRect(0, 0, W, H);
    const panel = (i, title, sub, fn) => {
      const x0 = i * pw, cx = x0 + pw / 2;
      if (i > 0) {
        ctx.strokeStyle = C.line; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x0, 18); ctx.lineTo(x0, H - 22); ctx.stroke();
      }
      ctx.fillStyle = C.ink; ctx.font = "12px ui-monospace, monospace"; ctx.textAlign = "center";
      ctx.fillText(title, cx, 22);
      ctx.strokeStyle = C.line2; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0 + 14, cy); ctx.lineTo(x0 + pw - 14, cy); ctx.stroke();
      ctx.textAlign = "left"; fn(x0, cx);
      ctx.fillStyle = C.inkFaint; ctx.font = "10px ui-monospace, monospace"; ctx.textAlign = "center";
      ctx.fillText(sub, cx, H - 9); ctx.textAlign = "left";
    };
    panel(0, "Translasjon T(d)", "vinkel uendret, y øker", (x0) => {
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2; arrow(ctx, x0 + 16, cy + 26, x0 + pw - 16, cy - 30);
    });
    panel(1, "Tynn linse L(f)", "knekker vinkelen mot F'", (x0, cx) => {
      const lx = cx, fpx = x0 + pw - 22;
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(lx, cy - 34); ctx.lineTo(lx, cy + 34); ctx.stroke();
      ctx.lineWidth = 1.7; ctx.beginPath(); ctx.moveTo(x0 + 14, cy - 20); ctx.lineTo(lx, cy - 20); ctx.stroke();
      arrow(ctx, lx, cy - 20, fpx, cy);
      ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.arc(fpx, cy, 3, 0, 7); ctx.fill();
      ctx.fillStyle = C.inkFaint; ctx.font = "11px ui-monospace, monospace"; ctx.fillText("F'", fpx - 2, cy - 8);
    });
    panel(2, "Plan brytning R_P", "y kontinuerlig, vinkel endres", (x0) => {
      const ix = x0 + pw * 0.52;
      ctx.fillStyle = C.accent; ctx.globalAlpha = 0.06; ctx.fillRect(ix, 18, x0 + pw - 14 - ix, H - 40); ctx.globalAlpha = 1;
      ctx.strokeStyle = C.line2; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(ix, 18); ctx.lineTo(ix, H - 22); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = C.inkFaint; ctx.font = "10px ui-monospace, monospace";
      ctx.fillText("n₁", ix - 15, 30); ctx.fillText("n₂", ix + 5, 30);
      ctx.strokeStyle = C.accent; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(x0 + 14, cy + 24); ctx.lineTo(ix, cy - 6); ctx.stroke();
      arrow(ctx, ix, cy - 6, x0 + pw - 14, cy - 28);
    });
  }
  onResize(draw);
  draw();
}
