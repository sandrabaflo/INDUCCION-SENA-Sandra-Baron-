import React, { useState, useEffect } from 'react';
import { 
  Question, 
  ApprenticeResult, 
  ApprenticeProfile, 
  DOCUMENT_TYPES, 
  POPULATION_CHARACTERIZATIONS, 
  STRATA_OPTIONS 
} from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Award, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Printer, 
  FileText, 
  HelpCircle,
  Sparkles,
  BookOpen,
  User,
  ShieldCheck,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Building2,
  Users2,
  Edit3,
  AlertCircle,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  Cloud
} from 'lucide-react';
import { 
  syncApprenticeRegistration, 
  syncAnswerInRealTime, 
  syncEvaluationCompletion, 
  addSyncListener, 
  SyncStatus, 
  getSpreadsheetUrl 
} from '../services/googleSheetsService';

interface InteractiveEvaluationProps {
  questions: Question[];
  onEvaluationComplete: (result: ApprenticeResult) => void;
  onOpenCertificate: (result: ApprenticeResult) => void;
  apprenticeProfile?: ApprenticeProfile | null;
  onSaveProfile?: (profile: ApprenticeProfile) => void;
}

export const InteractiveEvaluation: React.FC<InteractiveEvaluationProps> = ({
  questions,
  onEvaluationComplete,
  onOpenCertificate,
  apprenticeProfile,
  onSaveProfile
}) => {
  // Setup apprentice profile state
  const [isRegistered, setIsRegistered] = useState<boolean>(!!apprenticeProfile);
  const [fullName, setFullName] = useState<string>(apprenticeProfile?.fullName || 'Carlos Andrés Mendoza');
  const [documentType, setDocumentType] = useState<'CC' | 'TI' | 'CE' | 'PPT' | 'PAS'>(apprenticeProfile?.documentType || 'CC');
  const [documentNumber, setDocumentNumber] = useState<string>(apprenticeProfile?.documentNumber || '1098765432');
  const [mobile, setMobile] = useState<string>(apprenticeProfile?.mobile || '3104567890');
  const [populationCharacterization, setPopulationCharacterization] = useState<string>(
    apprenticeProfile?.populationCharacterization || 'Ninguna / Población General'
  );
  const [city, setCity] = useState<string>(apprenticeProfile?.city || 'Bogotá D.C.');
  const [stratum, setStratum] = useState<string>(apprenticeProfile?.stratum || 'Estrato 2 (Bajo)');
  const [emailInput, setEmailInput] = useState<string>(
    apprenticeProfile?.emailSoySena ? apprenticeProfile.emailSoySena.replace(/@soy\.sena\.edu\.co$/i, '') : 'carlos.mendoza'
  );
  const [trainingCard, setTrainingCard] = useState<string>(apprenticeProfile?.trainingCard || '2824910');
  const [program, setProgram] = useState<string>(apprenticeProfile?.program || 'Análisis y Desarrollo de Software (ADSO)');
  const [center, setCenter] = useState<string>(apprenticeProfile?.center || 'Centro de Formación en Tecnologías de la Información');
  const [mode, setMode] = useState<'certificacion' | 'practica'>('certificacion');
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Sync when apprenticeProfile prop updates
  useEffect(() => {
    if (apprenticeProfile) {
      setFullName(apprenticeProfile.fullName);
      setDocumentType(apprenticeProfile.documentType);
      setDocumentNumber(apprenticeProfile.documentNumber);
      setMobile(apprenticeProfile.mobile);
      setPopulationCharacterization(apprenticeProfile.populationCharacterization);
      setCity(apprenticeProfile.city);
      setStratum(apprenticeProfile.stratum);
      setEmailInput(apprenticeProfile.emailSoySena.replace(/@soy\.sena\.edu\.co$/i, ''));
      setTrainingCard(apprenticeProfile.trainingCard);
      setProgram(apprenticeProfile.program);
      if (apprenticeProfile.center) setCenter(apprenticeProfile.center);
    }
  }, [apprenticeProfile]);

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [evaluationResult, setEvaluationResult] = useState<ApprenticeResult | null>(null);

  // Real-time Google Sheets sync state
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    state: 'idle',
    lastSyncTime: null,
    pendingCount: 0,
    spreadsheetUrl: getSpreadsheetUrl() || undefined
  });

  useEffect(() => {
    const unsubscribe = addSyncListener(status => {
      setSyncStatus(status);
    });
    return () => unsubscribe();
  }, []);

  const fullEmail = emailInput.trim().includes('@')
    ? emailInput.trim().toLowerCase()
    : `${emailInput.trim().toLowerCase()}@soy.sena.edu.co`;

  const isValidSoySenaEmail = (email: string): boolean => {
    const trimmed = email.trim().toLowerCase();
    return trimmed.endsWith('@soy.sena.edu.co') || 
           trimmed.endsWith('@sena.edu.co') || 
           trimmed.endsWith('@misena.edu.co');
  };

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isRegistered && !isSubmitted) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRegistered, isSubmitted]);

  const currentQ = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const getCurrentApprenticeProfile = (): ApprenticeProfile => ({
    fullName: fullName.trim(),
    documentType,
    documentNumber: documentNumber.trim(),
    mobile: mobile.trim(),
    populationCharacterization,
    city: city.trim(),
    stratum,
    emailSoySena: fullEmail,
    trainingCard: trainingCard.trim(),
    program: program.trim(),
    center: center.trim()
  });

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));

    // Real-time synchronization with Google Sheets as apprentice answers
    const profile = getCurrentApprenticeProfile();
    syncAnswerInRealTime({
      profile,
      question: currentQ,
      selectedOptionIndex: optionIndex,
      questionIndex: currentQuestionIndex,
      totalQuestions: questions.length
    });
  };

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 4) {
      errors.fullName = 'Ingresa tus nombres y apellidos completos.';
    }
    if (!documentNumber.trim() || documentNumber.trim().length < 5) {
      errors.documentNumber = 'Ingresa tu número de documento de identidad.';
    }
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      errors.mobile = 'Ingresa un número de móvil válido (mínimo 10 dígitos).';
    }
    if (!city.trim()) {
      errors.city = 'Ingresa tu ciudad de residencia.';
    }
    if (!emailInput.trim()) {
      errors.email = 'El correo institucional con dominio soysena es obligatorio.';
    } else if (!isValidSoySenaEmail(fullEmail)) {
      errors.email = 'El correo debe tener dominio institucional @soy.sena.edu.co';
    }
    if (!trainingCard.trim()) {
      errors.trainingCard = 'Ingresa el número de ficha de formación.';
    }
    if (!program.trim()) {
      errors.program = 'Ingresa tu programa de formación.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    const profile: ApprenticeProfile = {
      fullName: fullName.trim(),
      documentType,
      documentNumber: documentNumber.trim(),
      mobile: mobile.trim(),
      populationCharacterization,
      city: city.trim(),
      stratum,
      emailSoySena: fullEmail,
      trainingCard: trainingCard.trim(),
      program: program.trim(),
      center: center.trim()
    };

    if (onSaveProfile) {
      onSaveProfile(profile);
    }

    // Sync registration to Google Sheets
    syncApprenticeRegistration(profile, 'INICIÓ EVALUACIÓN');

    setIsRegistered(true);
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeSpent(0);
  };

  const handleFinishEvaluation = () => {
    // Calculate results
    let correctCount = 0;
    const categoryTotals: { [key: string]: { correct: number; total: number } } = {
      identidad: { correct: 0, total: 0 },
      derechos: { correct: 0, total: 0 },
      deberes: { correct: 0, total: 0 },
      reglamento: { correct: 0, total: 0 },
      tramites: { correct: 0, total: 0 },
      comite: { correct: 0, total: 0 },
      ruta: { correct: 0, total: 0 }
    };

    const answersList = questions.map(q => {
      const selected = userAnswers[q.id];
      const isCorrect = selected === q.correctAnswer;
      if (isCorrect) correctCount++;

      // Map categories
      let catKey = q.category as string;
      if (catKey === 'faltas') catKey = 'reglamento';

      if (categoryTotals[catKey]) {
        categoryTotals[catKey].total += 1;
        if (isCorrect) categoryTotals[catKey].correct += 1;
      }

      return {
        questionId: q.id,
        selectedOption: selected !== undefined ? selected : -1,
        isCorrect
      };
    });

    const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
    const passed = scorePercentage >= 70; // 70% threshold in SENA

    const categoryBreakdown = {
      identidad: categoryTotals.identidad.total > 0 ? Math.round((categoryTotals.identidad.correct / categoryTotals.identidad.total) * 100) : 100,
      derechos: categoryTotals.derechos.total > 0 ? Math.round((categoryTotals.derechos.correct / categoryTotals.derechos.total) * 100) : 100,
      deberes: categoryTotals.deberes.total > 0 ? Math.round((categoryTotals.deberes.correct / categoryTotals.deberes.total) * 100) : 100,
      reglamento: categoryTotals.reglamento.total > 0 ? Math.round((categoryTotals.reglamento.correct / categoryTotals.reglamento.total) * 100) : 100,
      tramites: categoryTotals.tramites.total > 0 ? Math.round((categoryTotals.tramites.correct / categoryTotals.tramites.total) * 100) : 100,
      comite: categoryTotals.comite.total > 0 ? Math.round((categoryTotals.comite.correct / categoryTotals.comite.total) * 100) : 100,
      ruta: categoryTotals.ruta.total > 0 ? Math.round((categoryTotals.ruta.correct / categoryTotals.ruta.total) * 100) : 100
    };

    const result: ApprenticeResult = {
      id: `eval-${Date.now()}`,
      fullName: fullName.trim(),
      documentType,
      documentNumber: documentNumber.trim(),
      mobile: mobile.trim(),
      populationCharacterization,
      city: city.trim(),
      stratum,
      emailSoySena: fullEmail,
      trainingCard: trainingCard.trim(),
      program: program.trim(),
      center: center.trim(),
      score: scorePercentage,
      passed,
      date: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
      answers: answersList,
      categoryBreakdown
    };

    setEvaluationResult(result);
    setIsSubmitted(true);
    onEvaluationComplete(result);

    // Sync final score and certificate record to Google Sheets in Google Drive
    syncEvaluationCompletion(result);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // STEP 1: Registration Form
  if (!isRegistered) {
    return (
      <div className="max-w-3xl mx-auto py-8 sm:py-12 px-4">
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/30 dark:border-emerald-700/40 rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 transition-colors duration-300">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-emerald-50/60 dark:bg-emerald-950/60 rounded-2xl p-2.5 flex items-center justify-center mx-auto mb-1 border border-emerald-100 dark:border-emerald-800">
              <SenaLogo className="w-full h-full object-contain" />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 dark:bg-emerald-950/80 text-[11px] font-bold text-[#007832] dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
              <span>Registro Oficial del Aprendiz SENA</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Datos para Evaluación y Certificación
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
              Registra tus datos institucionales. Al aprobar con 70 puntos o más, estos datos se imprimirán en tu <strong>Constancia Oficial de Inducción con Código QR</strong>.
            </p>
          </div>

          <form onSubmit={handleStartQuiz} className="space-y-5">
            {/* 1. Nombres y Apellidos */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Nombres y Apellidos del Aprendiz <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={e => {
                    setFullName(e.target.value);
                    if (formErrors.fullName) setFormErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="Ej. Carlos Andrés Mendoza"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>
              {formErrors.fullName && (
                <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                </p>
              )}
            </div>

            {/* 2. Tipo y Número de Documento */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Tipo de Documento <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <select
                    value={documentType}
                    onChange={e => setDocumentType(e.target.value as any)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    {DOCUMENT_TYPES.map(doc => (
                      <option key={doc.value} value={doc.value}>
                        {doc.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Número de Documento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={documentNumber}
                  onChange={e => {
                    setDocumentNumber(e.target.value);
                    if (formErrors.documentNumber) setFormErrors(prev => ({ ...prev, documentNumber: '' }));
                  }}
                  placeholder="Ej. 1098765432"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                {formErrors.documentNumber && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.documentNumber}
                  </p>
                )}
              </div>
            </div>

            {/* 3. Teléfono Móvil y Correo con Dominio SoySENA */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Número de Móvil / Celular <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={e => {
                      setMobile(e.target.value);
                      if (formErrors.mobile) setFormErrors(prev => ({ ...prev, mobile: '' }));
                    }}
                    placeholder="Ej. 3104567890"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>
                {formErrors.mobile && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.mobile}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    Correo con Dominio SoySENA <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[10px] font-mono text-[#007832] dark:text-emerald-400 font-bold">
                    @soy.sena.edu.co
                  </span>
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <div className="flex">
                    <input
                      type="text"
                      required
                      value={emailInput}
                      onChange={e => {
                        setEmailInput(e.target.value);
                        if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                      }}
                      placeholder="nombre.apellido"
                      className="w-full pl-10 pr-2 py-2.5 text-sm border border-r-0 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                    <span className="inline-flex items-center px-3 text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 border border-l-0 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-r-xl select-none">
                      @soy.sena.edu.co
                    </span>
                  </div>
                </div>
                {formErrors.email && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* 4. Ciudad de Residencia y Estrato */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Ciudad de Residencia <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={e => {
                      setCity(e.target.value);
                      if (formErrors.city) setFormErrors(prev => ({ ...prev, city: '' }));
                    }}
                    placeholder="Ej. Bogotá D.C., Medellín..."
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                </div>
                {formErrors.city && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.city}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Estrato Socioeconómico <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <select
                    value={stratum}
                    onChange={e => setStratum(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    {STRATA_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* 5. Caracterización de la Población */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                Caracterización de la Población (Categoría SENA) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Users2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <select
                  value={populationCharacterization}
                  onChange={e => setPopulationCharacterization(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                  {POPULATION_CHARACTERIZATIONS.map(p => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 6. Ficha y Programa de Formación */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Número de Ficha de Formación <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={trainingCard}
                  onChange={e => {
                    setTrainingCard(e.target.value);
                    if (formErrors.trainingCard) setFormErrors(prev => ({ ...prev, trainingCard: '' }));
                  }}
                  placeholder="Ej. 2824910"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                {formErrors.trainingCard && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.trainingCard}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Programa de Formación <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={program}
                  onChange={e => {
                    setProgram(e.target.value);
                    if (formErrors.program) setFormErrors(prev => ({ ...prev, program: '' }));
                  }}
                  placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                {formErrors.program && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.program}
                  </p>
                )}
              </div>
            </div>

            {/* Mode selection */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                Modo de Evaluación
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setMode('certificacion')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    mode === 'certificacion'
                      ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-[#39A900]'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
                    Evaluación Oficial de Certificación
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Evalúa la apropiación total y emite la constancia oficial con código QR.
                  </span>
                </div>

                <div
                  onClick={() => setMode('practica')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    mode === 'practica'
                      ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-[#39A900]'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 dark:text-white block mb-0.5">
                    Modo Práctica Guiada
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Muestra explicaciones inmediatas al responder cada caso.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#39A900] text-white font-bold text-sm rounded-xl hover:bg-[#007832] transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Comenzar Evaluación de Apropiación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // STEP 3: Results & Diagnostic Screen
  if (isSubmitted && evaluationResult) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 space-y-8">
        {/* Results Banner */}
        <div className={`p-8 rounded-2xl border ${
          evaluationResult.passed
            ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
            : 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100'
        } shadow-sm`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {evaluationResult.passed ? (
                  <CheckCircle2 className="w-7 h-7 text-[#007832] dark:text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                )}
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  {evaluationResult.passed ? 'Aprobación Lograda' : 'Requiere Refuerzo'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {evaluationResult.passed
                  ? `¡Felicitaciones, ${evaluationResult.fullName}! Has apropiado la inducción.`
                  : `Ánimo, ${evaluationResult.fullName}. Puedes reforzar tus conocimientos.`}
              </h1>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl">
                {evaluationResult.passed
                  ? 'Demostraste un dominio sólido de los valores del SENA, tus derechos y deberes, y las normativas del Reglamento del Aprendiz.'
                  : 'Revisa las justificaciones pedagógicas a continuación para comprender los aspectos clave del reglamento y realiza un nuevo intento.'}
              </p>
            </div>

            <div className="text-center sm:text-right shrink-0 bg-white/90 dark:bg-slate-900/90 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase">Puntaje Global</div>
              <div className="text-4xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {evaluationResult.score}<span className="text-lg font-normal text-slate-500 dark:text-slate-400">/100</span>
              </div>
              <div className="text-[11px] font-semibold text-[#007832] dark:text-emerald-400 mt-0.5">
                {evaluationResult.passed ? 'COMPETENCIA ADQUIRIDA' : 'POR DEBAJO DEL 70%'}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center gap-3">
            {evaluationResult.passed && (
              <button
                onClick={() => onOpenCertificate(evaluationResult)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#39A900] text-white text-xs font-semibold rounded-lg hover:bg-[#007832] transition-colors shadow-sm"
              >
                <Award className="w-4 h-4" />
                <span>Generar Constancia Oficial de Inducción</span>
              </button>
            )}

            <button
              onClick={() => {
                setIsSubmitted(false);
                setUserAnswers({});
                setCurrentQuestionIndex(0);
                setTimeSpent(0);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Presentar de Nuevo</span>
            </button>
          </div>
        </div>

        {/* Real-time Google Drive & Sheets Sync Status Card */}
        <div className="p-5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center shrink-0 text-[#007832] dark:text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sincronizado con Google Drive y Google Sheets
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-900 text-[#007832] dark:text-emerald-300">
                  En Vivo
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-xl">
                Tus datos de registro demográfico, tus respuestas a cada pregunta y tu puntaje final ({evaluationResult.score}%) han quedado archivados en la hoja de cálculo de la ficha en Google Drive.
              </p>
            </div>
          </div>

          {syncStatus.spreadsheetUrl && (
            <a
              href={syncStatus.spreadsheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#007832] dark:bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-[#39A900] dark:hover:bg-emerald-500 transition-colors shrink-0 shadow-xs"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ver Hoja en Drive</span>
            </a>
          )}
        </div>

        {/* Diagnostic Breakdown by Dimensions */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors duration-300">
          <div>
            <div className="text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
              Diagnóstico de Dominio
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Apropiación por Áreas del Conocimiento
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Permite identificar cuáles dimensiones institucionales están consolidadas y cuáles requieren repaso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Identidad SENA</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {evaluationResult.categoryBreakdown.identidad}%
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#39A900] h-full rounded-full" 
                  style={{ width: `${evaluationResult.categoryBreakdown.identidad}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Derechos y Deberes</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {Math.round((evaluationResult.categoryBreakdown.derechos + evaluationResult.categoryBreakdown.deberes) / 2)}%
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#39A900] h-full rounded-full" 
                  style={{ width: `${Math.round((evaluationResult.categoryBreakdown.derechos + evaluationResult.categoryBreakdown.deberes) / 2)}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Trámites y Novedades 009</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {evaluationResult.categoryBreakdown.tramites ?? 100}%
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#39A900] h-full rounded-full" 
                  style={{ width: `${evaluationResult.categoryBreakdown.tramites ?? 100}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Faltas y Sanciones</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {evaluationResult.categoryBreakdown.reglamento}%
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#39A900] h-full rounded-full" 
                  style={{ width: `${evaluationResult.categoryBreakdown.reglamento}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Comité y Debido Proceso</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {evaluationResult.categoryBreakdown.comite ?? 100}%
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#39A900] h-full rounded-full" 
                  style={{ width: `${evaluationResult.categoryBreakdown.comite ?? 100}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 block mb-1">Ruta Formativa</span>
              <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                {evaluationResult.categoryBreakdown.ruta}%
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-[#39A900] h-full rounded-full" 
                  style={{ width: `${evaluationResult.categoryBreakdown.ruta}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Question by question pedagogical review */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 transition-colors duration-300">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Revisión Pedagógica Pregunta por Pregunta
          </h2>

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isCorrect = selectedOpt === q.correctAnswer;

              return (
                <div 
                  key={q.id}
                  className={`p-5 rounded-xl border ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/30 dark:bg-emerald-950/20'
                      : 'border-rose-200 dark:border-rose-800/80 bg-rose-50/30 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                      Pregunta {idx + 1} de {questions.length} · {q.categoryLabel}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${
                      isCorrect ? 'text-[#007832] dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'
                    }`}>
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Correcta</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" />
                          <span>Incorrecta</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    {q.question}
                  </p>

                  <div className="space-y-1.5 mb-3">
                    {q.options.map((opt, oIdx) => {
                      let stateClass = 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
                      if (oIdx === q.correctAnswer) {
                        stateClass = 'bg-emerald-100/70 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 font-medium';
                      } else if (oIdx === selectedOpt && !isCorrect) {
                        stateClass = 'bg-rose-100/70 dark:bg-rose-950/50 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-200 font-medium line-through';
                      }

                      return (
                        <div key={oIdx} className={`p-2.5 rounded-lg border text-xs ${stateClass}`}>
                          {opt}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-white/90 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block mb-0.5">Fundamento Reglamentario:</span>
                    <span>{q.explanation}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // STEP 2: Active Evaluation In Progress
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 space-y-6">
      {/* Top Header bar with apprentice data and timer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300">
        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Aprendiz: <strong className="text-slate-800 dark:text-white">{fullName}</strong> · Ficha: <strong className="text-slate-800 dark:text-white">{trainingCard}</strong>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
            {program}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
            <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{formatTimer(timeSpent)}</span>
          </div>

          <div className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Progreso: <span className="font-bold text-slate-900 dark:text-white">{answeredCount}/{totalQuestions}</span>
          </div>
        </div>
      </div>

      {/* Real-time Google Drive & Sheets Sync Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-xs">
        <div className="flex items-center gap-2">
          {syncStatus.state === 'syncing' ? (
            <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin shrink-0" />
          ) : syncStatus.state === 'error' ? (
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          )}
          <span className="text-slate-700 dark:text-slate-300">
            {syncStatus.state === 'syncing' ? (
              <span className="font-medium text-blue-600 dark:text-blue-400">Sincronizando respuesta con Google Sheets en tiempo real...</span>
            ) : syncStatus.state === 'disconnected' ? (
              <span className="text-slate-500 dark:text-slate-400">Respuestas guardadas localmente (pendientes de sincronizar con Google Drive)</span>
            ) : (
              <span>Respuestas sincronizándose en vivo con <strong>Google Drive & Sheets</strong></span>
            )}
          </span>
        </div>

        {syncStatus.spreadsheetUrl && (
          <a
            href={syncStatus.spreadsheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#007832] dark:text-emerald-400 hover:text-[#39A900] transition-colors self-start sm:self-auto"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Ver Hoja en Drive</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
        <div 
          className="bg-[#39A900] h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Active Question Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 shadow-sm space-y-6 transition-colors duration-300">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">
            {currentQ.categoryLabel}
          </span>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            Pregunta {currentQuestionIndex + 1} de {totalQuestions}
          </span>
        </div>

        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.question}
          </h2>
          {currentQ.context && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-md border border-slate-200 dark:border-slate-700">
              {currentQ.context}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((opt, idx) => {
            const isSelected = userAnswers[currentQ.id] === idx;
            const isPractica = mode === 'practica';
            const showPracticaFeedback = isPractica && userAnswers[currentQ.id] !== undefined;

            let optionStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:border-[#39A900] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';
            if (isSelected) {
              optionStyle = 'border-[#39A900] bg-emerald-50/60 dark:bg-emerald-950/50 ring-2 ring-[#39A900]/30 font-medium text-slate-900 dark:text-white';
            }

            if (showPracticaFeedback) {
              if (idx === currentQ.correctAnswer) {
                optionStyle = 'border-emerald-500 dark:border-emerald-600 bg-emerald-100/70 dark:bg-emerald-950/60 font-semibold text-emerald-950 dark:text-emerald-100';
              } else if (isSelected && idx !== currentQ.correctAnswer) {
                optionStyle = 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 line-through';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[11px] font-bold ${
                  isSelected 
                    ? 'border-[#39A900] bg-[#39A900] text-white' 
                    : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="leading-relaxed">{opt}</span>
              </button>
            );
          })}
        </div>

        {/* Practica Mode Immediate Feedback */}
        {mode === 'practica' && userAnswers[currentQ.id] !== undefined && (
          <div className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Explicación Formativa:</span>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        {/* Question Navigation Controls */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>

          <div className="flex gap-2">
            {currentQuestionIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#39A900] rounded-lg hover:bg-[#007832] transition-colors shadow-sm"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishEvaluation}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-slate-900 dark:bg-emerald-600 rounded-lg hover:bg-slate-800 dark:hover:bg-emerald-700 transition-colors shadow-md"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-white" />
                <span>Finalizar y Obtener Diagnóstico</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Jump Question Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm transition-colors duration-300">
        <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Mapa de Preguntas
        </div>
        <div className="flex flex-wrap gap-2">
          {questions.map((q, idx) => {
            const isAnswered = userAnswers[q.id] !== undefined;
            const isCurrent = currentQuestionIndex === idx;

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'ring-2 ring-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold'
                    : isAnswered
                    ? 'bg-[#39A900] text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
