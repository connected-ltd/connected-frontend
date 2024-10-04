import { Box, Modal, Typography } from "@mui/material";
import { FilledButton } from "./styled/styledButtons";
import recentShared from "../assets/icons/recent-shared.svg";
import deletedModalIcon from "../assets/icons/deleted-modal.svg";

type NoteModalsProps = {
  openModal: boolean;
  deletedModal: boolean;
  handleCloseModal: () => void;
  handleCloseDeletedModal: () => void;
  handleDelete: () => void;
  isDeletingNote: boolean;
  note: {
    topic: string;
    updated_at: string;
  };
  formatDate: (date: string) => string;
};

const CustomDeleteModal = ({
  openModal,
  deletedModal,
  handleCloseModal,
  handleCloseDeletedModal,
  handleDelete,
  isDeletingNote,
  note,
  formatDate,
}: NoteModalsProps) => {
  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "2.5em",
            borderRadius: "24px",
            width: { xs: "90%", sm: "70%", md: "55vw" },
            maxWidth: { xs: "75vw", md: "55vw" },
          }}
        >
          <Box
            sx={{
              backgroundColor: "#F9F9F9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "1em 0",
              borderRadius: "21px",
            }}
          >
            <Box sx={{ width: "2.6em", minWidth: "2.4em" }}>
              <img src={recentShared} alt="" style={{ width: "100%" }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: ".9rem", md: "1.25rem" },
                fontWeight: 700,
                color: "#1E1E1E",
                margin: ".3em 0",
              }}
            >
              {note?.topic}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: ".75rem", md: ".9rem" },
                fontWeight: 400,
                color: "#9A9A9A",
              }}
            >
              {formatDate(note?.updated_at)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "1.5em",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "1rem", md: "1.25rem" },
                fontWeight: 700,
                color: "#1E1E1E",
              }}
            >
              Confirmation
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: ".75rem", md: ".9rem" },
                fontWeight: 400,
                color: "#95969D",
                marginTop: "1em",
                marginBottom: "1.5em",
                textAlign: "center",
              }}
            >
              Are you sure you want to delete this note?
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <FilledButton
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  fontSize: ".8rem",
                  letterSpacing: "1px",
                  width: { xs: "10em", md: "17em" },
                }}
                disabled={isDeletingNote}
                onClick={handleDelete}
              >
                {isDeletingNote ? "Deleting..." : "Delete"}
              </FilledButton>
              <FilledButton
                sx={{
                  fontWeight: 600,
                  textTransform: "uppercase",
                  fontSize: ".8rem",
                  letterSpacing: "1px",
                  width: { xs: "10em", md: "17em" },
                }}
                onClick={handleCloseModal}
              >
                Cancel
              </FilledButton>
            </Box>
          </Box>
        </Box>
      </Modal>

      <Modal open={deletedModal} onClose={handleCloseDeletedModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            padding: "2.5em",
            borderRadius: "24px",
            width: { xs: "90%", md: "55vw" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box sx={{ width: "7.5em" }}>
              <img src={deletedModalIcon} alt="" style={{ width: "100%" }} />
            </Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#1E1E1E",
                marginTop: "1em",
              }}
            >
              Success
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: ".9rem",
                fontWeight: 400,
                color: "#95969D",
                marginTop: ".8em",
                textAlign: "center",
              }}
            >
              Your note has been deleted successfully!
            </Typography>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CustomDeleteModal;
