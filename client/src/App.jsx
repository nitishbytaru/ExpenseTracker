import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import {
  TransactionForm,
  History,
  Login,
  Register,
  EditTransaction,
  Analysis,
  Goal,
  GoalForm,
  EditGoal,
} from "./components/index.js";
import LandingPage from "./pages/LandingPage.jsx";
import NoPage from "./pages/NoPage.jsx";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<PrivateRoutes />}>
            <Route path="transactionform" element={<TransactionForm />} exact />
            <Route path="history" element={<History />} exact />
            <Route path="analysis" element={<Analysis />} exact />
            <Route path="goal" element={<Goal />} exact />
            <Route path="goalForm" element={<GoalForm />} exact />
            <Route path="editGoal" element={<EditGoal />} exact />
            <Route path="editTransaction" element={<EditTransaction />} exact />
          </Route>
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
