const canvas = document.querySelector(".research-particles");
const context = canvas?.getContext("2d");

if (context) {
  const section = canvas.parentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointer = { x: -Infinity, y: -Infinity };
  let width;
  let height;
  let particles = [];
  let frame;
  let visible = false;
  let previousTime;

  function draw(time) {
    const step = previousTime === undefined ? 0 : Math.min((time - previousTime) / 16.67, 2);
    previousTime = time;
    context.clearRect(0, 0, width, height);

    for (const particle of particles) {
      const dx = particle.x - pointer.x;
      const dy = particle.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      const push = distance > 0 && distance < 90 ? (90 - distance) / (90 * distance) : 0;
      particle.x += (particle.vx + (push ? dx * push * 2 : 0)) * step;
      particle.y += (particle.vy + (push ? dy * push * 2 : 0)) * step;
      particle.x = (particle.x + width) % width;
      particle.y = (particle.y + height) % height;

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

    if (visible && !reducedMotion.matches) frame = requestAnimationFrame(draw);
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
    const count = Math.min(55, Math.max(16, Math.round((width * height) / 3500)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
    }));
    draw(performance.now());
  }

  function clearPointer() {
    pointer.x = pointer.y = -Infinity;
  }

  section.addEventListener("pointermove", (event) => {
    const bounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
  });
  section.addEventListener("pointerleave", clearPointer);
  section.addEventListener("pointercancel", clearPointer);
  new ResizeObserver(refresh).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(frame);
    previousTime = undefined;
    if (visible && width && height && !reducedMotion.matches) frame = requestAnimationFrame(draw);
  }).observe(section);
  new MutationObserver(refresh).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  reducedMotion.addEventListener("change", refresh);
}
