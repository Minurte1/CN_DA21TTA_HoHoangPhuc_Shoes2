import { useRoutes, Navigate } from "react-router-dom";

import LoginPage from "./view-page/login.jsx";
import RegistrationForm from "./view-page/register.jsx";
import Home from "./view-page/home.jsx";
import SelectShoe from "./view-page/selectShoe.jsx";
import PaymentMoMo from "./component-view/thanhToanMoMo.jsx";
import CheckOutMoMo from "./component-view/checkOutMoMo.jsx";

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
      path: "/pay",
      element: <PaymentMoMo />,
    },
    {
      path: "/checkout",
      element: <CheckOutMoMo />,
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
