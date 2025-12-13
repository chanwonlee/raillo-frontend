import { MapPin } from "lucide-react";
import Link from "next/link";

const SidebarAdditionalService = ({ close }: { close: () => void }) => {
  return (
    <div className="space-y-1 mt-6">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
        부가 서비스
      </h3>
      <Link
        href="/landmarks"
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors bg-white"
        onClick={close}
      >
        <MapPin className="h-5 w-5 text-emerald-600" />
        <span className="text-gray-700">랜드마크 찾기</span>
      </Link>
    </div>
  );
};

export default SidebarAdditionalService;
