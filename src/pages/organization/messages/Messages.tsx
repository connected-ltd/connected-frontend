import React from "react";
import { Button } from "@/components/ui/button";
import CustomTable from "@/custom-components/CustomTable";
import { Trash } from "lucide-react";
import CreateMessageModal from "@/components/ui/CreateMessageModal";
import { useGetMessagesQuery } from "../organization-api/messagesApiSlice";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

const Messages = () => {
  const { data: messages, isLoading: isFetchingMessages } =
    useGetMessagesQuery();
  const columns = [
    // {
    //   key: "location",
    //   header: "Location",
    //   width: "col-span-2",
    //   filterable: true,
    // },
    // { key: "code", header: "Code", width: "col-span-2", filterable: true },
    {
      key: "message",
      header: "Message/ Broadcast",
      width: "col-span-6",
      filterable: true,
    },
  ];

  const [modalOpen, setModalOpen] = React.useState(false);

  const handleCreateNew = () => setModalOpen(true);

  const handleModalClose = () => setModalOpen(false);

  const customActions = (
    <button className="text-gray-500 hover:text-gray-700">
      <Trash size={18} />
    </button>
  );

  return (
    <div className="overflow-scroll">
      <CreateMessageModal open={modalOpen} onClose={handleModalClose} />
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
              <div className="min-w-6xl">
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
