import React, { useState } from 'react';
import { 
  Workflow, 
  Briefcase, 
  GraduationCap, 
  Laptop, 
  ExternalLink, 
  CheckCircle, 
  HelpCircle,
  FileCheck,
  HeartHandshake
} from 'lucide-react';

export const TrainingPathways: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<'lectiva' | 'productiva'>('lectiva');
  const [activeAlternative, setActiveAlternative] = useState<number>(0);

  const ALTERNATIVES = [
    {
      name: 'Contrato de Aprendizaje',
      badge: 'Más Común',
      description: 'Acuerdo formativo y laboral entre una empresa patrocinadora y el aprendiz, regulado por la Ley 789 de 2002. La empresa brinda afiliación a EPS y ARL, además de un apoyo de sostenimiento mensual (50% SMMLV en lectiva y 75% o 100% en productiva según tasa de desempleo nacional).',
      requirements: 'Estar registrado en el Sistema de Gestión Virtual de Aprendices (Caprendizaje / SGVA).'
    },
    {
      name: 'Vínculo Laboral o Contractual',
      badge: 'Trabajadores Activos',
      description: 'Si el aprendiz ya trabaja en una empresa y sus funciones laborales guardan directa relación con las competencias del programa de formación, la empresa certifica el desempeño del aprendiz.',
      requirements: 'Certificación laboral detallada con funciones afines al programa avaladas por el instructor asesor.'
    },
    {
      name: 'Proyecto Productivo (I+D / SENA Emprende)',
      badge: 'Emprendimiento',
      description: 'Desarrollo de un proyecto empresarial, prototipo tecnológico o plan de negocios sustentado ante jurados del SENA, articulado a TecnoParque, Fondo Emprender o semilleros de investigación SENNOVA.',
      requirements: 'Presentación del documento de formulación de proyecto, prototipo funcional y cronograma avalado.'
    },
    {
      name: 'Pasantía (Comunitaria o en PYME)',
      badge: 'Social y Técnico',
      description: 'Práctica concertada entre el SENA y una entidad pública, ONG, unidad productiva familiar o empresa, donde el aprendiz desarrolla actividades técnicas específicas sin constituir contrato formal de aprendizaje.',
      requirements: 'Convenio interinstitucional firmado y plan de trabajo de pasantía.'
    },
    {
      name: 'Monitoría en el SENA',
      badge: 'En Sede SENA',
      description: 'El aprendiz apoya actividades técnicas y de formación en ambientes de aprendizaje, laboratorios o bibliotecas del propio Centro de Formación, recibiendo una resolución formal de monitoría.',
      requirements: 'Convocatoria interna del Centro, excelencia académica y no tener sanciones disciplinarias.'
    }
  ];

  const SENA_PLATFORMS = [
    {
      name: 'Sofia Plus',
      purpose: 'Gestión académica, inscripción a cursos, descarga de certificados oficiales y registro de novedades de matrícula.',
      tag: 'Portal Transaccional'
    },
    {
      name: 'Zajuna (LMS)',
      purpose: 'Ambiente virtual de aprendizaje institucional donde interactúas con instructores, descargas guías y subes evidencias.',
      tag: 'Aula Virtual'
    },
    {
      name: 'Sistema de Bibliotecas SENA',
      purpose: 'Acceso a millones de libros digitales, bases de datos científicas mundiales (Scopus, IEEE, ProQuest) y repositorio institucional.',
      tag: 'Investigación'
    },
    {
      name: 'Agencia Pública de Empleo (APE)',
      purpose: 'Intermediación laboral pública y gratuita que conecta a los aprendices y egresados SENA con ofertas de trabajo en todo Colombia.',
      tag: 'Empleabilidad'
    }
  ];

  return (
    <div className="space-y-12 py-8">
      {/* Intro Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-2">
          <span>Metodología de Formación Profesional</span>
          <span aria-hidden="true">·</span>
          <span>SENA Colombia</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          La Ruta Formativa: De las Aulas al Sector Productivo
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          La formación en el SENA es teórico-práctica y orientada por proyectos reales. Conoce cómo se dividen tus etapas de formación y qué alternativas tienes para certificar tu etapa productiva.
        </p>
      </div>

      {/* Visual Classroom Image & Stage Split */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-100 dark:bg-slate-800">
            <img 
              src="/src/assets/images/sena_learning_environment_1793115150970.jpg"
              alt="Ambiente de trabajo colaborativo en el SENA"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center space-y-6">
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg max-w-sm">
              <button
                onClick={() => setSelectedStage('lectiva')}
                className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${
                  selectedStage === 'lectiva'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1. Etapa Lectiva
              </button>
              <button
                onClick={() => setSelectedStage('productiva')}
                className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-md transition-all ${
                  selectedStage === 'productiva'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                2. Etapa Productiva
              </button>
            </div>

            {selectedStage === 'lectiva' ? (
              <div className="space-y-4">
                <div className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wide">
                  Desarrollo de Competencias en el Centro
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Etapa Lectiva: Construcción del Saber y Saber Hacer
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Durante este periodo adquieres las competencias técnicas, básicas y transversales (ética, comunicación, bilingüismo, SST y medio ambiente). La evaluación se realiza a través de 3 tipos de evidencias:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">De Conocimiento</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Cuestionarios, pruebas conceptuales y mapas mentales.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">De Desempeño</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Observación directa en talleres, simuladores y prácticas guiadas.</p>
                  </div>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">De Producto</span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Entregables tangibles: software, planos, prototipos o informes técnicos.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wide">
                  Inmersión en el Mundo Laboral
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Etapa Productiva: Validación en Entornos Reales
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Permite aplicar y consolidar los conocimientos adquiridos en la resolución de problemas reales en una empresa o institución durante 6 meses (para técnicos y tecnólogos).
                </p>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs text-emerald-950 dark:text-emerald-200">
                  <strong>Requisito indispensable:</strong> Tener el 100% de los resultados de aprendizaje de la etapa lectiva evaluados y aprobados en Sofia Plus para ser habilitado.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modalidades de Etapa Productiva */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-sm space-y-6 transition-colors duration-300">
        <div>
          <div className="text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
            Flexibilidad y Oportunidades
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Alternativas para Desarrollar tu Etapa Productiva
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            El SENA reconoce diversas formas de aplicación para que ningún aprendiz quede sin certificar su formación.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-2">
            {ALTERNATIVES.map((alt, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAlternative(idx)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                  activeAlternative === idx
                    ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    {alt.name}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {alt.badge}
                  </span>
                </div>
                <FileCheck className={`w-4 h-4 ${activeAlternative === idx ? 'text-[#39A900] dark:text-emerald-400' : 'text-slate-400'}`} />
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 p-6 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {ALTERNATIVES[activeAlternative].name}
              </h3>
              <span className="text-xs font-mono text-[#007832] dark:text-emerald-400 bg-emerald-100/60 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
                Modalidad Oficial
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {ALTERNATIVES[activeAlternative].description}
            </p>
            <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300">
              <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Requisitos y Gestión:</span>
              <span>{ALTERNATIVES[activeAlternative].requirements}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plataformas Digitales SENA */}
      <section className="space-y-6">
        <div>
          <div className="text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
            Ecosistema Tecnológico
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Plataformas Oficiales del SENA
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            Herramientas indispensables que usarás diariamente durante toda tu trayectoria como aprendiz.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SENA_PLATFORMS.map((plat, idx) => (
            <div key={idx} className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-[#007832] dark:text-emerald-400 uppercase tracking-wider block mb-1">
                  {plat.tag}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {plat.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {plat.purpose}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
