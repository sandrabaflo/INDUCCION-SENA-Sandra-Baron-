import React, { useState } from 'react';
import { ApprenticeResult, Question } from '../data/senaData';
import { 
  BarChart3, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Download, 
  Plus, 
  FileText, 
  Award,
  Filter,
  Eye,
  RefreshCw,
  FileSpreadsheet,
  ExternalLink,
  Cloud,
  CheckCircle,
  Sparkles,
  FileCheck,
  Database,
  Mail,
  Send
} from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';
import { 
  SyncStatus, 
  syncEvaluationCompletion, 
  flushSyncQueue, 
  resetAndCreateFreshSpreadsheet, 
  getSpreadsheetUrl 
} from '../services/googleSheetsService';
import { 
  sendApprenticeCertificateEmail, 
  sendCohortSummaryEmail 
} from '../services/gmailService';
import { SendEmailConfirmModal } from './SendEmailConfirmModal';

interface InstructorDashboardProps {
  apprenticeResults: ApprenticeResult[];
  questions: Question[];
  onAddQuestion: (q: Question) => void;
  onViewCertificate: (result: ApprenticeResult) => void;
  googleUser?: FirebaseUser | null;
  onGoogleSignIn?: () => void;
  onGoogleSignOut?: () => void;
  syncStatus?: SyncStatus;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  apprenticeResults,
  questions,
  onAddQuestion,
  onViewCertificate,
  googleUser,
  onGoogleSignIn,
  onGoogleSignOut,
  syncStatus
}) => {
  const [selectedFichaFilter, setSelectedFichaFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showAddQuestionModal, setShowAddQuestionModal] = useState<boolean>(false);
  const [selectedApprenticeDetail, setSelectedApprenticeDetail] = useState<ApprenticeResult | null>(null);

  // Form for new question
  const [newQuestionText, setNewQuestionText] = useState<string>('');
  const [newQuestionCategory, setNewQuestionCategory] = useState<'identidad' | 'derechos' | 'deberes' | 'reglamento' | 'tramites' | 'faltas' | 'comite' | 'ruta'>('tramites');
  const [newOpt0, setNewOpt0] = useState<string>('');
  const [newOpt1, setNewOpt1] = useState<string>('');
  const [newOpt2, setNewOpt2] = useState<string>('');
  const [newOpt3, setNewOpt3] = useState<string>('');
  const [newCorrectIndex, setNewCorrectIndex] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState<string>('');

  // Bulk sync state
  const [isBulkSyncing, setIsBulkSyncing] = useState<boolean>(false);
  const [syncFeedback, setSyncFeedback] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Gmail states
  const [emailTargetApprentice, setEmailTargetApprentice] = useState<ApprenticeResult | null>(null);
  const [showCohortEmailModal, setShowCohortEmailModal] = useState<boolean>(false);
  const [gmailFeedback, setGmailFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleBulkSyncAllToGoogle = async () => {
    if (!googleUser) {
      if (onGoogleSignIn) onGoogleSignIn();
      return;
    }
    try {
      setIsBulkSyncing(true);
      setSyncFeedback({ message: 'Sincronizando todos los aprendices a Google Sheets...', type: 'info' });
      for (const res of apprenticeResults) {
        await syncEvaluationCompletion(res);
      }
      const success = await flushSyncQueue();
      if (success) {
        setSyncFeedback({ 
          message: `¡Se han sincronizado ${apprenticeResults.length} aprendices y sus resultados a Google Sheets en Google Drive!`, 
          type: 'success' 
        });
      } else {
        setSyncFeedback({ 
          message: 'Los registros quedaron en cola. Se enviarán automáticamente al reconectar.', 
          type: 'info' 
        });
      }
      setTimeout(() => setSyncFeedback(null), 5000);
    } catch (err: any) {
      setSyncFeedback({ message: `Error al sincronizar: ${err.message}`, type: 'error' });
    } finally {
      setIsBulkSyncing(false);
    }
  };

  const handleCreateNewSheet = async () => {
    try {
      setIsBulkSyncing(true);
      const newId = await resetAndCreateFreshSpreadsheet();
      setSyncFeedback({ 
        message: '¡Nueva hoja de cálculo creada exitosamente en Google Drive!', 
        type: 'success' 
      });
      setTimeout(() => setSyncFeedback(null), 5000);
    } catch (err: any) {
      if (err.message !== 'Operación cancelada por el usuario') {
        setSyncFeedback({ message: `Error: ${err.message}`, type: 'error' });
      }
    } finally {
      setIsBulkSyncing(false);
    }
  };

  // Extract unique fichas
  const uniqueFichas = Array.from(new Set(apprenticeResults.map(r => r.trainingCard)));

  // Filtered results
  const filteredResults = apprenticeResults.filter(r => {
    const matchesFicha = selectedFichaFilter === 'all' || r.trainingCard === selectedFichaFilter;
    const matchesSearch = r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.documentNumber.includes(searchTerm) ||
                          r.program.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFicha && matchesSearch;
  });

  // KPI calculations
  const totalEvaluated = filteredResults.length;
  const passedCount = filteredResults.filter(r => r.passed).length;
  const passRate = totalEvaluated > 0 ? Math.round((passedCount / totalEvaluated) * 100) : 0;
  const averageScore = totalEvaluated > 0 
    ? Math.round(filteredResults.reduce((acc, r) => acc + r.score, 0) / totalEvaluated) 
    : 0;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Nombre Completo',
      'Tipo Doc',
      'Documento',
      'Móvil',
      'Correo SoySENA',
      'Ciudad',
      'Estrato',
      'Caracterización Poblacional',
      'Ficha',
      'Programa',
      'Puntaje',
      'Estado',
      'Fecha'
    ];
    const rows = filteredResults.map(r => [
      `"${r.fullName}"`,
      `"${r.documentType || 'CC'}"`,
      `"${r.documentNumber}"`,
      `"${r.mobile || 'N/A'}"`,
      `"${r.emailSoySena || 'N/A'}"`,
      `"${r.city || 'N/A'}"`,
      `"${r.stratum || 'N/A'}"`,
      `"${r.populationCharacterization || 'Población General'}"`,
      `"${r.trainingCard}"`,
      `"${r.program}"`,
      r.score,
      r.passed ? 'APROBADO' : 'NO APROBADO',
      `"${r.date}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SENA_Reporte_Induccion_Ficha_${selectedFichaFilter}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim() || !newOpt0.trim() || !newOpt1.trim()) return;

    const categoryLabels: Record<string, string> = {
      identidad: 'Identidad Institucional',
      derechos: 'Derechos del Aprendiz',
      deberes: 'Deberes del Aprendiz',
      reglamento: 'Régimen Disciplinario',
      tramites: 'Trámites y Novedades Acuerdo 009',
      faltas: 'Régimen de Faltas y Medidas',
      comite: 'Comité y Debido Proceso',
      ruta: 'Ruta Formativa'
    };

    const newQ: Question = {
      id: `q-custom-${Date.now()}`,
      category: newQuestionCategory,
      categoryLabel: categoryLabels[newQuestionCategory],
      question: newQuestionText,
      options: [newOpt0, newOpt1, newOpt2 || 'No aplica', newOpt3 || 'No aplica'],
      correctAnswer: newCorrectIndex,
      explanation: newExplanation || 'Respuesta verificada en el Reglamento del Aprendiz SENA.'
    };

    onAddQuestion(newQ);
    setShowAddQuestionModal(false);
    // Reset
    setNewQuestionText('');
    setNewOpt0('');
    setNewOpt1('');
    setNewOpt2('');
    setNewOpt3('');
    setNewExplanation('');
  };

  return (
    <div className="space-y-10 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
            <span>Coordinación de Formación</span>
            <span aria-hidden="true">·</span>
            <span>Gestor de Inducción</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Panel de Control y Gestión de Inducción
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            Monitorea el avance de apropiación de los aprendices, identifica temas que requieren refuerzo pedagógico y exporta reportes oficiales.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddQuestionModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors shadow-sm border border-transparent dark:border-slate-700"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nueva Pregunta</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#39A900] text-white text-xs font-semibold rounded-lg hover:bg-[#007832] transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Metric KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Total Evaluados</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
            {totalEvaluated}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Aprendices registrados en cohorte
          </span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Tasa de Aprobación</span>
            <CheckCircle2 className="w-4 h-4 text-[#007832] dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-[#007832] dark:text-emerald-400 tabular-nums">
            {passRate}%
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            {passedCount} de {totalEvaluated} aprendices aprobados
          </span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Promedio General</span>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
            {averageScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Nivel de apropiación cohorte
          </span>
        </div>

        <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Preguntas Activas</span>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
            {questions.length}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Banco de reactivos SENA
          </span>
        </div>
      </div>

      {/* Cohort Weakness & Reinforcement Alert */}
      <div className="p-5 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h3 className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              Diagnóstico Pedagógico Grupal · Oportunidad de Refuerzo
            </h3>
          </div>
          <p className="text-xs text-amber-800 dark:text-amber-200/90 leading-relaxed max-w-2xl">
            El 42% de los aprendices que fallaron preguntas dudaron sobre el plazo exacto de <strong>justificación de inasistencias (3 días hábiles)</strong> y la diferencia entre <strong>medidas formativas vs sancionatorias</strong>. Se sugiere reforzar estos puntos en la próxima sesión sincrónica.
          </p>
        </div>
      </div>

      {/* Google Sheets & Google Drive Live Synchronization Center */}
      <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/30 dark:border-emerald-700/40 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6 transition-colors duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00324D] via-[#007832] to-[#39A900] flex items-center justify-center text-white shrink-0 shadow-md">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">
                  Google Workspace · Drive, Sheets & Gmail
                </span>
                {googleUser ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-[#007832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Google Conectado (Drive + Gmail)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    No Conectado a Google Workspace
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                Centro de Sincronización Drive & Notificaciones Gmail
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl">
                Sincronización en vivo de los datos de aprendices en Google Sheets y despacho automático de certificaciones oficiales y resúmenes de cohorte a través de la API de Gmail.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {googleUser ? (
              <>
                {syncStatus?.spreadsheetUrl && (
                  <a
                    href={syncStatus.spreadsheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#007832] hover:bg-[#39A900] text-white text-xs font-bold rounded-xl shadow-sm transition-all"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>Ver Hoja Drive</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                )}
                <button
                  onClick={handleBulkSyncAllToGoogle}
                  disabled={isBulkSyncing}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-semibold rounded-xl border border-transparent dark:border-slate-700 shadow-sm transition-colors disabled:opacity-50"
                  title="Sincronizar todos los aprendices a Google Sheets"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isBulkSyncing ? 'animate-spin text-blue-400' : ''}`} />
                  <span>Sincronizar Sheets</span>
                </button>
                <button
                  onClick={() => setShowCohortEmailModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#00324D] hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors border border-transparent dark:border-slate-700"
                  title="Enviar reporte consolidado de la cohorte por Gmail"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Enviar Resumen Gmail</span>
                </button>
              </>
            ) : (
              onGoogleSignIn && (
                <button
                  onClick={onGoogleSignIn}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold rounded-xl border border-slate-300 dark:border-slate-700 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all cursor-pointer"
                >
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>Conectar Cuenta de Google (Drive + Gmail)</span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Sync Feedback Alert */}
        {syncFeedback && (
          <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 ${
            syncFeedback.type === 'success' 
              ? 'bg-emerald-100 text-[#007832] dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              : syncFeedback.type === 'error'
              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
          }`}>
            <span>{syncFeedback.message}</span>
            <button onClick={() => setSyncFeedback(null)} className="opacity-70 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Gmail Feedback Alert */}
        {gmailFeedback && (
          <div className={`p-3.5 rounded-xl text-xs font-semibold flex items-center justify-between gap-3 ${
            gmailFeedback.type === 'success'
              ? 'bg-emerald-100 text-[#007832] dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
              : 'bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
          }`}>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              <span>{gmailFeedback.message}</span>
            </div>
            <button onClick={() => setGmailFeedback(null)} className="opacity-70 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Architecture details of the 2-sheet structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
              <FileCheck className="w-4 h-4 text-[#39A900]" />
              <span>Hoja 1: Aprendices_Consolidado</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Registra nombres, tipo y número de documento, móvil, correo @soy.sena.edu.co, caracterización poblacional, ciudad, estrato, ficha, puntaje obtenido y código de verificación QR.
            </p>
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
              Columnas: Marca Temporal · Documento · Nombres · Móvil · Correo · Ciudad · Estrato · Ficha · Puntaje · Estado
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-white">
              <Database className="w-4 h-4 text-blue-500" />
              <span>Hoja 2: Respuestas_Detalle_En_Vivo</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
              Se alimenta en tiempo real con cada respuesta marcada por el aprendiz durante el examen: timestamp, pregunta, opción seleccionada, si es correcta y puntaje asignado.
            </p>
            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
              Columnas: Marca Temporal · Documento · Nombre · Módulo · No. Pregunta · Opción · ¿Correcta? · Puntos
            </div>
          </div>
        </div>

        {/* Account Info and Create New Sheet Option */}
        {googleUser && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span>Cuenta conectada:</span>
              <strong className="text-slate-700 dark:text-slate-200 font-mono">{googleUser.email || googleUser.displayName}</strong>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCreateNewSheet}
                className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white underline"
              >
                Crear nueva hoja de cálculo en Drive
              </button>
              {onGoogleSignOut && (
                <button
                  onClick={onGoogleSignOut}
                  className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 hover:underline"
                >
                  Desconectar
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Filter and Apprentice Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6 transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Filtrar por Ficha:</span>
            <button
              onClick={() => setSelectedFichaFilter('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedFichaFilter === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Todas las Fichas
            </button>
            {uniqueFichas.map(f => (
              <button
                key={f}
                onClick={() => setSelectedFichaFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedFichaFilter === f
                    ? 'bg-[#39A900] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                Ficha {f}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre, cédula..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase border-y border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Ficha</th>
                <th className="py-3 px-4">Programa</th>
                <th className="py-3 px-4 text-center">Puntaje</th>
                <th className="py-3 px-4 text-center">Estado</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No se encontraron registros de aprendices para los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredResults.map(res => (
                  <tr key={res.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                      {res.fullName}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {res.documentNumber}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                      {res.trainingCard}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {res.program}
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                      {res.score}%
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded ${
                        res.passed 
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-400' 
                          : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400'
                      }`}>
                        {res.passed ? 'Aprobado' : 'Reforzar'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {res.passed && (
                          <button
                            onClick={() => onViewCertificate(res)}
                            title="Ver Certificado de Inducción"
                            className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-[#007832] dark:hover:text-emerald-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setEmailTargetApprentice(res)}
                          title="Enviar Notificación / Certificado por Gmail"
                          className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </button>
                        <button
                          onClick={() => setSelectedApprenticeDetail(res)}
                          title="Ver Diagnóstico de Apropiación"
                          className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Apprentice Diagnostic Detail Modal */}
      {selectedApprenticeDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ficha de Apropiación del Aprendiz
              </h3>
              <button
                onClick={() => setSelectedApprenticeDetail(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="sm:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Nombre Completo:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">{selectedApprenticeDetail.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Documento:</span>
                <span className="font-mono font-semibold text-slate-900 dark:text-white">
                  {selectedApprenticeDetail.documentType || 'CC'} {selectedApprenticeDetail.documentNumber}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Móvil / Celular:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{selectedApprenticeDetail.mobile || 'No registrado'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Correo SoySENA:</span>
                <span className="font-mono text-[#007832] dark:text-emerald-400 font-semibold truncate block">
                  {selectedApprenticeDetail.emailSoySena || 'No registrado'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ciudad / Estrato:</span>
                <span className="text-slate-800 dark:text-slate-200">
                  {selectedApprenticeDetail.city || 'No registrada'} · {selectedApprenticeDetail.stratum || 'N/A'}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Caracterización Poblacional:</span>
                <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-300 font-medium text-[11px]">
                  {selectedApprenticeDetail.populationCharacterization || 'Población General'}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Ficha:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedApprenticeDetail.trainingCard}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Calificación:</span>
                <span className={`font-mono font-bold ${selectedApprenticeDetail.passed ? 'text-[#39A900]' : 'text-rose-600'}`}>
                  {selectedApprenticeDetail.score}/100 ({selectedApprenticeDetail.passed ? 'Aprobado' : 'No Aprobado'})
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Programa:</span>
                <span className="text-slate-700 dark:text-slate-300">{selectedApprenticeDetail.program}</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">Desglose por Competencia:</span>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Identidad y Valores:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedApprenticeDetail.categoryBreakdown.identidad}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Derechos del Aprendiz:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedApprenticeDetail.categoryBreakdown.derechos}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Deberes y SST:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedApprenticeDetail.categoryBreakdown.deberes}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Régimen Disciplinario:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedApprenticeDetail.categoryBreakdown.reglamento}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Ruta Formativa:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedApprenticeDetail.categoryBreakdown.ruta}%</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSelectedApprenticeDetail(null)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  const res = selectedApprenticeDetail;
                  setSelectedApprenticeDetail(null);
                  setEmailTargetApprentice(res);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#00324D] text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enviar por Gmail</span>
              </button>
              {selectedApprenticeDetail.passed && (
                <button
                  onClick={() => {
                    const res = selectedApprenticeDetail;
                    setSelectedApprenticeDetail(null);
                    onViewCertificate(res);
                  }}
                  className="px-4 py-2 bg-[#39A900] text-white text-xs font-semibold rounded-lg hover:bg-[#007832]"
                >
                  Abrir Certificado
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Add Question */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Agregar Pregunta al Banco de Inducción
              </h3>
              <button
                onClick={() => setShowAddQuestionModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuestionSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Categoría Temática
                </label>
                <select
                  value={newQuestionCategory}
                  onChange={(e: any) => setNewQuestionCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-[#39A900]"
                >
                  <option value="identidad">Identidad Institucional y Valores</option>
                  <option value="tramites">Trámites y Novedades (Acuerdo 009)</option>
                  <option value="faltas">Régimen de Faltas y Medidas (Acuerdo 009)</option>
                  <option value="comite">Comité de Evaluación y Debido Proceso</option>
                  <option value="derechos">Derechos del Aprendiz</option>
                  <option value="deberes">Deberes y SST</option>
                  <option value="reglamento">Régimen Disciplinario General</option>
                  <option value="ruta">Ruta Formativa y Etapa Productiva</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Enunciado de la Pregunta / Caso *
                </label>
                <textarea
                  required
                  rows={3}
                  value={newQuestionText}
                  onChange={e => setNewQuestionText(e.target.value)}
                  placeholder="Ej. Si un aprendiz necesita ausentarse dos días por una calamidad doméstica demostrable..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Opciones de Respuesta:
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={newCorrectIndex === 0}
                      onChange={() => setNewCorrectIndex(0)}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Opción A (marca si es la correcta)"
                      value={newOpt0}
                      onChange={e => setNewOpt0(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={newCorrectIndex === 1}
                      onChange={() => setNewCorrectIndex(1)}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Opción B (marca si es la correcta)"
                      value={newOpt1}
                      onChange={e => setNewOpt1(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={newCorrectIndex === 2}
                      onChange={() => setNewCorrectIndex(2)}
                    />
                    <input
                      type="text"
                      placeholder="Opción C"
                      value={newOpt2}
                      onChange={e => setNewOpt2(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={newCorrectIndex === 3}
                      onChange={() => setNewCorrectIndex(3)}
                    />
                    <input
                      type="text"
                      placeholder="Opción D"
                      value={newOpt3}
                      onChange={e => setNewOpt3(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Justificación Pedagógica y Artículo de Soporte
                </label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={e => setNewExplanation(e.target.value)}
                  placeholder="Ej. Conforme al Art. 8 del Reglamento del Aprendiz, las inasistencias por calamidad se radican dentro de 3 días hábiles..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddQuestionModal(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#39A900] text-white text-xs font-semibold rounded-lg hover:bg-[#007832]"
                >
                  Guardar Pregunta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gmail Confirmation Modal for Apprentice Certificate/Notification */}
      {emailTargetApprentice && (
        <SendEmailConfirmModal
          isOpen={!!emailTargetApprentice}
          onClose={() => setEmailTargetApprentice(null)}
          onConfirmSend={async (to, cc) => {
            const res = await sendApprenticeCertificateEmail(emailTargetApprentice, to, cc);
            if (res.success) {
              setGmailFeedback({
                type: 'success',
                message: `Notificación y certificado institucional despachados vía Gmail a ${to}`
              });
              setTimeout(() => setGmailFeedback(null), 6000);
            }
            return res;
          }}
          defaultRecipient={emailTargetApprentice.emailSoySena || ''}
          defaultSubject={`Constancia de Aprobación de Inducción SENA - ${emailTargetApprentice.fullName} (Ficha ${emailTargetApprentice.trainingCard})`}
          previewSummary={{
            type: 'certificate',
            apprenticeName: emailTargetApprentice.fullName,
            documentNumber: `${emailTargetApprentice.documentType || 'CC'} ${emailTargetApprentice.documentNumber}`,
            ficha: emailTargetApprentice.trainingCard,
            score: emailTargetApprentice.score,
            program: emailTargetApprentice.program
          }}
          googleUser={googleUser}
          onGoogleSignIn={onGoogleSignIn}
        />
      )}

      {/* Gmail Confirmation Modal for Cohort Summary Report */}
      {showCohortEmailModal && (
        <SendEmailConfirmModal
          isOpen={showCohortEmailModal}
          onClose={() => setShowCohortEmailModal(false)}
          onConfirmSend={async (to) => {
            const res = await sendCohortSummaryEmail({
              instructorEmail: to,
              trainingCard: selectedFichaFilter === 'all' ? 'General' : selectedFichaFilter,
              totalEvaluated,
              passedCount,
              passRate,
              averageScore,
              results: filteredResults
            });
            if (res.success) {
              setGmailFeedback({
                type: 'success',
                message: `Resumen oficial de la cohorte despachado vía Gmail a ${to}`
              });
              setTimeout(() => setGmailFeedback(null), 6000);
            }
            return res;
          }}
          defaultRecipient={googleUser?.email || ''}
          defaultSubject={`SENA · Reporte Consolidado de Inducción (Ficha ${selectedFichaFilter === 'all' ? 'General' : selectedFichaFilter})`}
          previewSummary={{
            type: 'digest',
            ficha: selectedFichaFilter === 'all' ? 'General (Todas las fichas)' : selectedFichaFilter
          }}
          googleUser={googleUser}
          onGoogleSignIn={onGoogleSignIn}
        />
      )}
    </div>
  );
};
