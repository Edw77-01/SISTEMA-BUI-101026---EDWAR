import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from "../src/components/Header";
import Footer from "../src/components/1Footer";
import "../src/styles/CONSULTA/stylesconsulta.css";

export const Contexto_consulta = createContext();

function Consulta() {
  const { consulta_cedula, setCedula } = useContext(Contexto_consulta);
  const navigate = useNavigate();

  // 1. Estado para almacenar los datos recibidos del usuario
  const [usuario, setUsuario] = useState(null);

  const gotohome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consulta_cedula || consulta_cedula.trim() === "") {
      alert("Por favor ingresa un número de cédula");
      return;
    }

    if (!/^\d+$/.test(consulta_cedula)) {
      alert("La cédula debe contener solo números");
      return;
    }

    // Limpiamos resultados previos antes de consultar
    setUsuario(null);

    try {
      const response = await fetch(`http://localhost:5000/api/consulta/${consulta_cedula}`);
      const data = await response.json();

      if (!response.ok) {
        alert(data.mensaje || "Error al buscar el usuario");
        return;
      }

      console.log("Datos recibidos de PostgreSQL:", data);
      
      // 2. Guardamos la información en el estado
      setUsuario(data);

    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div>
      <Header />
      <div id="consulta_page">
        <h1>Consulta Usuario</h1>
        <form id="consulta_form" onSubmit={handleSubmit}>
          <h2>Ingresa el numero de documento</h2>
          <input
            id="consulta_input"
            type="text"
            name="cedula"
            placeholder="Cédula"
            maxLength="20"
            value={consulta_cedula}
            onChange={(e) => setCedula(e.target.value)}
          />

          {/* 3. Reemplazamos el div fijo con renderizado condicional de la tabla */}
          <div id="consulta_tabla_container" style={{ margin: "20px 0" }}>
            {usuario ? (
              <table border="1" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Cédula</th>
                    <th>Calificacion Crediticia</th>
                    <th>Codigo de Preaprobado</th>
                    {/* Ajusta o añade las columnas según los nombres exactos en tu BD */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{usuario.cedula_cliente}</td>
                    <td>{usuario.calificacion_cred}</td>
                    <td>{usuario.codigo_preaprobado}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Realiza una búsqueda para ver los resultados.</p>
            )}
          </div>

          <button type="submit">BUSCAR</button>
          <button onClick={gotohome} type="button">VOLVER</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Consulta;