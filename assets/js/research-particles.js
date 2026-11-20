const canvas = document.querySelector(".research-particles");
const context = canvas?.getContext("2d");

if (context) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pointer;
  let width;
  let height;
  let particles = [];
  let frame;
  let previousTime;

  function draw(time) {
    const step = previousTime === undefined ? 0 : Math.min((time - previousTime) / 16.67, 2);
    previousTime = time;
    context.clearRect(0, 0, width, height);

    for (const particle of particles) {
      let targetX = particle.homeX;
      let targetY = particle.homeY;
      if (pointer) {
        const dx = pointer.x - particle.homeX;
        const dy = pointer.y - particle.homeY;
        const pull = 0.75 * Math.max(0, 1 - Math.hypot(dx, dy) / 220);
        targetX += dx * pull;
        targetY += dy * pull;
      }
      const ease = 1 - Math.pow(0.9, step);
      particle.x += (targetX - particle.x) * ease;
      particle.y += (targetY - particle.y) * ease;

      context.globalAlpha = 0.8;
      context.beginPath();
      context.arc(particle.x, particle.y, 1.7, 0, Math.PI * 2);
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

    if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
  }

  function refresh() {
    cancelAnimationFrame(frame);
    previousTime = undefined;
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
    if (event.pointerType === "mouse") pointer = { x: event.clientX, y: event.clientY };
  });
  document.documentElement.addEventListener("pointerleave", clearPointer);
  window.addEventListener("blur", clearPointer);
  new ResizeObserver(refresh).observe(canvas);
  new MutationObserver(refresh).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  reducedMotion.addEventListener("change", refresh);
}
