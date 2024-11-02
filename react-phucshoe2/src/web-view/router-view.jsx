import { useRoutes, Navigate } from "react-router-dom";

import LoginPage from "./view-page/login.jsx";
import RegistrationForm from "./view-page/register.jsx";
import Home from "./view-page/home.jsx";
import SelectShoe from "./view-page/selectShoe.jsx";

const RouterView = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegistrationForm />,
    },

    {
      path: "/selectShoe/*",
      element: <SelectShoe />,
    },

    {
      path: "/home",
      element: <Home />,
    },

    {
      path: "*",
      element: <Navigate to="/contact" replace />,
    },
  ]);

  return <div> {element} </div>;
};

export default RouterView;
