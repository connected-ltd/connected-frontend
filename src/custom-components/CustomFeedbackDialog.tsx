import Dialog from "@mui/material/Dialog";
import { Box, Rating, Stack, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import { FormControl } from "@mui/material";
import { useState } from "react";
import { StyledLoadingButton } from "./styled/styledButtons";
import { StyledTextArea } from "./styled/styledInputs";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../pages/auth/authSlice";
import { useCreateRecordMutation } from "./feedbackApiSlice";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const CustomFeedbackDialog = (props: Props) => {
  const user = useSelector(selectCurrentUser);
  const email = user?.creator?.email || user?.username || "no email found";

  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(0);

  const [createRecord, { isLoading: isCreatingRecord }] =
    useCreateRecordMutation();

  const handleSubmitFeedback = () => {
    const submissiondata = {
      base_id: import.meta.env.VITE_AIRTABLE_BASE_ID,
      table_id: import.meta.env.VITE_AIRTABLE_FEEDBACK_TABLE_ID,
      fields: {
        Email: email,
        Feedback: feedback,
        Rating: rating?.toString() || "",
      },
    };

    handleCreateRecord(submissiondata);
  };

  const handleCreateRecord = async (data: {
    base_id: string;
    table_id: string;
    fields: {
      Email: string;
      Feedback: string;
      Rating: string | number | null;
    };
  }) => {
    try {
      await createRecord(data).unwrap();
      alert("Thank you, your feedback will be reviewed.");
      props.handleClose();
    } catch (error) {
      alert("Couldn't submit feedback, please try again");
      console.log("error", error);
    }
  };

  const handleClose = () => {
    props.handleClose();
  };

  return (
    <Dialog fullWidth={true} open={props.open} onClose={handleClose}>
      <Stack width={"90%"} my={5} mx={"auto"} gap={3}>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Box flex={1}></Box>
          <Close
            onClick={handleClose}
            sx={{ alignSelf: "end", color: "grey", cursor: "pointer" }}
          />
        </Stack>

        <FormControl error fullWidth>
          <Typography>Rate your experience</Typography>
          <Rating
            size="large"
            value={rating}
            onChange={(_event, newVal) => {
              setRating(newVal);
            }}
            sx={{
              gap: "4px",
              "& label:not(:last-child)": {
                border: "1px solid",
                p: 0.5,
              },
            }}
          />
          <Typography variant="subtitle2" sx={{ color: "#9a9a9a" }}>
            click to select rating
          </Typography>
        </FormControl>

        <FormControl error fullWidth>
          <Typography>feedback</Typography>
          <StyledTextArea
            placeholder="Enter feedback here"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </FormControl>

        <StyledLoadingButton onClick={handleSubmitFeedback}>
          {isCreatingRecord ? "Loading" : "Submit"}
          Submit
        </StyledLoadingButton>
      </Stack>
    </Dialog>
  );
};

export default CustomFeedbackDialog;
