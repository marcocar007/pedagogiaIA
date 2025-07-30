import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/router';

// Simulación de generación de propuestas (en el proyecto real, aquí se llama a la API de ChatGPT)
const generarPropuestas = (via) => {
  if (via === 'Vía 1') {
    return [
      {
        titulo: 'Examen oral presencial',
        descripcion: 'Evaluación individual para validar comprensión sin ayuda de IA.'
      },
      {
        titulo: 'Prueba práctica en clase',
        descripcion: 'Simulación o resolución de casos reales bajo supervisión, sin IA.'
      }
    ];
  } else {
    return [
      {
        titulo: 'Desarrollo de ensayo asistido por IA',
        descripcion: 'El estudiante utiliza IA para analizar un tema y reflexiona sobre el proceso.'
      },
      {
        titulo: 'Diseño colaborativo de proyecto con IA',
        descripcion: 'Estudiantes y IA co-crean una propuesta y documentan sus decisiones.'
      }
    ];
  }
};

export default function Propuestas() {
  const [seleccion, setSeleccion] = useState(null);
  const router = useRouter();

  // Traer la vía elegida de localStorage
  const via = typeof window !== 'undefined' ? localStorage.getItem('via') : '';

  const propuestas = generarPropuestas(via);

  const handleSelect = (index) => {
    // Guarda la opción seleccionada y avanza
    localStorage.setItem('propuestaElegida', JSON.stringify(propuestas[index]));
    setSeleccion(index);
    setTimeout(() => router.push('/resultado'), 600);
  };

  const handleNuevas = () => {
    // En un sistema real aquí puedes pedir nuevas propuestas (API)
    window.location.reload(); // Solo para demo
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Propuestas de actividad</h1>
        <p className="mb-4 max-w-xl text-justify text-sm">
          La Universidad de Nueva Galés del Sur, perteneciente al Go8 de Australia, desglosa seis formas de usar o restringir la IA que permite a docentes elegir opciones pedagógicas flexibles para alinear el uso de la IA con los objetivos de aprendizaje específicos de cada tarea o asignatura. Elige la propuesta que más te convenga o genera nuevas opciones.
        </p>
        <div className="w-full max-w-2xl flex flex-col gap-6 mb-8">
          {propuestas.map((p, i) => (
            <div key={i} className={`border rounded-xl shadow p-6 transition-all ${seleccion===i ? 'border-blue-600 bg-blue-50' : ''}`}>
              <h2 className="font-bold text-lg mb-2">{p.titulo}</h2>
              <p className="mb-3 text-sm">{p.descripcion}</p>
              <button
                className={`bg-blue-600 text-white font-semibold py-2 px-6 rounded ${seleccion===i ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                disabled={seleccion===i}
                onClick={() => handleSelect(i)}
              >
                Elegir esta propuesta
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-4 mb-8">
          <button className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400" onClick={handleNuevas}>
            Generar otras dos propuestas nuevas
          </button>
          <button className="bg-gray-100 text-black py-2 px-4 rounded hover:bg-gray-200" onClick={() => router.push('/uso-ia')}>
            Cambiar vía pedagógica
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
