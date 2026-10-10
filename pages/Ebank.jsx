import Header from "../src/components/Header";
import Footer from "../src/components/1Footer";
import { useNavigate } from "react-router-dom";
import "../src/styles/EBANK/stylesebank.css";
import {
    siguiente,
    anterior

} from "../src/components/funcions/scriptsebank";

function Ebank() {
const navigate = useNavigate();
 
const gotobc = () => {
navigate("/gotobc");
};

const gotobb = () => {
navigate("/gotobb");
};

const gotonu = () => {
navigate("/gotonu");
};


  return (
    <div >
      <Header />

      <main className="menu-page">
        <h1 id="t1">ELIGE ENTIDAD FINANCIERA</h1>

        <button onClick={siguiente} id="bslds">
          &gt;
        </button>

        <button onClick={anterior} id="bslda">
          &lt;
        </button>

        <div className="slider-container">
          <div id="sld">

            <div id="op1" className="slide">
              <h1>SELECCIONA UNA OPCION</h1>
            </div>

            <div onClick={gotobc} id="op2" className="slide">
              <img
                id="BA1"
                src="/SRC/IMAGES/EBANK/1BA.png"
                alt=""
              />

              <h2>HAZ CLIC PARA INGRESAR</h2>

              <li>
                Tasa promedio para crédito de libre inversión:
                1.4% - 2.5% mensual (16.8% - 30% anual), según
                historial crediticio.
              </li>

              <li id="li2">
                Monto máximo para crédito hipotecario: Hasta $2,500M
                COP (equivalente al 70% del avalúo de la propiedad).
              </li>

              <li id="li3">
                Plazo desde 6 meses (libre inversión) hasta 20 años
                (hipotecario), con pagos anticipados sin penalización.
              </li>
            </div>

            <div onClick={gotobb} id="op3" className="slide">
              <img
                id="BB1"
                src="/SRC/IMAGES/EBANK/1BB.png"
                alt=""
              />

              <h2>HAZ CLIC PARA INGRESAR</h2>

              <li>
                Solicitud 100% digital y sin necesidad de codeudor
                para crédito de libre inversión.
              </li>

              <li id="li2">
                Tasa y cuota fija durante toda la vigencia del crédito,
                con pagos anticipados sin penalización.
              </li>

              <li id="li3">
                Plazos flexibles: desde 12 hasta 72 meses para libre
                inversión, y hasta 30 años para crédito hipotecario.
              </li>
            </div>

            <div onClick={gotonu} id="op4" className="slide">
              <img
                id="NU1"
                src="/SRC/IMAGES/EBANK/1NU.png"
                alt=""
              />

              <h2>HAZ CLIC PARA INGRESAR</h2>

              <li>
                Tasa dinámica revolvente: Desde 2% mensual (24% anual)
                ajustable según comportamiento de pago.
              </li>

              <li>
                Créditos desde $1M COP sin garantías físicas.
              </li>

              <li id="li2">
                Pagos anticipados sin penalización y plazos abiertos
                (solo pago mínimo obligatorio).
              </li>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Ebank;