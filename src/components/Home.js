import React from "react";

const Home = () => {
    return (
        <div className="container mt-5 text-center">
            <h1 className="display-4">Bienvenido a <span className="text-success">HabitFit</span></h1>
            <p className="lead">La herramienta perfecta para gestionar tus hábitos y rutinas.</p>
            <a href="/registro" className="btn btn-success btn-lg">Comienza Ahora</a>
        </div>
    );
};

export default Home;
