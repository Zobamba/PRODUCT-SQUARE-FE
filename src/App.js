import React from "react";
import { Routes, Route } from "react-router-dom";
import BillingInfo from "./pages/BillingInfo";
import Invoices from "./pages/Invoices";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<BillingInfo />} />
            <Route path="/invoices" element={<Invoices />} />
        </Routes>
    );
}

export default App;
