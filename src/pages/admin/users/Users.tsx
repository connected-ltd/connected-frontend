import React from "react";
import { Button } from "@/components/ui/button";
import CustomTable from "@/custom-components/CustomTable";
import { Edit, Trash } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import AddUserModal from "@/components/ui/AddUserModal";
import PageHeader from "@/components/ui/PageHeader";
import { useGetNumbersQuery } from "../admin-api/statsApiSlice";

const Users = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const { data, isLoading } = useGetNumbersQuery();

  const handleAddUser = () => setModalOpen(true);

  const handleModalClose = () => setModalOpen(false);

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

  const customActions = (
    <div className="flex items-center justify-center gap-5">
      <button className="text-gray-500 hover:text-gray-700">
        <Edit size={18} />
      </button>
      <button className="text-gray-500 hover:text-gray-700">
        <Trash size={18} />
      </button>
    </div>
  );

  return (
    <div>
      <AddUserModal open={modalOpen} onClose={handleModalClose} />
      <PageHeader
        header={"User List"}
        subHeader={"Here's a list of all users enrolled."}
      />
      <div>
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddUser}>Add user</Button>
        </div>

        <div className="bg-[#F6F5F4] dark:bg-[#A2C8E8] p-2 rounded-lg">
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
      </div>
    </div>
  );
};

export default Users;
