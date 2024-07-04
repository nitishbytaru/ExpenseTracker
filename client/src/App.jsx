import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import {
  TransactionForm,
  History,
  Login,
  Register,
  EditTransaction,
  EditProfile,
} from "./components/index.js";
import LandingPage from "./pages/LandingPage.jsx";
import NoPage from "./pages/NoPage.jsx";
import LoginContextProvider from "./context/LoginContextProvider";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <LoginContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<PrivateRoutes />}>
              <Route
                path="transactionform"
                element={<TransactionForm />}
                exact
              />
              <Route path="history" element={<History />} exact />
              <Route path="editProfile" element={<EditProfile />} exact />
              <Route
                path="editTransaction"
                element={<EditTransaction />}
                exact
              />
            </Route>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </LoginContextProvider>
  );
}

export default App;
