"use client";
import { Heading, Text, Overline } from "../../components/typography";

export default function TypographyPage() {
  return (
    <>
      <Heading level="h2" className="mb-4" headingText='Typography Showcase' />
      <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full mb-6 flex flex-wrap gap-12">
        {/* Text Weights */}
        <div className="mb-8">
          <Overline color="primary">Text Weights</Overline>
          <div className="space-y-2 mt-2 flex flex-col">
            <Text weight="normal" text='Normal weight text' color="primary" />
            <Text weight="medium" text='Medium weight text' />
            <Text weight="semibold" text='Semibold weight text' />
            <Text weight="bold" text='Bold weight text' />
          </div>
        </div>
      </div>
    </>
  );
}
