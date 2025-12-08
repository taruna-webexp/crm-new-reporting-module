"use client";
import { Heading, Button } from "../../components/typography";

export default function TypographyPage() {
  return (
    <>
      <Heading level="h2" className="mb-4" headingText='Buttons' />
      <div className="p-6 bg-white rounded-lg shadow-sm border border-neutral-200 w-full mb-6 flex flex-wrap gap-12">

        {/* Buttons */}
        <div className="mb-8">
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
