import NotFound from "./pages/404";
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
