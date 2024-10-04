import {
  Box,
  Modal,
  Typography,
  IconButton,
  LinearProgress,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { FilledButton } from "./styled/styledButtons";
import { Close } from "@mui/icons-material";
import quizIcon from "../assets/icons/quiz-icon.svg";

type Props = {
  isLoading: boolean;
  isError: boolean;
  open: boolean;
  handleClose: () => void;
  score: string;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  handleViewSolutions: () => void;
};

const CustomResultModal = ({
  isLoading,
  isError,
  open,
  handleClose,
  score,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  handleViewSolutions,
}: Props) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          padding: "1.5em 2.5em",
          borderRadius: "24px",
          width: { xs: "90%", sm: "80%", md: "50%" },
          textAlign: "center",
        }}
      >
        {isLoading ? (
          <LinearProgress />
        ) : isError ? (
          <Box>
            <Typography variant="h6">
              Something went wrong! Please try again
            </Typography>
          </Box>
        ) : (
          <Box>
            <Box
              sx={{
                marginBottom: "3em",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                <Box sx={{ width: "2em" }}>
                  <img src={quizIcon} style={{ width: "100%" }} />
                </Box>
                <Typography variant="h6">Gratitude Quiz</Typography>
              </Box>
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
            <Box sx={{ position: "relative", display: "inline-flex", mb: 3 }}>
              <CircularProgress
                variant="determinate"
                value={parseInt(score)}
                size={150}
                thickness={5}
                sx={{ color: "#FCC21B" }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h4"
                  component="div"
                  sx={{ fontWeight: 700 }}
                >
                  {`${score}%`}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 1, mb: 1, fontWeight: 700 }}>
              You answered {totalQuestions} total questions.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, mb: 3, fontWeight: 700 }}>
              You got{" "}
              <span style={{ color: "#27AE60" }}>{correctAnswers} correct</span>{" "}
              and <span style={{ color: "#EC1E1E" }}>{wrongAnswers} wrong</span>
            </Typography>
            <FilledButton
              sx={{ fontSize: "0.85rem", padding: "1em 4em" }}
              onClick={handleViewSolutions}
            >
              VIEW SOLUTIONS
            </FilledButton>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default CustomResultModal;
