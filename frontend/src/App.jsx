import { Suspense, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Profile from "./components/Profile";
import PageLoading from "./pages/PageLoading";
import RoutesWithNotFound from "./helpers/RoutesWithNotFound";
import TableUsers from "./components/TableUsers";

import "react-toastify/dist/ReactToastify.css";
import LayoutMain from "./Layout/LayoutMain";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import LayoutDashboard from "./Layout/LayoutDashboard";
import City from "./pages/City";

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ToastContainer limit={1} autoClose={2000} />
      <Router>


          <RoutesWithNotFound>

            <Route path="/" element={<Login />} />

            <Route path="/dashboard" element={<LayoutDashboard />}>
              <Route index element={<Dashboard />} />
              <Route path="ciudad/:city" element={<City />} />
              <Route path="perfil" element={<Profile />} />
              <Route path="usuarios" element={<City />} />
              <Route path="tareas" element={<City />} />
            </Route>

          </RoutesWithNotFound>
 
      </Router>
    </Suspense>
  );
}

export default App;
