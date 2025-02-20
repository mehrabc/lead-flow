"use client";
import { useState } from "react";
import { RiHome2Line } from "react-icons/ri";
import { SiGoogleadsense } from "react-icons/si";
import { FaTasks } from "react-icons/fa";
import { MdAddchart } from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import { MdAssignmentAdd } from "react-icons/md";
import { MdAssignment } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GrDocumentPdf } from "react-icons/gr";
import Link from "next/link";
const sideBarPrimary = [
  { icon: RiHome2Line, item: "Overview", link: "/" },
  { icon: SiGoogleadsense, item: "All Leads", link: "/leads" },
  { icon: FaTasks, item: "My Tasks", link: "/tasks" },
];

const sideBarExtras = [
  { icon: MdAddchart, item: "Add New Lead", link: "/add-lead" },
  { icon: RiUserAddLine, item: "Add New Employee", link: "/add-employee" },
  { icon: MdAssignmentAdd, item: "Assign Task", link: "/assign-task" },
  {
    icon: MdAssignment,
    item: "View Assigned Task",
    link: "/view-assigned-tasks",
  },
  { icon: GrDocumentPdf, item: "Daily Report", link: "/daily-report" },
  {
    icon: IoMdNotificationsOutline,
    item: "Notifications",
    link: "/notifications",
  },
];
const Sidebar = () => {
  const [selectedSideBarItem, setSelectedSideBarItem] = useState({
    section: "primary",
    index: 0,
  });
  const handleSelect = (section, index) => {
    setSelectedSideBarItem({ section, index });
  };
  return (
    <div className="h-screen flex flex-col gap-7 items-center w-full max-w-72 p-4 border-r-2 fixed top-0 left-0">
      <h2 className="text-3xl font-bold justify-end">
        Lead <span className="text-primaryPurple">Flow</span>
      </h2>
      <section className="flex flex-col gap-3 items-start w-full">
        {sideBarPrimary.map(({ icon: Icon, item, link }, index) => (
          <Link
            href={link}
            key={index}
            onClick={() => handleSelect("primary", index)}
            className={` flex gap-4 items-center text-xs sm:text-sm lg:text-lg text-sideBarText font-medium`}
          >
            <Icon
              className={`${
                index === selectedSideBarItem.index &&
                selectedSideBarItem.section === "primary"
                  ? "fill-primaryPurple"
                  : ""
              } w-6 h-6 text-gray-700`}
            />
            <span
              className={`${
                index === selectedSideBarItem.index &&
                selectedSideBarItem.section === "primary"
                  ? "text-primaryPurple font-semibold"
                  : ""
              }`}
            >
              {item}
            </span>
          </Link>
        ))}
      </section>
      <section className="flex flex-col gap-3 items-start w-full">
        {sideBarExtras.map(({ icon: Icon, item, link }, index) => (
          <Link
            href={link}
            key={index}
            onClick={() => handleSelect("extras", index)}
            className={` flex gap-4 items-center text-xs sm:text-sm lg:text-lg text-sideBarText font-medium`}
          >
            <Icon
              className={`${
                index === selectedSideBarItem.index &&
                selectedSideBarItem.section === "extras"
                  ? "fill-primaryPurple text-primaryPurple"
                  : ""
              } w-6 h-6 text-gray-700`}
            />
            <span
              className={`${
                index === selectedSideBarItem.index &&
                selectedSideBarItem.section === "extras"
                  ? "text-primaryPurple font-semibold"
                  : ""
              }`}
            >
              {item}
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Sidebar;
