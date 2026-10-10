import React, { useState } from "react";
import Header from "../src/components/Header";
import Footer from "../src/components/1Footer";
import "../src/styles/GOTONU/stylebanconu.css";

function CreditoNU() {
  const [fase, setFase] = useState(1);
  const [mensajeError, setMensajeError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    edad: "",
    conyuge: "Si",
    hijos: "Si",
    trabajo: "Administración",
    monto: "",
    plazo: "",
    tipoCredito: "Credito Personal",
    ingresosMensuales: "",
    gastosMensuales: "",
    tipoGarantia: "Fiador",
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

  /* =====================================================
     FASE 1
     ===================================================== */

  const handlePaso1 = (e) => {
    e.preventDefault();
    setMensajeError("");

    if (!formData.nombre || !formData.apellidos || !formData.edad) {
      setMensajeError("Por favor completa todos los campos");
      return;
    }

    const edad = parseInt(formData.edad);

    if (isNaN(edad) || edad < 18) {
      setMensajeError("La edad debe ser de 18 años o más");
      return;
    }

    if (edad > 80) {
      setMensajeError("La edad no puede ser mayor a 80 años");
      return;
    }

    scrollToTop();
    setFase(2);
  };

  /* =====================================================
     FASE 2
     ===================================================== */

  const handlePaso2 = (e) => {
    e.preventDefault();
    setMensajeError("");

    if (!formData.monto || !formData.plazo || !formData.tipoCredito) {
      setMensajeError("Por favor completa todos los campos");
      return;
    }

    const monto = parseFloat(formData.monto);
    const plazo = parseFloat(formData.plazo);

    if (isNaN(monto) || monto <= 0) {
      setMensajeError("El monto debe ser mayor a 0");
      return;
    }

    if (isNaN(plazo) || plazo <= 0) {
      setMensajeError("El plazo debe ser mayor a 0");
      return;
    }

    scrollToTop();
    setFase(3);
  };

  /* =====================================================
     FASE 3
     ===================================================== */

  const handlePaso3 = (e) => {
    e.preventDefault();
    setMensajeError("");

    if (!formData.ingresosMensuales || !formData.gastosMensuales) {
      setMensajeError("Por favor completa todos los campos");
      return;
    }

    const ingresos = parseFloat(formData.ingresosMensuales);
    const gastos = parseFloat(formData.gastosMensuales);

    if (isNaN(ingresos) || ingresos <= 0) {
      setMensajeError("Los ingresos deben ser mayores a 0");
      return;
    }

    if (isNaN(gastos) || gastos < 0) {
      setMensajeError("Los gastos no pueden ser negativos");
      return;
    }

    console.log("Datos del crédito NU:", formData);

    scrollToTop();

    // Aquí posteriormente puede ir la evaluación
    // o la navegación hacia la página correspondiente.
  };

  return (
    <div>
      <Header titulo="Inicio" />

      <main className="gotonu_page">

        <div id="allNU">

          {/* =====================================================
              IMAGEN PRINCIPAL
              ===================================================== */}

          <img
            id="NU1"
            src="/SRC/IMAGES/PROCESOC/NU/1NU.png"
            alt="Proceso de Crédito"
          />

          {/* =====================================================
              MENSAJE DE ERROR
              ===================================================== */}

          {mensajeError && (
            <div id="errorNU">
              {mensajeError}
            </div>
          )}

          {/* =====================================================
              FASE 1
              ===================================================== */}

          {fase === 1 && (
            <form onSubmit={handlePaso1} id="oculNU0">

              <h1 id="StitleNU">
                FASE 1
              </h1>

              <h2 id="sentenceNU1">
                Hola te invitamos a Ingresar tus datos Basicos
                <br />
                Queremos conocerte
              </h2>

              <img
                id="imgpnu"
                src="/SRC/IMAGES/PROCESOC/NU/INU1.jpg"
                alt="Paso 1"
              />

              <h2>Nombre(s)</h2>

              <input
                id="inputNomNU"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleChange}
                required
              />

              <h2>Apellidos</h2>

              <input
                id="inputApeNU"
                name="apellidos"
                type="text"
                value={formData.apellidos}
                onChange={handleChange}
                required
              />

              <h2>Edad</h2>

              <input
                id="inputEdadNU"
                name="edad"
                type="number"
                value={formData.edad}
                onChange={handleChange}
                required
              />

              <h2>Conyuge (si aplica)</h2>

              <select
                id="inputConyNU"
                name="conyuge"
                value={formData.conyuge}
                onChange={handleChange}
              >
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>

              <h2>Hijos (si aplica)</h2>

              <select
                id="inputHijosNU"
                name="hijos"
                value={formData.hijos}
                onChange={handleChange}
              >
                <option value="Si">Si</option>
                <option value="No">No</option>
              </select>

              <h2>Trabajo o Actividad</h2>

              <select
                id="inputLabNU"
                name="trabajo"
                value={formData.trabajo}
                onChange={handleChange}
              >

                <optgroup label="Administración y Finanzas">
                  <option value="Administración">
                    Administración
                  </option>
                  <option value="Auditoría">
                    Auditoría
                  </option>
                  <option value="Contabilidad">
                    Contabilidad
                  </option>
                  <option value="Finanzas">
                    Finanzas
                  </option>
                  <option value="Marketing digital">
                    Marketing digital
                  </option>
                  <option value="Recursos Humanos">
                    Recursos Humanos
                  </option>
                  <option value="Consultoría">
                    Consultoría
                  </option>
                  <option value="Logística">
                    Logística
                  </option>
                  <option value="Comercio exterior">
                    Comercio exterior
                  </option>
                  <option value="Comercio minorista">
                    Comercio minorista
                  </option>
                  <option value="Comercio mayorista">
                    Comercio mayorista
                  </option>
                </optgroup>

                <optgroup label="Agricultura y Agroindustria">
                  <option value="Agricultura">
                    Agricultura
                  </option>
                  <option value="Agroindustria">
                    Agroindustria
                  </option>
                  <option value="Agropecuaria">
                    Agropecuaria
                  </option>
                  <option value="Ganadería">
                    Ganadería
                  </option>
                  <option value="Pesca">
                    Pesca
                  </option>
                  <option value="Silvicultura">
                    Silvicultura
                  </option>
                  <option value="Jardinería">
                    Jardinería
                  </option>
                  <option value="Apicultura">
                    Apicultura
                  </option>
                  <option value="Floristería">
                    Floristería
                  </option>
                </optgroup>

                <optgroup label="Arte, Diseño y Comunicación">
                  <option value="Arquitectura">
                    Arquitectura
                  </option>
                  <option value="Artes escénicas">
                    Artes escénicas
                  </option>
                  <option value="Artes plásticas">
                    Artes plásticas
                  </option>
                  <option value="Diseño de modas">
                    Diseño de modas
                  </option>
                  <option value="Diseño gráfico">
                    Diseño gráfico
                  </option>
                  <option value="Diseño industrial">
                    Diseño industrial
                  </option>
                  <option value="Fotografía">
                    Fotografía
                  </option>
                  <option value="Publicidad">
                    Publicidad
                  </option>
                  <option value="Periodismo">
                    Periodismo
                  </option>
                  <option value="Animación">
                    Animación
                  </option>
                  <option value="Música">
                    Música
                  </option>
                  <option value="Videojuegos">
                    Videojuegos
                  </option>
                  <option value="Decoración">
                    Decoración
                  </option>
                </optgroup>

                <optgroup label="Ciencia y Tecnología">
                  <option value="Ciencia de datos">
                    Ciencia de datos
                  </option>
                  <option value="Ciencias ambientales">
                    Ciencias ambientales
                  </option>
                  <option value="Ciencias naturales">
                    Ciencias naturales
                  </option>
                  <option value="Ciencias sociales">
                    Ciencias sociales
                  </option>
                  <option value="Matemáticas">
                    Matemáticas
                  </option>
                  <option value="Biología">
                    Biología
                  </option>
                  <option value="Química">
                    Química
                  </option>
                  <option value="Ingeniería civil">
                    Ingeniería civil
                  </option>
                  <option value="Ingeniería de alimentos">
                    Ingeniería de alimentos
                  </option>
                  <option value="Ingeniería de sistemas">
                    Ingeniería de sistemas
                  </option>
                  <option value="Ingeniería electrónica">
                    Ingeniería electrónica
                  </option>
                  <option value="Ingeniería industrial">
                    Ingeniería industrial
                  </option>
                  <option value="Ingeniería mecánica">
                    Ingeniería mecánica
                  </option>
                  <option value="Telecomunicaciones">
                    Telecomunicaciones
                  </option>
                  <option value="Informática">
                    Informática
                  </option>
                </optgroup>

                <optgroup label="Salud y Bienestar">
                  <option value="Medicina">Medicina</option>
                  <option value="Enfermería">Enfermería</option>
                  <option value="Psicología">Psicología</option>
                  <option value="Nutrición">Nutrición</option>
                  <option value="Farmacia">Farmacia</option>
                  <option value="Radiología">Radiología</option>
                  <option value="Salud pública">
                    Salud pública
                  </option>
                  <option value="Veterinaria">
                    Veterinaria
                  </option>
                  <option value="Estética y belleza">
                    Estética y belleza
                  </option>
                </optgroup>

                <optgroup label="Educación y Formación">
                  <option value="Docencia">Docencia</option>
                  <option value="Bibliotecología">
                    Bibliotecología
                  </option>
                  <option value="Gestión cultural">
                    Gestión cultural
                  </option>
                  <option value="Gestión deportiva">
                    Gestión deportiva
                  </option>
                  <option value="Voluntariado">
                    Voluntariado
                  </option>
                </optgroup>

                <optgroup label="Industria y Manufactura">
                  <option value="Fabricación">
                    Fabricación
                  </option>
                  <option value="Albañilería">
                    Albañilería
                  </option>
                  <option value="Carpintería">
                    Carpintería
                  </option>
                  <option value="Soldadura">
                    Soldadura
                  </option>
                  <option value="Reparaciones y oficios varios">
                    Reparaciones y oficios varios
                  </option>
                  <option value="Mecánica automotriz">
                    Mecánica automotriz
                  </option>
                  <option value="Minería">Minería</option>
                  <option value="Costura">Costura</option>
                  <option value="Confección textil">
                    Confección textil
                  </option>
                  <option value="Panadería">Panadería</option>
                  <option value="Peluquería">Peluquería</option>
                </optgroup>

                <optgroup label="Servicios y Otros">
                  <option value="Atención al cliente">
                    Atención al cliente
                  </option>
                  <option value="Hotelería">Hotelería</option>
                  <option value="Restauración">
                    Restauración
                  </option>
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
                  <option value="Criminología">
                    Criminología
                  </option>
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
                  <option value="Desempleado">
                    Desempleado
                  </option>
                </optgroup>

              </select>

              <br />

              <button type="submit">
                SIGUIENTE
              </button>

            </form>
          )}

          {/* =====================================================
              FASE 2
              ===================================================== */}

          {fase === 2 && (
            <form onSubmit={handlePaso2} id="oculNU1">

              <h1 id="StitleNU">
                FASE 2
              </h1>

              <img
                id="imgpnu2"
                src="/SRC/IMAGES/PROCESOC/NU/INU2.jpg"
                alt="Paso 2"
              />

              <h2>
                Monto Solicitado
              </h2>

              <input
                id="inputMontNU"
                name="monto"
                type="number"
                value={formData.monto}
                onChange={handleChange}
                required
              />

              <h2>
                Plazos pago
              </h2>

              <input
                id="inputPlazNU"
                name="plazo"
                type="number"
                value={formData.plazo}
                onChange={handleChange}
                required
              />

              <h2>
                Tipo de Credito
              </h2>

              <select
                id="inputTCNU"
                name="tipoCredito"
                value={formData.tipoCredito}
                onChange={handleChange}
              >
                <option value="Credito Personal">
                  Credito Personal
                </option>

                <option value="Credito Libre Inversion">
                  Credito Libre Inversion
                </option>

                <option value="Credito Vehicular">
                  Credito Vehicular
                </option>

                <option value="Credito Vivienda">
                  Credito Vivienda
                </option>
              </select>

              <button type="submit">
                ENVIAR
              </button>

              <br />

            </form>
          )}

          {/* =====================================================
              FASE 3
              ===================================================== */}

          {fase === 3 && (
            <form onSubmit={handlePaso3} id="oculNU2">

              <h1 id="StitleNU">
                FASE 3
              </h1>

              <img
                id="imgpnu3"
                src="/SRC/IMAGES/PROCESOC/NU/INU3.png"
                alt="Paso 3"
              />

              <h2>
                Cuales son sus ingresos mensuales
              </h2>

              <input
                id="inputIMNU"
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
                id="inputGMNU"
                name="gastosMensuales"
                type="number"
                value={formData.gastosMensuales}
                onChange={handleChange}
                required
              />

              <h2>
                Tipo de Garantia
              </h2>

              <select
                id="inputGarNU"
                name="tipoGarantia"
                value={formData.tipoGarantia}
                onChange={handleChange}
              >
                <option value="Fiador">
                  Fiador
                </option>

                <option value="Hipoteca">
                  Hipoteca
                </option>

                <option value="Prenda">
                  Prenda
                </option>

                <option value="Ninguna">
                  Ninguna
                </option>
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

export default CreditoNU;