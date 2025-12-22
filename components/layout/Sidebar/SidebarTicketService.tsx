import SidebarBtn from "./SidebarBtn";

const SidebarTicketService = ({ close }: { close: () => void }) => {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-3">
        승차권 서비스
      </h3>
      <SidebarBtn type="ticket-purchased" onClick={close} />
      <SidebarBtn type="ticket-booking" onClick={close} />
      <SidebarBtn type="ticket-reservations" onClick={close} />
    </div>
  );
};

export default SidebarTicketService;
