import { useRoutes, Navigate } from "react-router-dom";
import Home from "../web-view/view-page/home";
import Contact from "../web-view/view-page/contact";
import Movie from "./view-page/movie";
import Detail from "./view-page/Detail";
import SelectFilm from "./view-page/SelectFilm.jsx";
import SelectPosition from "./view-page/SelectPosition.jsx";
import MovieConfirmation from "./view-page/MovieConfirmation.jsx";
import Login from "../authentication/login.jsx";
import Register from "../authentication/register.jsx";
import SelectMovie from "./view-page/selectMovie.jsx";
const RouterView = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
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
      path: "/movie",
      element: <Movie />,
    },
    {
      path: "*",
      element: <Navigate to="/contact" replace />,
    },
  ]);

  return <div> {element} </div>;
};

export default RouterView;
