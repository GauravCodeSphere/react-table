import NotFound from "./pages/404";
import GroupedView from "./pages/GroupedView";
import Home from "./pages/Home";
import MaterialTableComponent from "./pages/MaterialTableComponent";


export const publicRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/demo",
    name: "MaterialTableComponent",
    component: MaterialTableComponent,
  },
  {
    path: "/demo2",
    name: "GroupedView",
    component: GroupedView,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

export const privateRoutes = [
  //   {
  //     path: "/",
  //     name: "Home",
  //     component: Home,
  //   },
  // {
  //   path: "*",
  //   name: "NotFound",
  //   component: NotFound,
  // },
];
