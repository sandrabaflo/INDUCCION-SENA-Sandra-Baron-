import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { RoleSelectionLanding } from './components/RoleSelectionLanding';
import { InstitutionalIdentity } from './components/InstitutionalIdentity';
import { RightsAndDuties } from './components/RightsAndDuties';
import { AcademicProcedures009 } from './components/AcademicProcedures009';
import { DisciplinaryRegime009 } from './components/DisciplinaryRegime009';
import { TrainingPathways } from './components/TrainingPathways';
import { InteractiveEvaluation } from './components/InteractiveEvaluation';
import { InstructorDashboard } from './components/InstructorDashboard';
import { CertificateModal } from './components/CertificateModal';
import { ApprenticeRegistrationModal } from './components/ApprenticeRegistrationModal';
import { ManualModal } from './components/ManualModal';
import { SenaLogo } from './components/SenaLogo';
import { 
  INITIAL_QUESTIONS, 
  MOCK_APPRENTICE_RESULTS, 
  Question, 
  ApprenticeResult, 
  ApprenticeProfile 
} from './data/senaData';
import { 
  initAuth, 
  googleSignIn, 
  logoutGoogle 
} from './services/googleAuth';
import { 
  addSyncListener, 
  SyncStatus, 
  flushSyncQueue, 
  syncApprenticeRegistration 
} from './services/googleSheetsService';
import type { User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [currentRole, setCurrentRole] = useState<'landing' | 'aprendiz' | 'instructor'>('landing');
  const [activeTab, setActiveTab] = useState<string>('identidad');
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [apprenticeResults, setApprenticeResults] = useState<ApprenticeResult[]>(MOCK_APPRENTICE_RESULTS);
  const [activeCertificate, setActiveCertificate] = useState<ApprenticeResult | null>(null);

  // Google Workspace Integration State
  const [googleUser, setGoogleUser] = useState<FirebaseUser | null>(null);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    state: 'idle',
    lastSyncTime: null,
    pendingCount: 0
  });

  // Apprentice Profile state with persistence
  const [apprenticeProfile, setApprenticeProfile] = useState<ApprenticeProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sena_apprentice_profile');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  });

  const [showRegistrationModal, setShowRegistrationModal] = useState<boolean>(false);
  const [showManualModal, setShowManualModal] = useState<boolean>(false);

  // Dark mode state with localStorage persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sena_theme_mode') === 'dark';
    }
    return false;
  });

  // Blur transition state during theme switch
  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Listen for Google Workspace Auth and sync queue changes
  useEffect(() => {
    const unsubscribeAuth = initAuth(
      (user, _token) => {
        setGoogleUser(user);
        flushSyncQueue();
      },
      () => {
        setGoogleUser(null);
      }
    );

    const unsubscribeSync = addSyncListener(status => {
      setSyncStatus(status);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeSync();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        await flushSyncQueue();
      }
    } catch (err: any) {
      console.error('Error al conectar Google:', err);
    }
  };

  const handleGoogleSignOut = async () => {
    try {
      await logoutGoogle();
      setGoogleUser(null);
    } catch (err: any) {
      console.error('Error al desconectar Google:', err);
    }
  };

  const handleToggleTheme = () => {
    setIsBlurTransitioning(true);
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sena_theme_mode', nextMode ? 'dark' : 'light');
    }

    setTimeout(() => {
      setIsBlurTransitioning(false);
    }, 450);
  };

  const handleSelectAprendiz = (initialTab: string = 'identidad') => {
    setCurrentRole('aprendiz');
    setActiveTab(initialTab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectInstructor = () => {
    setCurrentRole('instructor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRole = (role: 'landing' | 'aprendiz' | 'instructor') => {
    setCurrentRole(role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveProfile = (profile: ApprenticeProfile) => {
    setApprenticeProfile(profile);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
    }
    // Automatically sync updated profile to Google Sheets
    syncApprenticeRegistration(profile, 'PERFIL ACTUALIZADO');

    setShowRegistrationModal(false);
    if (currentRole === 'landing') {
      setCurrentRole('aprendiz');
      setActiveTab('identidad');
    }
  };

  const handleOpenRegistration = () => {
    setShowRegistrationModal(true);
  };

  const handleEvaluationComplete = (newResult: ApprenticeResult) => {
    setApprenticeResults(prev => [newResult, ...prev]);
  };

  const handleAddQuestion = (newQuestion: Question) => {
    setQuestions(prev => [...prev, newQuestion]);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-slate-50 dark:bg-[#0b131e] text-slate-900 dark:text-slate-100 selection:bg-[#39A900] selection:text-white transition-colors duration-300 ${
      isBlurTransitioning ? 'theme-blur-active' : ''
    }`}>
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        currentRole={currentRole}
        onSelectRole={handleSelectRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        apprenticeProfile={apprenticeProfile}
        onOpenRegistration={handleOpenRegistration}
        onOpenManual={() => setShowManualModal(true)}
        googleUser={googleUser}
        onGoogleSignIn={handleGoogleSignIn}
        onGoogleSignOut={handleGoogleSignOut}
        syncStatus={syncStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentRole === 'landing' && (
          <RoleSelectionLanding
            onSelectAprendiz={handleSelectAprendiz}
            onSelectInstructor={handleSelectInstructor}
            onOpenRegistration={handleOpenRegistration}
            onOpenManual={() => setShowManualModal(true)}
            apprenticeProfile={apprenticeProfile}
          />
        )}

        {currentRole === 'instructor' && (
          <InstructorDashboard
            apprenticeResults={apprenticeResults}
            questions={questions}
            onAddQuestion={handleAddQuestion}
            onViewCertificate={(res) => setActiveCertificate(res)}
            googleUser={googleUser}
            onGoogleSignIn={handleGoogleSignIn}
            onGoogleSignOut={handleGoogleSignOut}
            syncStatus={syncStatus}
          />
        )}

        {currentRole === 'aprendiz' && (
          <>
            {activeTab === 'identidad' && (
              <InstitutionalIdentity 
                onStartEvaluation={() => setActiveTab('evaluacion')} 
              />
            )}

            {activeTab === 'tramites' && (
              <AcademicProcedures009 />
            )}

            {activeTab === 'regimen' && (
              <DisciplinaryRegime009 />
            )}

            {activeTab === 'derechos' && (
              <RightsAndDuties />
            )}

            {activeTab === 'ruta' && (
              <TrainingPathways />
            )}

            {activeTab === 'evaluacion' && (
              <InteractiveEvaluation
                questions={questions}
                onEvaluationComplete={handleEvaluationComplete}
                onOpenCertificate={(res) => setActiveCertificate(res)}
                apprenticeProfile={apprenticeProfile}
                onSaveProfile={handleSaveProfile}
              />
            )}
          </>
        )}
      </main>

      {/* Apprentice Registration Modal */}
      {showRegistrationModal && (
        <ApprenticeRegistrationModal
          initialProfile={apprenticeProfile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setShowRegistrationModal(false)}
        />
      )}

      {/* Institutional SENA Footer */}
      <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 py-10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <SenaLogo className="w-8 h-8 object-contain" />
            <div>
              <span className="font-bold text-slate-800 dark:text-white">Servicio Nacional de Aprendizaje - SENA</span>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Ministerio del Trabajo · República de Colombia</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => setShowManualModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-300 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-200 dark:border-emerald-800 font-semibold transition-colors"
            >
              <span>📖 Manual del Aprendiz</span>
            </button>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Línea Gratuita Nacional: 01 8000 910 270</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Atención Bogotá: 343 0111</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="font-semibold text-[#007832] dark:text-emerald-400">Acuerdo 009 de 2024</span>
          </div>
        </div>
      </footer>

      {/* Manual Modal */}
      {showManualModal && (
        <ManualModal
          isOpen={showManualModal}
          onClose={() => setShowManualModal(false)}
        />
      )}

      {/* Certificate Modal */}
      {activeCertificate && (
        <CertificateModal
          result={activeCertificate}
          onClose={() => setActiveCertificate(null)}
        />
      )}
    </div>
  );
};
