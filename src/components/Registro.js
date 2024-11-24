import React, { useState } from "react";
import API from "../services/api";

const Registro = () => {
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        contraseña: "",
        metas: { peso: 0, entrenamientos_semanales: 0, hábitos: [] },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await API.post("/usuarios/registro", formData);
            alert("Registro exitoso");
            window.location.href = "/login";
        } catch (error) {
            setError(error.response?.data || "Error al registrarse");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: "500px" }}>
                <h3 className="text-center mb-4">Crear Cuenta</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nombre"
                            placeholder="Tu nombre"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            name="contraseña"
                            placeholder="********"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-success w-100">Registrarse</button>
                </form>
            </div>
        </div>
    );
};

export default Registro;
