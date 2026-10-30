import React, { useState } from 'react';
import { SENA_TRAMITES_009, AcademicProcedure } from '../data/senaData';
import { 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  ChevronRight, 
  Award, 
  UserCheck, 
  RefreshCw, 
  ExternalLink,
  Layers
} from 'lucide-react';

export const AcademicProcedures009: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'all' | 'ingreso' | 'permanencia' | 'novedades' | 'reingreso' | 'certificacion'>('novedades');
  const [selectedProcedureId, setSelectedProcedureId] = useState<string>('novedad-aplazamiento');
  
  // Interactive Procedure Assistant simulator state
  const [simulatedCase, setSimulatedCase] = useState<string>('aplazamiento');
  const [hasJustificationDocs, setHasJustificationDocs] = useState<boolean>(true);
  const [academicStanding, setAcademicStanding] = useState<'al_dia' | 'pendientes'>('al_dia');

  const filteredProcedures = activeStage === 'all' 
    ? SENA_TRAMITES_009 
    : SENA_TRAMITES_009.filter(p => p.stage === activeStage);

  const selectedProcedure = SENA_TRAMITES_009.find(p => p.id === selectedProcedureId) || SENA_TRAMITES_009[0];

  return (
    <div className="space-y-12 py-8">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-2">
          <span>Acuerdo 009 de 2024</span>
          <span aria-hidden="true">·</span>
          <span>Reglamento del Aprendiz SENA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Ciclo de Formación y Trámites Académico-Administrativos
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          Conoce los lineamientos oficiales del <strong>Acuerdo 009 de 2024</strong> que regulan tu trayectoria desde el ingreso hasta la certificación, incluyendo las condiciones, plazos perentorios y consecuencias de cada novedad de formación.
        </p>
      </div>

      {/* Lifecycle Flow Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-2 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => { setActiveStage('ingreso'); setSelectedProcedureId('tramite-ingreso'); }}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl text-center transition-all ${
            activeStage === 'ingreso'
              ? 'bg-white dark:bg-slate-900 text-[#007832] dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <UserCheck className="w-5 h-5 mb-1.5 text-[#39A900]" />
          <span className="text-xs font-semibold">1. Ingreso</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Matrícula e Inducción</span>
        </button>

        <button
          onClick={() => { setActiveStage('permanencia'); setSelectedProcedureId('tramite-permanencia'); }}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl text-center transition-all ${
            activeStage === 'permanencia'
              ? 'bg-white dark:bg-slate-900 text-[#007832] dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-5 h-5 mb-1.5 text-[#39A900]" />
          <span className="text-xs font-semibold">2. Permanencia</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Asistencia y Guías</span>
        </button>

        <button
          onClick={() => { setActiveStage('novedades'); setSelectedProcedureId('novedad-aplazamiento'); }}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl text-center transition-all col-span-2 sm:col-span-1 ${
            activeStage === 'novedades'
              ? 'bg-white dark:bg-slate-900 text-[#007832] dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <RefreshCw className="w-5 h-5 mb-1.5 text-[#39A900]" />
          <span className="text-xs font-semibold">3. Novedades</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Traslado / Aplazamiento</span>
        </button>

        <button
          onClick={() => { setActiveStage('reingreso'); setSelectedProcedureId('tramite-reingreso'); }}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl text-center transition-all ${
            activeStage === 'reingreso'
              ? 'bg-white dark:bg-slate-900 text-[#007832] dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Calendar className="w-5 h-5 mb-1.5 text-[#39A900]" />
          <span className="text-xs font-semibold">4. Reingreso</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Post-aplazamiento</span>
        </button>

        <button
          onClick={() => { setActiveStage('certificacion'); setSelectedProcedureId('tramite-certificacion'); }}
          className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl text-center transition-all ${
            activeStage === 'certificacion'
              ? 'bg-white dark:bg-slate-900 text-[#007832] dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-5 h-5 mb-1.5 text-[#39A900]" />
          <span className="text-xs font-semibold">5. Certificación</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Paz y Salvo y Grado</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Procedure Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            {activeStage === 'novedades' 
              ? 'Catálogo de Novedades Académicas' 
              : 'Trámites de esta Fase'}
          </div>

          <div className="space-y-2">
            {filteredProcedures.map((proc) => {
              const isSelected = proc.id === selectedProcedureId;
              return (
                <button
                  key={proc.id}
                  onClick={() => setSelectedProcedureId(proc.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    isSelected
                      ? 'border-[#39A900] bg-white dark:bg-slate-900 shadow-md ring-2 ring-[#39A900]/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-semibold uppercase text-[#007832] dark:text-emerald-400">
                      {proc.stage}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Acuerdo 009
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {proc.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {proc.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Quick Notice Card */}
          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-[#39A900]" />
              <span>Garantía de Trámite en SofiaPlus</span>
            </div>
            <p className="leading-relaxed">
              Todos los trámites deben radicarse formalmente en el sistema oficial del SENA antes del vencimiento de los términos reglamentarios. Los acuerdos verbales no tienen validez legal.
            </p>
          </div>
        </div>

        {/* Right Column: Detailed Procedure Card */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8 transition-colors duration-300">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-3">
              {selectedProcedure.normativeBasis}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {selectedProcedure.title}
            </h2>
            <div className="text-xs sm:text-sm text-[#007832] dark:text-emerald-400 font-semibold mt-1">
              {selectedProcedure.subtitle}
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed">
              {selectedProcedure.description}
            </p>
          </div>

          {/* Critical Highlights Box: Deadlines and Consequences */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Plazos y Términos Perentorios</span>
              </div>
              <p className="text-xs text-amber-800 dark:text-amber-200/90 leading-relaxed">
                {selectedProcedure.deadlines}
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                <span>Efectos y Consecuencias</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {selectedProcedure.consequencesOrBenefits}
              </p>
            </div>
          </div>

          {/* Requirements Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Requisitos Obligatorios (Acuerdo 009 de 2024):
            </h4>
            <div className="space-y-2">
              {selectedProcedure.requirements.map((req, rIdx) => (
                <div 
                  key={rIdx}
                  className="p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Procedure Step by Step */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Procedimiento Formal Paso a Paso:
            </h4>
            <div className="space-y-2">
              {selectedProcedure.procedureSteps.map((step, sIdx) => (
                <div 
                  key={sIdx}
                  className="p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3 shadow-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0 text-[11px] font-bold">
                    {sIdx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Institutional Tip */}
          <div className="p-4 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-start gap-3 text-xs">
            <Sparkles className="w-5 h-5 text-[#007832] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-emerald-950 dark:text-emerald-200 block">
                Recomendación Clave para Aprendices:
              </span>
              <p className="text-emerald-900 dark:text-emerald-300/90 leading-relaxed">
                {selectedProcedure.interactiveTip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Simulator: Decision Assistant for Academic Procedures */}
      <div className="bg-gradient-to-br from-emerald-50/60 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-emerald-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            <span>Simulador de Trámites y Novedades</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            ¿Qué novedad o trámite necesitas gestionar hoy?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Selecciona tu caso particular para verificar al instante los tiempos límites, requisitos documentales y evitar sanciones o causales de deserción.
          </p>
        </div>

        {/* Simulator Case Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <button
            onClick={() => setSimulatedCase('aplazamiento')}
            className={`p-4 rounded-xl border text-left transition-all ${
              simulatedCase === 'aplazamiento'
                ? 'border-[#39A900] bg-white dark:bg-slate-800 ring-2 ring-[#39A900]/20 font-bold'
                : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 hover:border-slate-300'
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
              Suspender por salud o trabajo
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
              Trámite de Aplazamiento (hasta 6 meses)
            </span>
          </button>

          <button
            onClick={() => setSimulatedCase('traslado')}
            className={`p-4 rounded-xl border text-left transition-all ${
              simulatedCase === 'traslado'
                ? 'border-[#39A900] bg-white dark:bg-slate-800 ring-2 ring-[#39A900]/20 font-bold'
                : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 hover:border-slate-300'
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
              Cambiarme de Sede o Ciudad
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
              Trámite de Traslado entre Centros
            </span>
          </button>

          <button
            onClick={() => setSimulatedCase('reingreso')}
            className={`p-4 rounded-xl border text-left transition-all ${
              simulatedCase === 'reingreso'
                ? 'border-[#39A900] bg-white dark:bg-slate-800 ring-2 ring-[#39A900]/20 font-bold'
                : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 hover:border-slate-300'
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
              Regresar tras una pausa
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
              Trámite de Reingreso formal
            </span>
          </button>

          <button
            onClick={() => setSimulatedCase('certificacion')}
            className={`p-4 rounded-xl border text-left transition-all ${
              simulatedCase === 'certificacion'
                ? 'border-[#39A900] bg-white dark:bg-slate-800 ring-2 ring-[#39A900]/20 font-bold'
                : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 hover:border-slate-300'
            }`}
          >
            <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
              Terminé lectiva y productiva
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
              Trámite de Certificación y Grado
            </span>
          </button>
        </div>

        {/* Simulator Diagnostic Output */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="text-xs font-mono font-bold uppercase text-[#007832] dark:text-emerald-400">
              Diagnóstico Reglamentario Oficial · Acuerdo 009 de 2024
            </div>
            <span className="text-[11px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
              SofiaPlus Activo
            </span>
          </div>

          {simulatedCase === 'aplazamiento' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                <strong>¿Cuál es tu procedimiento exacto?</strong> Debes radicar la solicitud en <em>SofiaPlus &gt; Aprendiz &gt; Gestión de Novedades &gt; Aplazamiento</em>, adjuntando la incapacidad médica certificada por EPS o la constancia de calamidad/trabajo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Plazo Máximo Autorizado:</span>
                  <span>Hasta seis (6) meses continuos. Prorrogable únicamente por servicio militar o maternidad.</span>
                </div>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg text-amber-900 dark:text-amber-200">
                  <span className="font-bold block mb-0.5">¡Evita la deserción!</span>
                  <span>Debes radicar la solicitud de reingreso al menos 1 mes antes de que venzan los 6 meses de aplazamiento.</span>
                </div>
              </div>
            </div>
          )}

          {simulatedCase === 'traslado' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                <strong>¿Cuándo es viable el traslado?</strong> Puedes solicitarlo si ya aprobaste el 1er trimestre lectivo, estás al día académicamente y existe un cupo disponible en el Centro o jornada de destino.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Término de Radicación:</span>
                  <span>Mínimo 10 días hábiles antes de culminar el trimestre académico actual en SofiaPlus.</span>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-200">
                  <span className="font-bold block mb-0.5">Homologación Automática:</span>
                  <span>El 100% de las competencias y resultados aprobados en tu centro de origen se conservan sin costo.</span>
                </div>
              </div>
            </div>
          )}

          {simulatedCase === 'reingreso' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                <strong>Procedimiento de reincorporación:</strong> Radica en SofiaPlus tu solicitud formal adjuntando el acto administrativo de aplazamiento previo.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Requisito de Tiempo:</span>
                  <span>Mínimo un (1) mes antes de la fecha de inicio del periodo académico al que deseas integrarte.</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Cambio de Diseño Curricular:</span>
                  <span>Si el programa cambió de versión durante tu ausencia, se te aplicará un plan de homologación pedagógico.</span>
                </div>
              </div>
            </div>
          )}

          {simulatedCase === 'certificacion' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <p>
                <strong>Ruta final hacia el grado:</strong> Debes verificar que en SofiaPlus todas tus competencias lectivas y tu etapa productiva (bitácoras + formato 023 firmado) aparezcan en estado <em>Aprobado</em>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">Paz y Salvo Integral:</span>
                  <span>No adeudar libros en biblioteca, herramientas en almacén ni tener requerimientos de bienestar.</span>
                </div>
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-900 dark:text-emerald-200">
                  <span className="font-bold block mb-0.5">Entrega Digital Gratuita:</span>
                  <span>Descarga tu Diploma y Acta de Grado con firma digital y código de validación QR sin ningún costo.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
