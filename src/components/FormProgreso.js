import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const FormProgreso = () => {
    const [fecha, setFecha] = useState("");
    const [actividades_completadas, setActividadesCompletadas] = useState("");
    const [calorias_consumidas, setCaloriasConsumidas] = useState("");
    const [tiempo_entrenado, setTiempoEntrenado] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/progreso", {
                fecha,
                actividades_completadas: actividades_completadas.split(","),
                calorias_consumidas,
                tiempo_entrenado,
            });
            navigate("/progreso");
        } catch (error) {
            console.error("Error al registrar progreso:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Registrar Progreso</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Actividades Completadas</label>
                    <textarea
                        className="form-control"
                        placeholder="Ejemplo: Sentadillas, Correr"
                        value={actividades_completadas}
                        onChange={(e) => setActividadesCompletadas(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Calorías Consumidas</label>
                    <input
                        type="number"
                        className="form-control"
                        value={calorias_consumidas}
                        onChange={(e) => setCaloriasConsumidas(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tiempo Entrenado (min)</label>
                    <input
                        type="number"
                        className="form-control"
                        value={tiempo_entrenado}
                        onChange={(e) => setTiempoEntrenado(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar Progreso</button>
            </form>
        </div>
    );
};

export default FormProgreso;
