import React, { useState, useEffect } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

const Rutinas = () => {
    const [rutinas, setRutinas] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchRutinas = async () => {
            try {
                const { data } = await API.get("/rutinas");
                setRutinas(data);
            } catch (error) {
                setError(error.response?.data?.error || "Error al cargar rutinas");
            }
        };
        fetchRutinas();
    }, []);

    const eliminarRutina = async (id) => {
        try {
            await API.delete(`/rutinas/${id}`);
            setRutinas(rutinas.filter((rutina) => rutina._id !== id));
        } catch (error) {
            setError(error.response?.data?.error || "Error al eliminar rutina");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Mis Rutinas</h1>
            {error && <p className="text-danger">{error}</p>}
            <div className="row">
                {rutinas.map((rutina) => (
                    <div key={rutina._id} className="col-md-4 mb-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">{rutina.nombre_rutina}</h5>
                                <p className="card-text">
                                    Frecuencia: {rutina.frecuencia}
                                </p>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => eliminarRutina(rutina._id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                <Link to="/rutinas/nueva" className="btn btn-primary">
                    Crear Nueva Rutina
                </Link>
            </div>
        </div>
    );
};

export default Rutinas;
