import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./share-view/header";
import Footer from "./share-view/footer";
import GuardRoute from "./authentication/guardRoute";
import Navbar from "./share-view/navbar";
import RouterView from "./web-view/router-view";

import UserRouter from "./user-view/router-user";
import NavBarUser from "./user-view/components/navBarUser";
import HeaderUser from "./admin-view/components/headerAdmin";

import RouterAdmin from "./admin-view/router-admin";
import NavBarAdmin from "./admin-view/components/navBarAdmin";
import HeaderAdmin from "./admin-view/components/headerAdmin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<MainLayout />} />

          <Route
            path="/admin/*"
            element={<GuardRoute element={AdminLayout} />}
          />
          <Route path="/profile/*" element={<RouterUser />} />
          {/* <Route path="/admin/*" element={<RouterAdmin />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
const MainLayout = () => (
  <>
    <Header />
    <Navbar />
    <Routes>
      <Route path="/*" element={<RouterView />} />
    </Routes>
    <Footer />
  </>
);
const RouterUser = () => (
  <>
    <HeaderUser />
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <NavBarUser />
      </div>
      <div style={{ flex: 9 }}>
        <Routes>
          <Route path="/*" element={<UserRouter />} />
        </Routes>
      </div>
    </div>
  </>
);
const AdminLayout = () => (
  <>
    <HeaderAdmin />
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <NavBarAdmin />
      </div>
      <div style={{ flex: 9 }}>
        <Routes>
          <Route path="/*" element={<RouterAdmin />} />{" "}
        </Routes>
      </div>
    </div>
  </>
);

export default App;
