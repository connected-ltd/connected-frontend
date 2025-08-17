import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/EmptyState";
import CustomTable from "@/custom-components/CustomTable";
import { CircleDollarSign, Plus } from "lucide-react";

const Payments = () => {
  const columns = [
    {
      key: "amount",
      header: "Amount",
      width: "col-span-2",
      filterable: true,
    },
    {
      key: "description",
      header: "Description",
      width: "col-span-4",
      filterable: true,
    },
    {
      key: "date",
      header: "Date",
      width: "col-span-2",
      filterable: true,
    },
    {
      key: "type",
      header: "Type",
      width: "col-span-1",
      filterable: true,
    },
    {
      key: "status",
      header: "Status",
      width: "col-span-1",
      filterable: true,
    },
  ];

  return (
    <div>
      <div className="border border-border-primary w-full p-4 rounded-lg flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <p className="text-text-primary text-xs md:text-sm">Unit Wallet</p>
          <p className="text-lg md:text-xl text-text-primary">Total Balance</p>
          <h3 className="text-2xl md:text-3xl text-text-primary">
            ₦ 12,850.55
          </h3>
          <div className="flex items-center bg-bg-primary-dark2 p-2 gap-2 rounded-full text-white w-fit">
            <CircleDollarSign size={18} className="text-[#F9E636] shrink-0" />
            <span className="text-xs md:text-base">1,450</span>
          </div>
        </div>
        <div>
          <Button>
            <Plus /> Top Up
          </Button>
        </div>
      </div>

      <div className="bg-[#F6F5F4] dark:bg-[#A2C8E8] p-2 rounded-lg mt-10">
        {/* {messages && messages?.data.length === 0 ? ( */}
        {paymentsData && paymentsData.length === 0 ? (
          <EmptyState
            header="No Payments Found"
            message="Looks like you haven't made any payments yet."
          />
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-6xl">
              <CustomTable
                columns={columns}
                data={paymentsData ?? []}
                // isFetching={isFetchingMessages}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const paymentsData = [
  {
    id: 1,
    amount: "₦ 1,000.00",
    description: "Payment for credits",
    date: "2023-10-01",
    type: "Credit",
    status: "Completed",
  },
  {
    id: 2,
    amount: "₦ 500.00",
    description: "Payment for broadcast",
    date: "2023-10-02",
    type: "Debit",
    status: "Pending",
  },
  {
    id: 3,
    amount: "₦ 2,000.00",
    description: "Payment for credit",
    date: "2023-10-03",
    type: "Credit",
    status: "Completed",
  },
  {
    id: 4,
    amount: "₦ 750.00",
    description: "Payment for broadcast",
    date: "2023-10-04",
    type: "Debit",
    status: "Failed",
  },
];

export default Payments;
