import { palette, slider, readout } from "./shared.js";

export default function init({ ctx, controls, getSize, onResize }) {
  const n1s = slider(controls, { label: "n₁ (innfall)", min: 100, max: 250, value: 100 });
  const n2s = slider(controls, { label: "n₂ (transmittert)", min: 100, max: 250, value: 150 });
  const ro = readout(controls);

  const rTE = (th, n) => {
    const s = Math.sin(th), root = Math.sqrt(Math.max(0, n * n - s * s)), cz = Math.cos(th);
    if (n * n - s * s < 0) return 1;
    return Math.abs((cz - root) / (cz + root));
  };
  const rTM = (th, n) => {
    const s = Math.sin(th), r = n * n - s * s;
    if (r < 0) return 1;
    const root = Math.sqrt(r), cz = Math.cos(th);
    return Math.abs((-n * n * cz + root) / (n * n * cz + root));
  };

  function draw() {
    const C = palette();
    const { w: W, h: H } = getSize();
    const padL = 42, padB = 30, padT = 14, padR = 14;
    ctx.clearRect(0, 0, W, H);
    const n1 = +n1s.input.value / 100, n2 = +n2s.input.value / 100, n = n2 / n1;
    const x0 = padL, y0 = H - padB, pw = W - padL - padR, ph = H - padB - padT;
    ctx.strokeStyle = C.line; ctx.fillStyle = C.inkFaint;
    ctx.font = "10px ui-monospace, monospace"; ctx.lineWidth = 1;
    for (let R = 0; R <= 1; R += 0.25) {
      const y = y0 - R * ph;
      ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + pw, y); ctx.stroke();
      ctx.fillText(R.toFixed(2), 6, y + 3);
    }
    for (let d = 0; d <= 90; d += 15) ctx.fillText(d + "°", x0 + (d / 90) * pw - 8, H - 12);
    ctx.fillText("R", x0 - 6, padT + 4);
    const plot = (fn, color) => {
      ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.beginPath();
      for (let i = 0; i <= 180; i++) {
        const th = (i / 180) * (Math.PI / 2), Rr = fn(th, n) ** 2;
        const x = x0 + (i / 180) * pw, y = y0 - Math.min(1, Rr) * ph;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke();
    };
    plot(rTE, C.accent); plot(rTM, C.orange);
    ctx.font = "12px ui-monospace, monospace";
    ctx.fillStyle = C.accent; ctx.fillText("— R (TE)", x0 + pw - 92, padT + 12);
    ctx.fillStyle = C.orange; ctx.fillText("— R (TM)", x0 + pw - 92, padT + 28);
    n1s.out.textContent = n1.toFixed(2);
    n2s.out.textContent = n2.toFixed(2);
    let msg;
    if (n2 > n1) {
      const bp = (Math.atan(n2 / n1) * 180) / Math.PI;
      msg = `Eksternt (n₂&gt;n₁): Brewster-vinkel θ_p = <b>${bp.toFixed(1)}°</b> der TM-kurven (oransje) berører null — reflektert lys er lineært polarisert.`;
    } else if (n2 < n1) {
      const tc = (Math.asin(n2 / n1) * 180) / Math.PI;
      const bp = (Math.atan(n2 / n1) * 180) / Math.PI;
      msg = `Internt (n₂&lt;n₁): Brewster θ_p = <b>${bp.toFixed(1)}°</b>, kritisk vinkel θ_c = <b>${tc.toFixed(1)}°</b>. Over θ_c går begge til R=1 (total intern refleksjon).`;
    } else {
      msg = "n₁ = n₂: ingen flate, ingen refleksjon.";
    }
    ro.innerHTML = msg;
  }

  [n1s.input, n2s.input].forEach((s) => s.addEventListener("input", draw));
  onResize(draw);
  draw();
}
