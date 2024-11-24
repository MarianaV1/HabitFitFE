import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const FormRutina = () => {
    const [nombre_rutina, setNombreRutina] = useState("");
    const [ejercicios, setEjercicios] = useState([]);
    const [frecuencia, setFrecuencia] = useState("");
    const [error, setError] = useState(""); // Estado para manejar errores
    const navigate = useNavigate();

    const agregarEjercicio = () => {
        setEjercicios([...ejercicios, { nombre: "", repeticiones: 0, series: 0, peso: 0 }]);
    };

    const handleEjercicioChange = (index, field, value) => {
        const updatedEjercicios = [...ejercicios];
        updatedEjercicios[index][field] = value;
        setEjercicios(updatedEjercicios);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Reinicia el error al intentar enviar

        // Validación: Verifica que haya al menos un ejercicio
        if (ejercicios.length === 0) {
            setError("Debe agregar al menos un ejercicio para guardar la rutina.");
            return;
        }

        // Enviar datos al backend
        try {
            await API.post("/rutinas", { nombre_rutina, ejercicios, frecuencia });
            navigate("/rutinas");
        } catch (error) {
            console.error("Error al crear rutina:", error.response?.data || error.message);
            setError("Ocurrió un error al guardar la rutina. Intente nuevamente.");
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Crear Rutina</h1>
            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <div className="mb-3">
                    <label className="form-label">Nombre de la Rutina</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nombre_rutina}
                        onChange={(e) => setNombreRutina(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Frecuencia</label>
                    <input
                        type="text"
                        className="form-control"
                        value={frecuencia}
                        onChange={(e) => setFrecuencia(e.target.value)}
                        placeholder="Ejemplo: Lunes, Miércoles, Viernes"
                        required
                    />
                </div>
                <h5>Ejercicios</h5>
                {ejercicios.map((ejercicio, index) => (
                    <div key={index} className="mb-3 border p-3 rounded">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Nombre del ejercicio"
                            value={ejercicio.nombre}
                            onChange={(e) => handleEjercicioChange(index, "nombre", e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Repeticiones"
                            value={ejercicio.repeticiones}
                            onChange={(e) => handleEjercicioChange(index, "repeticiones", e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            className="form-control mb-2"
                            placeholder="Series"
                            value={ejercicio.series}
                            onChange={(e) => handleEjercicioChange(index, "series", e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Peso (kg)"
                            value={ejercicio.peso}
                            onChange={(e) => handleEjercicioChange(index, "peso", e.target.value)}
                            required
                        />
                    </div>
                ))}
                <button type="button" className="btn btn-secondary mb-3" onClick={agregarEjercicio}>
                    Agregar Ejercicio
                </button>
                <button type="submit" className="btn btn-primary w-100">Guardar Rutina</button>
            </form>
        </div>
    );
};

export default FormRutina;
