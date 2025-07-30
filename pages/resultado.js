import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Simulación de función cerebral y rúbrica (puedes conectar con IA o BD)
function obtenerFuncionCerebral(tipo, nivel) {
  if (tipo === 'Cognitivo') return 'Procesos ejecutivos: análisis, memoria y razonamiento.';
  if (tipo === 'Afectivo') return 'Sistema límbico: emociones, motivación, valoración.';
  if (tipo === 'Psicomotriz') return 'Corteza motora: coordinación, ejecución de movimientos.';
  return '';
}

function generarRúbrica(via, nivel) {
  if (via === 'Vía 1') {
    return [
      { criterio: 'Dominio del contenido', peso: 0.5 },
      { criterio: 'Claridad en la exposición', peso: 0.3 },
      { criterio: 'Cumplimiento de indicaciones', peso: 0.2 },
    ];
  } else {
    return [
      { criterio: 'Uso crítico de la IA', peso: 0.35 },
      { criterio: 'Reflexión sobre el proceso', peso: 0.25 },
      { criterio: 'Calidad del producto final', peso: 0.25 },
      { criterio: 'Cumplimiento de indicaciones', peso: 0.15 },
    ];
  }
}

export default function Resultado() {
  const [datos, setDatos] = useState(null);
  const [propuesta, setPropuesta] = useState(null);
  const [rubrica, setRubrica] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Cargar datos de localStorage
    const tipoAprendizaje = localStorage.getItem('tipoAprendizaje');
    const nivelAprendizaje = localStorage.getItem('nivelAprendizaje');
    const via = localStorage.getItem('via');
    const propuestaElegida = JSON.parse(localStorage.getItem('propuestaElegida') || '{}');
    const ambiente = localStorage.getItem('ambiente');
    const conocPrevios = localStorage.getItem('conocPrevios');
    const motivacion = localStorage.getItem('motivacion');
    const formasAprender = localStorage.getItem('formasAprender');
    const tecnologia = localStorage.getItem('tecnologia');
    const duracion = localStorage.getItem('duracion');
    const indicaciones = localStorage.getItem('indicaciones');
    setDatos({ tipoAprendizaje, nivelAprendizaje, via, ambiente, conocPrevios, motivacion, formasAprender, tecnologia, duracion, indicaciones });
    setPropuesta(propuestaElegida);
    setRubrica(generarRúbrica(via, nivelAprendizaje));
  }, []);

  if (!datos || !propuesta) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="bg-white shadow-xl rounded-xl p-8 max-w-2xl w-full">
          <h1 className="text-2xl font-bold mb-4">Actividad seleccionada</h1>
          <div className="mb-2">
            <span className="font-semibold">Vía pedagógica:</span> {datos.via}<br />
            <span className="font-semibold">Nivel de uso de IA:</span> {datos.via === 'Vía 1' ? 'Sin IA o uso muy restringido' : 'Con colaboración activa de IA'}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Tipo de aprendizaje:</span> {datos.tipoAprendizaje}<br />
            <span className="font-semibold">Nivel:</span> {datos.nivelAprendizaje}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Función cerebral que se activa:</span> {obtenerFuncionCerebral(datos.tipoAprendizaje, datos.nivelAprendizaje)}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Objetivo de aprendizaje:</span> {datos.nivelAprendizaje ? `Desarrollar la habilidad de ${datos.nivelAprendizaje.toLowerCase()} en la materia seleccionada, aplicando el enfoque pedagógico elegido.` : ''}
          </div>
          <div className="mb-4">
            <span className="font-semibold">Contexto educativo:</span>
            <ul className="list-disc ml-8 text-sm">
              <li><b>Ambiente:</b> {datos.ambiente}</li>
              <li><b>Conocimientos previos:</b> {datos.conocPrevios}</li>
              <li><b>Motivación:</b> {datos.motivacion}</li>
              <li><b>Formas de aprender:</b> {datos.formasAprender}</li>
              <li><b>Tecnología disponible:</b> {datos.tecnologia}</li>
              <li><b>Duración estimada:</b> {datos.duracion}</li>
              <li><b>Indicaciones/restricciones:</b> {datos.indicaciones}</li>
            </ul>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Materiales y tecnologías necesarias:</span>
            <span className="block">Proyector, computadora, acceso a Internet, materiales impresos, etc. (personaliza según tu contexto)</span>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Descripción paso a paso de la actividad:</span>
            <ol className="list-decimal ml-8 text-sm">
              <li>Presenta el objetivo y contexto de la actividad a los estudiantes.</li>
              <li>Explica la modalidad (con o sin IA) según la vía pedagógica elegida.</li>
              <li>Realiza la actividad: {propuesta.titulo}. {propuesta.descripcion}</li>
              <li>Supervisa y acompaña a los estudiantes según sus necesidades.</li>
              <li>Recoge evidencias y evalúa con la rúbrica detallada.</li>
            </ol>
          </div>
          <div className="mb-4">
            <span className="font-semibold">Rúbrica de evaluación:</span>
            <table className="w-full mt-2 mb-4 border text-xs">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-1">Criterio</th>
                  <th className="border px-2 py-1">Ponderación</th>
                </tr>
              </thead>
              <tbody>
                {rubrica.map((r, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1">{r.criterio}</td>
                    <td className="border px-2 py-1">{Math.round(r.peso*100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-8 text-green-700 font-semibold">
            Gracias por utilizar esta aplicación. Recuerda: La IA puede mejorar y potenciar el proceso de enseñanza-aprendizaje, y para ello, el desafío no es tecnológico, es pedagógico.
          </div>
          <div className="flex gap-4">
            <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={()=>window.location.href='/'}>
              Crear una nueva actividad
            </button>
            <button className="bg-gray-200 text-black py-2 px-4 rounded" onClick={()=>window.print()}>
              Descargar en PDF
            </button>
            {/* Botón de Word se puede implementar con una librería de exportación */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
