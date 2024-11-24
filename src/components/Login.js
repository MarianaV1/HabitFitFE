import React, { useState } from "react";
import API from "../services/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const { data } = await API.post("/usuarios/login", { email, contraseña });
            localStorage.setItem("token", data.token);
            alert("Inicio de sesión exitoso");
            window.location.href = "/dashboard";
        } catch (error) {
            setError(error.response?.data?.error || "Error al iniciar sesión");
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h3 className="text-center mb-4">Iniciar Sesión</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contraseña" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            id="contraseña"
                            className="form-control"
                            placeholder="********"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
