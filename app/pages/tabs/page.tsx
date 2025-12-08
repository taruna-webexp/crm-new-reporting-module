"use client";
import { useState } from "react";
import DataTabs from "@/app/components/controllers/TabsController";
import ProfileTab from "./content/Tab1";
import SettingsTab from "./content/Tab2";
import BillingTab from "./content/Tab3";

export default function DemoTabs() {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <button
        onClick={() => setActiveTab(2)}
        className="p-2 bg-blue-500 text-white"
      >
        Go to Billing tab
      </button>

      <DataTabs
        value={activeTab}
        onChange={(newTab) => setActiveTab(newTab)}
        tabs={[
          { label: "Profile", content: <ProfileTab /> },
        //   { label: "Settings", content: <SettingsTab />, disabled: true }, // Example of a disabled tab
          { label: "Settings", content: <SettingsTab />, },
          { label: "Billing", content: <BillingTab /> },
        ]}
      />
    </>
  );
}
