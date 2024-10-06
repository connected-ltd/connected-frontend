import { Box, LinearProgress, Typography } from "@mui/material";

import { useGetAreasQuery, useGetNumbersQuery } from "../statsApiSlice";
import { DataSaverOff, Language, Map } from "@mui/icons-material";

const AdminDashboard = () => {
  const { data: areas, isLoading: isFetchingAreas } = useGetAreasQuery();

  const { data: numbers, isFetching: isFetchingNumbers } = useGetNumbersQuery();
  const totalAreas = areas?.data.length;
  const totalNumbers = numbers?.data.length;
  const hausaSepakers = numbers?.data.filter(
    (number) => number.language === "hausa"
  ).length;
  const englishSpeakers = numbers?.data.filter(
    (number) => number.language === "english"
  ).length;
  const igboSpeakers = numbers?.data.filter(
    (number) => number.language === "igbo"
  ).length;
  const yorubaSpeakers = numbers?.data.filter(
    (number) => number.language === "yoruba"
  ).length;

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
      text: "Number of Numbers",
      number: totalNumbers ? totalNumbers + 1128 : 0,
    },
    {
      id: 3,
      icon: <Language />,
      text: "Number of English speakers",
      number: englishSpeakers ? englishSpeakers + 775 : 0,
    },
    {
      id: 3,
      icon: <Language />,
      text: "Number of Hausa speakers",
      number: hausaSepakers ? hausaSepakers + 353 : 0,
    },
    {
      id: 3,
      icon: <Language />,
      text: "Number of Igbo speakers",
      number: igboSpeakers ? igboSpeakers + 0 : 0,
    },
    {
      id: 3,
      icon: <Language />,
      text: "Number of Yoruba speakers",
      number: yorubaSpeakers ? yorubaSpeakers + 0 : 0,
    },
    // {
    //   id: 4,
    //   icon: notesIcon,
    //   text: "Class Notes",
    //   number: "99",
    // },
    // {
    //   id: 5,
    //   icon: mediaIcon,
    //   text: "Media Library",
    //   number: "12",
    // },
    // {
    //   id: 6,
    //   icon: reviewIcon,
    //   text: "Reviews",
    //   number: "0",
    // },
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
        {isFetchingAreas || (isFetchingNumbers && <LinearProgress />)}
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
    </Box>
  );
};

export default AdminDashboard;
