import React, { useState } from 'react';
import { 
  SENA_REGIMEN_FALTAS_009, 
  SENA_MEDIDAS_009, 
  SENA_COMITE_MIEMBROS, 
  SENA_COMITE_FASES,
  DisciplinaryFault,
  InstitutionalMeasure
} from '../data/senaData';
import { 
  Scale, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Users, 
  FileText, 
  Clock, 
  Gavel, 
  HelpCircle, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  UserCheck,
  ChevronRight
} from 'lucide-react';

export const DisciplinaryRegime009: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'faltas' | 'medidas' | 'comite' | 'simulador'>('faltas');
  const [faultFilter, setFaultFilter] = useState<'all' | 'academica' | 'disciplinaria'>('all');
  const [gravityFilter, setGravityFilter] = useState<'all' | 'leve' | 'grave' | 'gravisima'>('all');
  
  // Interactive Committee Simulator State
  const [simulatedCaseId, setSimulatedCaseId] = useState<'caso-plagio' | 'caso-sst' | 'caso-inasistencia'>('caso-plagio');
  const [learnerDefenseSubmitted, setLearnerDefenseSubmitted] = useState<boolean>(false);
  const [hasEvidenceProof, setHasEvidenceProof] = useState<boolean>(true);

  const filteredFaults = SENA_REGIMEN_FALTAS_009.filter(f => {
    const matchesType = faultFilter === 'all' || f.type === faultFilter;
    const matchesGravity = gravityFilter === 'all' || f.gravity === gravityFilter;
    return matchesType && matchesGravity;
  });

  return (
    <div className="space-y-12 py-8">
      {/* Header Banner */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-2">
          <span>Acuerdo 009 de 2024 · Régimen de Convivencia</span>
          <span aria-hidden="true">·</span>
          <span>Debido Proceso Institucional</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Régimen de Faltas, Medidas y Comité de Evaluación
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
          El <strong>Acuerdo 009 de 2024</strong> garantiza los principios constitucionales de presunción de inocencia, derecho a la defensa y debido proceso en el SENA. Distingue con claridad las medidas formativas (pedagógicas) de las disciplinarias (sanciones) y norma el funcionamiento del Comité de Evaluación y Seguimiento.
        </p>
      </div>

      {/* Segmented Controller */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-3xl">
        <button
          onClick={() => setActiveTab('faltas')}
          className={`flex-1 min-w-[140px] px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'faltas'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          1. Régimen de Faltas
        </button>
        <button
          onClick={() => setActiveTab('medidas')}
          className={`flex-1 min-w-[140px] px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'medidas'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          2. Formativas vs Disciplinarias
        </button>
        <button
          onClick={() => setActiveTab('comite')}
          className={`flex-1 min-w-[140px] px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'comite'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          3. Comité de Evaluación
        </button>
        <button
          onClick={() => setActiveTab('simulador')}
          className={`flex-1 min-w-[140px] px-4 py-2.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'simulador'
              ? 'bg-white dark:bg-slate-900 text-[#007832] dark:text-emerald-400 shadow-sm border border-emerald-200 dark:border-emerald-800 font-bold'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          4. Simulador de Audiencia
        </button>
      </div>

      {/* TAB 1: RÉGIMEN DE FALTAS */}
      {activeTab === 'faltas' && (
        <div className="space-y-8">
          {/* Explanation Banner */}
          <div className="p-5 bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider block">
                Criterios de Tipificación según Acuerdo 009 de 2024
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl">
                Se califica la falta atendiendo a: grado de culpabilidad (dolo o culpa), reiteración de la conducta, daño causado a la comunidad o al patrimonio institucional, y los antecedentes de conducta del aprendiz.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 shrink-0">
              <select
                value={faultFilter}
                onChange={(e: any) => setFaultFilter(e.target.value)}
                className="text-xs px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              >
                <option value="all">Todas las Naturalezas</option>
                <option value="academica">Faltas Académicas</option>
                <option value="disciplinaria">Faltas Disciplinarias</option>
              </select>

              <select
                value={gravityFilter}
                onChange={(e: any) => setGravityFilter(e.target.value)}
                className="text-xs px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
              >
                <option value="all">Todas las Gravedades</option>
                <option value="leve">Leves</option>
                <option value="grave">Graves</option>
                <option value="gravisima">Gravísimas</option>
              </select>
            </div>
          </div>

          {/* Faults Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredFaults.map((fault) => {
              const isGravisima = fault.gravity === 'gravisima';
              const isGrave = fault.gravity === 'grave';

              return (
                <div 
                  key={fault.id}
                  className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4 hover:border-[#39A900] transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        fault.type === 'academica'
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          : 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                      }`}>
                        Falta {fault.type}
                      </span>

                      <span className={`text-[11px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        isGravisima 
                          ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800' 
                          : isGrave 
                          ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      }`}>
                        {fault.gravity}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {fault.name}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {fault.description}
                    </p>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 text-[11px] space-y-1">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        Caso Práctico en Ambientes:
                      </span>
                      <p className="text-slate-500 dark:text-slate-400 italic">
                        "{fault.realExample}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                    <span className="font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wide block">
                      Medida Aplicable:
                    </span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {fault.applicableMeasure}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: MEDIDAS FORMATIVAS VS DISCIPLINARIAS */}
      {activeTab === 'medidas' && (
        <div className="space-y-10">
          {/* Comparison Concept Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#39A900]" />
                <h3 className="text-sm font-bold text-emerald-950 dark:text-emerald-200 uppercase tracking-wider">
                  Medidas Formativas (Pedagógicas)
                </h3>
              </div>
              <p className="text-xs text-emerald-900 dark:text-emerald-300/90 leading-relaxed">
                Tienen como finalidad exclusiva acompañar, orientar y nivelar al aprendiz. <strong>NO constituyen sanción disciplinaria</strong> ni se registran como antecedentes negativos en la hoja de vida institucional.
              </p>
              <div className="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold pt-1">
                • Llamado de atención verbal · Plan de Mejoramiento Académico (hasta 30 días) · Plan Disciplinario
              </div>
            </div>

            <div className="p-6 bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="text-sm font-bold text-rose-950 dark:text-rose-200 uppercase tracking-wider">
                  Medidas Disciplinarias (Sancionatorias)
                </h3>
              </div>
              <p className="text-xs text-rose-900 dark:text-rose-300/90 leading-relaxed">
                Son sanciones formales impuestas <strong>únicamente por el Subdirector de Centro</strong>, previo trámite del debido proceso en el Comité de Evaluación y Seguimiento, ante faltas graves o gravísimas.
              </p>
              <div className="text-[11px] text-rose-800 dark:text-rose-400 font-semibold pt-1">
                • Llamado por escrito con copia a hoja de vida · Condicionamiento de matrícula · Cancelación de matrícula
              </div>
            </div>
          </div>

          {/* Full Catalogue of Measures */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Catálogo de Medidas Institucionales (Acuerdo 009 de 2024)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SENA_MEDIDAS_009.map((m) => (
                <div 
                  key={m.id}
                  className={`p-6 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm space-y-4 flex flex-col justify-between ${
                    m.category === 'formativa'
                      ? 'border-emerald-200 dark:border-emerald-900/60'
                      : 'border-rose-200 dark:border-rose-900/60'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full ${
                        m.category === 'formativa'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}>
                        Medida {m.category}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {m.title}
                    </h4>

                    <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      Autoridad: <span className="text-slate-800 dark:text-slate-200">{m.authority}</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                      {m.characteristics.map((c, cIdx) => (
                        <li key={cIdx} className="flex items-start gap-2">
                          <span className="text-[#39A900] mt-0.5">•</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1">
                    <div className="text-slate-500 dark:text-slate-400">
                      <strong className="text-slate-800 dark:text-slate-200">Alcance/Duración:</strong> {m.durationOrImpact}
                    </div>
                    <div className="text-[#007832] dark:text-emerald-400 font-medium">
                      {m.proceduralRights}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMITÉ DE EVALUACIÓN Y SEGUIMIENTO */}
      {activeTab === 'comite' && (
        <div className="space-y-12">
          {/* Header info */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Naturaleza y Funcionamiento del Comité
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              El <strong>Comité de Evaluación y Seguimiento</strong> es el órgano consultivo y colegiado que investiga, analiza las pruebas y recomienda al Subdirector de Centro las medidas a adoptar ante presuntas faltas disciplinarias graves o ante bajo rendimiento académico reiterado.
            </p>
          </div>

          {/* Members of the Committee */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#39A900]" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Integrantes Oficiales Reglamentarios (Acuerdo 009 de 2024)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SENA_COMITE_MIEMBROS.map((member, idx) => (
                <div 
                  key={idx}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase text-[#007832] dark:text-emerald-400 font-bold">
                      {member.role}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      member.voteType === 'Voz y Voto'
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                        : member.voteType === 'Derecho a la Defensa'
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                        : 'bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                    }`}>
                      {member.voteType}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {member.institutionalTitle}
                  </h4>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {member.function}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Due Process 6 Phases Flow */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#39A900]" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Las 6 Fases del Debido Proceso Disciplinario
              </h3>
            </div>

            <div className="space-y-3">
              {SENA_COMITE_FASES.map((phase) => (
                <div 
                  key={phase.stepNumber}
                  className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-xl bg-[#39A900] text-white flex items-center justify-center shrink-0 text-xs font-extrabold shadow-sm">
                      {phase.stepNumber}
                    </span>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {phase.phaseName}
                        </h4>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {phase.normativeTime}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                        {phase.description}
                      </p>
                    </div>
                  </div>

                  <div className="md:w-80 shrink-0 space-y-1.5 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#007832] dark:text-emerald-400 block">
                      Acciones Clave:
                    </span>
                    <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                      {phase.keyActions.map((action, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-1.5">
                          <span className="text-slate-400">•</span>
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SIMULADOR DE AUDIENCIA DE COMITÉ */}
      {activeTab === 'simulador' && (
        <div className="bg-gradient-to-br from-emerald-50/60 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border border-emerald-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
              <Gavel className="w-4 h-4 text-[#39A900]" />
              <span>Simulador Pedagógico de Descargos y Audiencia</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              ¿Cómo actuarías si fueses citado a Comité?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Experimenta cómo funciona una audiencia real, comprende cuáles son tus derechos garantizados por el Acuerdo 009 de 2024 y cómo argumentar válidamente tus descargos.
            </p>
          </div>

          {/* Select Simulated Scenario */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => { setSimulatedCaseId('caso-plagio'); setLearnerDefenseSubmitted(false); }}
              className={`p-4 rounded-xl border text-left transition-all ${
                simulatedCaseId === 'caso-plagio'
                  ? 'border-[#39A900] bg-white dark:bg-slate-800 ring-2 ring-[#39A900]/20 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
                Caso 1: Presunto Plagio con IA
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                Falta académica por evidencia no original
              </span>
            </button>

            <button
              onClick={() => { setSimulatedCaseId('caso-sst'); setLearnerDefenseSubmitted(false); }}
              className={`p-4 rounded-xl border text-left transition-all ${
                simulatedCaseId === 'caso-sst'
                  ? 'border-[#39A900] bg-white dark:bg-slate-800 ring-2 ring-[#39A900]/20 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
                Caso 2: Operación sin EPP en Taller
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                Falta disciplinaria en seguridad y salud
              </span>
            </button>

            <button
              onClick={() => { setSimulatedCaseId('caso-inasistencia'); setLearnerDefenseSubmitted(false); }}
              className={`p-4 rounded-xl border text-left transition-all ${
                simulatedCaseId === 'caso-inasistencia'
                  ? 'border-[#39A900] bg-white dark:bg-slate-800 ring-2 ring-[#39A900]/20 font-bold'
                  : 'border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-800/50 hover:border-slate-300'
              }`}
            >
              <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
                Caso 3: Inasistencia por Calamidad
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                Riesgo de deserción por 3 días hábiles
              </span>
            </button>
          </div>

          {/* Interactive Case Scenario Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold uppercase text-[#007832] dark:text-emerald-400">
                Expediente de Citación Oficial N.° COM-2026-084
              </span>
              <span className="text-xs text-slate-500 font-mono">
                Término de Citación: 5 días hábiles cumplidos
              </span>
            </div>

            {simulatedCaseId === 'caso-plagio' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Hechos Imputados:
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    El instructor del módulo de base de datos radicó informe indicando que la evidencia técnica del aprendiz coincide en un 95% con un repositorio de código público de un tercero, sin haber citado la autoría ni presentado la sustentación oral requerida.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">
                    Garantías que debes exigir en la audiencia:
                  </span>
                  <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <li>• Derecho a conocer el informe completo y el reporte de similitud.</li>
                    <li>• Derecho a presentar el código original en vivo y demostrar la autoría.</li>
                    <li>• Derecho a ser acompañado por el vocero o un testigo de la ficha.</li>
                  </ul>
                </div>

                {!learnerDefenseSubmitted ? (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Selecciona la estrategia correcta de descargos del aprendiz:
                    </span>
                    <div className="space-y-2">
                      <button
                        onClick={() => setLearnerDefenseSubmitted(true)}
                        className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#39A900] bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5 transition-all"
                      >
                        <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0 text-[11px] font-bold">A</span>
                        <span>Aceptar con honestidad el uso de librerías externas sin citación, presentar la sustentación técnica en vivo demostrando comprensión del código, y solicitar un Plan de Mejoramiento Académico para corregir las citas bibliográficas bajo normas APA.</span>
                      </button>

                      <button
                        onClick={() => alert("Estrategia desacertada: Negar los hechos con agresividad o no comparecer al comité no anula el proceso y agrava la calificación de la falta.")}
                        className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-rose-400 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5 transition-all"
                      >
                        <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 text-[11px] font-bold">B</span>
                        <span>No asistir a la citación y decir que los instructores tienen una persecución personal.</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-xs uppercase">
                      <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                      <span>Dictamen Pedagógico del Comité (Acuerdo 009 de 2024):</span>
                    </div>
                    <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
                      El Comité valora la <strong>confesión sincera y el dominio demostrado en la sustentación oral</strong> como atenuantes de conducta. Recomienda al Subdirector aplicar una <strong>Medida Formativa (Plan de Mejoramiento Académico en Ética y Derechos de Autor)</strong> en lugar de cancelar la matrícula, permitiendo al aprendiz graduarse éticamente.
                    </p>
                  </div>
                )}
              </div>
            )}

            {simulatedCaseId === 'caso-sst' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Hechos Imputados:
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Un aprendiz ingresó al taller de soldadura sin careta protectora ni botas con puntera de seguridad, desatendiendo dos llamados verbales del instructor técnico de turno.
                  </p>
                </div>

                {!learnerDefenseSubmitted ? (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      Selecciona la alternativa reglamentaria que debe aplicar el Comité:
                    </span>
                    <button
                      onClick={() => setLearnerDefenseSubmitted(true)}
                      className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#39A900] bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5 transition-all"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0 text-[11px] font-bold">A</span>
                      <span>Por haber mediado llamados de atención verbales previos y tratarse de riesgo vital, el Comité recomienda un <strong>Llamado de Atención por Escrito</strong> con suscripción de un Plan de Mejoramiento Disciplinario en protocolos de Seguridad y Salud en el Trabajo.</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-xs uppercase">
                      <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                      <span>Resolución del Caso:</span>
                    </div>
                    <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
                      El Subdirector de Centro adopta la recomendación: se expide llamado de atención formal y el aprendiz lidera una campaña de sensibilización de EPP en su ficha, resarciendo comunitariamente la falta.
                    </p>
                  </div>
                )}
              </div>
            )}

            {simulatedCaseId === 'caso-inasistencia' && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Hechos Imputados:
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    El aprendiz acumuló tres (3) días hábiles continuos de inasistencia a sus clases de programación debido a una emergencia médica hospitalaria de su hijo menor de edad.
                  </p>
                </div>

                {!learnerDefenseSubmitted ? (
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">
                      ¿Cómo procede el derecho a la defensa según el Acuerdo 009 de 2024?
                    </span>
                    <button
                      onClick={() => setLearnerDefenseSubmitted(true)}
                      className="w-full text-left p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-[#39A900] bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-200 flex items-start gap-2.5 transition-all"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center shrink-0 text-[11px] font-bold">A</span>
                      <span>Dentro de los 5 días hábiles otorgados tras la notificación, el aprendiz allega el certificado de ingreso hospitalario emitido por la clínica; el Comité verifica la fuerza mayor, <strong>declara justificada la inasistencia y ordena la nivelación pedagógica sin sanción</strong>.</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200 font-bold text-xs uppercase">
                      <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                      <span>Garantía de Justa Causa:</span>
                    </div>
                    <p className="text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
                      Se archiva el procedimiento de deserción. La fuerza mayor debidamente soportada salvaguarda el derecho constitucional a la educación y permite reprogramar las actividades evaluativas.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
