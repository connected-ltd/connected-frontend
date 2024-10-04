/// <reference types="node" />

import * as React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface CustomProgressProps {
  loading: boolean;
  uploadComplete: boolean; // Include uploadComplete prop
}

const LinearProgressWithLabel: React.FC<
  LinearProgressProps & { value: number }
> = (props) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Box sx={{ width: "100%", mr: 1 }}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography variant="body2" color="text.secondary">{`${Math.round(
        props.value
      )}%`}</Typography>
    </Box>
  </Box>
);

const CustomProgress: React.FC<CustomProgressProps> = ({
  loading,
  uploadComplete,
}) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    const increaseProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 5;
      });
    };

    if (loading && !uploadComplete) {
      // Check if both loading and uploadComplete are true
      timer = setInterval(increaseProgress, 800);
    } else {
      clearInterval(timer);
      if (uploadComplete) {
        // If upload is complete, set progress to 100%
        setProgress(100);
      }
    }

    return () => clearInterval(timer);
  }, [loading, uploadComplete]); // Include uploadComplete in the dependency array

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgressWithLabel value={progress} sx={{ height: "30px" }} />
    </Box>
  );
};

export default CustomProgress;
