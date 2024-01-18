import React from "react";
import { Routes } from "react-router";
import { getRoutes } from "../../utils/getRoutes";
import { publicRoutes } from "../../routes";

const PublicLayout = () => {
  return (
    <div>
      <Routes>{getRoutes(publicRoutes)}</Routes>
    </div>
  );
};

export default PublicLayout;
