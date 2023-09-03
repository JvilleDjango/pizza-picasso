import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { removeToast } from "@redux/snack-bar/snack-bar.reducer";
import { selectSnackbar } from "@redux/snack-bar/snack-bar.selectors";

import { useDispatch, useSelector } from "react-redux";
let displayed = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const snacks = useSelector(selectSnackbar);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const isFunction = (functionToCheck) =>
  //   functionToCheck &&
  //   {}.toString.call(functionToCheck) === "[object Function]";

  // const getAction = (action, variant, key) => {
  //   if (isFunction(action)) {
  //     return action(variant, key);
  //   }
  //   return variant === "error" ? (
  //     <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
  //   ) : (
  //     ""
  //   );
  // };

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  useEffect(() => {
    snacks.forEach(
      ({
        key,
        message,
        options: { variant, action } = {},
        options = {},
        dismissed = false,
      }) => {
        if (dismissed) {
          closeSnackbar(key);
          return;
        }

        // // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        enqueueSnackbar(message, {
          key,
          ...options,
          preventDuplicate: true,
          // action: () => getAction(action, variant, key),
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            dispatch(removeToast(myKey));
            removeDisplayed(myKey);
          },
        });
        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [snacks, closeSnackbar, enqueueSnackbar, removeToast]);
};

export default Notifier;
