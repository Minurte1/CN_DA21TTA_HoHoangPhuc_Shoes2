import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./share-view/header";
import Footer from "./share-view/footer";
import RouterView from "./web-view/router-view";
import RouterAdmin from "./admin-view/router-admin";
import GuardRoute from "./authentication/guardRoute";
import Navbar from "./share-view/navbar";
import UserRouter from "./user-view/router-user";
import NavBarUser from "./user-view/components/navBarUser";

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
);
const AdminLayout = () => (
  <Routes>
    {" "}
    <Route path="/*" element={<RouterAdmin />} />{" "}
  </Routes>
);

export default App;
