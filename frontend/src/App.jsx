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

function App() {
  return (
    <Suspense fallback={<PageLoading />}>
      <ToastContainer limit={1} autoClose={2000} />
      <Router>
        <RoutesWithNotFound>
          <Route path="/" element={<LayoutMain />}>
            <Route index path="/" element={<TableUsers />} />
            <Route path="/perfil/:id" element={<Profile />} />
          </Route>
        </RoutesWithNotFound>
      </Router>
    </Suspense>
  );
}

export default App;
