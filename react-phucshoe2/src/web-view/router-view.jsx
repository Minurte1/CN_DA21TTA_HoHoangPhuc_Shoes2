import { useRoutes, Navigate } from "react-router-dom";
import Home from "../web-view/view-page/home";
import Contact from "../web-view/view-page/contact";

import Detail from "./view-page/Detail";
import SelectFilm from "./view-page/SelectFilm.jsx";
import SelectPosition from "./view-page/SelectPosition.jsx";
import MovieConfirmation from "./view-page/MovieConfirmation.jsx";
import SelectMovie from "./view-page/selectMovie.jsx";
import LoginPage from "./view-page/login.jsx";
import RegistrationForm from "./view-page/register.jsx";

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
      path: "/detail",
      element: <Detail />,
    },
    {
      path: "/selectMovie/*",
      element: <SelectMovie />,
    },
    {
      path: "/ticker",
      element: <MovieConfirmation />,
    },
    {
      path: "/selectPosition",
      element: <SelectPosition />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/contact",
      element: <Contact />,
    },

    {
      path: "*",
      element: <Navigate to="/contact" replace />,
    },
  ]);

  return <div> {element} </div>;
};

export default RouterView;
