import { LinearProgress } from "@mui/material";
import {
  useGetAreasQuery,
  useGetNumbersStatsQuery,
} from "../admin-api/statsApiSlice";
import NumbersTable from "./component/NumbersTable";

const AdminDashboard = () => {
  const { data: areas, isLoading: isFetchingAreas } = useGetAreasQuery();
  const { data: numberStats, isLoading: isFetchingNumberStats } =
    useGetNumbersStatsQuery();

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
      <NumbersTable />
    </div>
  );
};

export default AdminDashboard;
