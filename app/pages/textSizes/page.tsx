"use client";
import { Heading, Text, Overline } from "../../components/typography";

export default function TypographyPage() {
  return (
    <>
      <Heading level="h2" className="mb-4" headingText='Typography Showcase' />
      <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full mb-6 flex flex-wrap gap-12">

        {/* Text Sizes */}
        <div className="mb-8">
          <Overline color="primary">Text Sizes</Overline>
          <div className="space-y-2 mt-2 flex flex-col">
            <Text size="lg" text='Large Text (lg)' color="primary" />
            <Text size="md" text='Medium Text (md)' />
            <Text size="sm" text='Small Text (sm)' />
          </div>
        </div>
      </div>
    </>
  );
}
