import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./share-view/header";
import Footer from "./share-view/footer";
import RouterView from "./web-view/router-view";
import RouterAdmin from "./admin-view/router-admin";
import GuardRoute from "./authentication/guardRoute";
import Navbar from "./share-view/navbar";

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
const AdminLayout = () => (
  <Routes>
    {" "}
    <Route path="/*" element={<RouterAdmin />} />{" "}
  </Routes>
);

export default App;
