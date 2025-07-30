export default function Header() {
  return (
    <header className="py-4 border-b text-center bg-white">
      <img src="/logo-ucem.png" alt="Logo UCEM" className="h-12 mx-auto mb-2" />
      <h1 className="text-xl font-bold">Asesor Pedagógico con IA</h1>
      <div className="text-sm mt-1">
        Aplicación creada por el maestro Marco Carlos Avalos Rosado, Coordinador de formación Integral Académica y Docente (Dirección General de Recursos Humanos y protección de Datos, Instituto Cultural Manuel José Othón, UCEM)
      </div>
      <div className="italic text-base mt-2">
        “Crea fácilmente actividades de aprendizaje con sustento pedagógico que utilicen o no Inteligencia Artificial.”
      </div>
    </header>
  );
}
