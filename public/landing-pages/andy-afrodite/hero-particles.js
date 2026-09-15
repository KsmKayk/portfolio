if (!customElements.get("hero-particles")) (function () {
class HeroParticles extends HTMLElement {
  connectedCallback() {
    if (this._up) return;
    this._up = true;
    this.style.cssText = "position:absolute;inset:0;display:block;pointer-events:none";
    const c = document.createElement("canvas");
    c.style.cssText = "width:100%;height:100%;display:block";
    this.appendChild(c);
    const x = c.getContext("2d");
    let w = 0, h = 0, dpr = Math.min(devicePixelRatio || 1, 2), parts = [];

    const seed = () => {
      const n = Math.round((w * h) / 9000);
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: 0.4 + Math.random() * 1.5,
        vy: -(0.06 + Math.random() * 0.28),
        vx: (Math.random() - 0.5) * 0.14,
        a: 0.12 + Math.random() * 0.5,
        p: Math.random() * Math.PI * 2,
        pink: Math.random() < 0.14
      }));
    };
    const resize = () => {
      const r = this.getBoundingClientRect();
      w = Math.max(1, Math.round(r.width)); h = Math.max(1, Math.round(r.height));
      c.width = w * dpr; c.height = h * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };
    resize();
    this._ro = new ResizeObserver(resize);
    this._ro.observe(this);

    let mx = 0, my = 0, tx = 0, ty = 0;
    this._move = (e) => {
      const r = this.getBoundingClientRect();
      tx = (e.clientX - (r.left + r.width / 2)) / Math.max(1, r.width);
      ty = (e.clientY - (r.top + r.height / 2)) / Math.max(1, r.height);
    };
    window.addEventListener("pointermove", this._move, { passive: true });

    let t = 0;
    const loop = () => {
      this._raf = requestAnimationFrame(loop);
      t += 0.016;
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      x.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.5 + p.p) * 0.16;
        if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        const px = p.x - mx * 18 * p.r, py = p.y - my * 12 * p.r;
        const tw = p.a * (0.6 + 0.4 * Math.sin(t * 1.6 + p.p));
        x.beginPath();
        x.arc(px, py, p.r, 0, Math.PI * 2);
        x.fillStyle = p.pink ? "rgba(255,77,141," + tw + ")" : "rgba(236,233,228," + tw + ")";
        x.fill();
        if (p.r > 1.2) {
          x.beginPath();
          x.arc(px, py, p.r * 3.6, 0, Math.PI * 2);
          x.fillStyle = p.pink ? "rgba(255,77,141," + tw * 0.07 + ")" : "rgba(236,233,228," + tw * 0.06 + ")";
          x.fill();
        }
      }
    };
    loop();
  }
  disconnectedCallback() {
    cancelAnimationFrame(this._raf);
    if (this._ro) this._ro.disconnect();
    window.removeEventListener("pointermove", this._move);
    this._up = false;
  }
}
  customElements.define("hero-particles", HeroParticles);
})();
