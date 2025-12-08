"use client";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "./emotion-cache";

const cache = createEmotionCache();

export function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
