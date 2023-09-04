import React, { useEffect, useState } from "react";
import "./page-header.styles.scss";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

import AccountMenu from "../account-menu"

const PageHeader = ({ headers }) => {
  const location = useLocation();
  const { pathname } = location;
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    const updatePageHeader = () => {
      const currRoute = pathname.split("/").filter(Boolean).pop();
      const page = headers.find((r) => r.route === `/${currRoute}`);

      if (page) {
        setCurrentPage(page);
      }
    };

    updatePageHeader();
  }, [headers, pathname]);

  return (
    <div className="page-header">
      {currentPage ? (
        <div className="page-header-left">
          <Typography variant="h4" gutterBottom>
            {currentPage.pageHeader}
          </Typography>
          <Typography variant="body2">{currentPage.pageSubHeader}</Typography>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="page-header-right">
        <AccountMenu />
      </div>
    </div>
  );
};

export default PageHeader;
