import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="container mt-5">
            <div className="text-center">
                <h1>Bienvenido a <span className="text-primary">HabitFit</span></h1>
                <p className="lead">Gestiona tus hábitos y rutinas de forma efectiva.</p>
            </div>
            <div className="row">
                <div className="col text-center">
                    <h1>Dashboard</h1>
                    <div className="mt-4">
                        <Link to="/rutinas" className="btn btn-outline-primary mx-2">Ver Rutinas</Link>
                        <Link to="/progreso" className="btn btn-outline-success mx-2">Ver Progreso</Link>
                        <button className="btn btn-danger mx-2" onClick={handleLogout}>Cerrar Sesión</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
