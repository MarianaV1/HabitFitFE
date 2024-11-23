import React, { useState, useEffect } from "react";
import API from "../services/api";

const Progreso = () => {
    const [progreso, setProgreso] = useState([]);

    useEffect(() => {
        const fetchProgreso = async () => {
            const { data } = await API.get("/progreso");
            setProgreso(data);
        };
        fetchProgreso();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Progreso</h1>
            <div className="row">
                {progreso.map((p) => (
                    <div key={p._id} className="col-md-4 mb-4">
                        <div className="card shadow">
                            <div className="card-body">
                                <h5 className="card-title">Fecha: {new Date(p.fecha).toLocaleDateString()}</h5>
                                <p className="card-text">Actividades: {p.actividades_completadas.join(", ")}</p>
                                <p className="card-text">Calorías: {p.calorias_consumidas}</p>
                                <p className="card-text">Tiempo: {p.tiempo_entrenado} min</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Progreso;
