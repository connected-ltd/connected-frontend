// src/pages/organization/settings/Payments.tsx
import { Button } from "@/components/ui/button";
import EmptyState from "@/components/ui/EmptyState";
import CustomTable from "@/custom-components/CustomTable";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useGetCreditBalanceQuery } from "../settingsApiSlice";
import LinearProgress from "@/components/ui/LinearProgress";
import InitializePaymentModal from "./components/InitializePaymentModal";
import PaymentProgress from "./components/PaymentProgress";

const Payments = () => {
  const columns = [
    { key: "amount", header: "Amount", width: "col-span-2", filterable: true },
    {
      key: "description",
      header: "Description",
      width: "col-span-4",
      filterable: true,
    },
    { key: "date", header: "Date", width: "col-span-2", filterable: true },
    { key: "type", header: "Type", width: "col-span-1", filterable: true },
    { key: "status", header: "Status", width: "col-span-1", filterable: true },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const handleInitializePayment = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  // ✅ show verifying overlay
  const [progressOpen, setProgressOpen] = useState(false);
  const [pendingRef, setPendingRef] = useState<string | null>(null);
  const [popup, setPopup] = useState<Window | null>(null);

  // Wallet balance (will refetch on verify thanks to invalidatesTags: ['credits'])
  const { data, isLoading } = useGetCreditBalanceQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  return (
    <div>
      <InitializePaymentModal
        open={modalOpen}
        onClose={handleModalClose}
        onPaymentLaunched={({ reference, popup }) => {
          setPendingRef(reference);
          setPopup(popup);
          setProgressOpen(true);
        }}
      />

      <PaymentProgress
        open={progressOpen}
        reference={pendingRef || ""}
        popup={popup || undefined}
        onDone={() => {
          setProgressOpen(false);
          setPendingRef(null);
          setPopup(null);
        }}
      />

      {isLoading && <LinearProgress />}

      <div className="border border-border-primary w-full p-4 rounded-lg flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <p className="text-text-primary text-xs md:text-sm">Unit Wallet</p>
          <p className="text-lg md:text-xl text-text-primary">Total Balance</p>
          <h3 className="text-2xl md:text-3xl text-text-primary">
            {data?.data.balance} credits
          </h3>
        </div>
        <div>
          <Button onClick={handleInitializePayment}>
            <Plus /> Top Up
          </Button>
        </div>
      </div>

      <div className="bg-[#F6F5F4] dark:bg-[#A2C8E8] p-2 rounded-lg mt-10">
        {paymentsData && paymentsData.length === 0 ? (
          <EmptyState
            header="No Payments Found"
            message="Looks like you haven't made any payments yet."
          />
        ) : (
          <div className="overflow-x-auto">
            <div>
              <CustomTable columns={columns} data={paymentsData ?? []} />
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
