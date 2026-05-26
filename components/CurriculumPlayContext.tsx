"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Modules 1–3, then 4–6, then 7–9 — avoids loading all 9 MP4s at once */
const WAVE_DELAYS_MS = [0, 5000, 10000] as const;

type CurriculumPlayContextValue = {
  playToken: number;
  /** Highest module number allowed to start loading (1–9) */
  allowedThroughModule: number;
  playAllTogether: () => void;
};

const CurriculumPlayContext = createContext<CurriculumPlayContextValue | null>(null);

export function CurriculumPlayProvider({ children }: { children: ReactNode }) {
  const [playToken, setPlayToken] = useState(0);
  const [allowedThroughModule, setAllowedThroughModule] = useState(0);

  const playAllTogether = useCallback(() => {
    setPlayToken((t) => t + 1);
    setAllowedThroughModule(0);
    WAVE_DELAYS_MS.forEach((delay, i) => {
      window.setTimeout(() => setAllowedThroughModule((i + 1) * 3), delay);
    });
  }, []);

  const value = useMemo(
    () => ({
      playToken,
      allowedThroughModule,
      playAllTogether,
    }),
    [playToken, allowedThroughModule, playAllTogether]
  );

  return (
    <CurriculumPlayContext.Provider value={value}>{children}</CurriculumPlayContext.Provider>
  );
}

export function useCurriculumPlay() {
  const ctx = useContext(CurriculumPlayContext);
  if (!ctx) {
    throw new Error("useCurriculumPlay must be used within CurriculumPlayProvider");
  }
  return ctx;
}
