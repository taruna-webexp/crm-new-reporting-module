"use client";
import { Heading, Label, Overline } from "../../components/typography";

export default function TypographyPage() {
  return (
    <>
      <Heading level="h2" className="mb-4" headingText='Typography Showcase' />
      <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full mb-6 flex flex-wrap gap-12">

        {/* Labels */}
        <div className="mb-8">
          <Overline color="primary">Labels</Overline>
          <div className="space-y-2 mt-2">
            <Label size="lg" labelText="Large Label" />
            <Label size="md" labelText="Medium Label (Default)" />
            <Label size="sm" labelText="Small Label" />
            <Label size="md" labelText="Required Label" required={true} />
            <Label size="md" labelText="Primary Label" color="primary" />
            <Label size="md" labelText="Error Label" color="error" />
            <Label size="md" labelText="Success Label" color="success" />
          </div>
        </div>
      </div>
    </>
  );
}
