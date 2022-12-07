"use client";
import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#ed2a54", // This is an orange looking color
    },
    secondary: {
      main: "#ed2a54", //Another orange-ish color
    },
  },
  // fontFamily: font, // as an aside, highly recommend importing roboto font for Material UI projects! Looks really nice
});
