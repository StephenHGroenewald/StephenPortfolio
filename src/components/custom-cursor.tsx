import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentRotate = 0;
    let currentSpeed = 0;
    let visualScale = 1;

    // Track event times to calculate velocity (pixels per millisecond)
    let lastEventTime = performance.now();
    let lastEventX = 0;
    let lastEventY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const now = performance.now();
      const dt = now - lastEventTime;

      if (dt > 0) {
        const dx = e.clientX - lastEventX;
        const dy = e.clientY - lastEventY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // pixels/ms
        const instantaneousSpeed = dist / dt;
        
        // Scale to a comfortable speed integer range
        currentSpeed = instantaneousSpeed * 120;
      }

      lastEventTime = now;
      lastEventX = e.clientX;
      lastEventY = e.clientY;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isClickable = target.closest("a, button, [role='button'], input, select, textarea, .cursor-pointer");
      if (isClickable) {
        cursor.classList.add("custom-cursor--hover");
      } else {
        cursor.classList.remove("custom-cursor--hover");
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    const tick = () => {
      // Calculate cursor position smooth lag / interpolation
      const dx = mouseX - currentX;
      const dy = mouseY - currentY;
      
      currentX += dx * 0.15;
      currentY += dy * 0.15;

      // Decay speed if the mouse has stopped moving
      const timeSinceLastMove = performance.now() - lastEventTime;
      if (timeSinceLastMove > 40) {
        currentSpeed *= 0.82; // decellerate momentum when stopped
      }

      // Calculate dynamic target scale based on movement speed (grows when moving)
      // Normal scale: 1.0. Max speed scale caps at 1.4
      const targetScale = 1 + Math.min(currentSpeed * 0.005, 0.4);
      
      // Interpolate the visual scale smoothly
      visualScale += (targetScale - visualScale) * 0.15;

      // Spin speed is proportional to mouse speed
      if (currentSpeed > 0.05) {
        currentRotate = (currentRotate + currentSpeed * 0.15) % 360;
      }

      // Update cursor DOM directly for maximum 60fps performance
      cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%) scale(${visualScale}) rotate(${currentRotate}deg)`;
    };

    gsap.ticker.add(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999]"
      aria-hidden="true"
    >
      <img
        src="/assets/monogram-mark.png"
        alt=""
        className="h-full w-full object-contain"
      />
    </div>
  );
}
