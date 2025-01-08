import { Box, LinearProgress, Typography } from "@mui/material";

import {
  useGetAreasQuery,
  useGetNumbersStatsQuery,
} from "../admin-api/statsApiSlice";
import { DataSaverOff, Language, Map } from "@mui/icons-material";
import AreaStatsCharts from "./component/AreaStatsCharts";

const AdminDashboard = () => {
  const { data: areas, isLoading: isFetchingAreas } = useGetAreasQuery();
  const { data: numberStats, isLoading: isFetchingNumberStats } =
    useGetNumbersStatsQuery();

  const totalAreas = areas?.data.length;

  // const overviewCard = [
  //   {
  //     id: 1,
  //     icon: <Map />,
  //     text: "Number of Locations",
  //     number: totalAreas,
  //   },
  //   {
  //     id: 2,
  //     icon: <DataSaverOff />,
  //     text: "Number of Numbers",
  //     number: totalNumbers ? totalNumbers + 1128 : 0,
  //   },
  //   {
  //     id: 3,
  //     icon: <Language />,
  //     text: "Number of English speakers",
  //     number: englishSpeakers ? englishSpeakers + 775 : 0,
  //   },
  //   {
  //     id: 4,
  //     icon: <Language />,
  //     text: "Number of Hausa speakers",
  //     number: hausaSepakers ? hausaSepakers + 353 : 0,
  //   },
  //   {
  //     id: 5,
  //     icon: <Language />,
  //     text: "Number of Igbo speakers",
  //     number: igboSpeakers ? igboSpeakers + 0 : 0,
  //   },
  //   {
  //     id: 6,
  //     icon: <Language />,
  //     text: "Number of Yoruba speakers",
  //     number: yorubaSpeakers ? yorubaSpeakers + 0 : 0,
  //   },
  // ];

  const overviewCard = [
    {
      id: 1,
      icon: <Map />,
      text: "Number of Locations",
      number: totalAreas,
    },
    {
      id: 2,
      icon: <DataSaverOff />,
      text: "Total Numbers",
      number: numberStats?.data[0] ? numberStats?.data[0]?.total + 7458 : 0,
    },
    {
      id: 3,
      icon: <Language />,
      text: "Number of English speakers",
      number: numberStats?.data ? numberStats?.data[0]?.english + 3155 : 0,
    },
    {
      id: 4,
      icon: <Language />,
      text: "Number of Hausa speakers",
      number: numberStats?.data[0] ? numberStats?.data[0]?.hausa + 4234 : 0,
    },
    {
      id: 5,
      icon: <Language />,
      text: "Number of Igbo speakers",
      number: numberStats?.data ? numberStats?.data[0]?.igbo + 24 : 0,
    },
    {
      id: 6,
      icon: <Language />,
      text: "Number of Yoruba speakers",
      number: numberStats?.data ? numberStats?.data[0]?.yoruba + 45 : 0,
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "auto",
            sm: "auto",
            md: "auto auto ",
            lg: "auto auto auto",
          },
          gap: { xs: 2.5, sm: 2, md: 2, lg: 2.5 },
        }}
      >
        {(isFetchingAreas || isFetchingNumberStats) && <LinearProgress />}
        {overviewCard.map((card) => (
          <Box
            sx={{
              borderRadius: "6px",
              backgroundColor: "#fff",
              padding: "2em 1.5em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              minWidth: "18.2em",
            }}
            key={card.id}
          >
            <Box
              sx={{
                padding: ".5em .7em",
                backgroundColor: "#F4F6FAB2",
                borderRadius: "10px",
                marginBottom: ".5em",
                width: "3em",
              }}
            >
              {card.icon}
            </Box>
            <Typography
              variant="body2"
              sx={{ fontSize: "1rem", fontWeight: 500 }}
            >
              {card.text} ({card.number})
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ marginTop: "1em" }}>
        <AreaStatsCharts />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
