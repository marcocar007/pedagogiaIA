import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/router';

// Ejemplo de tipos y niveles de aprendizaje (puedes expandir o personalizar)
const tiposAprendizaje = [
  {
    nombre: 'Cognitivo',
    descripcion: 'Procesos mentales: recordar, comprender, analizar, crear, etc.',
    niveles: [
      { nivel: 'Conocimiento', ejemplo: 'Recordar conceptos, reglas o hechos.' },
      { nivel: 'Comprensión', ejemplo: 'Explicar ideas en tus propias palabras.' },
      { nivel: 'Aplicación', ejemplo: 'Usar el conocimiento en situaciones nuevas.' },
      { nivel: 'Análisis', ejemplo: 'Separar en partes, distinguir componentes.' },
      { nivel: 'Evaluación', ejemplo: 'Emitir juicios, argumentar o defender una idea.' },
      { nivel: 'Creación', ejemplo: 'Generar algo nuevo, diseñar, escribir o proponer.' },
    ],
  },
  {
    nombre: 'Afectivo',
    descripcion: 'Valores, actitudes, motivaciones y emociones.',
    niveles: [
      { nivel: 'Recepción', ejemplo: 'Escuchar con atención, mostrar interés.' },
      { nivel: 'Respuesta', ejemplo: 'Participar activamente, responder, opinar.' },
      { nivel: 'Valoración', ejemplo: 'Demostrar compromiso, defender un valor.' },
      { nivel: 'Organización', ejemplo: 'Priorizar valores, resolver conflictos.' },
      { nivel: 'Caracterización', ejemplo: 'Vivir de acuerdo a valores, actuar coherentemente.' },
    ],
  },
  {
    nombre: 'Psicomotriz',
    descripcion: 'Movimientos, habilidades físicas, coordinación, ejecución de tareas.',
    niveles: [
      { nivel: 'Percepción', ejemplo: 'Reconocer señales y estímulos.' },
      { nivel: 'Preparación', ejemplo: 'Estar listo para actuar.' },
      { nivel: 'Respuesta guiada', ejemplo: 'Imitar, seguir instrucciones, practicar.' },
      { nivel: 'Mecanización', ejemplo: 'Hacer tareas con destreza y práctica.' },
      { nivel: 'Adaptación', ejemplo: 'Modificar una acción según el contexto.' },
      { nivel: 'Creación', ejemplo: 'Desarrollar nuevas formas de hacer o resolver.' },
    ],
  },
];

export default function Objetivo() {
  const [tipo, setTipo] = useState('');
  const [nivel, setNivel] = useState('');
  const router = useRouter();

  // Traer ejemplos del tipo seleccionado
  const tipoSeleccionado = tiposAprendizaje.find(t => t.nombre === tipo);

  const handleNext = (e) => {
    e.preventDefault();
    if (!tipo || !nivel) {
      alert('Por favor, selecciona el tipo y el nivel de aprendizaje.');
      return;
    }
    localStorage.setItem('tipoAprendizaje', tipo);
    localStorage.setItem('nivelAprendizaje', nivel);
    router.push('/contexto');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Define el objetivo de aprendizaje</h1>
        <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg" onSubmit={handleNext}>
          <label className="block mb-2 font-semibold">Selecciona el tipo de aprendizaje (según la Taxonomía de Bloom):</label>
          <select className="w-full border rounded p-2 mb-4" value={tipo} onChange={e => {setTipo(e.target.value); setNivel('')}} required>
            <option value="">Elige una opción...</option>
            {tiposAprendizaje.map(t => (
              <option key={t.nombre} value={t.nombre}>{t.nombre}</option>
            ))}
          </select>

          {tipo && (
            <>
              <div className="mb-2 text-sm italic text-gray-700">{tipoSeleccionado.descripcion}</div>
              <label className="block mb-2 font-semibold">Selecciona el nivel de aprendizaje:</label>
              <select className="w-full border rounded p-2 mb-4" value={nivel} onChange={e => setNivel(e.target.value)} required>
                <option value="">Elige un nivel...</option>
                {tipoSeleccionado.niveles.map(n => (
                  <option key={n.nivel} value={n.nivel}>{n.nivel} – {n.ejemplo}</option>
                ))}
              </select>
            </>
          )}

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Siguiente</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
