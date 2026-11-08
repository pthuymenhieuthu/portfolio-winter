"use client";

import { createContext, useContext, useState, type Dispatch, type SetStateAction } from "react";

const WaterModeContext = createContext<{
  isWaterMode: boolean;
  setIsWaterMode: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export function WaterModeProvider({ children }: { children: React.ReactNode }) {
  const [isWaterMode, setIsWaterMode] = useState(false);
  return <WaterModeContext.Provider value={{ isWaterMode, setIsWaterMode }}>{children}</WaterModeContext.Provider>;
}

export function useWaterMode() {
  const context = useContext(WaterModeContext);
  if (!context) throw new Error("Water effects must be inside WaterModeProvider");
  return context;
}
