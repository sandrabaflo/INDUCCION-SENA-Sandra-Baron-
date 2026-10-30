import { 
  User as UserIcon, 
  Users, 
  Sun, 
  Moon, 
  ArrowLeftRight, 
  Home, 
  GraduationCap, 
  LayoutDashboard,
  Sparkles,
  UserCheck,
  UserPlus,
  Cloud,
  CloudCheck,
  FileSpreadsheet,
  ExternalLink,
  RefreshCw,
  LogOut,
  BookOpen
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { ApprenticeProfile } from '../data/senaData';
import { SyncStatus } from '../services/googleSheetsService';
import type { User as FirebaseUser } from 'firebase/auth';

interface NavbarProps {
  currentRole: 'landing' | 'aprendiz' | 'instructor';
  onSelectRole: (role: 'landing' | 'aprendiz' | 'instructor') => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  apprenticeProfile?: ApprenticeProfile | null;
  onOpenRegistration?: () => void;
  onOpenManual?: () => void;
  googleUser?: FirebaseUser | null;
  onGoogleSignIn?: () => void;
  onGoogleSignOut?: () => void;
  syncStatus?: SyncStatus;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onSelectRole,
  activeTab,
  setActiveTab,
  isDarkMode,
  onToggleTheme,
  apprenticeProfile,
  onOpenRegistration,
  onOpenManual,
  googleUser,
  onGoogleSignIn,
  onGoogleSignOut,
  syncStatus
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Brand Wordmark adhering to Top Bar Contract */}
        <div 
          onClick={() => onSelectRole('landing')}
          title="Ir al Portal de Inicio y Selección de Roles"
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
        >
          <SenaLogo className="w-8 h-8 object-contain transition-transform group-hover:scale-105" />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 group-hover:text-[#007832] dark:group-hover:text-emerald-400 transition-colors">
              SENA <span className="text-[#39A900]">·</span> Inducción
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono -mt-1 hidden sm:block">
              {currentRole === 'landing' ? 'Portal de Selección de Rol' : currentRole === 'aprendiz' ? 'Entorno del Aprendiz' : 'Panel de Gestión del Instructor'}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean unboxed typography) */}
        {currentRole === 'landing' ? (
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onSelectRole('landing')}
              className="text-[#007832] dark:text-emerald-400 border-b-2 border-[#39A900] dark:border-emerald-400 font-semibold py-1"
            >
              Inicio y Roles
            </button>
            <button
              onClick={() => onSelectRole('aprendiz')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
            >
              Para Aprendices
            </button>
            <button
              onClick={() => onSelectRole('instructor')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors py-1"
            >
              Para Instructores
            </button>
          </nav>
        ) : currentRole === 'aprendiz' ? (
          <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => setActiveTab('identidad')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                activeTab === 'identidad'
                  ? 'text-[#007832] dark:text-emerald-400 border-[#39A900] dark:border-emerald-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Identidad
            </button>
            <button
              onClick={() => setActiveTab('tramites')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                activeTab === 'tramites'
                  ? 'text-[#007832] dark:text-emerald-400 border-[#39A900] dark:border-emerald-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Trámites Acuerdo 009
            </button>
            <button
              onClick={() => setActiveTab('regimen')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                activeTab === 'regimen'
                  ? 'text-[#007832] dark:text-emerald-400 border-[#39A900] dark:border-emerald-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Faltas y Comité 009
            </button>
            <button
              onClick={() => setActiveTab('derechos')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                activeTab === 'derechos'
                  ? 'text-[#007832] dark:text-emerald-400 border-[#39A900] dark:border-emerald-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Derechos y Deberes
            </button>
            <button
              onClick={() => setActiveTab('ruta')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                activeTab === 'ruta'
                  ? 'text-[#007832] dark:text-emerald-400 border-[#39A900] dark:border-emerald-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Ruta Formativa
            </button>
            <button
              onClick={() => setActiveTab('evaluacion')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
                activeTab === 'evaluacion'
                  ? 'text-[#007832] dark:text-emerald-400 border-[#39A900] dark:border-emerald-400 font-semibold'
                  : 'border-transparent hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Evaluación
            </button>
          </nav>
        ) : (
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
            <span className="text-[#00324D] dark:text-cyan-400 font-bold flex items-center gap-1.5 py-1">
              <LayoutDashboard className="w-4 h-4" />
              <span>Panel de Coordinación y Seguimiento</span>
            </span>
          </nav>
        )}

        {/* Zone 3: Actions, Google Workspace sync status, & Mode Switcher */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Google Sheets / Drive Sync Status & Action Button */}
          {googleUser ? (
            <div className="flex items-center gap-1.5">
              {syncStatus?.spreadsheetUrl ? (
                <a
                  href={syncStatus.spreadsheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Abrir Hoja de Cálculo en Google Drive"
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-[#007832] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Hoja Drive</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              ) : null}

              <div 
                title={`Conectado como ${googleUser.email || googleUser.displayName || 'Google User'}. Sincronización activa.`}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {syncStatus?.state === 'syncing' ? (
                  <RefreshCw className="w-3.5 h-3.5 text-blue-500 animate-spin" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
                <span className="hidden xl:inline text-[11px] font-mono">
                  {syncStatus?.state === 'syncing' ? 'Sincronizando...' : 'Google Conectado'}
                </span>
                {onGoogleSignOut && (
                  <button
                    onClick={onGoogleSignOut}
                    title="Cerrar sesión de Google"
                    className="ml-1 p-0.5 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            onGoogleSignIn && (
              <button
                onClick={onGoogleSignIn}
                title="Conectar Google Workspace (Drive, Sheets y Gmail) para sincronizar respuestas y enviar certificados"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 shadow-2xs transition-all"
              >
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-3.5 h-3.5 shrink-0">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span className="hidden sm:inline">Conectar Google</span>
                <span className="sm:hidden">Google</span>
              </button>
            )
          )}

          {currentRole !== 'landing' ? (
            <button
              onClick={() => onSelectRole('landing')}
              title="Volver a la selección de rol"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#39A900]" />
              <span className="hidden sm:inline">Cambiar Rol</span>
              <span className="sm:hidden">Roles</span>
            </button>
          ) : (
            <button
              onClick={() => onSelectRole('aprendiz')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#39A900] text-white hover:bg-[#007832] shadow-sm transition-all"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Ingresar</span>
            </button>
          )}

          {/* Apprentice Profile Chip */}
          {currentRole === 'aprendiz' && onOpenRegistration && (
            apprenticeProfile ? (
              <button
                onClick={onOpenRegistration}
                title="Editar mis datos de Aprendiz"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#39A900] shrink-0" />
                <span className="max-w-[110px] sm:max-w-[160px] truncate">
                  {apprenticeProfile.fullName.split(' ')[0]} ({apprenticeProfile.documentType} {apprenticeProfile.documentNumber})
                </span>
              </button>
            ) : (
              <button
                onClick={onOpenRegistration}
                title="Registrar mis datos de Aprendiz"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Registrar Datos</span>
                <span className="sm:hidden">Registro</span>
              </button>
            )
          )}

          {/* Quick Role Switcher Button when inside a workspace */}
          {currentRole === 'aprendiz' && (
            <button
              onClick={() => onSelectRole('instructor')}
              title="Cambiar al Panel del Instructor"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Modo Instructor</span>
            </button>
          )}

          {currentRole === 'instructor' && (
            <button
              onClick={() => onSelectRole('aprendiz')}
              title="Cambiar a la Vista del Aprendiz"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#39A900] text-white hover:bg-[#007832] transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Vista Aprendiz</span>
            </button>
          )}

          {/* Manual button */}
          {onOpenManual && (
            <button
              onClick={onOpenManual}
              title="Abrir Manual de Usuario para Aprendices"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-[#007832] dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-300 dark:border-emerald-700 transition-colors shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Manual</span>
            </button>
          )}

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shrink-0"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Horizontal Sub-Navigation for small screens */}
      {currentRole === 'aprendiz' && (
        <div className="lg:hidden flex items-center gap-3 overflow-x-auto px-4 py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 no-scrollbar">
          <button
            onClick={() => setActiveTab('identidad')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'identidad'
                ? 'bg-[#39A900] text-white font-bold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Identidad
          </button>
          <button
            onClick={() => setActiveTab('tramites')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'tramites'
                ? 'bg-[#39A900] text-white font-bold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Trámites 009
          </button>
          <button
            onClick={() => setActiveTab('regimen')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'regimen'
                ? 'bg-[#39A900] text-white font-bold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Faltas y Comité
          </button>
          <button
            onClick={() => setActiveTab('derechos')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'derechos'
                ? 'bg-[#39A900] text-white font-bold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Derechos
          </button>
          <button
            onClick={() => setActiveTab('ruta')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'ruta'
                ? 'bg-[#39A900] text-white font-bold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Ruta
          </button>
          <button
            onClick={() => setActiveTab('evaluacion')}
            className={`whitespace-nowrap shrink-0 px-2.5 py-1 rounded-md transition-colors ${
              activeTab === 'evaluacion'
                ? 'bg-[#39A900] text-white font-bold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Evaluación
          </button>
        </div>
      )}

      {currentRole === 'landing' && (
        <div className="md:hidden flex items-center justify-center gap-4 px-4 py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onSelectRole('aprendiz')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-400 font-bold"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Rol Aprendiz</span>
          </button>
          <button
            onClick={() => onSelectRole('instructor')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Rol Instructor</span>
          </button>
        </div>
      )}
    </header>
  );
};
