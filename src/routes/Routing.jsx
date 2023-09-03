import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import TEMPLATE_CONFIG from "../configs/template.config";
import MainLayout from "../layouts/main-layout";
import MainTemplate from "../components/ui-templates";

import PizzaAdmin from "../pages/pizza-admin";
import PizzaManager from "../pages/pizza-manager";

const Routing = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<MainTemplate {...TEMPLATE_CONFIG} />}>
          <Route path="/" element={<Navigate to="/pizza-admin" />} />
          <Route path="/pizza-admin" element={<PizzaAdmin />} />
          <Route path="/pizza-manager" element={<PizzaManager />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Routing;
