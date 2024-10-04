import { Modal, Box, Typography } from "@mui/material";
import { Resource } from "../types/resource.types";

type ResourceProps = {
  open: boolean;
  handleClose: () => void;
  resource: Resource | null;
};

const ResourcePreviewModal = ({
  open,
  handleClose,
  resource,
}: ResourceProps) => {
  const renderContent = () => {
    if (!resource) return <Typography>No resource selected</Typography>;

    switch (resource.type) {
      case "image":
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={resource.url}
              alt={resource.name}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
              }}
            />
          </Box>
        );
      case "video":
        return (
          <video
            src={resource.url}
            controls
            style={{ maxWidth: "100%", maxHeight: "80vh" }}
          />
        );
      case "pdf":
        return (
          <>
            <Typography
              variant="h3"
              sx={{ color: "#fff", textAlign: "center" }}
            >
              Loading
            </Typography>
            <iframe
              src={resource.url}
              title={resource.name}
              width="100%"
              height="80vh"
            />
          </>
        );
      default:
        return <p>Unsupported file type</p>;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          //   backgroundColor: "#fff",
          //   padding: "2.5em",
          //   borderRadius: "24px",
          width: { xs: "90%", sm: "70%", md: "55vw" },
          maxWidth: { xs: "75vw", md: "55vw" },
        }}
      >
        {/* <IconButton onClick={handleClose}>
          <Close />
        </IconButton> */}
        {renderContent()}
      </Box>
    </Modal>
  );
};

export default ResourcePreviewModal;
