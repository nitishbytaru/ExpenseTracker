import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import {
  TransactionForm,
  History,
  NoPage,
  Login,
  Signup,
  LandingPage,
  EditProfile,
} from "./components/index";
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
            <Route path="signup" element={<Signup />} />
            <Route element={<PrivateRoutes />}>
              {/* Add your nested routes here */}
              <Route
                path="transactionform"
                element={<TransactionForm />}
                exact
              />
              <Route path="history" element={<History />} exact />
              <Route path="editProfile" element={<EditProfile />} exact />
            </Route>
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </LoginContextProvider>
  );
}

export default App;
