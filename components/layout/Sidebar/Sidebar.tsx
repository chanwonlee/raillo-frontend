"use client";

import { useSidebar } from "./SidebarContext";
import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  const { isOpen, close } = useSidebar();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-[9999]"
      onClick={close}
    >
      <div
        className="fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-1000"
        onClick={(e) => e.stopPropagation()}
      >
        <SidebarHeader close={close} />
        <SidebarContent close={close} />
      </div>
    </div>
  );
}
