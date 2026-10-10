import Header from "../src/components/Header";
import Footer from "../src/components/1Footer";
import "../src/styles/MAIN/stylesindex.css"
import { useNavigate } from "react-router-dom";



function Home() {


const navigate = useNavigate();
 
const evcv = () => {
navigate("/Eleccionbanco");

};

const gotoconst = () => {
navigate("/consulta");

};
  return (
    
    <div className="Home">
      <Header titulo="Inicio" />

      <main style={{ padding: "20px" }}>

        <section id="i1">

          <h1 id="t1i1">ESCOGE</h1>

          <img
            id="img1i1"
            src="/public/SRC/IMAGES/MAIN/people 1.png"
            alt=""
          />

          <img
            id="img2i1"
            src="/public/SRC/IMAGES/MAIN/people 2.png"
            alt=""
          />

          <img
            id="img3i1"
            src="/public/SRC/IMAGES/MAIN/people 3.png"
            alt=""
          />

          <img
            id="img4i1"
            src="/public/SRC/IMAGES/MAIN/people 4.png"
            alt=""
          />

          <img
            id="img5i1"
            src="/public/SRC/IMAGES/MAIN/people 5.png"
            alt=""
          />

          <img
            id="img6i1"
            src="/public/SRC/IMAGES/MAIN/people 6.png"
            alt=""
          />

          <img
            id="img7i1"
            src="/public/SRC/IMAGES/MAIN/PB1.png"
            alt=""
          />

          <img
            id="img8i1"
            src="/public/SRC/IMAGES/MAIN/FONDOB1.png"
            alt=""
          />
          <div id="btns">
            <button id="b1" onClick={gotoconst} >
              CONSULTA CLIENTE Y GARANTIAS
            </button>
               <button id="b1" onClick={evcv}>
                EVALUACION CREDITO
              </button>
          </div>
        </section>



        <Footer />
      </main>
    </div>
  );
}

export default Home;