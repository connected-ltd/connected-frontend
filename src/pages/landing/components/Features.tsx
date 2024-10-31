import { Box, Grid2, Typography } from "@mui/material";
import smsIcon from "../../../assets/icons/sms-icon.svg";
import monitorIcon from "../../../assets/icons/monitor-icon.svg";
import questionIcon from "../../../assets/icons/question-icon.svg";
import contentIcon from "../../../assets/icons/content-icon.svg";

const Features = () => {
  return (
    <Box sx={{ marginTop: "5em" }}>
      <Box id="services">
        <Typography variant="h3" sx={{ fontSize: "2.5rem", fontWeight: 800 }}>
          Our <span style={{ color: "#2085BE" }}>Features</span>
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: "1rem", margin: "1em 0", lineHeight: "30px" }}
        >
          ConnectED offers the following features to enhance the knowledge and
          connectivity of its users
        </Typography>
        <Box>
          <Grid2 container spacing={2}>
            {featureCards.map((card) => (
              <Grid2 size={6} key={card.id}>
                <Box
                  sx={{
                    backgroundColor: "#025692",
                    padding: "2.5em",
                    borderRadius: "24px",
                    display: "flex",
                    alignItems: "start",
                    gap: 2,
                    height: "100%",
                  }}
                >
                  <Box sx={{ width: "9em" }}>
                    <img src={card.icon} style={{ width: "100%" }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "1.3rem",
                        lineHeight: "30px",
                        fontWeight: 700,
                        marginBottom: "1em",
                        textTransform: "uppercase",
                        color: "#fff",
                      }}
                    >
                      {card.label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "1rem",
                        lineHeight: "22px",
                        color: "#fff",
                      }}
                    >
                      {card.text}
                    </Typography>
                  </Box>
                </Box>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
};

const featureCards = [
  {
    id: 1,
    icon: smsIcon,
    label: "Sms Services",
    text: `An SMS service that allows citizens to receive and reply to the content
         via text messages, ensuring that even those in remote, rural areas with limited internet access can stay informed.`,
  },
  {
    id: 2,
    icon: monitorIcon,
    label: "Monitoring & evaluation",
    text: `A system that monitors and evaluates the performance and
         impact of the platform, providing insights and feedback to improve the service quality and user satisfaction.`,
  },
  {
    id: 3,
    icon: questionIcon,
    label: "Question Answering",
    text: `An AI-powered feature that enables citizens to ask questions 
        and get personalized answers from the uploaded documents, improving the communication and feedback loop between information providers and citizens.`,
  },
  {
    id: 4,
    icon: contentIcon,
    label: "CONTENT management",
    text: `A web-based platform that allows information providers to upload and
         manage their content on various topics, such as agriculture, education, finance, health, and more.`,
  },
];

export default Features;
