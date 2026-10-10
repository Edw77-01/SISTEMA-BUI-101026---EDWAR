import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../src/components/Header";
import Footer from "../src/components/1Footer";
import "../src/styles/GOTOBB/stylebancobb.css";

function CreditoBB() {
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ========== FUNCIONES DE EVALUACIÓN ==========

  // Función para calcular score personal
  const calcularScorePersonal = (datos) => {
    let score = 0;

    const edadNum = parseInt(datos.edad);

    // Validación de edad
    if (edadNum < 18) {
      return {
        score: -999,
        valido: false,
        razon: "Menor de edad",
      };
    }

    if (edadNum > 80) {
      return {
        score: -999,
        valido: false,
        razon: "Mayor de 80 años",
      };
    }

    // Puntuación por edad
    if (edadNum >= 18 && edadNum <= 25) {
      score -= 10;
    } else if (edadNum >= 26 && edadNum <= 59) {
      score += 15;
    } else if (edadNum >= 60 && edadNum <= 75) {
      score += 5;
    }

    // Puntuación por cónyuge
    if (datos.conyuge === "Si") {
      score += 10;
    }

    // Puntuación por trabajo
    const trabajoScore = evaluarTrabajo(datos.trabajo);
    score += trabajoScore.puntos;

    return {
      score,
      valido: true,
      razon: "",
    };
  };

  // Función para evaluar el trabajo
  const evaluarTrabajo = (trabajo) => {
    const buenTrabajo = [
      "Administración",
      "Auditoría",
      "Contabilidad",
      "Finanzas",
      "Consultoría",
      "Logística",
      "Comercio exterior",
      "Comercio minorista",
      "Comercio mayorista",
      "Arquitectura",
      "Ciencia de datos",
      "Ciencias ambientales",
      "Ciencias naturales",
      "Ciencias sociales",
      "Matemáticas",
      "Biología",
      "Química",
      "Ingeniería civil",
      "Ingeniería de alimentos",
      "Ingeniería de sistemas",
      "Ingeniería electrónica",
      "Ingeniería industrial",
      "Ingeniería mecánica",
      "Telecomunicaciones",
      "Informática",
      "Medicina",
      "Enfermería",
      "Psicología",
      "Nutrición",
      "Farmacia",
      "Radiología",
      "Salud pública",
      "Veterinaria",
      "Docencia",
      "Derecho",
      "Psicología forense",
      "Gestión de proyectos",
      "Desarrollo de software",
    ];

    const malTrabajo = [
      "Albañilería",
      "Carpintería",
      "Soldadura",
      "Reparaciones y oficios varios",
      "Mecánica automotriz",
      "Costura",
      "Confección textil",
      "Panadería",
      "Peluquería",
      "Seguridad privada",
      "Trabajo doméstico",
      "Trabajo informal",
      "Limpieza y aseo",
      "Reciclaje",
      "Desempleado",
    ];

    const varTrabajo = [
      "Marketing digital",
      "Recursos Humanos",
      "Agricultura",
      "Agroindustria",
      "Agropecuaria",
      "Ganadería",
      "Pesca",
      "Silvicultura",
      "Jardinería",
      "Apicultura",
      "Floristería",
      "Artes escénicas",
      "Artes plásticas",
      "Diseño de modas",
      "Diseño gráfico",
      "Diseño industrial",
      "Fotografía",
      "Publicidad",
      "Periodismo",
      "Animación",
      "Música",
      "Videojuegos",
      "Decoración",
      "Estética y belleza",
      "Bibliotecología",
      "Gestión cultural",
      "Gestión deportiva",
      "Voluntariado",
      "Fabricación",
      "Minería",
      "Atención al cliente",
      "Hotelería",
      "Restauración",
      "Transporte",
      "Ventas",
      "Servicios generales",
      "Alquiler de maquinaria",
      "Turismo",
      "Gestión ambiental",
      "Consultor independiente",
      "Desarrollador freelance",
      "Diseñador gráfico independiente",
      "Fotógrafo freelance",
      "Escritor freelance",
      "Traductor independiente",
      "Community manager independiente",
      "Programador freelance",
      "Profesor particular",
      "Artesano independiente",
      "Asesor financiero independiente",
      "Entrenador personal freelance",
      "Criminología",
      "Administración pública",
    ];

    if (buenTrabajo.includes(trabajo)) {
      return {
        puntos: 15,
        categoria: "Bueno",
      };
    }

    if (malTrabajo.includes(trabajo)) {
      return {
        puntos: -15,
        categoria: "Malo",
      };
    }

    if (varTrabajo.includes(trabajo)) {
      return {
        puntos: 5,
        categoria: "Variable",
      };
    }

    return {
      puntos: 0,
      categoria: "Desconocido",
    };
  };

  // Función para calcular score financiero
  const calcularScoreFinanciero = (datos, scorePersonalActual) => {
    const montoNum = parseFloat(datos.monto);
    const plazosNum = parseFloat(datos.plazo);
    const ingresosNum = parseFloat(datos.ingresosMensuales);
    const gastosNum = parseFloat(datos.gastosMensuales);

    // Validaciones básicas
    if (montoNum <= 0 || plazosNum <= 0) {
      return {
        aprobado: false,
        razon: "Monto o plazo inválido",
      };
    }

    if (ingresosNum <= 0) {
      return {
        aprobado: false,
        razon: "Ingresos inválidos",
      };
    }

    if (gastosNum >= ingresosNum) {
      return {
        aprobado: false,
        razon: "Los gastos son iguales o mayores a los ingresos",
      };
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

    const capacidadEndeudamiento =
      ingresoDisponible * porcentajeEndeudamiento;

    // Evaluación de cuota
    if (cuotaMensual <= capacidadEndeudamiento) {
      scoreFinanciero += 15;
    } else if (
      cuotaMensual <= capacidadEndeudamiento * 1.2 &&
      datos.tipoGarantia !== "Ninguna"
    ) {
      scoreFinanciero += 5;
    } else {
      return {
        aprobado: false,
        razon: `Cuota mensual (${cuotaMensual.toFixed(
          2
        )}) excede capacidad (${capacidadEndeudamiento.toFixed(2)})`,
      };
    }

    // Validar score mínimo
    if (scoreFinanciero < scoreMinimo) {
      return {
        aprobado: false,
        razon: `Score insuficiente: ${scoreFinanciero} (mínimo: ${scoreMinimo})`,
      };
    }

    return {
      aprobado: true,
      scoreFinanciero,
      cuotaMensual,
      capacidadEndeudamiento,
      razon: "",
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

      console.log(
        "❌ CRÉDITO RECHAZADO:",
        resultadoFinanciero.razon
      );

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

      <main className="gotobb_page">
        <div id="allBB">

          <img
            id="BB1"
            src="/SRC/IMAGES/PROCESOC/BB/1BB.png"
            alt="Proceso de Crédito"
          />

          {/* Mostrar mensajes de error */}
          {mensajeError && (
            <div
              style={{
                backgroundColor: "#ff4444",
                color: "white",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {mensajeError}
            </div>
          )}

          {/* Mostrar score actual */}
          {evaluacion.scoreTotal !== 0 && (
            <div
              style={{
                backgroundColor: "#444",
                color: "white",
                padding: "15px",
                borderRadius: "10px",
                marginBottom: "20px",
                fontSize: "18px",
              }}
            >
              📊 Score Actual:{" "}
              <strong>{evaluacion.scoreTotal}</strong>
            </div>
          )}

          {/* FASE 1 */}
          {fase === 1 && (
            <form onSubmit={handlePaso1} id="oculBB0">

              <h1 id="StitleBUI">FASE 1</h1>

              <h2 id="sentenceBB1">
                Hola te invitamos a Ingresar tus datos Básicos <br />
                Queremos conocerte
              </h2>

              <img
                id="imgpbb"
                src="/SRC/IMAGES/PROCESOC/BB/IBB1.png"
                alt="Paso 1"
              />

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

              <h2>Conyuge (si aplica)</h2>

              <select
                id="inputCony"
                name="conyuge"
                value={formData.conyuge}
                onChange={handleChange}
              >
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>

              <h2>Hijos (si aplica)</h2>

              <select
                id="inputHijos"
                name="hijos"
                value={formData.hijos}
                onChange={handleChange}
              >
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>

              <h2>Trabajo o Actividad</h2>

              <select
                id="inputLab"
                name="trabajo"
                value={formData.trabajo}
                onChange={handleChange}
              >
                <optgroup label="Administración y Finanzas">
                  <option value="Administración">Administración</option>
                  <option value="Auditoría">Auditoría</option>
                  <option value="Contabilidad">Contabilidad</option>
                  <option value="Finanzas">Finanzas</option>
                  <option value="Marketing digital">Marketing digital</option>
                  <option value="Recursos Humanos">Recursos Humanos</option>
                  <option value="Consultoría">Consultoría</option>
                  <option value="Logística">Logística</option>
                  <option value="Comercio exterior">Comercio exterior</option>
                  <option value="Comercio minorista">Comercio minorista</option>
                  <option value="Comercio mayorista">Comercio mayorista</option>
                </optgroup>

                <optgroup label="Agricultura y Agroindustria">
                  <option value="Agricultura">Agricultura</option>
                  <option value="Agroindustria">Agroindustria</option>
                  <option value="Agropecuaria">Agropecuaria</option>
                  <option value="Ganadería">Ganadería</option>
                  <option value="Pesca">Pesca</option>
                  <option value="Silvicultura">Silvicultura</option>
                  <option value="Jardinería">Jardinería</option>
                  <option value="Apicultura">Apicultura</option>
                  <option value="Floristería">Floristería</option>
                </optgroup>

                <optgroup label="Arte, Diseño y Comunicación">
                  <option value="Arquitectura">Arquitectura</option>
                  <option value="Artes escénicas">Artes escénicas</option>
                  <option value="Artes plásticas">Artes plásticas</option>
                  <option value="Diseño de modas">Diseño de modas</option>
                  <option value="Diseño gráfico">Diseño gráfico</option>
                  <option value="Diseño industrial">Diseño industrial</option>
                  <option value="Fotografía">Fotografía</option>
                  <option value="Publicidad">Publicidad</option>
                  <option value="Periodismo">Periodismo</option>
                  <option value="Animación">Animación</option>
                  <option value="Música">Música</option>
                  <option value="Videojuegos">Videojuegos</option>
                  <option value="Decoración">Decoración</option>
                </optgroup>

                <optgroup label="Ciencia y Tecnología">
                  <option value="Ciencia de datos">Ciencia de datos</option>
                  <option value="Ciencias ambientales">Ciencias ambientales</option>
                  <option value="Ciencias naturales">Ciencias naturales</option>
                  <option value="Ciencias sociales">Ciencias sociales</option>
                  <option value="Matemáticas">Matemáticas</option>
                  <option value="Biología">Biología</option>
                  <option value="Química">Química</option>
                  <option value="Ingeniería civil">Ingeniería civil</option>
                  <option value="Ingeniería de alimentos">Ingeniería de alimentos</option>
                  <option value="Ingeniería de sistemas">Ingeniería de sistemas</option>
                  <option value="Ingeniería electrónica">Ingeniería electrónica</option>
                  <option value="Ingeniería industrial">Ingeniería industrial</option>
                  <option value="Ingeniería mecánica">Ingeniería mecánica</option>
                  <option value="Telecomunicaciones">Telecomunicaciones</option>
                  <option value="Informática">Informática</option>
                </optgroup>

                <optgroup label="Salud y Bienestar">
                  <option value="Medicina">Medicina</option>
                  <option value="Enfermería">Enfermería</option>
                  <option value="Psicología">Psicología</option>
                  <option value="Nutrición">Nutrición</option>
                  <option value="Farmacia">Farmacia</option>
                  <option value="Radiología">Radiología</option>
                  <option value="Salud pública">Salud pública</option>
                  <option value="Veterinaria">Veterinaria</option>
                  <option value="Estética y belleza">Estética y belleza</option>
                </optgroup>

                <optgroup label="Educación y Formación">
                  <option value="Docencia">Docencia</option>
                  <option value="Bibliotecología">Bibliotecología</option>
                  <option value="Gestión cultural">Gestión cultural</option>
                  <option value="Gestión deportiva">Gestión deportiva</option>
                  <option value="Voluntariado">Voluntariado</option>
                </optgroup>

                <optgroup label="Industria y Manufactura">
                  <option value="Fabricación">Fabricación</option>
                  <option value="Albañilería">Albañilería</option>
                  <option value="Carpintería">Carpintería</option>
                  <option value="Soldadura">Soldadura</option>
                  <option value="Reparaciones y oficios varios">
                    Reparaciones y oficios varios
                  </option>
                  <option value="Mecánica automotriz">
                    Mecánica automotriz
                  </option>
                  <option value="Minería">Minería</option>
                  <option value="Costura">Costura</option>
                  <option value="Confección textil">Confección textil</option>
                  <option value="Panadería">Panadería</option>
                  <option value="Peluquería">Peluquería</option>
                </optgroup>

                <optgroup label="Servicios y Otros">
                  <option value="Atención al cliente">
                    Atención al cliente
                  </option>
                  <option value="Hotelería">Hotelería</option>
                  <option value="Restauración">Restauración</option>
                  <option value="Seguridad privada">
                    Seguridad privada
                  </option>
                  <option value="Trabajo doméstico">
                    Trabajo doméstico
                  </option>
                  <option value="Trabajo informal">
                    Trabajo informal
                  </option>
                  <option value="Transporte">Transporte</option>
                  <option value="Ventas">Ventas</option>
                  <option value="Limpieza y aseo">
                    Limpieza y aseo
                  </option>
                  <option value="Servicios generales">
                    Servicios generales
                  </option>
                  <option value="Alquiler de maquinaria">
                    Alquiler de maquinaria
                  </option>
                  <option value="Reciclaje">Reciclaje</option>
                  <option value="Turismo">Turismo</option>
                  <option value="Gestión ambiental">
                    Gestión ambiental
                  </option>
                </optgroup>

                <optgroup label="Independientes y Freelance">
                  <option value="Consultor independiente">
                    Consultor independiente
                  </option>
                  <option value="Desarrollador freelance">
                    Desarrollador freelance
                  </option>
                  <option value="Diseñador gráfico independiente">
                    Diseñador gráfico independiente
                  </option>
                  <option value="Fotógrafo freelance">
                    Fotógrafo freelance
                  </option>
                  <option value="Escritor freelance">
                    Escritor freelance
                  </option>
                  <option value="Traductor independiente">
                    Traductor independiente
                  </option>
                  <option value="Community manager independiente">
                    Community manager independiente
                  </option>
                  <option value="Programador freelance">
                    Programador freelance
                  </option>
                  <option value="Profesor particular">
                    Profesor particular
                  </option>
                  <option value="Artesano independiente">
                    Artesano independiente
                  </option>
                  <option value="Asesor financiero independiente">
                    Asesor financiero independiente
                  </option>
                  <option value="Entrenador personal freelance">
                    Entrenador personal freelance
                  </option>
                </optgroup>

                <optgroup label="Otras Profesiones">
                  <option value="Derecho">Derecho</option>
                  <option value="Criminología">Criminología</option>
                  <option value="Psicología forense">
                    Psicología forense
                  </option>
                  <option value="Gestión de proyectos">
                    Gestión de proyectos
                  </option>
                  <option value="Desarrollo de software">
                    Desarrollo de software
                  </option>
                  <option value="Administración pública">
                    Administración pública
                  </option>
                </optgroup>

                <optgroup label="Situación laboral">
                  <option value="Desempleado">Desempleado</option>
                </optgroup>
              </select>

              <br />

              <button type="submit">
                SIGUIENTE
              </button>
            </form>
          )}

          {/* FASE 2 */}
          {fase === 2 && (
            <form onSubmit={handlePaso2} id="oculBB1">

              <h1 id="StitleBUI">FASE 2</h1>

              <img
                id="imgpbb2"
                src="/SRC/IMAGES/PROCESOC/BB/IBB2.png"
                alt="Paso 2"
              />

              <h2>Monto Solicitado</h2>

              <input
                id="inputMont"
                name="monto"
                type="number"
                value={formData.monto}
                onChange={handleChange}
                required
              />

              <h2>Plazos pago</h2>

              <input
                id="inputPlaz"
                name="plazo"
                type="number"
                value={formData.plazo}
                onChange={handleChange}
                required
              />

              <h2>Tipo de Crédito</h2>

              <select
                id="inputTC"
                name="tipoCredito"
                value={formData.tipoCredito}
                onChange={handleChange}
              >
                <option value="Credito Personal">
                  Crédito Personal
                </option>

                <option value="Credito Libre Inversion">
                  Crédito Libre Inversión
                </option>

                <option value="Credito Vehicular">
                  Crédito Vehicular
                </option>

                <option value="Credito Vivienda">
                  Crédito Vivienda
                </option>
              </select>

              <button type="submit">
                ENVIAR
              </button>

              <br />
            </form>
          )}

          {/* FASE 3 */}
          {fase === 3 && (
            <form onSubmit={handleSubmitFinal} id="oculBB2">

              <h1 id="StitleBUI">FASE 3</h1>

              <img
                id="imgpbb3"
                src="/SRC/IMAGES/PROCESOC/BB/IBB3.png"
                alt="Paso 3"
              />

              <h2>
                Cuales son sus ingresos mensuales
              </h2>

              <input
                id="inputIM"
                name="ingresosMensuales"
                type="number"
                value={formData.ingresosMensuales}
                onChange={handleChange}
                required
              />

              <h2>
                Cuanto gasta al mes
              </h2>

              <input
                id="inputGM"
                name="gastosMensuales"
                type="number"
                value={formData.gastosMensuales}
                onChange={handleChange}
                required
              />

              <h2>
                Tipo de Garantía
              </h2>

              <select
                id="inputGar"
                name="tipoGarantia"
                value={formData.tipoGarantia}
                onChange={handleChange}
              >
                <option value="Fiador">Fiador</option>
                <option value="Hipoteca">Hipoteca</option>
                <option value="Prenda">Prenda</option>
                <option value="Ninguna">Ninguna</option>
              </select>

              <button type="submit">
                CONTINUAR
              </button>
            </form>
          )}

        </div>

        <Footer />
      </main>
    </div>
  );
}

export default CreditoBB;