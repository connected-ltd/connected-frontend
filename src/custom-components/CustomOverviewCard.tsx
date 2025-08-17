import React from "react";
type Props = {
  key?: string | number;
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
};

const CustomOverviewCard = ({ onClick, title, icon }: Props) => {
  return (
    <div
      className="bg-bg-primary px-8 py-6 w-full  rounded-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <p className="text-sm md:text-base font-medium w-3/4 md:1/4">{title}</p>
        <div className="px-1 py-2 rounded-2xl mb-2 w-8 md:w-12">{icon}</div>
      </div>
    </div>
  );
};

export default CustomOverviewCard;
