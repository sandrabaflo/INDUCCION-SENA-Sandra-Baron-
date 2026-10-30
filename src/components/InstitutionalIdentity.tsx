import React, { useState } from 'react';
import { SENA_VALUES, SENA_SYMBOLS } from '../data/senaData';
import { SenaLogo } from './SenaLogo';
import { 
  Building2, 
  Compass, 
  Lightbulb, 
  HeartHandshake, 
  UserCheck, 
  Users, 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  Pause, 
  Volume2, 
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface InstitutionalIdentityProps {
  onStartEvaluation: () => void;
}

export const InstitutionalIdentity: React.FC<InstitutionalIdentityProps> = ({ onStartEvaluation }) => {
  const [activeSymbolTab, setActiveSymbolTab] = useState<'escudo' | 'logosimbolo' | 'bandera' | 'himno'>('escudo');
  const [selectedSectorIndex, setSelectedSectorIndex] = useState<number>(0);
  const [isPlayingHymn, setIsPlayingHymn] = useState<boolean>(false);
  const [activeVerse, setActiveVerse] = useState<number>(0);

  // Map icon name to lucide component
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#39A900]" />;
      case 'Lightbulb': return <Lightbulb className="w-5 h-5 text-[#39A900]" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#39A900]" />;
      case 'Users': return <Users className="w-5 h-5 text-[#39A900]" />;
      case 'Scale': return <Scale className="w-5 h-5 text-[#39A900]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-[#39A900]" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-[#39A900]" />;
      default: return <Sparkles className="w-5 h-5 text-[#39A900]" />;
    }
  };

  const toggleHymnPlayback = () => {
    setIsPlayingHymn(!isPlayingHymn);
  };

  return (
    <div className="space-y-16 py-8">
      {/* Hero Intro Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-3">
              <span>Inducción Institucional 2026</span>
              <span aria-hidden="true">·</span>
              <span>Formación Profesional Integral</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
              Bienvenido al SENA: El lugar donde forjamos el futuro de Colombia
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
              El Servicio Nacional de Aprendizaje es la institución más querida de los colombianos. Aquí no solo adquieres competencias técnicas y tecnológicas para el trabajo, sino que te transformas en un ciudadano íntegro, ético, librepensador y comprometido con el desarrollo del país.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onStartEvaluation}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#39A900] text-white text-sm font-semibold rounded-lg hover:bg-[#007832] transition-colors shadow-sm"
              >
                <span>Hacer Evaluación de Apropiación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span>Fundado en 1957 por Rodolfo Martínez Tono</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative min-h-[280px] lg:min-h-full bg-slate-100 dark:bg-slate-800">
            <img
              src="/src/assets/images/hero_sena_induction_1793115151128.jpg"
              alt="Aprendices SENA en ambiente colaborativo de aprendizaje práctico"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-colors duration-300">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-400 flex items-center justify-center mb-4">
            <Compass className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Misión Institucional</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.
          </p>
        </div>

        <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-colors duration-300">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#007832] dark:text-emerald-400 flex items-center justify-center mb-4">
            <Building2 className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Visión SENA</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            Consolidarse como una entidad referente internacional en formación profesional integral, reconocida por su permanente innovación pedagógica, articulación con el sector productivo, la inclusión social y la formación de talento con altas competencias tecnológicas, humanísticas y de liderazgo sostenible.
          </p>
        </div>
      </section>

      {/* Símbolos Institucionales Interactivos */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 shadow-sm transition-colors duration-300">
        <div className="mb-8">
          <div className="text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
            Heráldica y Sentido de Pertenencia
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Símbolos Oficiales del SENA
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            Explora cada elemento de nuestra identidad institucional y comprende el profundo significado de nuestra insignia.
          </p>
        </div>

        {/* Segmented Selector for Symbols */}
        <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg max-w-xl mb-8">
          <button
            onClick={() => setActiveSymbolTab('escudo')}
            className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeSymbolTab === 'escudo'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            El Escudo
          </button>
          <button
            onClick={() => setActiveSymbolTab('logosimbolo')}
            className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeSymbolTab === 'logosimbolo'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            El Logo-Símbolo
          </button>
          <button
            onClick={() => setActiveSymbolTab('bandera')}
            className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeSymbolTab === 'bandera'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            La Bandera
          </button>
          <button
            onClick={() => setActiveSymbolTab('himno')}
            className={`flex-1 min-w-[120px] px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
              activeSymbolTab === 'himno'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            El Himno
          </button>
        </div>

        {/* Tab 1: Escudo */}
        {activeSymbolTab === 'escudo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center flex flex-col items-center justify-center">
              {/* Official SENA Shield Image */}
              <div className="w-72 h-72 bg-white dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center p-4 shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
                <img
                  src="/src/assets/images/escudo_sena.png"
                  alt="Escudo Oficial del SENA"
                  className="w-[264px] h-[264px] object-contain drop-shadow-sm"
                />
              </div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Escudo Oficial del SENA · Los 3 Sectores Económicos
              </span>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Los Tres Sectores de la Economía en el Escudo
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Haz clic en cada sector para examinar cómo el SENA capacita y dinamiza el aparato productivo nacional:
              </p>

              <div className="space-y-3 mt-4">
                {SENA_SYMBOLS.escudo.elements.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedSectorIndex(index)}
                    className={`cursor-pointer p-4 rounded-xl border transition-all ${
                      selectedSectorIndex === index
                        ? 'border-[#39A900] bg-emerald-50/50 dark:bg-emerald-950/40 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.sector}
                      </h4>
                      <span className="text-xs font-mono text-[#007832] dark:text-emerald-400 font-semibold">
                        {item.symbol}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Logo-Símbolo */}
        {activeSymbolTab === 'logosimbolo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center flex flex-col items-center justify-center">
              {/* Official SENA Logo-symbol */}
              <div className="w-52 h-52 bg-white dark:bg-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <SenaLogo className="w-44 h-44 object-contain" />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-4">
                El ser humano y los senderos de autorrealización
              </span>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                El Sendero del Aprendiz Hacia el Futuro
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                El logo-símbolo del SENA muestra de forma estilizada la figura de un ser humano que avanza con optimismo a través de dos senderos o columnas paralelas.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {SENA_SYMBOLS.logosimbolo.elements.map((el, i) => (
                  <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl">
                    <div className="text-xs font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wide mb-1">
                      {el.name}
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {el.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Bandera */}
        {activeSymbolTab === 'bandera' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center">
              <div className="w-64 h-40 bg-white border-2 border-slate-300 dark:border-slate-600 rounded shadow flex items-center justify-center relative overflow-hidden">
                <img 
                  src="/src/assets/images/escudo_sena.png" 
                  alt="Escudo oficial en Bandera SENA" 
                  className="w-20 h-20 object-contain" 
                />
                <div className="absolute bottom-2 right-2 text-[10px] text-slate-400 font-mono">
                  Blanco Puro · Paz y Saber
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                La Bandera del SENA
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {SENA_SYMBOLS.bandera.description}
              </p>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-300 space-y-2">
                <div className="font-semibold text-slate-900 dark:text-white">Protocolo Institucional:</div>
                <p>
                  La bandera institucional se iza en todos los centros de formación y ceremonias de certificación a la diestra de la Bandera de la República de Colombia, simbolizando el pacto formativo entre el Estado y los trabajadores.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Himno */}
        {activeSymbolTab === 'himno' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{SENA_SYMBOLS.himno.title}</h3>
                <span className="text-xs text-slate-600 dark:text-slate-400">{SENA_SYMBOLS.himno.author}</span>
              </div>
              <button
                onClick={toggleHymnPlayback}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#39A900] text-white text-xs font-semibold rounded-lg hover:bg-[#007832] transition-colors self-start sm:self-auto"
              >
                {isPlayingHymn ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>Pausar Lectura Guiada</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Iniciar Lectura Solemne</span>
                  </>
                )}
              </button>
            </div>

            {/* Coro */}
            <div className="p-6 bg-slate-900 dark:bg-slate-950 text-white rounded-xl text-center space-y-2 shadow-sm border border-slate-800">
              <div className="text-xs font-mono uppercase tracking-widest text-[#39A900] dark:text-emerald-400">
                Coro Institucional
              </div>
              <p className="text-base sm:text-lg font-serif italic max-w-xl mx-auto leading-relaxed">
                "{SENA_SYMBOLS.himno.coro}"
              </p>
            </div>

            {/* Estrofas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SENA_SYMBOLS.himno.estrofas.map((estrofa, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveVerse(idx)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer ${
                    activeVerse === idx
                      ? 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="text-xs font-bold text-[#007832] dark:text-emerald-400 mb-2 font-mono">
                    Estrofa {estrofa.numero}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-serif">
                    {estrofa.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Los 7 Valores Institucionales */}
      <section className="space-y-8">
        <div>
          <div className="text-xs font-semibold text-[#007832] dark:text-emerald-400 uppercase tracking-wider mb-1">
            Ética y Principios del Aprendiz
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Los 7 Valores Institucionales del SENA
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
            Cada valor rige la vida cotidiana del aprendiz en los talleres, aulas virtuales, proyectos de investigación y pasantías laborales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SENA_VALUES.map((val, idx) => (
            <div 
              key={idx}
              className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center mb-4">
                  {getIcon(val.icon)}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                  {val.name}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {val.description}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-200 block mb-0.5">En el aula o taller:</span>
                <span>{val.dailyApplication}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
