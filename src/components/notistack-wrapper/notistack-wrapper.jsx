import React from "react";
import "./notistack-wrapper.styles.scss";

import { SnackbarProvider, useSnackbar } from "notistack";
import Notifier from "./notifier";

const NotiStackWrapper = ({ children }) => {
  const { closeSnackbar: closeSnackbarNotistack } = useSnackbar();

  const handleDismiss = (key) => {
    closeSnackbarNotistack(key);
  };

  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      onExited={handleDismiss}
      className="notistack-wrapper"
    >
      <Notifier />
      {children}
    </SnackbarProvider>
  );
};

export default NotiStackWrapper;
