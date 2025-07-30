import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Contexto() {
  const [ambiente, setAmbiente] = useState('');
  const [conocPrevios, setConocPrevios] = useState('');
  const [motivacion, setMotivacion] = useState('');
  const [formasAprender, setFormasAprender] = useState('');
  const [tecnologia, setTecnologia] = useState('');
  const [duracion, setDuracion] = useState('');
  const [indicaciones, setIndicaciones] = useState('');
  const [archivo, setArchivo] = useState(null);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('El archivo no debe ser mayor a 5MB.');
      e.target.value = '';
      setArchivo(null);
    } else {
      setArchivo(file);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Puedes agregar validaciones aquí si deseas que todos los campos sean obligatorios
    localStorage.setItem('ambiente', ambiente);
    localStorage.setItem('conocPrevios', conocPrevios);
    localStorage.setItem('motivacion', motivacion);
    localStorage.setItem('formasAprender', formasAprender);
    localStorage.setItem('tecnologia', tecnologia);
    localStorage.setItem('duracion', duracion);
    localStorage.setItem('indicaciones', indicaciones);
    // Para simplificar, no guardamos archivo en localStorage (requiere manejo especial)
    router.push('/uso-ia');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black font-sans">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">Contexto del aprendizaje</h1>
        <form className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg" onSubmit={handleNext}>
          <div className="mb-2 text-sm font-semibold">🧭 Antes de crear tu actividad, pensemos en el contexto educativo. El contexto educativo es todo lo que rodea al estudiante y afecta cómo y qué aprende.</div>
          <label className="block mt-4 mb-1 font-semibold">🌎 Ambiente de aprendizaje</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Ej: Son 22 estudiantes. Se distraen con el teléfono." value={ambiente} onChange={e => setAmbiente(e.target.value)} required />

          <label className="block mb-1 font-semibold">🎒 Conocimientos previos</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Ej: En bioética, tienen una idea general de lo que es la ética." value={conocPrevios} onChange={e => setConocPrevios(e.target.value)} required />

          <label className="block mb-1 font-semibold">❤️ Sentimientos y motivación</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Ej: El tema no les interesa, creen que es innecesario y difícil." value={motivacion} onChange={e => setMotivacion(e.target.value)} required />

          <label className="block mb-1 font-semibold">🤝 Formas de aprender</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Ej: Prefieren aprender haciendo y en equipos pequeños." value={formasAprender} onChange={e => setFormasAprender(e.target.value)} required />

          <label className="block mb-1 font-semibold">💻 Tecnología disponible</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Ej: Tenemos proyector, acceso a Internet y aplicaciones gratuitas de IA." value={tecnologia} onChange={e => setTecnologia(e.target.value)} required />

          <label className="block mb-1 font-semibold">⏰ Duración estimada de la actividad</label>
          <input className="w-full border rounded p-2 mb-2" placeholder="Ej: 30 minutos" value={duracion} onChange={e => setDuracion(e.target.value)} required />

          <label className="block mb-1 font-semibold">📝 Indicaciones o restricciones</label>
          <textarea className="w-full border rounded p-2 mb-2" rows={2} placeholder="Ej: La actividad debe implicar exposición, argumentos, uso de videos..." value={indicaciones} onChange={e => setIndicaciones(e.target.value)} />

          <label className="block mb-1 font-semibold">📎 Subir archivo (PDF, Word o TXT, máx. 5MB y 5 páginas, opcional)</label>
          <input type="file" className="mb-4" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
          <div className="text-xs text-gray-500 mb-4">Si no tienes archivo o texto para añadir, puedes saltar esta opción.</div>

          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Siguiente</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
