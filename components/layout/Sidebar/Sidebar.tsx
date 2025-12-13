"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useSidebar } from "./SidebarContext";
import SidebarHeader from "./SidebarHeader";
import SidebarTicketService from "./SidebarTicketService";
import SidebarAdditionalService from "./SidebarAdditionalService";

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
        {/* Sidebar Header */}
        <SidebarHeader close={close} />
        {/* Sidebar Content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-80px)] bg-white">
          <nav className="space-y-2">
            {/* 승차권 서비스 */}
            <SidebarTicketService close={close} />
            {/* 부가 서비스 섹션 */}
            <SidebarAdditionalService close={close} />
            {/* 비회원 서비스 섹션
            <div className="space-y-1 mt-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
                비회원 서비스
              </h3>
              <Link
                href="/guest-ticket/search"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors bg-white"
                onClick={close}
              >
                <User className="h-5 w-5 text-indigo-600" />
                <span className="text-gray-700">비회원 승차권 확인</span>
              </Link>
            </div> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
