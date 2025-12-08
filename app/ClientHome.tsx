// app/ClientHome.tsx
"use client";

import Link from "next/link";
import { Heading, Text } from "./components/typography";
import { Session } from "next-auth";

interface ClientHomeProps {
  session: Session;
}


export default function ClientHome({ session }: ClientHomeProps) {
  const pages = [
    { title: "Typography Showcase", href: "/typography" },
    { title: "Form Components", href: "/pages/inputs" },
    { title: "Card Components", href: "/pages/card" },
    { title: "Tables Showcase", href: "/pages/table" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-neutral-800">
        UI Kit Library
      </h1>
      <p className="text-neutral-500">
        Welcome {session.user?.name} 👋 Browse component examples:
      </p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <Link key={page.href} href={page.href}
            className="p-4 border border-neutral-200 rounded-lg shadow-sm
                       hover:shadow-md transition-shadow bg-white"
          >
            <Heading level="h3" headingText={page.title} />
            <Text color="secondary" text="Explore →" />
          </Link>
        ))}
      </div>
    </div>
  );
}
