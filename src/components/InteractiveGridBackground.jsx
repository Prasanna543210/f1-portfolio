import { useEffect, useRef } from 'react';

const InteractiveGridBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      pointer: {
        x: 0,
        y: 0,
        tx: 0,
        ty: 0,
        active: false,
      },
      trail: [],
      rafId: null,
      spacing: 28,
      pointSize: 1.4,
      maxDist: 170,
      parallaxStrength: 8,
    };

    const setCanvasSize = () => {
      state.width = window.innerWidth;
      state.height = window.innerHeight;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(state.width * state.dpr);
      canvas.height = Math.floor(state.height * state.dpr);
      canvas.style.width = `${state.width}px`;
      canvas.style.height = `${state.height}px`;

      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

      // Scale grid spacing for mobile to reduce draw calls.
      state.spacing = state.width < 640 ? 34 : 28;
      state.maxDist = state.width < 640 ? 150 : 170;
    };

    const addTrailPoint = (x, y) => {
      state.trail.push({ x, y, life: 1 });
      if (state.trail.length > 12) state.trail.shift();
    };

    const updatePointer = (x, y, active = true) => {
      state.pointer.tx = x;
      state.pointer.ty = y;
      state.pointer.active = active;
      addTrailPoint(x, y);
    };

    const onMouseMove = (e) => updatePointer(e.clientX, e.clientY, true);
    const onMouseEnter = (e) => updatePointer(e.clientX, e.clientY, true);
    const onMouseLeave = () => {
      state.pointer.active = false;
    };

    const onTouchMove = (e) => {
      if (!e.touches[0]) return;
      const touch = e.touches[0];
      updatePointer(touch.clientX, touch.clientY, true);
    };

    const onTouchEnd = () => {
      state.pointer.active = false;
    };

    const render = () => {
      const { width, height, spacing, pointSize, maxDist } = state;
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor-follow interpolation.
      state.pointer.x += (state.pointer.tx - state.pointer.x) * 0.16;
      state.pointer.y += (state.pointer.ty - state.pointer.y) * 0.16;

      // Fade trail points for a subtle motion echo.
      for (let i = state.trail.length - 1; i >= 0; i -= 1) {
        state.trail[i].life -= 0.035;
        if (state.trail[i].life <= 0) state.trail.splice(i, 1);
      }

      const nx = width ? (state.pointer.x / width - 0.5) : 0;
      const ny = height ? (state.pointer.y / height - 0.5) : 0;
      const ox = nx * state.parallaxStrength;
      const oy = ny * state.parallaxStrength;

      // Base point style.
      const baseAlpha = 0.18;
      const baseColor = [162, 172, 184]; // muted gray-blue

      for (let y = -spacing; y <= height + spacing; y += spacing) {
        for (let x = -spacing; x <= width + spacing; x += spacing) {
          const gx = x + ox;
          const gy = y + oy;

          let alpha = baseAlpha;
          let glow = 0;

          if (state.pointer.active) {
            const dx = gx - state.pointer.x;
            const dy = gy - state.pointer.y;
            const dist = Math.hypot(dx, dy);
            const proximity = Math.max(0, 1 - dist / maxDist);

            if (proximity > 0) {
              // Non-linear ramp keeps glow concentrated near cursor.
              const p = proximity * proximity;
              alpha += p * 0.62;
              glow += p * 16;
            }
          }

          // Trail contributes secondary glow.
          for (let i = 0; i < state.trail.length; i += 1) {
            const t = state.trail[i];
            const dx = gx - t.x;
            const dy = gy - t.y;
            const dist = Math.hypot(dx, dy);
            const proximity = Math.max(0, 1 - dist / (maxDist * 0.65));
            if (proximity > 0) {
              const p = proximity * t.life * 0.45;
              alpha += p * 0.25;
              glow += p * 10;
            }
          }

          // Soft blue-purple glow blend.
          const blue = Math.min(255, 120 + glow * 7);
          const purple = Math.min(255, 140 + glow * 6);

          if (glow > 0.35) {
            ctx.shadowBlur = glow;
            ctx.shadowColor = `rgba(${purple}, ${blue}, 255, 0.72)`;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillStyle = `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${Math.min(alpha, 0.95)})`;
          ctx.fillRect(gx - pointSize / 2, gy - pointSize / 2, pointSize, pointSize);
        }
      }

      ctx.shadowBlur = 0;
      state.rafId = requestAnimationFrame(render);
    };

    setCanvasSize();
    // Center pointer initially for a balanced first frame.
    updatePointer(window.innerWidth / 2, window.innerHeight / 2, false);
    render();

    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseenter', onMouseEnter, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      if (state.rafId) cancelAnimationFrame(state.rafId);
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden="true" />;
};

export default InteractiveGridBackground;
