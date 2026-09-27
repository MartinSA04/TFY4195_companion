import { arrow, palette } from "./shared.js";

const MONO = (px) => `${px}px ui-monospace, monospace`;

export default function init({ ctx, getSize, onResize }) {
  // "_X" in a label draws X as a subscript (R_P → R with a lowered P).
  const runs = (s) => s.split(/(_.)/).filter(Boolean).map((p) => (p[0] === "_" ? { t: p[1], sub: true } : { t: p }));
  const widthOf = (s, px) =>
    runs(s).reduce((w, r) => { ctx.font = MONO(r.sub ? px * 0.8 : px); return w + ctx.measureText(r.t).width; }, 0);
  const centred = (s, cx, y, px) => {
    let x = cx - widthOf(s, px) / 2;
    ctx.textAlign = "left";
    for (const r of runs(s)) {
      ctx.font = MONO(r.sub ? px * 0.8 : px);
      ctx.fillText(r.t, x, y + (r.sub ? px * 0.25 : 0));
      x += ctx.measureText(r.t).width;
    }
  };
  // Break a label into lines that fit the panel; a narrow panel gets two short lines, not a collision.
  const wrap = (s, maxW, px) => {
    const lines = [];
    let cur = "";
    for (const word of s.split(" ")) {
      const t = cur ? cur + " " + word : word;
      if (!cur || widthOf(t, px) <= maxW) cur = t;
      else { lines.push(cur); cur = word; }
    }
    lines.push(cur);
    return lines;
  };

  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    const pw = W / 3, cy = H * 0.52;
    ctx.clearRect(0, 0, W, H);
    const panel = (i, title, sub, fn) => {
      const x0 = i * pw, cx = x0 + pw / 2, maxW = pw - 10;
      if (i > 0) {
        ctx.strokeStyle = C.line; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(x0, 18); ctx.lineTo(x0, H - 22); ctx.stroke();
      }
      ctx.fillStyle = C.ink;
      const tl = wrap(title, maxW, 12);
      tl.forEach((l, k) => centred(l, cx, 22 + k * 15, 12));
      const top = 30 + (tl.length - 1) * 15; // first free y below the title
      ctx.strokeStyle = C.line2; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(x0 + 14, cy); ctx.lineTo(x0 + pw - 14, cy); ctx.stroke();
      ctx.textAlign = "left"; fn(x0, cx, top);
      ctx.fillStyle = C.inkFaint;
      const sl = wrap(sub, maxW, 10);
      sl.forEach((l, k) => centred(l, cx, H - 9 - (sl.length - 1 - k) * 12, 10));
      ctx.textAlign = "left";
    };
    panel(0, "Translasjon T(d)", "vinkel uendret, y\u00a0øker", (x0) => {
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2; arrow(ctx, x0 + 16, cy + 26, x0 + pw - 16, cy - 30);
    });
    panel(1, "Tynn linse L(f)", "knekker vinkelen mot F'", (x0, cx) => {
      const lx = cx, fpx = x0 + pw - 22;
      ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.moveTo(lx, cy - 34); ctx.lineTo(lx, cy + 34); ctx.stroke();
      ctx.lineWidth = 1.7; ctx.beginPath(); ctx.moveTo(x0 + 14, cy - 20); ctx.lineTo(lx, cy - 20); ctx.stroke();
      arrow(ctx, lx, cy - 20, fpx, cy);
      ctx.fillStyle = C.cyan; ctx.beginPath(); ctx.arc(fpx, cy, 3, 0, 7); ctx.fill();
      ctx.fillStyle = C.inkFaint; ctx.font = MONO(11); ctx.fillText("F'", fpx - 2, cy - 8);
    });
    panel(2, "Plan brytning R_P", "y kontinuerlig, vinkel endres", (x0, cx, top) => {
      const ix = x0 + pw * 0.52;
      // The boundary and the second medium start below the title, so the two never overlap.
      ctx.fillStyle = C.accent; ctx.globalAlpha = 0.06; ctx.fillRect(ix, top, x0 + pw - 14 - ix, H - 22 - top); ctx.globalAlpha = 1;
      ctx.strokeStyle = C.line2; ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(ix, top); ctx.lineTo(ix, H - 22); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = C.inkFaint; ctx.font = MONO(10);
      ctx.fillText("n₁", ix - 15, top + 12); ctx.fillText("n₂", ix + 5, top + 12);
      ctx.strokeStyle = C.accent; ctx.lineWidth = 1.8;
      ctx.beginPath(); ctx.moveTo(x0 + 14, cy + 24); ctx.lineTo(ix, cy - 6); ctx.stroke();
      arrow(ctx, ix, cy - 6, x0 + pw - 14, cy - 28);
    });
  }
  onResize(draw);
  draw();
}
