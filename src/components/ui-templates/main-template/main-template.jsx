import React from "react";
import "./main-template.styles.scss";
import { Outlet } from "react-router-dom";

import Navigation from "../../navigation";
import PageHeader from "../../page-header";
import Header from "../../header";

const MainTemplate = ({ navigation, children }) => {
  
  return (
    <section className="main-template">
      <header className="header-content">
        <PageHeader headers={navigation} />

        {children ? children : null}
      </header>

      <aside className="left-content sub-navigation">
        <Header />
        <Navigation menu={navigation} />
      </aside>
      <aside className="right-content">
        <Outlet />
      </aside>
    </section>
  );
};

export default MainTemplate;
