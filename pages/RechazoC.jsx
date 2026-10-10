import Header from "../src/components/Header";
import Footer from "../src/components/1Footer";
import "../src/styles/RECHAZOC/stylebancorechazo.css"
import { useNavigate } from "react-router-dom";




function RechazoC() {
  const navigate = useNavigate();



function bvi() {
    navigate("/");
}
  return (

    <div className="rechazoc_page" >
      <Header titulo="Inicio" />

      <main style={{ padding: "20px" }}>
        <div id="all">
          <h1>CREDITO RECHAZADO</h1>

          <p>El credito es inviable, presentalo nuevamente en otro momento</p>
  
          <button onClick={bvi} id="bvi">VOLVER A INICIO</button>


        </div>



        <Footer />
      </main>
    </div>
  );
}

export default RechazoC;