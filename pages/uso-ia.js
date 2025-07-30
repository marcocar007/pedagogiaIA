import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/router';

const textoUsoIA = `
Docente: Revisa la siguiente información para que puedas elegir el nivel de uso o no uso de IA con un sustento pedagógico:

Información sobre uso de la IA
Desde el lanzamiento público de ChatGPT en noviembre de 2022, estudiantes y docentes han incorporado la IA en la enseñanza a distintos niveles. Esto generó debates sobre cómo integrarla para potenciar el aprendizaje y mitigar sus riesgos. Uno de los enfoques que ha sido adoptado por universidades de diversas partes del mundo es el propuesto universidades del Grupo de los Ocho (Go8) de Australia como la Universidad de Sídney, que desarrollaron el enfoque de las dos vías: un enfoque innovador para integrar la IA generativa en la educación sin prohibirla, sino usándola de forma pedagógica, ética y estratégica.

Enfoque de las dos vías
Este modelo define la política general sobre el uso de la IA en el aprendizaje y su evaluación.

Objetivo: Asegurar rigurosamente el aprendizaje y desarrollar competencias contemporáneas, enseñando explícitamente a los estudiantes a colaborar y aprender con la IA de forma productiva, crítica y ética.

🛣️ Este enfoque tiene dos grandes rutas pedagógicas:
Vía 1: aseguramiento del aprendizaje y Vía 2: Colaboración estudiante-IA

Vía 1: Aseguramiento del aprendizaje (Vía cerrada)
- Propósito (control riguroso): Se centra en la "evaluación del aprendizaje" para validar de forma fidedigna que los estudiantes han alcanzado los resultados de aprendizaje de una asignatura.
- Características: Evaluaciones y actividades seguras, controladas y, por lo general, presenciales. El uso de IA generativa está prohibido o regulado. Busca garantizar que el trabajo presentado sea íntegramente del estudiante.
- Reglas: Presentar contenido generado por IA como propio, sin declaración, o donde su uso está prohibido, es considerado plagio. Si no hay autorización explícita, el uso de IA es "asistencia no autorizada" (equivalente a plagio o fraude académico).
- Ejemplos: Exámenes orales, pruebas prácticas presenciales, exámenes supervisados. La IA se permite como correctora ortográfica y gramatical y gestión de referencias, declarando su uso.

Vía 2: Colaboración estudiante-IA (Vía Abierta)
- Propósito: Se enfoca en la "evaluación para y como aprendizaje" (formativa). Aquí, el uso de la IA es asumido e incluso activamente fomentado.
- Enfoque: No solo medir el resultado, sino enseñar a interactuar productiva, crítica y éticamente con la IA. Se evalúa la colaboración, el pensamiento crítico y la capacidad de integración.
- Alfabetización en IA: Desarrollar la alfabetización en IA como competencia esencial (comprender capacidades, límites, sesgos, ética).
- Reglas: Requiere documentación del uso de la IA (prompts, respuestas, reflexión crítica), que es un elemento fundamental en la evaluación.
- Ejemplos: Simulación de dietas, diseño de propuestas, simulaciones de demandas legales, análisis de datos o desarrollo de ensayos con IA. La IA es catalizadora del pensamiento crítico.

En resumen, el enfoque de Dos Vías establece una estrategia general para la institución (Vía 1 para asegurar lo fundamental, Vía 2 para desarrollar habilidades con IA).`;

const opcionesVia = [
  { value: 'Vía 1', label: 'Vía 1: Aseguramiento del aprendizaje (Vía cerrada)' },
  { value: 'Vía 2', label: 'Vía 2: Colaboración estudiante-IA (Vía abierta)' },
];

export default function UsoIA() {
  const [via, setVia] = useState('');
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    if (!via) {
      alert('Por favor, selecciona una vía pedagógica.');
      return;
    }
    localStorage.setItem('via', via);
    router.push('/propuestas');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Uso de IA en la actividad</h1>
        <div className="bg-gray-100 p-4 rounded mb-6 max-w-2xl text-justify whitespace-pre-line text-sm">
          {textoUsoIA}
        </div>
        <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg" onSubmit={handleNext}>
          <label className="block mb-4 font-semibold">Selecciona la vía pedagógica que quieres aplicar en tu actividad:</label>
          <select className="w-full border rounded p-2 mb-6" value={via} onChange={e => setVia(e.target.value)} required>
            <option value="">Elige una opción...</option>
            {opcionesVia.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Avanzar</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
