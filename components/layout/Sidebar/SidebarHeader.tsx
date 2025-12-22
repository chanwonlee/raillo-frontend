import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const SidebarHeader = ({ close }: { close: () => void }) => {
  return (
    <div className="bg-blue-600 text-white p-4 flex items-center justify-between w-full">
      <h2 className="text-lg font-semibold">카테고리</h2>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => close()}
        className="text-white hover:bg-blue-700"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SidebarHeader;
