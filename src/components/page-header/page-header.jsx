import React, { useEffect, useState } from "react";
import "./page-header.styles.scss";
import { useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

import AccountMenu from "../account-menu";
import Header from "../header";
import MobileMenu from "../navigation/mobile-menu";

const PageHeader = ({ headers }) => {
  const location = useLocation();
  const { pathname } = location;
  const [currentPage, setCurrentPage] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <div className="page-header-left">
        {windowWidth <= 768 ? (
          <>
            <MobileMenu menu={headers} />
            <Header />
          </>
        ) : null}
        {currentPage ? (
          <>
            <Typography variant="h4" gutterBottom>
              {currentPage.pageHeader}
            </Typography>
            <Typography variant="body2">{currentPage.pageSubHeader}</Typography>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="page-header-right">
        <AccountMenu />
      </div>
    </div>
  );
};

export default PageHeader;
