import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomTable from "@/custom-components/CustomTable";
import { Trash } from "lucide-react";
import CreateMessageModal from "@/components/ui/CreateMessageModal";
import { useGetMessagesQuery } from "../organization-api/messagesApiSlice";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import DeleteItemModal from "@/components/ui/DeleteItemModal";
import { Message } from "@/types/messages.types";

const Messages = () => {
  const { data: messages, isLoading: isFetchingMessages } =
    useGetMessagesQuery();
  const columns = [
    {
      key: "area",
      header: "Location",
      width: "col-span-3",
      filterable: true,
    },
    {
      key: "message",
      header: "Message/ Broadcast",
      width: "col-span-6",
      filterable: true,
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const handleCreateNew = () => setModalOpen(true);
  const handleDeleteMessageModal = (message: Message) => {
    setSelectedMessage(message);
    setDeleteModal(true);
  };

  const handleModalClose = () => setModalOpen(false);
  const handleCloseDeleteMessageModal = () => setDeleteModal(false);

  const handleDeleteMessage = (message: Message) => {
    if (message) {
      console.log("Delete message id:", message);
    } else {
      console.log("No message selected");
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customActions = (row: any) => (
    <button
      className="text-gray-500 hover:text-gray-700"
      onClick={() => handleDeleteMessageModal(row)}
    >
      <Trash size={18} />
    </button>
  );

  return (
    <div>
      <CreateMessageModal open={modalOpen} onClose={handleModalClose} />
      <DeleteItemModal
        open={deleteModal}
        onClose={handleCloseDeleteMessageModal}
        handlSubmit={handleDeleteMessage}
        isLoading={false}
        message={selectedMessage}
      />
      <PageHeader
        header={"Messages"}
        subHeader={"Here's a list of all your messages."}
      />
      <div>
        <div className="flex justify-end mb-4">
          <Button onClick={handleCreateNew}>Create New</Button>
        </div>

        <div>
          {messages && messages?.data.length === 0 ? (
            <EmptyState
              header="No Messages Found"
              message="You haven't created any messages yet."
            />
          ) : (
            <div className="overflow-x-auto">
              <div>
                <CustomTable
                  columns={columns}
                  data={messages?.data ?? []}
                  actions={customActions}
                  isFetching={isFetchingMessages}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
