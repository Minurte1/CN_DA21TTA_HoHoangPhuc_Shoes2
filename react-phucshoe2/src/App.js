import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import Header from "./share-view/header";
// import Footer from "./share-view/footer";
// import RouterView from "./web-view/router-view";
// import RouterAdmin from "./admin-view/router-admin";
// import GuardRoute from "./authentication/guardRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/*" element={<MainLayout />} />
          <>fdf</>
          {/* <Route
            path="/admin/*"
            element={<GuardRoute element={AdminLayout} />}
          /> */}
          {/* <Route path="/admin/*" element={<RouterAdmin />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
const MainLayout = () => (
  <>
    {/* <Header /> */}
    <Routes>{/* <Route path="/*" element={<RouterView />} /> */}</Routes>
    {/* <Footer /> */}
  </>
);
const AdminLayout = () => (
  <Routes>{/* <Route path="/*" element={<RouterAdmin />} /> */}</Routes>
);

export default App;
