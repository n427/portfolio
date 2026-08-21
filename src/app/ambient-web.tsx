"use client";

import React, { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export function shouldAnimateWeb(reducedMotion: boolean, coarsePointer: boolean, hidden: boolean) {
  return !reducedMotion && !coarsePointer && !hidden;
}

export function displacePoint(point: Point, cursor: Point, radius: number): Point {
  const dx = point.x - cursor.x;
  const dy = point.y - cursor.y;
  const distance = Math.hypot(dx, dy);

  if (distance === 0 || distance >= radius) return point;

  const push = (1 - distance / radius) * 35;
  return {
    x: point.x + (dx / distance) * push,
    y: point.y + (dy / distance) * push,
  };
}

export function AmbientWeb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window.matchMedia !== "function") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    if (!shouldAnimateWeb(reducedMotion.matches, coarsePointer.matches, false)) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let points: Array<Point & { phase: number }> = [];
    let cursor: Point | null = null;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * ratio);
      canvas.height = Math.floor(window.innerHeight * ratio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const spacing = 118;
      points = [];
      for (let y = -spacing; y < window.innerHeight + spacing; y += spacing) {
        for (let x = -spacing; x < window.innerWidth + spacing; x += spacing) {
          const column = Math.round(x / spacing);
          const row = Math.round(y / spacing);
          points.push({
            x: x + ((row * 29 + column * 17) % 31),
            y: y + ((row * 13 + column * 23) % 27),
            phase: (row * 0.9 + column * 1.7) % 6,
          });
        }
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      cursor = { x: event.clientX, y: event.clientY };
    };
    const onPointerLeave = () => { cursor = null; };

    const draw = (time: number) => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const styles = getComputedStyle(document.documentElement);
      const lineColor = styles.getPropertyValue("--web-line").trim();
      const pointColor = styles.getPropertyValue("--web-point").trim();
      const livePoints = points.map((point) => {
        const drifting = {
          x: point.x + Math.sin(time * 0.00016 + point.phase) * 4,
          y: point.y + Math.cos(time * 0.00013 + point.phase) * 4,
        };
        return cursor ? displacePoint(drifting, cursor, 92) : drifting;
      });

      context.lineWidth = 0.65;
      context.strokeStyle = lineColor;
      for (let i = 0; i < livePoints.length; i += 1) {
        for (let j = i + 1; j < livePoints.length; j += 1) {
          if (Math.hypot(livePoints[i].x - livePoints[j].x, livePoints[i].y - livePoints[j].y) < 145) {
            context.beginPath();
            context.moveTo(livePoints[i].x, livePoints[i].y);
            context.lineTo(livePoints[j].x, livePoints[j].y);
            context.stroke();
          }
        }
      }

      context.fillStyle = pointColor;
      for (const point of livePoints) {
        context.beginPath();
        context.arc(point.x, point.y, 1.1, 0, Math.PI * 2);
        context.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (frame === 0) {
        frame = requestAnimationFrame(draw);
      }
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (!document.hidden) frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-web" data-testid="ambient-web" aria-hidden="true" />;
}
