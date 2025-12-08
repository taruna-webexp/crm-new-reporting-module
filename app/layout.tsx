// app/layout.tsx
import "./globals.css";
import ClientRootProvider from "./ClientRootProvider";
import { ReactNode } from "react";

export const metadata = {
  title: "AceWebX",
  description: "Dashboard",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientRootProvider>
          {children}
        </ClientRootProvider>
      </body>
    </html>
  );
}