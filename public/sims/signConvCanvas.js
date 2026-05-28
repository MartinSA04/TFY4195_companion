import { palette } from "./shared.js";

export default function init({ ctx, getSize, onResize }) {
  const vArr = (px, yB, yT, col) => {
    ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px, yB); ctx.lineTo(px, yT); ctx.stroke();
    const d = yT < yB ? -1 : 1;
    ctx.beginPath(); ctx.moveTo(px, yT); ctx.lineTo(px - 4, yT - d * 7);
    ctx.lineTo(px + 4, yT - d * 7); ctx.closePath(); ctx.fill();
  };
  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    const cy = H * 0.42;
    const dim = (xA, xB, yy, label) => {
      ctx.strokeStyle = C.inkFaint; ctx.fillStyle = C.inkFaint; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(xA, yy); ctx.lineTo(xB, yy);
      ctx.moveTo(xA, yy - 4); ctx.lineTo(xA, yy + 4);
      ctx.moveTo(xB, yy - 4); ctx.lineTo(xB, yy + 4); ctx.stroke();
      ctx.font = "13px ui-monospace, monospace"; ctx.fillText(label, (xA + xB) / 2 - 4, yy - 5);
    };
    ctx.clearRect(0, 0, W, H);
    const So = 210, f = 70, Si = 105, ho = 30, sceneR = So + Si + 18, pad = 36, sc = (W - 2 * pad) / sceneR;
    const X = (x) => pad + x * sc, hoP = ho * sc, hiP = 0.5 * ho * sc;
    const xObj = X(0), xLens = X(So), xImg = X(So + Si), xF = X(So - f), xFp = X(So + f);
    ctx.strokeStyle = C.line2; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W, cy); ctx.stroke();
    ctx.strokeStyle = C.accent; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(xLens, cy - hoP - 22); ctx.lineTo(xLens, cy + hoP + 22); ctx.stroke();
    ctx.fillStyle = C.accent; ctx.globalAlpha = 0.1;
    ctx.beginPath(); ctx.ellipse(xLens, cy, 7, hoP + 22, 0, 0, 7); ctx.fill(); ctx.globalAlpha = 1;
    ctx.fillStyle = C.cyan; ctx.font = "12px ui-monospace, monospace";
    [[xF, "F"], [xFp, "F'"]].forEach((p) => {
      ctx.beginPath(); ctx.arc(p[0], cy, 3, 0, 7); ctx.fill(); ctx.fillText(p[1], p[0] - 4, cy - 8);
    });
    ctx.strokeStyle = C.accent; ctx.globalAlpha = 0.8; ctx.lineWidth = 1.3;
    ctx.beginPath(); ctx.moveTo(xObj, cy - hoP); ctx.lineTo(xLens, cy - hoP); ctx.lineTo(xImg, cy + hiP); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(xObj, cy - hoP); ctx.lineTo(xImg, cy + hiP); ctx.stroke();
    ctx.globalAlpha = 1;
    vArr(xObj, cy, cy - hoP, C.green); ctx.fillStyle = C.green;
    ctx.font = "13px ui-monospace, monospace"; ctx.fillText("hₒ", xObj - 22, cy - hoP / 2);
    ctx.font = "11px ui-monospace, monospace"; ctx.fillText("objekt", xObj - 16, cy + 16);
    vArr(xImg, cy, cy + hiP, C.orange); ctx.fillStyle = C.orange;
    ctx.font = "13px ui-monospace, monospace"; ctx.fillText("hᵢ", xImg + 6, cy + hiP / 2);
    ctx.font = "11px ui-monospace, monospace"; ctx.fillText("bilde", xImg - 8, cy + hiP + 16);
    const yd = cy + hoP + 24;
    dim(xObj, xLens, yd, "sₒ"); dim(xLens, xImg, yd, "sᵢ"); dim(xLens, xFp, cy - hoP - 30, "f");
    ctx.fillStyle = C.inkFaint; ctx.font = "11px ui-monospace, monospace";
    ctx.fillText("R > 0: krumningssenter til høyre", pad, H - 8);
  }
  onResize(draw);
  draw();
}
