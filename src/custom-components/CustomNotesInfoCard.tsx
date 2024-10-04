// import { Share } from "@mui/icons-material";
import { Delete, Edit, Share } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";

type Props = {
  icon: string;
  title: string;
  details: string;
  date: string;
  handleShare: () => void;
  handleDelete: () => void;
  handlePreview: () => void;
};

const CustomNotesInfoCard = ({
  icon,
  title,
  details,
  date,
  handleShare,
  handleDelete,
  handlePreview,
}: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: { xs: "1.3em .7em", md: "1.3em 2.5em" },
        backgroundColor: "#fff",
        width: "100%",
        border: "1px solid #DAD9D7",
        borderRadius: "11px",
        marginBottom: ".7em",
        gap: 1,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ width: "2.6em", minWidth: { xs: "1.8em", md: "2.4em" } }}>
          <img src={icon} alt="" style={{ width: "100%" }} />
        </Box>
        <Box sx={{ margin: { xs: "0.4em 0", md: "0 1em" } }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#1E1E1E",
              textTransform: "capitalize",
            }}
          >
            {title}{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: ".75rem", md: "1.13rem" },
              fontWeight: 400,
              color: "#555555",
              margin: ".4em 0",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {details}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontSize: { xs: ".75rem", md: "1rem" },
              fontWeight: 400,
              color: "#9A9A9A",
            }}
          >
            {date}{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#F6F5F4",
          padding: ".3em",
          borderRadius: "6px",
        }}
      >
        <IconButton
          sx={{
            fontSize: ".7em",
            padding: ".4em",
            color: "#95969D",
            "&:hover": {
              backgroundColor: "#F6F5F4",
            },
          }}
          onClick={handlePreview}
        >
          <Edit />
        </IconButton>

        <IconButton
          sx={{
            fontSize: ".7em",
            padding: ".4em",
            color: "#95969D",
            "&:hover": {
              backgroundColor: "#F6F5F4",
            },
          }}
          onClick={handleDelete}
        >
          <Delete />
        </IconButton>

        <IconButton
          sx={{
            fontSize: ".7em",
            padding: ".4em",
            color: "#95969D",
            "&:hover": {
              backgroundColor: "#F6F5F4",
            },
          }}
          onClick={handleShare}
        >
          <Share />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomNotesInfoCard;
