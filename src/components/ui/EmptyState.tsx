import EmptyStateIcon from "@/assets/icons/empty-state.svg";

type EmptyStateProps = {
  header?: string;
  message?: string;
};

const EmptyState = ({ header, message }: EmptyStateProps) => {
  return (
    <div className="flex w-full min-h-[400px] h-[65vh] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-8 w-1/6">
        <img src={EmptyStateIcon} alt="empty state icon" />
        <div>
          {header && <h2 className="text-2xl font-semibold ">{header}</h2>}
          {message && <p className="text-[#71717A]">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
