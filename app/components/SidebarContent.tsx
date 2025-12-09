"use client";
import { useState } from "react";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { Label } from "./typography";
import AddUserIcon from "./icons/AddUserIcon";
import { UserIcon } from "./icons";
import BriefcaseIcon from "./icons/BriefcaseIcon";

const SidebarContent = () => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuName) ? prev.filter(item => item !== menuName) : [...prev, menuName],
    );
  };

  const isMenuExpanded = (menuName: string) => expandedMenus.includes(menuName);

  return (
    <nav className="flex flex-col gap-1">
      <Link
        className="flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors"
        href="/"
      >
        <HomeIcon fontSize="small" />
        <Label labelText="Home" size="lg" color="white" />
      </Link>

      <div>
        <button
          onClick={() => toggleMenu("user")}
          className="w-full flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <UserIcon fontSize="small" />
            <Label labelText="User" size="lg" color="white" />
          </div>
          <ChevronRightIcon
            fontSize="small"
            sx={{
              transform: isMenuExpanded("user") ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>
        {isMenuExpanded("user") && (
          <div className="pl-6 flex flex-col gap-1">
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/users"
            >
              <UserIcon fontSize="small" />
              <Label labelText="Users" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/users/add-user"
            >
              <AddUserIcon fontSize="small" />
              <Label labelText="Add User" size="md" color="white" />
            </Link>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleMenu("projects")}
          className="w-full flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <BriefcaseIcon fontSize="small" />
            <Label labelText="Projects" size="lg" color="white" />
          </div>
          <ChevronRightIcon
            fontSize="small"
            sx={{
              transform: isMenuExpanded("projects") ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>
        {isMenuExpanded("projects") && (
          <div className="pl-6 flex flex-col gap-1">
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/projects"
            >
              <BriefcaseIcon fontSize="small" />
              <Label labelText="Projects" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/projects/add-project"
            >
              <AddUserIcon fontSize="small" />
              <Label labelText="Add Project" size="md" color="white" />
            </Link>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleMenu("module")}
          className="w-full flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <BriefcaseIcon fontSize="small" />
            <Label labelText="Module" size="lg" color="white" />
          </div>
          <ChevronRightIcon
            fontSize="small"
            sx={{
              transform: isMenuExpanded("module") ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>
        {isMenuExpanded("module") && (
          <div className="pl-6 flex flex-col gap-1">
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/module"
            >
              <BriefcaseIcon fontSize="small" />
              <Label labelText="Module" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/module/add-module"
            >
              <AddUserIcon fontSize="small" />
              <Label labelText="Add Module" size="md" color="white" />
            </Link>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleMenu("task")}
          className="w-full flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <DashboardIcon fontSize="small" />
            <Label labelText="Task" size="lg" color="white" />
          </div>
          <ChevronRightIcon
            fontSize="small"
            sx={{
              transform: isMenuExpanded("task") ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>
        {isMenuExpanded("task") && (
          <div className="pl-6 flex flex-col gap-1">
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/task"
            >
              <DashboardIcon fontSize="small" />
              <Label labelText="Tasks" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/task/add-task"
            >
              <DashboardIcon fontSize="small" />
              <Label labelText="Add Task" size="md" color="white" />
            </Link>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleMenu("typography")}
          className="w-full flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <DashboardIcon fontSize="small" />
            <Label labelText="Typography" size="lg" color="white" />
          </div>
          <ChevronRightIcon
            fontSize="small"
            sx={{
              transform: isMenuExpanded("typography") ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>
        {isMenuExpanded("typography") && (
          <div className="pl-6 flex flex-col gap-1">
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/headings"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Headings" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/textSizes"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Text Sizes" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/textWeight"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Text Weight" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/textColors"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Text Color" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/labels"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Labels" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/captions"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Captions" size="md" color="white" />
            </Link>
          </div>
        )}
      </div>

      <Link
        className="flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors"
        href="/pages/buttons"
      >
        <DashboardIcon fontSize="small" />
        <Label labelText="Buttons" size="lg" color="white" />
      </Link>

      <div>
        <button
          onClick={() => toggleMenu("form")}
          className="w-full flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <DashboardIcon fontSize="small" />
            <Label labelText="Form" size="lg" color="white" />
          </div>
          <ChevronRightIcon
            fontSize="small"
            sx={{
              transform: isMenuExpanded("form") ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>
        {isMenuExpanded("form") && (
          <div className="pl-6 flex flex-col gap-1">
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/inputs"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Inputs" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/nameInput"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Name Input" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/emailInput"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Email Input" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/phoneInput"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Phone Input" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/radioInput"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Radio Inputs" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/checkboxes"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Checkboxes" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/dateInput"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Date Input" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/timeInput"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Time Input" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/dateTimeInput"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Date & Time Input" size="md" color="white" />
            </Link>

            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/dateRangeInput"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Date Range" size="md" color="white" />
            </Link>
          </div>
        )}
      </div>

      <div>
        <button
          onClick={() => toggleMenu("icons")}
          className="w-full flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <DashboardIcon fontSize="small" />
            <Label labelText="Icons" size="lg" color="white" />
          </div>
          <ChevronRightIcon
            fontSize="small"
            sx={{
              transform: isMenuExpanded("icons") ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>
        {isMenuExpanded("icons") && (
          <div className="pl-6 flex flex-col gap-1">
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/addIcon"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Add" size="md" color="white" />
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/deleteIcon"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Delete" size="md" color="white" />
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/editIcon"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Edit" size="md" color="white" />
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/dashboardIcon"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Dashboard" size="md" color="white" />
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/searchIcon"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Search" size="md" color="white" />
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/userIcon"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="User" size="md" color="white" />
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/leftArrow"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Left Arrow" size="md" color="white" />
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/rightArrow"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Right Arrow" size="md" color="white" />
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/copyIcon"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Copy" size="md" color="white" />
            </Link>
            <Link
              className="flex items-center gap-2 px-3 py-2 rounded text-sm hover:bg-red-800 transition-colors cursor-pointer"
              href="/pages/settingsIcon"
            >
              <AnalyticsIcon fontSize="small" />
              <Label labelText="Settings" size="md" color="white" />
            </Link>
          </div>
        )}
      </div>

      <Link
        className="flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors"
        href="/pages/dropdowns"
      >
        <DashboardIcon fontSize="small" />
        <Label labelText="Dropdowns" size="lg" color="white" />
      </Link>

      <Link
        className="flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors"
        href="/pages/table"
      >
        <DashboardIcon fontSize="small" />
        <Label labelText="Table" size="lg" color="white" />
      </Link>

      <Link
        className="flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors"
        href="/pages/card"
      >
        <DashboardIcon fontSize="small" />
        <Label labelText="Card" size="lg" color="white" />
      </Link>

      <Link
        className="flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors"
        href="/pages/toaster"
      >
        <DashboardIcon fontSize="small" />
        <Label labelText="Toaster" size="lg" color="white" />
      </Link>

      <Link
        className="flex items-center gap-3 px-3 py-4 hover:bg-red-800 transition-colors"
        href="/pages/tabs"
      >
        <DashboardIcon fontSize="small" />
        <Label labelText="Tabs" size="lg" color="white" />
      </Link>
    </nav>
  );
};

export default SidebarContent;
