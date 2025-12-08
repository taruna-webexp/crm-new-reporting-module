// app/ClientRootProvider.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import ThemeModeProvider from "./components/theme/ThemeContext";
import { ClientThemeProvider } from "./client-theme-provider";
import { AppSnackbarProvider } from "./components/controllers/Toaster";
import AppShell from "./appShell";

export default function ClientRootProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppShell>
        <ClientThemeProvider>
          <ThemeModeProvider>
            <AppSnackbarProvider>
              {children}
            </AppSnackbarProvider>
          </ThemeModeProvider>
        </ClientThemeProvider>
      </AppShell>
    </SessionProvider>

  );
}
