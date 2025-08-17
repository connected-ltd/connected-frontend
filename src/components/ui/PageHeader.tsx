type PageHeaderProps = {
  header: string;
  subHeader: string;
};

const PageHeader = ({ header, subHeader }: PageHeaderProps) => {
  return (
    <div>
      <h2 className="font-semibold sm:text-2xl md:text-3xl">{header}</h2>
      <p className="text-[#71717A] dark:text-[#5a5a5f] text-sm md:text-base">
        {subHeader}
      </p>
    </div>
  );
};

export default PageHeader;
