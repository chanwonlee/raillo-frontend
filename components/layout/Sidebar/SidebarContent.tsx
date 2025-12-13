import SidebarAdditionalService from "./SidebarAdditionalService";
import SidebarTicketService from "./SidebarTicketService";

const SidebarContent = ({ close }: { close: () => void }) => {
  return (
    <div className="p-4 overflow-y-auto h-[calc(100vh-80px)] bg-white">
      <nav className="space-y-3">
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
  );
};

export default SidebarContent;
