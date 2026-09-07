"use client";

import { useEffect, useRef } from "react";
import { Application } from "@splinetool/runtime";

export function BringOnBoardSpline() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasElement = canvas;

    const controller = new AbortController();
    let app: Application | null = null;
    let hasStarted = false;
    let isReady = false;
    let isVisible = false;

    async function startScene() {
      if (hasStarted || controller.signal.aborted) return;
      hasStarted = true;
      app = new Application(canvasElement);

      const response = await fetch("/assets/home/blush-horizon.spline", {
        signal: controller.signal,
      });
      if (!response.ok) {
        throw new Error(`Unable to load Spline scene (${response.status})`);
      }

      await app.start(await response.arrayBuffer(), { interactive: true });
      app.setBackgroundColor("#f8fcff");
      app.getAllObjects().forEach((object) => {
        const isForegroundSphere =
          object.name.startsWith("Medium Pink Sphere") ||
          object.name.endsWith("Bubble");

        if (isForegroundSphere) object.visible = false;
      });
      app.requestRender();
      isReady = true;
      if (!isVisible) app.stop();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void startScene().catch((error: unknown) => {
            if (!controller.signal.aborted) {
              console.error("Unable to start the local Spline scene", error);
            }
          });
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(canvas);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (!app || !isReady) return;
        if (isVisible) {
          app.play();
        } else {
          app.stop();
        }
      },
      { threshold: 0.01 }
    );
    visibilityObserver.observe(canvas);

    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
      controller.abort();
      if (app) {
        app.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-auto absolute inset-0 z-0 block h-full w-full bg-[#f8fcff] saturate-[0.72] brightness-[0.96]"
    />
  );
}
