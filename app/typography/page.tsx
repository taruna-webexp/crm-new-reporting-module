"use client";
import { Heading, Text, Label, Caption, Overline, Button } from "../components/typography";

export default function TypographyPage() {
  return (
    <>
      <Heading level="h2" className="mb-4" headingText='Typography Showcase' />
      <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full mb-6 flex flex-wrap gap-12">

        {/* Headings */}
        <div className="mb-8">
          <Overline color="primary">Headings</Overline>
          <div className="space-y-2 mt-2">
            <Heading level="h1" headingText='Heading Level 1 (h1)' />
            <Heading level="h2" headingText='Heading Level 2 (h2)' />
            <Heading level="h3" headingText='Heading Level 3 (h3)' />
            <Heading level="h4" headingText='Heading Level 4 (h4)' />
            <Heading level="h5" headingText='Heading Level 5 (h5)' />
            <Heading level="h6" headingText='Heading Level 6 (h6)' />
          </div>
        </div>

        {/* Text Sizes */}
        <div className="mb-8">
          <Overline color="primary">Text Sizes</Overline>
          <div className="space-y-2 mt-2 flex flex-col">
            <Text size="lg" text='Large Text (lg)' />
            <Text size="md" text='Medium Text (md)' />
            <Text size="sm" text='Small Text (sm)' />
            <Text size="xs" text='Extra Small Text (xs)' />
          </div>
        </div>

        {/* Text Weights */}
        <div className="mb-8">
          <Overline color="primary">Text Weights</Overline>
          <div className="space-y-2 mt-2 flex flex-col">
            <Text weight="normal" text='Normal weight text' />
            <Text weight="medium" text='Medium weight text' />
            <Text weight="semibold" text='Semibold weight text' />
            <Text weight="bold" text='Bold weight text' />
          </div>
        </div>

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

        {/* Buttons */}
        <div className="mb-8">
          <Overline color="primary">Buttons</Overline>
          <div className="space-y-3 mt-2">
            <div className="flex gap-2 flex-wrap">
              <Button buttonText="Primary Small" variant="primary" size="sm" />
              <Button buttonText="Primary Medium" variant="primary" size="md" />
              <Button buttonText="Primary Large" variant="primary" size="lg" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button buttonText="Secondary Small" variant="secondary" size="sm" />
              <Button buttonText="Secondary Medium" variant="secondary" size="md" />
              <Button buttonText="Secondary Large" variant="secondary" size="lg" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button buttonText="Disabled" variant="primary" size="md" disabled={true} />
              <Button buttonText="Loading..." variant="primary" size="md" loading={true} />
              <Button buttonText="Full Width" variant="primary" size="md" fullWidth={true} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
