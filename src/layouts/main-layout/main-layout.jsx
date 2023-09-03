import React from "react";
import "./main-layout.styles.scss";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <section className="main-layout">
      <Outlet />
    </section>
  );
}

export default MainLayout;
