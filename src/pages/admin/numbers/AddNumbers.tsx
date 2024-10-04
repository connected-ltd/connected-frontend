import {
  Box,
  CircularProgress,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { ArrowRightAlt } from "@mui/icons-material";
import { useState } from "react";
import { NumbersInput } from "../../../types/number.types";
import { useCreateNumbersMutation, useGetAreasQuery } from "../statsApiSlice";
import CustomSuccessModal from "../../../custom-components/CustomSuccessModal";
import { FilledButton } from "../../../custom-components/styled/styledButtons";
import { StyledTextField } from "../../../custom-components/styled/styledInputs";

const AddNumbers = () => {
  const [openSuccess, setOpenSuccess] = useState(false);
  const [createNumber, { isLoading: isCreatingNumber }] =
    useCreateNumbersMutation();

  const formik = useFormik<NumbersInput>({
    initialValues: {
      number: "",
      language: "",
      area_id: "",
    },
    validationSchema: yup.object({
      number: yup.string().required("Required"),
      language: yup.string().required("Required"),
      area_id: yup.number().required("Required"),
    }),
    onSubmit: async (values: NumbersInput) => {
      try {
        await createNumber(values).unwrap();
        setOpenSuccess(true);
      } catch (error: unknown) {
        console.error(error);
      }
    },
  });

  const { data: areas, isLoading: isFetchingAreas } = useGetAreasQuery();

  //   const { data: numbers, isFetching: isFetchingNumbers } = useGetNumbersQuery();

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      {/* modals */}
      <CustomSuccessModal
        open={openSuccess}
        handleClose={() => setOpenSuccess(false)}
        message="The number has been added successfully"
        viewButton={false}
        handleClickView={() => setOpenSuccess(false)}
      />
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              id="area_id"
              sx={{
                fontSize: ".75rem",
                fontWeight: 400,
                color: "#000000",
                marginBottom: ".5em",
              }}
            >
              Area
            </InputLabel>
            <Select
              id="area_id"
              name="area_id"
              labelId="area_id"
              value={formik.values.area_id}
              onChange={formik.handleChange}
              placeholder="area_id"
              fullWidth
              label="area_id"
              sx={{
                backgroundColor: "#F9F9F9",
                borderRadius: "12px",
                cursor: isFetchingAreas ? "progress" : "pointer",
                textTransform: "capitalize",
              }}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select Area
              </MenuItem>
              {areas?.data.map((area) => (
                <MenuItem
                  value={area.id}
                  key={area.id}
                  sx={{ textTransform: "capitalize" }}
                >
                  {area.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              id="language"
              sx={{
                fontSize: ".75rem",
                fontWeight: 400,
                color: "#000000",
                marginBottom: ".5em",
              }}
            >
              Language
            </InputLabel>
            <Select
              id="language"
              name="language"
              labelId="language"
              value={formik.values.language}
              onChange={formik.handleChange}
              placeholder="Language"
              fullWidth
              label="language"
              sx={{
                backgroundColor: "#F9F9F9",
                borderRadius: "12px",
                // cursor: isFetchingSubjects ? "progress" : "pointer",
              }}
            >
              <MenuItem value="" disabled>
                Select Language
              </MenuItem>
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="hausa">Hausa</MenuItem>
              <MenuItem value="igbo">Igbo</MenuItem>
              <MenuItem value="yoruba">Yoruba</MenuItem>
            </Select>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 8 }}>
          <Box sx={{ width: "100%" }}>
            <InputLabel
              id="number"
              sx={{
                fontSize: ".75rem",
                fontWeight: 400,
                color: "#000000",
                marginBottom: ".5em",
              }}
            >
              Number
            </InputLabel>
            <StyledTextField
              id="number"
              name="number"
              //   label="Number"
              value={formik.values.number}
              onChange={formik.handleChange}
              placeholder="+234........."
              //   fullWidth
            />
          </Box>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 8 }}>
          <FilledButton
            type="submit"
            sx={{ width: "179px", fontWeight: 400, mx: "auto", mt: 8 }}
            disabled={isCreatingNumber}
          >
            {isCreatingNumber ? (
              <>
                Loading
                <CircularProgress size="small" />
              </>
            ) : (
              <>
                Complete <ArrowRightAlt sx={{ ml: 1 }} />
              </>
            )}
          </FilledButton>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default AddNumbers;
