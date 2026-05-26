"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type CurriculumPlayContextValue = {
  playToken: number;
  playAllTogether: () => void;
};

const CurriculumPlayContext = createContext<CurriculumPlayContextValue | null>(null);

export function CurriculumPlayProvider({ children }: { children: ReactNode }) {
  const [playToken, setPlayToken] = useState(0);

  const playAllTogether = useCallback(() => {
    setPlayToken((t) => t + 1);
  }, []);

  const value = useMemo(
    () => ({
      playToken,
      playAllTogether,
    }),
    [playToken, playAllTogether]
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
