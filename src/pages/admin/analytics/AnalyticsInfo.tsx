import CustomTable from "@/custom-components/CustomTable";
import { Edit, Trash } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import InOutBarChart from "@/components/charts/InOutBarChart";

const AnalyticsInfo = () => {
  const columns = [
    { key: "id", header: "S/N", width: "col-span-1", filterable: true },
    { key: "name", header: "Name", width: "col-span-3", filterable: true },
    { key: "email", header: "Email", width: "col-span-3", filterable: true },
    { key: "role", header: "Role", width: "col-span-2", filterable: true },
    {
      key: "status",
      header: "Activity Status",
      width: "col-span-1",
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

  // sample values
  const labels = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thur"];
  const inData = [300, 310, 400, 620, 450, 470, 530];
  const outData = [410, 550, 700, 360, 640, 310, 650];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold">Analytics</h2>
        <p className="text-[#71717A] dark:text-[#5a5a5f]">
          Here's some analytics of messages sent.
        </p>
      </div>

      <InOutBarChart labels={labels} inData={inData} outData={outData} />

      <div className="bg-[#F6F5F4] dark:bg-[#A2C8E8] p-2 rounded-lg">
        {usersData && usersData.length === 0 ? (
          <EmptyState
            header="No Users Found"
            message="Users hasn't been added yet."
          />
        ) : (
          <CustomTable
            columns={columns}
            data={usersData ?? []}
            actions={customActions}
          />
        )}
      </div>
    </div>
  );
};

const usersData = [
  {
    id: 1,
    name: "Mubarak Ibrahim",
    email: "mubarak@email.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Amina Mustapha",
    email: "amina@email.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Aisha Muhammad",
    email: "aisha@email.com",
    role: "Member",
    status: "Active",
  },
  {
    id: 4,
    name: "Usman Ramalan",
    email: "usman@email.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 5,
    name: "Ibrahim Aliyu",
    email: "ibrahim@email.com",
    role: "Member",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Maryam Rabi'u",
    email: "maryam@email.com",
    role: "Member",
    status: "Active",
  },
];

export default AnalyticsInfo;
