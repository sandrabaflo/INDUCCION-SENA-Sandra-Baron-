import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  FileText, 
  BarChart3, 
  Scale, 
  HelpCircle, 
  Sparkles, 
  Clock, 
  Compass, 
  Check,
  Play,
  Video
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import escudoSena from '../assets/images/escudo_sena.png';
import { VideoTutorialModal } from './VideoTutorialModal';

import { ApprenticeProfile } from '../data/senaData';

interface RoleSelectionLandingProps {
  onSelectAprendiz: (initialTab?: string) => void;
  onSelectInstructor: () => void;
  onOpenRegistration: () => void;
  onOpenManual?: () => void;
  apprenticeProfile: ApprenticeProfile | null;
}

export const RoleSelectionLanding: React.FC<RoleSelectionLandingProps> = ({
  onSelectAprendiz,
  onSelectInstructor,
  onOpenRegistration,
  onOpenManual,
  apprenticeProfile
}) => {
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);

  return (
    <div className="py-4 sm:py-6 lg:py-8 space-y-6 sm:space-y-8">
      {/* Institutional Header - Compact so both roles are visible at once */}
      <div className="text-center max-w-4xl mx-auto space-y-3">
        {/* Top Badges & Logos */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-xs">
            <img 
              src={escudoSena} 
              alt="Escudo Oficial SENA" 
              className="w-5 h-5 object-contain" 
            />
            <div className="w-5 h-5 p-0.5 flex items-center justify-center">
              <SenaLogo className="w-full h-full object-contain" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              SENA Colombia
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-[#007832] dark:text-emerald-400">
            <Sparkles className="w-3 h-3 text-[#39A900]" />
            <span>Acuerdo 009 de 2024 · Nuevo Reglamento del Aprendiz</span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Portal Institucional de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007832] via-[#39A900] to-emerald-500">
              Inducción y Apropiación
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Selecciona tu perfil a continuación para ingresar directamente a tu espacio de formación o gestión pedagógica:
          </p>
        </div>

        {/* Hero Video Tutorial & Manual Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setShowVideoModal(true)}
            className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#00324D] to-[#007832] hover:from-[#002438] hover:to-[#005c26] text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 border border-emerald-500/30 group cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-[#39A900] text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
              <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
            </div>
            <span>Video Tutorial</span>
          </button>

          {onOpenManual && (
            <button
              onClick={onOpenManual}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-slate-300 dark:border-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#39A900]" />
              <span>Manual del Aprendiz</span>
            </button>
          )}
        </div>
      </div>

      {/* DUAL ROLES SIDE-BY-SIDE (Verse al tiempo para que cada uno escoja) */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          
          {/* ================= CARD 1: ROL DEL APRENDIZ ================= */}
          <div className="relative group bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-300 dark:border-emerald-800/80 hover:border-[#39A900] dark:hover:border-emerald-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#007832] to-[#39A900]" />
            
            <div className="p-6 sm:p-7 space-y-4 flex-1">
              {/* Header of Card */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#39A900] shadow-xs">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 text-[#007832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 inline-block">
                      Ruta Formativa
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      Soy Aprendiz
                    </h2>
                  </div>
                </div>

                {apprenticeProfile ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#007832] dark:bg-emerald-950/80 dark:text-emerald-300 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Registrado
                  </span>
                ) : (
                  <button
                    onClick={onOpenRegistration}
                    className="text-[11px] font-bold text-[#007832] dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Registro</span>
                  </button>
                )}
              </div>

              {/* Apprentice status or prompt to register */}
              {apprenticeProfile ? (
                <div className="p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 flex items-center justify-between gap-2">
                  <div className="truncate">
                    <strong className="block text-slate-900 dark:text-white truncate">{apprenticeProfile.fullName}</strong>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                      {apprenticeProfile.documentType} {apprenticeProfile.documentNumber} · Ficha {apprenticeProfile.trainingCard}
                    </span>
                  </div>
                  <button
                    onClick={onOpenRegistration}
                    className="px-2 py-1 rounded bg-white dark:bg-slate-800 text-[11px] font-bold text-[#007832] dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors shrink-0"
                  >
                    Editar
                  </button>
                </div>
              ) : (
                <div 
                  onClick={onOpenRegistration}
                  className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between gap-2 cursor-pointer hover:bg-amber-100/70 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    <span>Registro requerido (Documento, Móvil, Estrato, Población, Correo @soy.sena)</span>
                  </div>
                  <span className="text-[11px] font-bold underline shrink-0 text-amber-800 dark:text-amber-300">
                    Registrarme
                  </span>
                </div>
              )}

              {/* Subtitle & Value Proposition */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Apropia los valores y símbolos institucionales, conoce tus derechos, deberes y trámites bajo el <strong>Acuerdo 009 de 2024</strong>, presenta la evaluación y genera tu <strong>Constancia Oficial QR</strong>.
              </p>

              {/* Checklist / Features list */}
              <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Módulos para el Aprendiz:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
                    <span><strong>Identidad:</strong> Escudo, Bandera, Himno y 7 Valores SENA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
                    <span><strong>Trámites 009:</strong> Traslado, Aplazamiento, Deserción y Grado</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
                    <span><strong>Convivencia:</strong> Faltas, Medidas Formativas y Comité</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
                    <span><strong>Evaluación:</strong> Test diagnóstico de 15 preguntas con puntaje</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0" />
                    <span><strong>Certificado:</strong> Constancia de inducción imprimible con QR</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 sm:p-7 pt-0 space-y-2.5">
              <button
                onClick={() => {
                  if (!apprenticeProfile) {
                    onOpenRegistration();
                  } else {
                    onSelectAprendiz('identidad');
                  }
                }}
                className="w-full py-3.5 px-5 rounded-xl bg-[#39A900] hover:bg-[#007832] text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer"
              >
                <span>{apprenticeProfile ? 'Ingresar a mi Inducción' : 'Registrarme e Ingresar como Aprendiz'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-center">
                <button
                  onClick={() => onSelectAprendiz('evaluacion')}
                  className="py-1.5 px-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-[#007832] dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-semibold border border-emerald-200 dark:border-emerald-800 transition-colors"
                >
                  Ir a Evaluación
                </button>
                <button
                  onClick={onOpenRegistration}
                  className="py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  {apprenticeProfile ? 'Modificar Registro' : 'Diligenciar Datos'}
                </button>
              </div>
            </div>
          </div>

          {/* ================= CARD 2: ROL DEL INSTRUCTOR ================= */}
          <div className="relative group bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-300 dark:border-slate-700 hover:border-[#00324D] dark:hover:border-cyan-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#00324D] via-slate-800 to-cyan-700" />

            <div className="p-6 sm:p-7 space-y-5 flex-1">
              {/* Header of Card */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#00324D] dark:text-cyan-400 shadow-xs">
                    <Users className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 inline-block">
                      Gestión Pedagógica
                    </span>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                      Soy Instructor
                    </h2>
                  </div>
                </div>
              </div>

              {/* Subtitle & Value Proposition */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Supervisa el nivel de apropiación de tus fichas en tiempo real, analiza áreas de debilidad temática de la cohorte, administra el banco de reactivos y descarga actas oficiales en CSV.
              </p>

              {/* Checklist / Features list */}
              <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800/80">
                <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Herramientas para el Instructor:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00324D] dark:text-cyan-400 shrink-0" />
                    <span><strong>Métricas en Vivo:</strong> Tasa de aprobación, promedios y aprendices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00324D] dark:text-cyan-400 shrink-0" />
                    <span><strong>Filtro por Ficha:</strong> Seguimiento específico por grupo o programa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00324D] dark:text-cyan-400 shrink-0" />
                    <span><strong>Diagnóstico Temático:</strong> Detecta temas débiles para refuerzo en aula</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00324D] dark:text-cyan-400 shrink-0" />
                    <span><strong>Banco de Reactivos:</strong> Agrega nuevas preguntas a la evaluación</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00324D] dark:text-cyan-400 shrink-0" />
                    <span><strong>Exportación CSV:</strong> Descarga de actas oficiales para archivo y auditoría</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 sm:p-7 pt-0 space-y-2.5">
              <button
                onClick={onSelectInstructor}
                className="w-full py-3.5 px-5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:gap-3 cursor-pointer border border-transparent dark:border-slate-700"
              >
                <span>Ingresar al Panel del Instructor</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1 py-1.5">
                <span>Fichas activas registradas: <strong>2824910, 2758120</strong></span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  En Línea
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Institutional Badges & Trust Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-center space-y-0.5">
          <Clock className="w-5 h-5 text-[#39A900] mx-auto mb-1" />
          <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            40 Horas
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Inducción Integral Obligatoria
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-center space-y-0.5">
          <Scale className="w-5 h-5 text-[#39A900] mx-auto mb-1" />
          <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            Acuerdo 009
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Reglamento del Aprendiz 2024
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-center space-y-0.5">
          <Award className="w-5 h-5 text-[#39A900] mx-auto mb-1" />
          <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            70 Puntos
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Umbral Mínimo de Aprobación
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-center space-y-0.5">
          <ShieldCheck className="w-5 h-5 text-[#39A900] mx-auto mb-1" />
          <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tabular-nums">
            Código QR
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            Constancia Oficial Verificable
          </div>
        </div>
      </div>

      {/* Quick Access Info Guide */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 max-w-5xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas Frecuentes y Guía de Uso</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowVideoModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00324D] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            >
              <Play className="w-3 h-3 text-emerald-400 fill-current" />
              <span>Video Tutorial</span>
            </button>
            {onOpenManual && (
              <button
                onClick={onOpenManual}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#39A900] text-white text-xs font-semibold hover:bg-[#007832] transition-colors shadow-xs cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Manual Completo</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
          <div className="space-y-1 p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">
              ¿Cómo certifico mi inducción?
            </h4>
            <p>
              Presenta la evaluación interactiva. Al obtener 70% o más, se activa la descarga de tu Constancia Oficial firmada con código QR institucional.
            </p>
          </div>

          <div className="space-y-1 p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">
              ¿Qué establece el Acuerdo 009 de 2024?
            </h4>
            <p>
              Fija los plazos oficiales: 3 días hábiles para justificar inasistencia antes de deserción, máximo 6 meses de aplazamiento y radicación de reingreso con 1 mes de anticipación.
            </p>
          </div>

          <div className="space-y-1 p-3.5 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">
              ¿Cómo hace seguimiento el instructor?
            </h4>
            <p>
              En el Panel de Instructor se visualizan las calificaciones de los aprendices por ficha, temas con menor acierto para refuerzo pedagógico y exportación a formato CSV.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Video Tutorial Modal */}
      <VideoTutorialModal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />
    </div>
  );
};
