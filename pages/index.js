import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [nivel, setNivel] = useState('');
  const [carrera, setCarrera] = useState('');
  const [materia, setMateria] = useState('');
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    // Validaciones
    if (!nivel || !materia || ((nivel === 'Licenciatura' || nivel === 'Posgrado' || nivel === 'Diplomado') && !carrera)) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }
    // Guarda en localStorage para siguientes pantallas
    localStorage.setItem('nivel', nivel);
    localStorage.setItem('carrera', carrera);
    localStorage.setItem('materia', materia);
    router.push('/objetivo');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Asesor Pedagógico con IA</h1>
        <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg" onSubmit={handleNext}>
          <label className="block mb-2 font-semibold">Selecciona el nivel educativo:</label>
          <select className="w-full border rounded p-2 mb-4" value={nivel} onChange={e => setNivel(e.target.value)} required>
            <option value="">Elige una opción...</option>
            <option>Jardín de niños</option>
            <option>Primaria</option>
            <option>Secundaria</option>
            <option>Bachillerato</option>
            <option>Licenciatura</option>
            <option>Posgrado</option>
            <option>Diplomado</option>
          </select>
          {(nivel === 'Licenciatura' || nivel === 'Posgrado' || nivel === 'Diplomado') && (
            <>
              <label className="block mb-2 font-semibold">Escribe la carrera:</label>
              <input
                type="text"
                className="w-full border rounded p-2 mb-4"
                placeholder="Ejemplo: Administración de Empresas"
                value={carrera}
                onChange={e => setCarrera(e.target.value)}
                required
              />
            </>
          )}
          <label className="block mb-2 font-semibold">Escribe la materia que impartes:</label>
          <input
            type="text"
            className="w-full border rounded p-2 mb-6"
            placeholder="Ejemplo: Filosofía, Nutrición Clínica..."
            value={materia}
            onChange={e => setMateria(e.target.value)}
            required
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Siguiente</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
