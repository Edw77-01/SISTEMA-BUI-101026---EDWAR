import { Routes, Route } from "react-router-dom";
import PageReset from "./components/PageReset";
import Home from "../pages/Home";
import Ebank from "../pages/Ebank";
import CreditoBC from "../pages/CreditoBC";
import CreditoBB from "../pages/CreditoBB";
import CreditoNU from "../pages/CreditoNU";
import CodigoC from "../pages/CodigoC";
import RechazoC from "../pages/RechazoC";
import Consulta from "../pages/consulta";
import { useState } from 'react';
import { Contexto_consulta } from "../pages/consulta";

import "../src/styles/globalstyles.css";

function App() {
  const [consulta_cedula, setCedula] = useState("");

  return (
    <Contexto_consulta.Provider value={{ consulta_cedula, setCedula }}>
      <PageReset>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Eleccionbanco" element={<Ebank />} />
          <Route path="/gotobc" element={<CreditoBC />} />
          <Route path="/gotobb" element={<CreditoBB />} />
          <Route path="/gotonu" element={<CreditoNU />} />
          <Route path="/preaprobado" element={<CodigoC />} />
          <Route path="/rechazo" element={<RechazoC />} />
          <Route path="/consulta" element={<Consulta />} />
        </Routes>
      </PageReset>
    </Contexto_consulta.Provider>
  );
}

export default App;