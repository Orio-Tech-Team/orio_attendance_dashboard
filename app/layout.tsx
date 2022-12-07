"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./styles/globals.scss";

import { theme } from "./themes/theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <body>{children}</body>
      </ThemeProvider>
    </html>
  );
}
