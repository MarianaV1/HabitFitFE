import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Dashboard from "./components/Dashboard";
import Rutinas from "./components/Rutinas";
import FormRutina from "./components/FormRutina";
import Progreso from "./components/Progreso";
import FormProgreso from "./components/FormProgreso";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

const App = () => {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <Router>
          <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/rutinas" element={<Rutinas />} />
                <Route path="/rutinas/nueva" element={<FormRutina />} />
                <Route path="/progreso" element={<Progreso />} />
                <Route path="/progreso/nuevo" element={<FormProgreso />} />
            </Routes>
        </Router>
    );
};

export default App;


