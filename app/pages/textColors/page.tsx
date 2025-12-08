"use client";
import { Heading, Text, Overline } from "../../components/typography";

export default function TypographyPage() {
  return (
    <>
      <Heading level="h2" className="mb-4" headingText='Typography Showcase' />
      <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full mb-6 flex flex-wrap gap-12">

        {/* Text Colors */}
        <div className="mb-8">
          <Overline color="primary">Text Colors</Overline>
          <div className="space-y-2 mt-2 flex flex-col">
            <Text color="primary" text="Primary color text" />
            <Text color="secondary" text="Secondary color text" />
            <Text color="error" text="Error color text" />
            <Text color="success" text="Success color text" />
            <Text color="warning" text="Warning color text" />
            <Text color="neutral" text="Neutral color text" />
          </div>
        </div>
      </div>
    </>
  );
}
