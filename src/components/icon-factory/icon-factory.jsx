import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPizzaSlice,
  faChartPie,
  faCheese,
} from "@fortawesome/free-solid-svg-icons";

function IconFactory({ iconName }) {
  const ICONS_MAP = {
    fapizzaslice: <FontAwesomeIcon icon={faPizzaSlice} />,
    fachartpie: <FontAwesomeIcon icon={faChartPie} />,
    facheese: <FontAwesomeIcon icon={faCheese} />,
  };

  const normalizedIconName = iconName?.toLowerCase();

  // Check if the icon exists in the ICONS_MAP object
  if (ICONS_MAP[normalizedIconName]) {
    return ICONS_MAP[normalizedIconName];
  }

  return null;
}

export default IconFactory;
