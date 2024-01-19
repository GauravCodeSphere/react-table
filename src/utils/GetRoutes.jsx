import React from "react";
import { Route } from "react-router";

export const getRoutes = (routes) => {
  return routes.map(({ path, component: Component }, key) => {
    return <Route path={path} element={<Component />} key={key} />;
  });
};
