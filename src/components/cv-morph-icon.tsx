"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const LINE_PATH =
  "M114.463 215.895C87.3553 242.341 48.8595 252.522 33 254.307C43.2999 261.291 67.1301 284.803 80.0518 322.982C92.9735 361.161 80.0518 410.902 71.9757 431C79.6421 415.325 102.946 381.042 134.828 369.309C192.133 351.616 240.402 361.937 257.374 369.309C264.806 351.694 289.011 310.504 326.371 286.666C363.732 262.827 435.691 263.075 467 266.179C443.591 259.583 388.417 237.778 354.989 203.324C321.561 168.87 327.834 99.4189 335.15 69C327.893 83.5886 303.899 117.049 265.977 134.183C228.054 151.317 177.608 147.375 157.125 143.262C154.199 156.454 141.57 189.449 114.463 215.895Z";

const SPARKLE_PATH =
  "M366.552 219.672L431 250L366.552 280.328C328.655 298.163 298.163 328.655 280.328 366.552L250 431L219.672 366.552C201.837 328.655 171.345 298.163 133.448 280.328L69 250L133.448 219.672C171.345 201.837 201.837 171.345 219.672 133.448L250 69L280.328 133.448C298.163 171.345 328.655 201.837 366.552 219.672Z";

const POINT_COUNT = 80;
const MORPH_DURATION = 420;

type Point = {
  x: number;
  y: number;
};

function easeOutQuart(value: number) {
  return 1 - Math.pow(1 - value, 4);
}

function pointsToPath(points: Point[]) {
  return points
    .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
    .join("") + "Z";
}

function interpolatePoints(from: Point[], to: Point[], progress: number) {
  return from.map((point, index) => ({
    x: point.x + (to[index].x - point.x) * progress,
    y: point.y + (to[index].y - point.y) * progress,
  }));
}

function samplePath(pathData: string) {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);

  const length = path.getTotalLength();
  return Array.from({ length: POINT_COUNT }, (_, index) => {
    const point = path.getPointAtLength((length * index) / POINT_COUNT);
    return { x: point.x, y: point.y };
  });
}

type CvMorphIconProps = {
  active?: boolean;
};

export function CvMorphIcon({ active = false }: CvMorphIconProps) {
  const shouldReduceMotion = useReducedMotion();
  const [pathData, setPathData] = useState(LINE_PATH);
  const basePoints = useRef<Point[] | null>(null);
  const sparklePoints = useRef<Point[] | null>(null);
  const currentPoints = useRef<Point[] | null>(null);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    basePoints.current = samplePath(LINE_PATH);
    sparklePoints.current = samplePath(SPARKLE_PATH);
    currentPoints.current = basePoints.current;
    setPathData(pointsToPath(basePoints.current));

    return () => {
      if (frame.current) {
        window.cancelAnimationFrame(frame.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!basePoints.current || !sparklePoints.current) {
      return;
    }

    if (frame.current) {
      window.cancelAnimationFrame(frame.current);
    }

    const from = currentPoints.current || basePoints.current;
    const to = active ? sparklePoints.current : basePoints.current;

    if (shouldReduceMotion) {
      currentPoints.current = to;
      setPathData(pointsToPath(to));
      return;
    }

    const start = performance.now();

    function animate(now: number) {
      const linearProgress = Math.min((now - start) / MORPH_DURATION, 1);
      const easedProgress = easeOutQuart(linearProgress);
      const nextPoints = interpolatePoints(from, to, easedProgress);

      currentPoints.current = nextPoints;
      setPathData(pointsToPath(nextPoints));

      if (linearProgress < 1) {
        frame.current = window.requestAnimationFrame(animate);
      }
    }

    frame.current = window.requestAnimationFrame(animate);
  }, [active, shouldReduceMotion]);

  return (
    <svg
      aria-hidden="true"
      className="size-5 shrink-0 overflow-visible"
      fill="none"
      viewBox="0 0 500 500"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="cv-icon-gradient"
          x1="250"
          x2="250"
          y1="69"
          y2="431"
        >
          <stop stopColor="#FF76ED" />
          <stop offset="1" stopColor="#BE89FF" />
        </linearGradient>
      </defs>
      <path
        className="[animation:cv-icon-draw_900ms_1.74s_cubic-bezier(0.16,1,0.3,1)_both] [stroke-dasharray:1] [stroke-dashoffset:1]"
        d={pathData}
        pathLength={1}
        stroke="url(#cv-icon-gradient)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={27}
      />
      <style>{`
        @keyframes cv-icon-draw {
          from {
            stroke-dashoffset: 1;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
}
