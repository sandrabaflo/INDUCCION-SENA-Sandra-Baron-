import React, { useState } from 'react';
import { 
  ApprenticeProfile, 
  DOCUMENT_TYPES, 
  POPULATION_CHARACTERIZATIONS, 
  STRATA_OPTIONS 
} from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import escudoSena from '../assets/images/escudo_sena.png';
import { 
  User, 
  CreditCard, 
  Phone, 
  Users2, 
  MapPin, 
  Building2, 
  Mail, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface ApprenticeRegistrationModalProps {
  initialProfile?: ApprenticeProfile | null;
  onSaveProfile: (profile: ApprenticeProfile) => void;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

const COMMON_CITIES = [
  'Bogotá D.C.',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Bucaramanga',
  'Pereira',
  'Manizales',
  'Cúcuta',
  'Ibagué',
  'Santa Marta',
  'Villavicencio',
  'Pasto',
  'Montería',
  'Armenia',
  'Neiva',
  'Popayán',
  'Valledupar',
  'Tunja',
  'Sincelejo',
  'Riohacha',
  'Florencia',
  'Quibdó',
  'Yopal',
  'San Andrés'
];

export const ApprenticeRegistrationModal: React.FC<ApprenticeRegistrationModalProps> = ({
  initialProfile,
  onSaveProfile,
  onClose,
  title = "Registro de Aprendiz SENA",
  subtitle = "Diligencia tus datos oficiales para el proceso de inducción, evaluación y certificación institucional."
}) => {
  const [fullName, setFullName] = useState<string>(initialProfile?.fullName || '');
  const [documentType, setDocumentType] = useState<'CC' | 'TI' | 'CE' | 'PPT' | 'PAS'>(
    initialProfile?.documentType || 'CC'
  );
  const [documentNumber, setDocumentNumber] = useState<string>(initialProfile?.documentNumber || '');
  const [mobile, setMobile] = useState<string>(initialProfile?.mobile || '');
  const [populationCharacterization, setPopulationCharacterization] = useState<string>(
    initialProfile?.populationCharacterization || 'Ninguna / Población General'
  );
  const [city, setCity] = useState<string>(initialProfile?.city || 'Bogotá D.C.');
  const [stratum, setStratum] = useState<string>(initialProfile?.stratum || 'Estrato 2 (Bajo)');
  
  // Correo institucional SoySENA
  const [emailInput, setEmailInput] = useState<string>(
    initialProfile?.emailSoySena ? initialProfile.emailSoySena.replace(/@soy\.sena\.edu\.co$/i, '') : ''
  );
  
  const [trainingCard, setTrainingCard] = useState<string>(initialProfile?.trainingCard || '2824910');
  const [program, setProgram] = useState<string>(
    initialProfile?.program || 'Análisis y Desarrollo de Software (ADSO)'
  );
  const [center, setCenter] = useState<string>(
    initialProfile?.center || 'Centro de Servicios y Gestión Empresarial'
  );

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const fullEmail = emailInput.trim().includes('@')
    ? emailInput.trim().toLowerCase()
    : `${emailInput.trim().toLowerCase()}@soy.sena.edu.co`;

  const isValidSoySenaEmail = (email: string): boolean => {
    const trimmed = email.trim().toLowerCase();
    return trimmed.endsWith('@soy.sena.edu.co') || 
           trimmed.endsWith('@sena.edu.co') || 
           trimmed.endsWith('@misena.edu.co');
  };

  const handleValidate = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 4) {
      errors.fullName = 'Por favor ingresa tus nombres y apellidos completos.';
    }

    if (!documentNumber.trim() || documentNumber.trim().length < 5) {
      errors.documentNumber = 'Ingresa un número de documento válido.';
    }

    // Móvil validación (10 dígitos en Colombia aprox)
    const cleanMobile = mobile.replace(/\D/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      errors.mobile = 'Ingresa un número de móvil válido (mínimo 10 dígitos, ej. 3001234567).';
    }

    if (!city.trim()) {
      errors.city = 'Selecciona o escribe tu ciudad de residencia.';
    }

    if (!emailInput.trim()) {
      errors.email = 'El correo institucional con dominio soysena es obligatorio.';
    } else if (!isValidSoySenaEmail(fullEmail)) {
      errors.email = 'El correo debe tener dominio institucional @soy.sena.edu.co';
    }

    if (!trainingCard.trim()) {
      errors.trainingCard = 'Indica el número de ficha de tu programa.';
    }

    if (!program.trim()) {
      errors.program = 'Indica el nombre de tu programa de formación.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) return;

    const profileData: ApprenticeProfile = {
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

    onSaveProfile(profileData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border-2 border-emerald-500/30 dark:border-emerald-700/40 overflow-hidden transition-colors">
        
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-r from-[#007832] via-[#39A900] to-emerald-600 px-6 sm:px-8 py-5 text-white">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-2xl p-2 flex items-center justify-center shadow-md">
                <img src={escudoSena} alt="Escudo SENA" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-emerald-100 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>Sistema Oficial de Inducción SENA</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
              title="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-xs sm:text-sm text-emerald-50 mt-2 max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {/* Seccion 1: Identificación y Nombres */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-[#007832] dark:text-emerald-400">
              <User className="w-4 h-4" />
              <span>1. Identificación Personal</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Nombres y Apellidos */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Nombres y Apellidos Completos <span className="text-red-500">*</span>
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
                    placeholder="Ej. Valentina Restrepo Gómez"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                  />
                </div>
                {formErrors.fullName && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.fullName}
                  </p>
                )}
              </div>

              {/* Tipo de Documento */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Tipo de Documento <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <CreditCard className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <select
                    value={documentType}
                    onChange={e => setDocumentType(e.target.value as any)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                  >
                    {DOCUMENT_TYPES.map(doc => (
                      <option key={doc.value} value={doc.value}>
                        {doc.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Número de Documento */}
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
                  placeholder="Ej. 1020485912"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                />
                {formErrors.documentNumber && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.documentNumber}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Seccion 2: Contacto, Residencia y Caracterización */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-[#007832] dark:text-emerald-400">
              <Phone className="w-4 h-4" />
              <span>2. Contacto, Población y Ubicación</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Teléfono Móvil */}
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
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                  />
                </div>
                {formErrors.mobile && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.mobile}
                  </p>
                )}
              </div>

              {/* Correo con Dominio SoySENA */}
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
                      className="w-full pl-10 pr-2 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-r-0 border-slate-300 dark:border-slate-700 rounded-l-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                    />
                    <span className="inline-flex items-center px-3 text-xs font-mono font-bold bg-slate-200 dark:bg-slate-800 border border-l-0 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-r-xl select-none">
                      @soy.sena.edu.co
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Dirección completa: <span className="font-mono text-[#007832] dark:text-emerald-400 font-semibold">{fullEmail}</span>
                </p>
                {formErrors.email && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.email}
                  </p>
                )}
              </div>

              {/* Ciudad de Residencia */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Ciudad de Residencia <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    list="ciudades-sena"
                    required
                    value={city}
                    onChange={e => {
                      setCity(e.target.value);
                      if (formErrors.city) setFormErrors(prev => ({ ...prev, city: '' }));
                    }}
                    placeholder="Ej. Medellín, Bogotá, Cali..."
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                  />
                  <datalist id="ciudades-sena">
                    {COMMON_CITIES.map(c => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
                {formErrors.city && (
                  <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.city}
                  </p>
                )}
              </div>

              {/* Estrato */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Estrato Socioeconómico <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <select
                    value={stratum}
                    onChange={e => setStratum(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                  >
                    {STRATA_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Caracterización de la Población */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Caracterización de la Población (Categoría SENA) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Users2 className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <select
                    value={populationCharacterization}
                    onChange={e => setPopulationCharacterization(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                  >
                    {POPULATION_CHARACTERIZATIONS.map(p => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                  Utilizado para el seguimiento de inclusión, bienestar al aprendiz y políticas de equidad institucional.
                </p>
              </div>
            </div>
          </div>

          {/* Seccion 3: Datos de Formación */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-[#007832] dark:text-emerald-400">
              <BookOpen className="w-4 h-4" />
              <span>3. Programa y Ficha de Formación</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Número de Ficha de Caracterización <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={trainingCard}
                    onChange={e => setTrainingCard(e.target.value)}
                    placeholder="Ej. 2824910"
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Programa de Formación <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={program}
                  onChange={e => setProgram(e.target.value)}
                  placeholder="Ej. Análisis y Desarrollo de Software (ADSO)"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Centro de Formación SENA
                </label>
                <input
                  type="text"
                  value={center}
                  onChange={e => setCenter(e.target.value)}
                  placeholder="Ej. Centro de Servicios y Gestión Empresarial"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-2.5 text-[11px] text-emerald-900 dark:text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
            <span>
              Tus datos quedan vinculados a tu proceso de inducción y constancia oficial. Se gestionan conforme a la Ley de Protección de Datos Personales (Ley 1581 de 2012) del SENA.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 bg-[#39A900] hover:bg-[#007832] text-white text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Guardar Registro y Continuar</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
