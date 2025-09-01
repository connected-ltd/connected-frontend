import DeleteItemModal from "@/components/ui/DeleteItemModal";
import EmptyState from "@/components/ui/EmptyState";
import CustomTable from "@/custom-components/CustomTable";
import {
  useDeleteNumberMutation,
  useGetNumbersQuery,
} from "../../admin-api/statsApiSlice";
import { useState } from "react";
import { useToast } from "@/context/ToastContext";
import { Numbers } from "@/types/number.types";
import { Edit, Trash } from "lucide-react";
import AddUserModal from "@/components/ui/AddUserModal";

const NumbersTable = () => {
  const { data, isLoading } = useGetNumbersQuery();
  const [deleteModal, setDeleteModal] = useState(false);
  const [addUserModal, setAddUserModal] = useState(false);
  const [numberToEdit, setNumberToEdit] = useState<Numbers | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedNumber, setSelectedNumber] = useState<any>(null);
  const [deleteNumberRequest, { isLoading: isDeletingNumber }] =
    useDeleteNumberMutation();
  const { showToast } = useToast();

  const columns = [
    {
      key: "id",
      header: "User ID",
      width: "col-span-1",
      filterable: true,
    },
    {
      key: "number",
      header: "Phone Number",
      width: "col-span-3",
      filterable: true,
    },
    {
      key: "language",
      header: "Preferred Language",
      width: "col-span-2",
      filterable: true,
    },
    {
      key: "area",
      header: "Location",
      width: "col-span-3",
      filterable: true,
    },
  ];

  const handleDeleteNumberModal = (number: Numbers) => {
    setSelectedNumber(number);
    setDeleteModal(true);
  };

  const handleCloseDeleteNumberModal = () => setDeleteModal(false);

  const handleDeleteNumber = async (number: Numbers) => {
    if (number) {
      try {
        await deleteNumberRequest({ id: number.id }).unwrap();
        handleCloseDeleteNumberModal();
        showToast("Number deleted successfully", "success");
      } catch (error) {
        console.error("Failed to delete the Number: ", error);
        showToast("Something went wrong", "error");
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customActions = (row: any) => (
    <div className="flex items-center justify-center gap-5">
      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={() => {
          setNumberToEdit(row);
          setAddUserModal(true);
        }}
      >
        <Edit size={18} />
      </button>
      <button
        className="text-gray-500 hover:text-gray-700"
        onClick={() => handleDeleteNumberModal(row)}
      >
        <Trash size={18} />
      </button>
    </div>
  );

  return (
    <div className="p-2 rounded-lg">
      <DeleteItemModal
        open={deleteModal}
        onClose={handleCloseDeleteNumberModal}
        handlSubmit={handleDeleteNumber}
        isLoading={isDeletingNumber}
        number={selectedNumber}
      />
      <AddUserModal
        open={addUserModal}
        onClose={() => {
          setAddUserModal(false);
          setNumberToEdit(null);
        }}
        numberToEdit={numberToEdit}
      />
      {data && data?.data.length === 0 ? (
        <EmptyState
          header="No Users Found"
          message="Users hasn't been added yet."
        />
      ) : (
        <CustomTable
          columns={columns}
          data={data?.data ?? []}
          actions={customActions}
          isFetching={isLoading}
        />
      )}
    </div>
  );
};

export default NumbersTable;
