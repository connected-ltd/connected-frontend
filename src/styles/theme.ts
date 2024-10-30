import { createTheme, PaletteMode } from "@mui/material/styles";

declare module "@mui/material/styles" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PaletteColor {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface SimplePaletteColorOptions {}

  interface TypographyVariants {
    inputLabel: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    inputLabel?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    inputLabel: true;
  }
}
//define primary color
const primaryColor = "#025692";
const primaryColorDark = "#1976d2";

export const createAppTheme = (mode: PaletteMode) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? primaryColor : primaryColorDark,
      },
      background: {
        default: mode === "light" ? "#ffffff" : "#14324C",
        paper: mode === "light" ? "#ffffff" : "#14324C",
      },
      text: {
        primary: mode === "light" ? "#1E1E1E" : "#FFFFFF",
        secondary: mode === "light" ? "red" : "rgba(255, 255, 255, 0.7)",
      },
    },
    typography: {
      fontFamily: ["Nunito", "sans-serif"].join(","),
      inputLabel: {
        fontSize: "12px",
        fontWeight: 400,
        lineHeight: "17px",
        letterSpacing: "0em",
        textTransform: "uppercase",
        marginBottom: "8px",
      },
    },
  });
};
