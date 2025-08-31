import { Button } from "@/components/ui/button";
import CustomTable from "@/custom-components/CustomTable";
import EmptyState from "@/components/ui/EmptyState";
import { useGetFilesQuery } from "../organization-api/filesApiSlice";
import AddFileModal from "@/components/ui/AddFileModal";
import PageHeader from "@/components/ui/PageHeader";
import { useState } from "react";

const Files = () => {
  const { data: files, isLoading: isFetchingMessages } = useGetFilesQuery();
  const columns = [
    // {
    //   key: "location",
    //   header: "Location",
    //   width: "col-span-2",
    //   filterable: true,
    // },
    {
      key: "name",
      header: "File Name",
      width: "col-span-6",
      filterable: true,
    },
    { key: "shortcode", header: "Code", width: "col-span-2", filterable: true },
  ];

  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateNew = () => setModalOpen(true);

  const handleModalClose = () => setModalOpen(false);

  // const customActions = (
  //   <button className="text-gray-500 hover:text-gray-700">
  //     <Trash size={18} />
  //   </button>
  // );

  return (
    <div>
      <AddFileModal open={modalOpen} onClose={handleModalClose} />
      <PageHeader
        header={"Files"}
        subHeader={"Here's a list of all files you've added."}
      />
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
            <div className="overflow-x-auto">
              <div>
                <CustomTable
                  columns={columns}
                  data={files?.data ?? []}
                  // actions={customActions}
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

export default Files;
