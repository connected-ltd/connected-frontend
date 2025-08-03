import React from "react";
import { Button } from "@/components/ui/button";
import CustomTable from "@/custom-components/CustomTable";
import { Trash } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { useGetFilesQuery } from "../organization-api/filesApiSlice";
import AddFileModal from "@/components/ui/AddFileModal";

const Files = () => {
  const { data: files, isLoading: isFetchingMessages } = useGetFilesQuery();
  const columns = [
    // {
    //   key: "location",
    //   header: "Location",
    //   width: "col-span-2",
    //   filterable: true,
    // },
    // { key: "code", header: "Code", width: "col-span-2", filterable: true },
    {
      key: "name",
      header: "File Name",
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
    <div>
      <AddFileModal open={modalOpen} onClose={handleModalClose} />
      <div>
        <h2 className="font-semibold">Files</h2>
        <p className="text-[#71717A] dark:text-[#5a5a5f]">
          Here's a list of all files you've added.
        </p>
      </div>
      <div>
        <div className="flex justify-end mb-4">
          <Button onClick={handleCreateNew}>Create New</Button>
        </div>

        <div>
          {files && files?.data.length === 0 ? (
            <EmptyState
              header="No files added"
              message="You haven't added any file yet."
            />
          ) : (
            <CustomTable
              columns={columns}
              data={files?.data ?? []}
              actions={customActions}
              isFetching={isFetchingMessages}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Files;
