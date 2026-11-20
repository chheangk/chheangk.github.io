const canvas = document.querySelector(".research-particles");
const context = canvas?.getContext("2d");

if (context) {
  document.body.prepend(canvas);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const motionToggle = document.querySelector(".research-motion-toggle");
  const trail = [];
  let motionOverride = false;
  let pointer;
  let width;
  let height;
  let particles = [];
  let frame;
  let previousTime;

  function motionEnabled() {
    return !reducedMotion.matches || motionOverride;
  }

  function draw(time) {
    const step = previousTime === undefined ? 0 : Math.min((time - previousTime) / 16.67, 2);
    const ease = 1 - Math.pow(0.9, step);
    previousTime = time;
    context.clearRect(0, 0, width, height);

    for (const particle of particles) {
      let targetX = particle.homeX;
      let targetY = particle.homeY;
      if (pointer) {
        const dx = pointer.x - particle.homeX;
        const dy = pointer.y - particle.homeY;
        const pull = Math.max(0, 1 - Math.hypot(dx, dy) / 320);
        targetX += dx * pull;
        targetY += dy * pull;
      }
      particle.x += (targetX - particle.x) * ease;
      particle.y += (targetY - particle.y) * ease;

      context.globalAlpha = 0.8;
      context.beginPath();
      context.arc(particle.x, particle.y, 1.7, 0, Math.PI * 2);
      context.fill();
    }

    for (const dot of trail) {
      const life = Math.max(0, 1 - (time - dot.time) / 550);
      if (!life) continue;
      context.globalAlpha = life;
      context.beginPath();
      context.arc(dot.x, dot.y, 1 + 2.2 * life, 0, Math.PI * 2);
      context.fill();
    }

    for (const [index, first] of particles.entries()) {
      for (let next = index + 1; next < particles.length; next++) {
        const second = particles[next];
        const distance = Math.hypot(first.x - second.x, first.y - second.y);
        if (distance >= 80) continue;
        context.globalAlpha = 0.45 * (1 - distance / 80);
        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(second.x, second.y);
        context.stroke();
      }
    }

    if (motionEnabled()) frame = requestAnimationFrame(draw);
  }

  function refresh() {
    cancelAnimationFrame(frame);
    previousTime = undefined;
    trail.length = 0;
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    if (!width || !height) return;

    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    context.fillStyle = context.strokeStyle = getComputedStyle(canvas).color;
    const count = Math.min(130, Math.max(24, Math.round((width * height) / 8000)));
    particles = Array.from({ length: count }, () => {
      const x = Math.random() * width;
      const y = Math.random() * height;
      return { x, y, homeX: x, homeY: y };
    });
    draw(performance.now());
  }

  function clearPointer() {
    pointer = undefined;
  }

  window.addEventListener("pointermove", (event) => {
    if (!motionEnabled() || event.pointerType === "touch") return;
    const x = event.clientX;
    const y = event.clientY;
    if (!pointer || Math.hypot(x - pointer.x, y - pointer.y) >= 8) {
      trail.push({ x, y, time: performance.now() });
      if (trail.length > 24) trail.shift();
    }
    pointer = { x, y };
  });
  document.documentElement.addEventListener("pointerleave", clearPointer);
  window.addEventListener("blur", clearPointer);
  new ResizeObserver(refresh).observe(canvas);
  new MutationObserver(refresh).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  function syncMotion() {
    motionToggle.hidden = !reducedMotion.matches;
    motionToggle.setAttribute("aria-pressed", String(motionEnabled()));
    clearPointer();
    refresh();
  }

  motionToggle.addEventListener("click", () => {
    motionOverride = !motionOverride;
    syncMotion();
  });
  reducedMotion.addEventListener("change", () => {
    motionOverride = false;
    syncMotion();
  });
  syncMotion();
}
