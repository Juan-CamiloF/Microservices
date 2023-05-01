import React, { lazy } from "react";

import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import NotFound from "../pages/NotFound";

const RoutesWithNotFound = ({ children }) => {
  return (
    <>
      <Routes>
        {children}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default RoutesWithNotFound;
