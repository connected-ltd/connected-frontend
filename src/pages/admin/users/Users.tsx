import React from "react";
import { Button } from "@/components/ui/button";
import AddUserModal from "@/components/ui/AddUserModal";
import PageHeader from "@/components/ui/PageHeader";
import NumbersTable from "../dashboard/component/NumbersTable";

const Users = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleAddUser = () => setModalOpen(true);

  const handleModalClose = () => setModalOpen(false);

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

        <NumbersTable />
      </div>
    </div>
  );
};

export default Users;
