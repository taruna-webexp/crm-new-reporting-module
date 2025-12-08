"use client";
import { Heading, Overline } from "../../components/typography";

export default function TypographyPage() {
  return (
    <>
      <Heading level="h2" className="mb-4" headingText='Typography Showcase' />
      <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full mb-6 flex flex-wrap gap-12">

        <div className="mb-8">
          <Overline color="primary">Headings</Overline>
          <div className="space-y-2 mt-2">  
            <Heading level="h1" headingText='Heading Level 1 (h1)' color="primary" />
            <Heading level="h2" headingText='Heading Level 2 (h2)' />
            <Heading level="h3" headingText='Heading Level 3 (h3)' />
            <Heading level="h4" headingText='Heading Level 4 (h4)' />
            <Heading level="h5" headingText='Heading Level 5 (h5)' />
            <Heading level="h6" headingText='Heading Level 6 (h6)' />
          </div>
        </div>
      </div>
    </>
  );
}
