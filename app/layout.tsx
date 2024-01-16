"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import "./styles/globals.scss";
import 'react-toastify/dist/ReactToastify.css';

import { theme } from "./themes/theme";
import { ToastContainer } from "react-toastify";

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
        <body>
          <ToastContainer/>
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
