import Header from "../src/components/Header";
import Footer from "../src/components/1Footer";
import "../src/styles/CODIGOC/stylebancoCOD.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";



function CodigoC() {
  const navigate = useNavigate();

  const [numero, setNumero] = useState(
    Math.floor(Math.random() * 90000) + 10000)

function bvi() {
    navigate("/");
}
  return (

    <div className="codigoc_page" >
      <Header titulo="Inicio" />

      <main style={{ padding: "20px" }}>
        <div id="all">
          <h1>CREDITO PREAPROBADO</h1>
          <h2>Su Codigo de Aprobacion es:</h2>
          <h1 id="AlNum">{numero}</h1>

          <p>Remitase al la sucursal (presencial o virtual) y presente el codigo junto con el codigo consulta Central de Riesgos</p>
  
          <button onClick={bvi} id="bvi">VOLVER A INICIO</button>


        </div>



        <Footer />
      </main>
    </div>
  );
}

export default CodigoC;