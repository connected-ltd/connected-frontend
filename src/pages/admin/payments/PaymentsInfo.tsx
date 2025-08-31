import CustomTable from "@/custom-components/CustomTable";
import EmptyState from "@/components/ui/EmptyState";

const PaymentsInfo = () => {
  const columns = [
    {
      key: "amount",
      header: "Amount",
      width: "col-span-1",
      filterable: true,
    },
    {
      key: "description",
      header: "Description",
      width: "col-span-3",
      filterable: true,
    },
    {
      key: "paid_by",
      header: "Paid By",
      width: "col-span-3",
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
  ];

  return (
    <div>
      <div>
        <h2 className="font-semibold">Payments</h2>
        <p className="text-[#71717A] dark:text-[#5a5a5f]">
          Here's a list of all payments made.
        </p>
      </div>
      <div>
        <div className="bg-[#F6F5F4] dark:bg-[#A2C8E8] p-2 rounded-lg">
          {/* {messages && messages?.data.length === 0 ? ( */}
          {usersData && usersData.length === 0 ? (
            <EmptyState
              header="No Users Found"
              message="Users hasn't been added yet."
            />
          ) : (
            <CustomTable
              columns={columns}
              data={usersData ?? []}
              // isFetching={isFetchingMessages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const usersData = [
  {
    id: 1,
    amount: "₦500",
    description: "50 units",
    paid_by: "ConnectED LTD",
    date: "12:33:12 (GMT +7)",
    type: "Income",
  },
  {
    id: 2,
    amount: "₦500",
    description: "50 units",
    paid_by: "ConnectED LTD",
    date: "12:33:12 (GMT +7)",
    type: "Income",
  },
  {
    id: 3,
    amount: "₦500",
    description: "50 units",
    paid_by: "ConnectED LTD",
    date: "12:33:12 (GMT +7)",
    type: "Income",
  },
  {
    id: 4,
    amount: "₦500",
    description: "50 units",
    paid_by: "ConnectED LTD",
    date: "12:33:12 (GMT +7)",
    type: "Income",
  },
  {
    id: 5,
    amount: "₦500",
    description: "50 units",
    paid_by: "ConnectED LTD",
    date: "12:33:12 (GMT +7)",
    type: "Income",
  },
  {
    id: 6,
    amount: "₦500",
    description: "50 units",
    paid_by: "ConnectED LTD",
    date: "12:33:12 (GMT +7)",
    type: "Income",
  },
];

export default PaymentsInfo;
