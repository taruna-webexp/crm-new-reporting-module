"use client";
import { Heading, Caption, Overline } from "../../components/typography";

export default function TypographyPage() {
  return (
    <>
      <Heading level="h2" className="mb-4" headingText='Typography Showcase' />
      <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full mb-6 flex flex-wrap gap-12">

        {/* Captions */}
        <div className="mb-8">
          <Overline color="primary">Captions</Overline>
          <div className="space-y-2 mt-2 flex flex-col">
            <Caption>Default caption text</Caption>
            <Caption color="primary">Primary caption</Caption>
            <Caption color="error">Error caption</Caption>
            <Caption color="success">Success caption</Caption>
            <Caption color="warning">Warning caption</Caption>
          </div>
        </div>
      </div>
    </>
  );
}
