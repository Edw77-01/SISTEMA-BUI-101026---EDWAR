import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../src/components/Header";
import Footer from "../src/components/1Footer";
import "../src/styles/GOTOBC/stylebanco.css";

function CreditoBC() {
  const navigate = useNavigate();
  const [fase, setFase] = useState(1);
  const [mensajeError, setMensajeError] = useState("");

  // Estado unificado del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    edad: "",
    conyuge: "No",
    hijos: "No",
    trabajo: "Administración",
    monto: "",
    plazo: "",
    tipoCredito: "Credito Personal",
    ingresosMensuales: "",
    gastosMensuales: "",
    tipoGarantia: "Ninguna",
  });

  // Estado de evaluación
  const [evaluacion, setEvaluacion] = useState({
    scorePersonal: 0,
    scoreFinanciero: 0,
    scoreTotal: 0,
    aprobado: null,
    razonRechazo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMensajeError("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ========== FUNCIONES DE EVALUACIÓN ==========

  // Función para calcular score personal (Fase 1)
  const calcularScorePersonal = (datos) => {
    let score = 0;

    const edadNum = parseInt(datos.edad);

    // Validación de edad
    if (edadNum < 18) {
      return { score: -999, valido: false, razon: "Menor de edad" };
    }
    if (edadNum > 80) {
      return { score: -999, valido: false, razon: "Mayor de 80 años" };
    }

    // Puntuación por edad
    if (edadNum >= 18 && edadNum <= 25) score -= 10;
    else if (edadNum >= 26 && edadNum <= 59) score += 15;
    else if (edadNum >= 60 && edadNum <= 75) score += 5;

    // Puntuación por cónyuge
    if (datos.conyuge === "Si") score += 10;

    // Puntuación por trabajo
    const trabajoScore = evaluarTrabajo(datos.trabajo);
    score += trabajoScore.puntos;

    return { score, valido: true, razon: "" };
  };

  // Función para evaluar el trabajo
  const evaluarTrabajo = (trabajo) => {
    const buenTrabajo = [
      "Medicina", "Enfermería", "Psicología", "Nutrición", "Farmacia",
      "Radiología", "Veterinaria", "Ingeniería civil", "Ingeniería de alimentos",
      "Ingeniería de sistemas", "Ingeniería electrónica", "Ingeniería industrial",
      "Ingeniería mecánica", "Ciencia de datos", "Matemáticas", "Biología",
      "Química", "Derecho", "Administración", "Contabilidad", "Finanzas",
      "Docencia", "Desarrollo de software", "Psicología forense", "Auditoría"
    ];

    const malTrabajo = [
      "Trabajo informal", "Trabajo doméstico", "Limpieza y aseo", "Costura",
      "Confección textil", "Albañilería", "Reparaciones y oficios varios",
      "Peluquería", "Seguridad privada", "Reciclaje", "Desempleado"
    ];

    const varTrabajo = [
      "Marketing digital", "Recursos Humanos", "Consultoría", "Logística",
      "Comercio exterior", "Comercio minorista", "Comercio mayorista",
      "Periodismo", "Publicidad", "Diseño gráfico", "Diseño industrial",
      "Arquitectura", "Animación", "Música", "Ciencias ambientales",
      "Ciencias naturales", "Ciencias sociales", "Informática", "Salud pública",
      "Gestión ambiental", "Gestión cultural", "Gestión deportiva", "Minería",
      "Panadería", "Hotelería", "Restauración", "Transporte", "Ventas",
      "Turismo", "Administración pública", "Gestión de proyectos", "Atención al cliente"
    ];

    if (buenTrabajo.includes(trabajo)) return { puntos: 15, categoria: "Bueno" };
    if (malTrabajo.includes(trabajo)) return { puntos: -15, categoria: "Malo" };
    if (varTrabajo.includes(trabajo)) return { puntos: 5, categoria: "Variable" };

    return { puntos: 0, categoria: "Desconocido" };
  };

  // Función para calcular score financiero (Fase 2 y 3)
  const calcularScoreFinanciero = (datos, scorePersonalActual) => {
    const montoNum = parseFloat(datos.monto);
    const plazosNum = parseFloat(datos.plazo);
    const ingresosNum = parseFloat(datos.ingresosMensuales);
    const gastosNum = parseFloat(datos.gastosMensuales);

    // Validaciones básicas
    if (montoNum <= 0 || plazosNum <= 0) {
      return { aprobado: false, razon: "Monto o plazo inválido" };
    }

    if (ingresosNum <= 0) {
      return { aprobado: false, razon: "Ingresos inválidos" };
    }

    if (gastosNum >= ingresosNum) {
      return { aprobado: false, razon: "Los gastos son iguales o mayores a los ingresos" };
    }

    let scoreFinanciero = scorePersonalActual;
    const cuotaMensual = montoNum / plazosNum;

    // Evaluación por tipo de crédito
    let scoreMinimo = 0;
    let porcentajeEndeudamiento = 0;

    if (datos.tipoCredito === "Credito Personal") {
      scoreMinimo = 10;
      porcentajeEndeudamiento = 0.30;
    } else if (datos.tipoCredito === "Credito Libre Inversion") {
      scoreMinimo = 15;
      porcentajeEndeudamiento = 0.35;
    } else if (datos.tipoCredito === "Credito Vehicular") {
      scoreMinimo = 20;
      porcentajeEndeudamiento = 0.25;
    } else if (datos.tipoCredito === "Credito Vivienda") {
      scoreMinimo = 25;
      porcentajeEndeudamiento = 0.40;
    }

    // Calcular capacidad de endeudamiento
    const ingresoDisponible = ingresosNum - gastosNum;
    const capacidadEndeudamiento = ingresoDisponible * porcentajeEndeudamiento;

    // Evaluación de cuota
    if (cuotaMensual <= capacidadEndeudamiento) {
      scoreFinanciero += 15;
    } else if (cuotaMensual <= capacidadEndeudamiento * 1.2 && datos.tipoGarantia !== "Ninguna") {
      // Permite un 20% más si hay garantía
      scoreFinanciero += 5;
    } else {
      return {
        aprobado: false,
        razon: `Cuota mensual (${cuotaMensual.toFixed(2)}) excede capacidad (${capacidadEndeudamiento.toFixed(2)})`
      };
    }

    // Validar score mínimo
    if (scoreFinanciero < scoreMinimo) {
      return {
        aprobado: false,
        razon: `Score insuficiente: ${scoreFinanciero} (mínimo: ${scoreMinimo})`
      };
    }

    return {
      aprobado: true,
      scoreFinanciero,
      cuotaMensual,
      capacidadEndeudamiento,
      razon: ""
    };
  };

  // ========== MANEJADORES DE FASES ==========

  const handlePaso1 = (e) => {
    e.preventDefault();
    setMensajeError("");

    // Validar campos
    if (!formData.nombre || !formData.apellidos || !formData.edad) {
      setMensajeError("Por favor completa todos los campos");
      return;
    }

    // Calcular score personal
    const resultadoPersonal = calcularScorePersonal(formData);

    if (!resultadoPersonal.valido) {
      setMensajeError(`❌ ${resultadoPersonal.razon}`);
      return;
    }

    setEvaluacion((prev) => ({
      ...prev,
      scorePersonal: resultadoPersonal.score,
      scoreTotal: resultadoPersonal.score,
    }));

    scrollToTop();
    setFase(2);
  };

  const handlePaso2 = (e) => {
    e.preventDefault();
    setMensajeError("");

    // Validar campos
    if (!formData.monto || !formData.plazo || !formData.tipoCredito) {
      setMensajeError("Por favor completa todos los campos");
      return;
    }

    const montoNum = parseFloat(formData.monto);
    const plazosNum = parseFloat(formData.plazo);

    if (montoNum <= 0 || plazosNum <= 0) {
      setMensajeError("Monto y plazo deben ser mayores a 0");
      return;
    }

    scrollToTop();
    setFase(3);
  };

  const handleSubmitFinal = (e) => {
    e.preventDefault();
    setMensajeError("");

    // Validar campos
    if (!formData.ingresosMensuales || !formData.gastosMensuales) {
      setMensajeError("Por favor completa todos los campos");
      return;
    }

    const ingresosNum = parseFloat(formData.ingresosMensuales);
    const gastosNum = parseFloat(formData.gastosMensuales);

    if (ingresosNum <= 0 || gastosNum < 0) {
      setMensajeError("Los ingresos deben ser mayores a 0");
      return;
    }

    // Realizar evaluación financiera completa
    const resultadoFinanciero = calcularScoreFinanciero(
      formData,
      evaluacion.scorePersonal
    );

    if (!resultadoFinanciero.aprobado) {
      setEvaluacion((prev) => ({
        ...prev,
        aprobado: false,
        razonRechazo: resultadoFinanciero.razon,
      }));

      console.log("❌ CRÉDITO RECHAZADO:", resultadoFinanciero.razon);
      scrollToTop();
      setTimeout(() => navigate("/rechazo"), 1500);
      return;
    }

    // Crédito aprobado
    setEvaluacion((prev) => ({
      ...prev,
      aprobado: true,
      scoreFinanciero: resultadoFinanciero.scoreFinanciero,
      scoreTotal: resultadoFinanciero.scoreFinanciero,
      razonRechazo: "",
    }));

    console.log("✅ CRÉDITO APROBADO");
    console.log("Datos:", formData);
    console.log("Evaluación:", evaluacion);

    scrollToTop();
    setTimeout(() => navigate("/preaprobado"), 1500);
  };

  return (
    <div>
      <Header titulo="Inicio" />

      <main className="gotobc_page">
        <div id="allBC">
          <img id="BC1" src="/SRC/IMAGES/PROCESOC/BC/1BC.png" alt="Proceso de Crédito" />

          {/* Mostrar mensajes de error */}
          {mensajeError && (
            <div style={{
              backgroundColor: "#ff4444",
              color: "white",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "18px",
              fontWeight: "bold"
            }}>
              {mensajeError}
            </div>
          )}

          {/* Mostrar score actual */}
          {evaluacion.scoreTotal !== 0 && (
            <div style={{
              backgroundColor: "#444",
              color: "white",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "20px",
              fontSize: "18px"
            }}>
              📊 Score Actual: <strong>{evaluacion.scoreTotal}</strong>
            </div>
          )}

          {/* FASE 1: Datos personales */}
          {fase === 1 && (
            <form onSubmit={handlePaso1} id="ocul0">
              <h1 id="StitleBUI">FASE 1</h1>
              <h2 id="sentence1">
                Hola, te invitamos a ingresar tus datos básicos <br />
                Queremos conocerte
              </h2>

              <img id="imgpbc" src="/SRC/IMAGES/PROCESOC/BC/IBC1.png" alt="Paso 1" />

              <h2>Nombre(s)</h2>
              <input
                id="inputNom"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                required
              />

              <h2>Apellidos</h2>
              <input
                id="inputApe"
                name="apellidos"
                type="text"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />

              <h2>Edad</h2>
              <input
                id="inputEdad"
                name="edad"
                type="number"
                value={formData.edad}
                onChange={handleChange}
                required
              />

              <h2>Cónyuge (si aplica)</h2>
              <select id="inputCony" name="conyuge" value={formData.conyuge} onChange={handleChange}>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>

              <h2>Hijos (si aplica)</h2>
              <select id="inputHijos" name="hijos" value={formData.hijos} onChange={handleChange}>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>

              <h2>Trabajo o Actividad</h2>
              <select id="inputLab" name="trabajo" value={formData.trabajo} onChange={handleChange}>
                <optgroup label="Administración y Finanzas">
                  <option value="Administración">Administración</option>
                  <option value="Auditoría">Auditoría</option>
                  <option value="Contabilidad">Contabilidad</option>
                  <option value="Finanzas">Finanzas</option>
                  <option value="Marketing digital">Marketing digital</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                </optgroup>
                <optgroup label="Ciencia y Tecnología">
                  <option value="Desarrollo de software">Desarrollo de software</option>
                  <option value="Ingeniería de sistemas">Ingeniería de sistemas</option>
                  <option value="Ciencia de datos">Ciencia de datos</option>
                </optgroup>
                <optgroup label="Situación laboral">
                  <option value="Desempleado">Desempleado</option>
                </optgroup>
              </select>

              <br />
              <button type="submit">SIGUIENTE</button>
            </form>
          )}

          {/* FASE 2: Solicitud de crédito */}
          {fase === 2 && (
            <form onSubmit={handlePaso2} id="ocul1">
              <h1 id="StitleBUI">FASE 2</h1>
              <img id="imgpbC2" src="/SRC/IMAGES/PROCESOC/BC/IBC2.png" alt="Paso 2" />

              <h2>Monto Solicitado</h2>
              <input
                id="inputMont"
                name="monto"
                type="number"
                value={formData.monto}
                onChange={handleChange}
                required
              />

              <h2>Plazos pago (meses)</h2>
              <input
                id="inputPlaz"
                name="plazo"
                type="number"
                value={formData.plazo}
                onChange={handleChange}
                required
              />

              <h2>Tipo de Crédito</h2>
              <select id="inputTC" name="tipoCredito" value={formData.tipoCredito} onChange={handleChange}>
                <option value="Credito Personal">Crédito Personal</option>
                <option value="Credito Libre Inversion">Crédito Libre Inversión</option>
                <option value="Credito Vehicular">Crédito Vehicular</option>
                <option value="Credito Vivienda">Crédito Vivienda</option>
              </select>

              <button type="submit">SIGUIENTE</button>
            </form>
          )}

          {/* FASE 3: Capacidad financiera y garantía */}
          {fase === 3 && (
            <form onSubmit={handleSubmitFinal} id="ocul2">
              <h1 id="StitleBUI">FASE 3</h1>
              <img id="imgpbc3" src="/SRC/IMAGES/PROCESOC/BC/IBC3.png" alt="Paso 3" />

              <h2>¿Cuáles son sus ingresos mensuales?</h2>
              <input
                id="inputIM"
                name="ingresosMensuales"
                type="number"
                value={formData.ingresosMensuales}
                onChange={handleChange}
                required
              />

              <h2>¿Cuánto gasta al mes?</h2>
              <input
                id="inputGM"
                name="gastosMensuales"
                type="number"
                value={formData.gastosMensuales}
                onChange={handleChange}
                required
              />

              <h2>Tipo de Garantía</h2>
              <select id="inputGar" name="tipoGarantia" value={formData.tipoGarantia} onChange={handleChange}>
                <option value="Fiador">Fiador</option>
                <option value="Hipoteca">Hipoteca</option>
                <option value="Prenda">Prenda</option>
                <option value="Ninguna">Ninguna</option>
              </select>

              <button type="submit">CONTINUAR</button>
            </form>
          )}
        </div>

        <Footer />
      </main>
    </div>
  );
}

export default CreditoBC;