import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "./App.css";

import Header from "./share-view/header";
import Footer from "./share-view/footer";
import GuardRoute from "./authentication/guardRoute";
import Navbar from "./share-view/navbar";
import RouterView from "./web-view/router-view";

import UserRouter from "./user-view/router-user";
import NavBarUser from "./user-view/components/navBarUser";
import HeaderUser from "./user-view/components/headerUser";

import RouterAdmin from "./admin-view/router-admin";
import NavBarAdmin from "./admin-view/components/navBarAdmin";
import HeaderAdmin from "./admin-view/components/headerAdmin";
import { Grid } from "@mui/material";

import { useSelector } from "react-redux";
import ChatRealTime from "./web-view/component-view/ComponentChat/ChatRealTime";
import { getThemeConfig } from "./services/themeService";

function App() {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const currentTheme = getThemeConfig(
    localStorage.getItem("THEMES") || userInfo?.THEMES || "dark"
  );
  return (
    <div
      className="App"
      style={{
        height: "auto",
        backgroundColor: currentTheme.backgroundColor, // Sửa mã màu ở đây
        color: currentTheme.color, // Đặt màu chữ phù hợp
      }}
    >
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        autoHideDuration={2000}
      >
        <Router>
          <Routes>
            <Route
              path="/*"
              element={<MainLayout isAuthenticated={isAuthenticated} />}
            />

            <Route
              path="/admin/*"
              element={<GuardRoute element={AdminLayout} />}
            />
            <Route
              path="/profile/*"
              element={
                <RouterUser
                  currentTheme={currentTheme}
                  isAuthenticated={isAuthenticated}
                />
              }
            />

            {/* <Route path="/admin/*" element={<RouterAdmin />} /> */}
          </Routes>
        </Router>{" "}
      </SnackbarProvider>
    </div>
  );
}
const MainLayout = ({ isAuthenticated }) => (
  <>
    <Header />
    <Navbar />

    {isAuthenticated ? (
      <>
        {" "}
        <ChatRealTime />
      </>
    ) : (
      false
    )}

    <Routes>
      <Route path="/*" element={<RouterView />} />
    </Routes>
    <Footer />
  </>
);
const RouterUser = ({ currentTheme, isAuthenticated }) => (
  <>
    <HeaderUser />{" "}
    {isAuthenticated ? (
      <>
        {" "}
        <ChatRealTime />
      </>
    ) : (
      false
    )}
    <Grid
      container
      style={{ height: "auto", backgroundColor: currentTheme.backgroundColor }}
    >
      <Grid item xs={3} md={2.5}>
        <NavBarUser />
      </Grid>
      <Grid item xs={9} md={9}>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </Grid>
    </Grid>
  </>
);

const AdminLayout = () => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const currentTheme = getThemeConfig(
    localStorage.getItem("THEMES") || userInfo?.THEMES || "dark"
  );
  return (
    <>
      <HeaderAdmin />
      <Grid
        container
        sx={{
          height: "auto",

          backgroundColor: currentTheme.backgroundColor,
        }}
      >
        <Grid item xs={3} md={2.5}>
          <NavBarAdmin />
        </Grid>
        <Grid item xs={9} md={9}>
          <Routes>
            <Route path="/*" element={<RouterAdmin />} />
          </Routes>
        </Grid>
      </Grid>
    </>
  );
};

export default App;
