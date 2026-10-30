import React, { useState } from 'react';
import { SENA_RIGHTS, SENA_DUTIES, PRACTICAL_CASES } from '../data/senaData';
import { 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Scale, 
  HelpCircle, 
  AlertTriangle, 
  FileText, 
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const RightsAndDuties: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'derechos' | 'deberes' | 'reglamento' | 'casos'>('derechos');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case-1');
  const [userChoice, setUserChoice] = useState<string | null>(null);

  const currentCase = PRACTICAL_CASES.find(c => c.id === selectedCaseId) || PRACTICAL_CASES[0];

  return (
    <div className="space-y-12 py-8">
      {/* Header section */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-2">
          <span>Reglamento del Aprendiz SENA</span>
          <span aria-hidden="true">·</span>
          <span>Acuerdo 009 de 2024</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Derechos, Deberes y Régimen de Convivencia
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
          El Reglamento del Aprendiz es la carta de navegación de tu estancia en el SENA. Define las garantías institucionales para tu crecimiento humano y técnico, así como las normas indispensables para una convivencia pacífica, segura y productiva.
        </p>
      </div>

      {/* Segmented Controller */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-2xl">
        <button
          onClick={() => setActiveSection('derechos')}
          className={`flex-1 min-w-[130px] px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'derechos'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Derechos del Aprendiz
        </button>
        <button
          onClick={() => setActiveSection('deberes')}
          className={`flex-1 min-w-[130px] px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'deberes'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Deberes y Responsabilidades
        </button>
        <button
          onClick={() => setActiveSection('reglamento')}
          className={`flex-1 min-w-[130px] px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'reglamento'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Régimen Disciplinario
        </button>
        <button
          onClick={() => setActiveSection('casos')}
          className={`flex-1 min-w-[130px] px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSection === 'casos'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Simulador de Casos
        </button>
      </div>

      {/* Section 1: Derechos */}
      {activeSection === 'derechos' && (
        <div className="space-y-6">
          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
            <Info className="w-4 h-4 text-[#007832] dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Principio de Garantía Institucional:</span>
              <span>El SENA vela por la integridad física, académica y emocional de cada aprendiz. Tus derechos son inalienables desde el momento en que formalizas tu matrícula.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SENA_RIGHTS.map((item) => (
              <div 
                key={item.id}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-[#39A900] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-[#007832] dark:text-emerald-400 font-semibold">{item.article}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                      Garantía
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/60 dark:bg-slate-800/60 p-3 rounded-lg">
                  <span className="font-semibold text-slate-700 dark:text-slate-200 block mb-1">Ejemplo en la práctica:</span>
                  <span>{item.practicalCase}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 2: Deberes */}
      {activeSection === 'deberes' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Compromiso Formativo:</span>
              <span>Los deberes garantizan un entorno propicio para el aprendizaje técnico seguro, la sana convivencia y el respeto por los bienes públicos entregados para tu formación.</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SENA_DUTIES.map((item) => (
              <div 
                key={item.id}
                className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">{item.article}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded">
                      Obligatorio
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 bg-rose-50/40 dark:bg-rose-950/30 p-3 rounded-lg border border-rose-100/60 dark:border-rose-900/40">
                  <span className="font-semibold text-rose-800 dark:text-rose-300 block mb-1">Consecuencia del incumplimiento:</span>
                  <span className="text-rose-700 dark:text-rose-400">{item.consequence}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Régimen Disciplinario */}
      {activeSection === 'reglamento' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">
                Faltas Leves
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Llamado Formativo</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Conductas que alteran levemente el normal desarrollo formativo sin poner en peligro a personas o bienes (e.g. retraso ocasional, no portar visiblemente el carné por olvido puntual).
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded">
                <strong className="text-slate-700 dark:text-slate-200">Medida:</strong> Llamado de atención verbal pedagógico y compromiso escrito con el instructor.
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                Faltas Graves
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Comité y Condicionamiento</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Incumplimiento reiterado de deberes, inasistencia injustificada de 3 días, daño negligente de maquinaria o ingreso a talleres sin Elementos de Protección Personal (EPP).
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded">
                <strong className="text-slate-700 dark:text-slate-200">Medida:</strong> Remisión a Comité de Evaluación y Seguimiento, Plan de Mejoramiento concertado y posible condicionamiento.
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm">
              <div className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wide mb-1">
                Faltas Gravísimas
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Cancelación de Matrícula</h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                Comportamientos que atentan gravemente contra la integridad (agresión física o psicológica, suplantación en carné/exámenes, porte de armas, consumo de sustancias psicoactivas o fraude grave).
              </p>
              <div className="text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/70 p-2.5 rounded">
                <strong className="text-slate-700 dark:text-slate-200">Medida:</strong> Cancelación de matrícula e inhabilidad para ingresar al SENA de 6 meses a 3 años.
              </div>
            </div>
          </div>

          {/* El Debido Proceso */}
          <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#39A900] dark:text-emerald-400" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                El Debido Proceso en el SENA
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Ningún aprendiz puede ser sancionado sin que se respete el debido proceso consagrado en la Constitución Política y en el Reglamento del Aprendiz SENA. Este proceso garantiza:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">1. Notificación Previa</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">Comunicación oficial con copia de las evidencias o queja radicada en su contra.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">2. Derecho a Descargos</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">Oportunidad de presentar su versión oral o escrita y aportar pruebas que lo respalden.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">3. Comité Imparcial</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">Integrado por instructor vocero, coordinador académico, bienestar y representante de aprendices.</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl">
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">4. Recurso de Reposición</span>
                <p className="text-xs text-slate-600 dark:text-slate-400">Derecho a apelar cualquier resolución sancionatoria ante el Subdirector del Centro.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: Simulador de Casos Cotidianos */}
      {activeSection === 'casos' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-sm space-y-8">
          <div>
            <div className="text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
              Aprendizaje Basado en Problemas
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Simulador Interactivo de Casos Cotidianos
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
              Pon a prueba cómo responderías ante situaciones frecuentes que viven los aprendices en el Centro de Formación.
            </p>
          </div>

          {/* Case Navigation Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 border-b border-slate-100 dark:border-slate-800">
            {PRACTICAL_CASES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedCaseId(c.id);
                  setUserChoice(null);
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  selectedCaseId === c.id
                    ? 'bg-[#39A900] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Caso 0{i + 1}: {c.title}
              </button>
            ))}
          </div>

          {/* Active Case Card */}
          <div className="space-y-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                Situación Planteada
              </span>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {currentCase.situation}
              </p>
              <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 font-semibold">
                Pregunta: {currentCase.question}
              </div>
            </div>

            {/* User choice interactive buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => setUserChoice('correct')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  userChoice === 'correct'
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-2 ring-emerald-400'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Opción A
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {currentCase.correctAction}
                </p>
              </button>

              <button
                onClick={() => setUserChoice('wrong')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  userChoice === 'wrong'
                    ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/40 ring-2 ring-rose-400'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  Opción B
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {currentCase.wrongAction}
                </p>
              </button>
            </div>

            {/* Feedback based on choice */}
            {userChoice && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                userChoice === 'correct'
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
              }`}>
                <div className="font-bold flex items-center gap-1.5 mb-1">
                  {userChoice === 'correct' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>¡Respuesta Correcta conforme al Reglamento!</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      <span>Acción Incorrecta según el Reglamento</span>
                    </>
                  )}
                </div>
                <p>{currentCase.tip}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
