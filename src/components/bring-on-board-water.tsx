"use client";

import { CursorRippleBackground } from "./cursor-ripple-background";
import { useWaterMode } from "./water-mode";

export function BringOnBoardWater() {
  const { isWaterMode } = useWaterMode();
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-[#e6f6ff]">
      <CursorRippleBackground interactive={isWaterMode} />
    </div>
  );
}
