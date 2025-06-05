import React from "react";
import { Button } from "@/components/ui/button";
import CustomTable from "@/custom-components/CustomTable";
import { Trash } from "lucide-react";
import CreateMessageModal from "@/components/ui/CreateMessageModal";

const Messages = () => {
  const columns = [
    {
      key: "location",
      header: "Location",
      width: "col-span-2",
      filterable: true,
    },
    { key: "code", header: "Code", width: "col-span-2", filterable: true },
    {
      key: "message",
      header: "Message/ Broadcast",
      width: "col-span-6",
      filterable: true,
    },
  ];

  const data = [
    {
      id: 1,
      location: "Zaria - Kaduna State",
      code: "243221",
      message:
        "Lorem ipsum dolor sit amet consectetur. Viverra duis vel non sed nunc quam fringilla. Mauris gravida quis pellentesque pellentesque consectetur urna vel. Diam faucibus rhoncus vitae euismod cras porttitor. Tincidunt quisque sodales sem magna. Eros integer ultricies integer nulla et et nulla velit risus. Pulvinar in donec id gravida...",
    },
    {
      id: 2,
      location: "Zaria - Kaduna State",
      code: "243221",
      message:
        "Lorem ipsum dolor sit amet consectetur. Viverra duis vel non sed nunc quam fringilla. Mauris gravida quis pellentesque pellentesque consectetur urna vel. Diam faucibus rhoncus vitae euismod cras porttitor. Tincidunt quisque sodales sem magna. Eros integer ultricies integer nulla et et nulla velit risus. Pulvinar in donec id gravida...",
    },
    {
      id: 3,
      location: "Lagos - Lagos State",
      code: "100001",
      message:
        "Lorem ipsum dolor sit amet consectetur. Viverra duis vel non sed nunc quam fringilla. Mauris gravida quis pellentesque pellentesque consectetur urna vel. Diam faucibus rhoncus vitae euismod cras porttitor. Tincidunt quisque sodales sem magna. Eros integer ultricies integer nulla et et nulla velit risus. Pulvinar in donec id gravida...",
    },
    {
      id: 4,
      location: "Abuja - FCT",
      code: "900108",
      message:
        "Lorem ipsum dolor sit amet consectetur. Viverra duis vel non sed nunc quam fringilla. Mauris gravida quis pellentesque pellentesque consectetur urna vel. Diam faucibus rhoncus vitae euismod cras porttitor. Tincidunt quisque sodales sem magna. Eros integer ultricies integer nulla et et nulla velit risus. Pulvinar in donec id gravida...",
    },
    {
      id: 5,
      location: "Zaria - Kaduna State",
      code: "243221",
      message:
        "Lorem ipsum dolor sit amet consectetur. Viverra duis vel non sed nunc quam fringilla. Mauris gravida quis pellentesque pellentesque consectetur urna vel. Diam faucibus rhoncus vitae euismod cras porttitor. Tincidunt quisque sodales sem magna...",
    },
  ];

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleCreateNew = () => setModalOpen(true);

  const handleModalClose = () => setModalOpen(false);

  const handleModalSubmit = (message: string) => {
    console.log("New message:", message);
    setModalOpen(false);
  };

  const customActions = (
    <button className="text-gray-500 hover:text-gray-700">
      <Trash size={18} />
    </button>
  );

  return (
    <div>
      <CreateMessageModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
      <div>
        <h2 className="font-semibold">Messages</h2>
        <p className="text-[#71717A] dark:text-[#5a5a5f]">
          Here’s a list of your messages for this month
        </p>
      </div>
      <div>
        <div className="flex justify-end mb-4">
          <Button onClick={handleCreateNew}>Create New</Button>
        </div>
        <div>
          <CustomTable columns={columns} data={data} actions={customActions} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
