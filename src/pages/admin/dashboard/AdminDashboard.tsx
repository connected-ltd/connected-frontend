import { LinearProgress } from "@mui/material";
import {
  useGetAreasQuery,
  useGetNumbersQuery,
  useGetNumbersStatsQuery,
} from "../admin-api/statsApiSlice";
import EmptyState from "@/components/ui/EmptyState";
import CustomTable from "@/custom-components/CustomTable";
import { Edit, Trash } from "lucide-react";

const AdminDashboard = () => {
  const { data: areas, isLoading: isFetchingAreas } = useGetAreasQuery();
  const { data: numberStats, isLoading: isFetchingNumberStats } =
    useGetNumbersStatsQuery();
  const { data, isLoading } = useGetNumbersQuery();

  const totalAreas = areas?.data.length;

  const overviewCard = [
    {
      id: 1,
      text: "Total Users",
      number: numberStats?.data[0] ? numberStats?.data[0]?.total : 0,
    },
    {
      id: 2,
      text: "English Users",
      number: numberStats?.data ? numberStats?.data[0]?.english : 0,
    },
    {
      id: 3,
      text: "Hausa Users",
      number: numberStats?.data[0] ? numberStats?.data[0]?.hausa : 0,
    },
    {
      id: 4,
      text: "Igbo Users",
      number: numberStats?.data ? numberStats?.data[0]?.igbo : 0,
    },
    {
      id: 5,
      text: "Yoruba Users",
      number: numberStats?.data ? numberStats?.data[0]?.yoruba : 0,
    },
    {
      id: 6,
      text: "Total Locations",
      number: totalAreas || 0,
    },
  ];

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
      {(isFetchingAreas || isFetchingNumberStats) && (
        <LinearProgress className="my-1" />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {overviewCard.map((card) => (
          <div
            className="rounded-md bg-bg-primary border border-border-primary p-8 flex justify-center flex-col w-full"
            key={card.id}
          >
            <p className="text-lg text-text-primary">{card.text}</p>
            <h3 className="text-text-primary">{card.number}</h3>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h4>Users List</h4>
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
  );
};

export default AdminDashboard;
