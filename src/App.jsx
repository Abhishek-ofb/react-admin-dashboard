import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AlertsPage from "./pages/Alerts";
import MakeCallPage from "./pages/MakeCall";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/alerts" element={<AlertsPage />} />
         <Route path="/make-call" element={<MakeCallPage />} />
      </Routes>
    </Router>
  );
}
