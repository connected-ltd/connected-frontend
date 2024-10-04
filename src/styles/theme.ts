import { createTheme } from "@mui/material/styles";

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

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryColor,
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
