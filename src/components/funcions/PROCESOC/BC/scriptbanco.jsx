import { useState } from 'react';

export default function FormularioCredito() {
  const [fase, setFase] = useState(1);

  // --- ESTADOS PARA LOS INPUTS ---
  const [nom, setNom] = useState("");
  const [ape, setApe] = useState("");
  const [edad, setEdad] = useState("");
  const [cony, setCony] = useState("");
  const [hijos, setHijos] = useState("");
  const [lab, setLab] = useState("");

  const [mont, setMont] = useState("");
  const [plaz, setPlaz] = useState("");
  const [tc, setTc] = useState("");

  const [im, setIm] = useState("");
  const [gm, setGm] = useState("");
  const [gar, setGar] = useState("");

  // --- ESTADOS DE LÓGICA ---
  const [scoreI, setScoreI] = useState(0);
  const [intC, setIntC] = useState(0);
  const [estadoEvaluacion, setEstadoEvaluacion] = useState(null);

  // --- FUNCIONES AUXILIARES ---
  const soloNumeros = (valor) => valor.replace(/[^0-9]/g, "");

  const Volver1 = () => {
    window.location.href = "../MAIN/index.html";
  };

  // --- FASE 1 ---
  const Recdatos1 = () => {
    const edadNum = parseInt(edad, 10);

    if (!nom || !ape || !edad || !cony || !hijos || !lab || nom === "." || nom === " ") {
      alert("Recuerde Completar los campos correctamente.");
      return;
    }

    if (edadNum < 18) {
      alert(`No puedes acceder, tienes ${edadNum}, eres menor de Edad`);
      return;
    }

    alert(`Tu Nombre es: ${nom}, Tu Apellido es: ${ape}, Tu Edad es: ${edadNum}, Tiene Cónyuge: ${cony}, Tiene Hijos: ${hijos}, Trabaja en: ${lab}`);

    let nuevoScore = 0;

    if (edadNum >= 18 && edadNum <= 25) nuevoScore -= 10;
    else if (edadNum >= 26 && edadNum <= 59) nuevoScore += 10;
    else if (edadNum >= 60 && edadNum <= 75) nuevoScore += 0;
    else if (edadNum >= 76) nuevoScore -= 10;

    if (cony === "Si") nuevoScore += 10;

    const BuenTrabajo = ["Medicina", "Enfermería", "Psicología", "Nutrición", "Farmacia", "Radiología", "Veterinaria", "Ingeniería civil", "Ingeniería de alimentos", "Ingeniería de sistemas", "Ingeniería electrónica", "Ingeniería industrial", "Ingeniería mecánica", "Ciencia de datos", "Matemáticas", "Biología", "Química", "Derecho", "Administración", "Contabilidad", "Finanzas", "Docencia", "Desarrollo de software", "Psicología forense"];
    const MalTrabajo = ["Trabajo informal", "Trabajo doméstico", "Limpieza y aseo", "Costura", "Confección textil", "Albañilería", "Reparaciones y oficios varios", "Peluquería", "Seguridad privada", "Reciclaje"];
    const VarTrabajo = ["Marketing digital", "Recursos Humanos", "Consultoría", "Logística", "Comercio exterior", "Comercio minorista", "Comercio mayorista", "Periodismo", "Publicidad", "Diseño gráfico", "Diseño industrial", "Arquitectura", "Animación", "Música", "Ciencias ambientales", "Ciencias naturales", "Ciencias sociales", "Informática", "Salud pública", "Gestión ambiental", "Gestión cultural", "Gestión deportiva", "Minería", "Panadería", "Hotelería", "Restauración", "Transporte", "Ventas", "Turismo", "Administración pública", "Gestión de proyectos", "Atención al cliente"];
    const DesTrabajo = ["Desempleado"];

    if (BuenTrabajo.includes(lab)) nuevoScore += 10;
    else if (MalTrabajo.includes(lab)) nuevoScore += 5;
    else if (VarTrabajo.includes(lab)) nuevoScore += 5;
    else if (DesTrabajo.includes(lab)) {
      nuevoScore -= 15;
      alert("Score reducido por desempleo: " + nuevoScore);
    }

    setScoreI(nuevoScore);
    setFase(2);
  };

  // --- FASE 2 ---
  const Recdatos2 = () => {
    if (!mont || !plaz || !tc) {
      alert("Recuerde Completar los campos");
      return;
    }

    const montoNum = parseFloat(mont);
    const plazosNum = parseFloat(plaz);
    alert(`Cantidad Monto: ${montoNum} Cantidad Plazos: ${plazosNum} Tipo Crédito: ${tc}`);

    let currentScore = scoreI;
    const RMC = montoNum / plazosNum;

    if (RMC <= 500000) {
      currentScore += 10;
    } else if (RMC > 1500000) {
      currentScore -= 10;
    }

    let currentIntC = 0;
    let scoreMinimo = 0;
    let rechazado = false;

    if (tc === "Credito Personal") {
      currentIntC = 1;
      scoreMinimo = 10;
    } else if (tc === "Credito Libre Inversion") {
      currentIntC = 2;
      scoreMinimo = 15;
    } else if (tc === "Credito Vehicular") {
      currentIntC = 3;
      scoreMinimo = 20;
    } else if (tc === "Credito Vivienda") {
      currentIntC = 4;
      scoreMinimo = 25;
    }

    if (currentScore < scoreMinimo) {
      alert(`❌ CRÉDITO RECHAZADO\nScore: ${currentScore} | Mínimo requerido: ${scoreMinimo}`);
      setEstadoEvaluacion(false);
      rechazado = true;
    }

    if (!rechazado) {
      setScoreI(currentScore);
      setIntC(currentIntC);
      setFase(3);
    }

    return rechazado;
  };

  // --- FASE 3 ---
  const Recdatos3 = () => {
    if (!im || !gm || !gar) {
      alert("Recuerde Completar los campos");
      return;
    }

    const ingresosNum = parseFloat(im);
    const gastosNum = parseFloat(gm);
    const montoNum = parseFloat(mont);
    const plazosNum = parseFloat(plaz);

    alert(`Ingresos Mensuales: ${ingresosNum} Gastos Mensuales: ${gastosNum} Garantía: ${gar}`);

    let PorR = 0;
    if (intC === 1) {
      PorR = 0.30;
    } else if (intC === 2) {
      PorR = 0.35;
    } else if (intC === 3) {
      PorR = 0.25;
    } else if (intC === 4) {
      PorR = 0.40;
    }

    const capacidadDisponible = (ingresosNum - gastosNum) * PorR;
    const cuotaMensual = montoNum / plazosNum;

    console.log(`Ingresos: ${ingresosNum}`);
    console.log(`Gastos: ${gastosNum}`);
    console.log(`Capacidad disponible: ${capacidadDisponible}`);
    console.log(`Cuota mensual: ${cuotaMensual}`);
    console.log(`Garantía: ${gar}`);

    const aprobado = cuotaMensual <= capacidadDisponible || (cuotaMensual > capacidadDisponible && gar !== "Ninguna");

    if (aprobado) {
      alert(`✅ CRÉDITO APROBADO\nCuota mensual: ${cuotaMensual.toFixed(2)} | Capacidad: ${capacidadDisponible.toFixed(2)}`);
      setEstadoEvaluacion(true);
    } else {
      alert(`❌ CRÉDITO RECHAZADO\nCuota mensual: ${cuotaMensual.toFixed(2)} | Capacidad: ${capacidadDisponible.toFixed(2)} | Sin garantía`);
      setEstadoEvaluacion(false);
    }

    return aprobado;
  };

  return (
    <div>
      <h2>{fase === 1 ? "Fase 1" : fase === 2 ? "Fase 2" : "Fase 3"}</h2>
      <button onClick={Volver1}>Volver</button>
      <p>Score actual: {scoreI}</p>
      {estadoEvaluacion !== null && (
        <p style={{ color: estadoEvaluacion ? 'green' : 'red', fontWeight: 'bold' }}>
          Estado: {estadoEvaluacion ? '✅ APROBADO' : '❌ RECHAZADO'}
        </p>
      )}

      {/* --- RENDERIZADO CONDICIONAL DE FASES --- */}
      
      {fase === 1 && (
        <div id="ocul0">
          <input placeholder="Nombre" value={nom} onChange={(e) => setNom(e.target.value)} />
          <input placeholder="Apellido" value={ape} onChange={(e) => setApe(e.target.value)} />
          <input placeholder="Edad" value={edad} onChange={(e) => setEdad(soloNumeros(e.target.value))} />
          <input placeholder="Cónyuge (Si/No)" value={cony} onChange={(e) => setCony(e.target.value)} />
          <input placeholder="Hijos" value={hijos} onChange={(e) => setHijos(e.target.value)} />
          <input placeholder="Trabajo" value={lab} onChange={(e) => setLab(e.target.value)} />
          <button onClick={Recdatos1}>Siguiente</button>
        </div>
      )}

      {fase === 2 && (
        <div id="ocul1">
          <p id="sentence1">Excelente, {nom}, un placer conocerte. Ahora ingresa la información de tu crédito.</p>
          <input placeholder="Monto" value={mont} onChange={(e) => setMont(e.target.value)} />
          <input placeholder="Plazo" value={plaz} onChange={(e) => setPlaz(e.target.value)} />
          <input placeholder="Tipo de Crédito" value={tc} onChange={(e) => setTc(e.target.value)} />
          <button onClick={Recdatos2}>Siguiente</button>
        </div>
      )}

      {fase === 3 && (
        <div id="ocul2">
          <input placeholder="Ingresos Mensuales" value={im} onChange={(e) => setIm(soloNumeros(e.target.value))} />
          <input placeholder="Gastos Mensuales" value={gm} onChange={(e) => setGm(soloNumeros(e.target.value))} />
          <input placeholder="Garantía" value={gar} onChange={(e) => setGar(e.target.value)} />
          <button onClick={Recdatos3}>Finalizar Evaluación</button>
        </div>
      )}
    </div>
  );
}