import React, { useState } from 'react';
import { BookOpen, X, Download, Printer, CheckCircle2, ChevronRight, HelpCircle, ShieldCheck, Award } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface ManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManualModal: React.FC<ManualModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('intro');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-[#007832] dark:text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">
                  Guía de Apropiación · Acuerdo 009 de 2024
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Manual de Usuario para Aprendices SENA
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body with quick navigation */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          
          {/* Quick jump navigation pills */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
            <a href="#m-intro" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#39A900] hover:text-white transition-colors text-xs font-medium">1. Inicio y Rol</a>
            <a href="#m-registro" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#39A900] hover:text-white transition-colors text-xs font-medium">2. Registro Inicial</a>
            <a href="#m-identidad" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#39A900] hover:text-white transition-colors text-xs font-medium">3. Identidad SENA</a>
            <a href="#m-tramites" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#39A900] hover:text-white transition-colors text-xs font-medium">4. Trámites Acuerdo 009</a>
            <a href="#m-regimen" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#39A900] hover:text-white transition-colors text-xs font-medium">5. Faltas y Comité</a>
            <a href="#m-derechos" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#39A900] hover:text-white transition-colors text-xs font-medium">6. Derechos y Deberes</a>
            <a href="#m-ruta" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#39A900] hover:text-white transition-colors text-xs font-medium">7. Etapa Productiva</a>
            <a href="#m-evaluacion" className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-[#39A900] hover:text-white transition-colors text-xs font-medium">8. Evaluación y Certificado</a>
          </div>

          {/* Section 1 */}
          <section id="m-intro" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#007832] text-white flex items-center justify-center text-xs">1</span>
              Acceso a la Plataforma y Selección de Rol
            </h3>
            <p className="leading-relaxed">
              La plataforma inicia en el <strong>Portal de Selección de Rol</strong> donde puedes elegir entre el entorno del aprendiz o el panel del instructor. Al presionar <strong>"Ingresar como Aprendiz"</strong>, se habilitarán todos los módulos de inducción y el examen de acreditación.
            </p>
          </section>

          {/* Section 2 */}
          <section id="m-registro" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#007832] text-white flex items-center justify-center text-xs">2</span>
              Registro y Caracterización Inicial
            </h3>
            <p className="leading-relaxed">
              Haz clic en el botón <strong>"Registrar Datos"</strong> en la barra superior. Diligencia tus nombres y apellidos, tipo y número de documento, número móvil, <strong>correo con dominio @soy.sena.edu.co</strong>, ciudad de residencia, estrato socioeconómico, caracterización de la población y el número de tu Ficha de Caracterización.
            </p>
          </section>

          {/* Section 3 */}
          <section id="m-identidad" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#007832] text-white flex items-center justify-center text-xs">3</span>
              Módulo 1: Identidad Institucional y Símbolos
            </h3>
            <p className="leading-relaxed">
              Aprende sobre el <strong>Escudo Oficial</strong> (los tres sectores económicos: industria, comercio/servicios y agropecuario), la <strong>Bandera blanca</strong> de la paz y transparencia, el <strong>Himno</strong> y el decálogo de valores éticos que guían a la comunidad SENA.
            </p>
          </section>

          {/* Section 4 */}
          <section id="m-tramites" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#007832] text-white flex items-center justify-center text-xs">4</span>
              Módulo 2: Trámites y Novedades (Acuerdo 009 de 2024)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="block text-slate-900 dark:text-white mb-1">Traslado y Aplazamiento</strong>
                Solicitudes formales por fuerza mayor o cambio de domicilio. El aplazamiento se concede hasta por 12 meses.
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <strong className="block text-slate-900 dark:text-white mb-1">Deserción e Inasistencias</strong>
                3 días consecutivos sin justificación configuran causal de deserción. Tienes <strong>3 días hábiles</strong> para radicar soportes válidos.
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section id="m-regimen" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#007832] text-white flex items-center justify-center text-xs">5</span>
              Módulo 3: Régimen de Faltas y Comité de Evaluación
            </h3>
            <p className="leading-relaxed">
              Conoce la diferencia entre <strong>medidas formativas</strong> (llamado de atención verbal y plan de mejoramiento pedagógico) y <strong>medidas sancionatorias</strong> (llamado escrito, condicionamiento o cancelación de matrícula). El <strong>Comité de Evaluación y Seguimiento</strong> garantiza el debido proceso y tu derecho a presentar descargos y pruebas.
            </p>
          </section>

          {/* Section 6 */}
          <section id="m-derechos" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#007832] text-white flex items-center justify-center text-xs">6</span>
              Módulo 4: Derechos y Deberes del Aprendiz
            </h3>
            <p className="leading-relaxed">
              Porta siempre tu carné en lugar visible, participa activamente de los servicios de Bienestar al Aprendiz, cuida la infraestructura y respeta a todos los miembros de la comunidad formativa.
            </p>
          </section>

          {/* Section 7 */}
          <section id="m-ruta" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#007832] text-white flex items-center justify-center text-xs">7</span>
              Módulo 5: Ruta Formativa y Etapa Productiva
            </h3>
            <p className="leading-relaxed">
              Explora las alternativas autorizadas: <strong>Contrato de Aprendizaje</strong>, <strong>Vínculo Laboral</strong>, <strong>Proyecto Productivo</strong> con Fondo Emprender, <strong>Pasantía</strong> o <strong>Monitoría</strong> en ambientes SENA.
            </p>
          </section>

          {/* Section 8 */}
          <section id="m-evaluacion" className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#007832] text-white flex items-center justify-center text-xs">8</span>
              Módulo 6: Evaluación Interactiva, Google Sheets y Certificado
            </h3>
            <p className="leading-relaxed">
              Presenta la evaluación interactiva. Cada respuesta se registra en tiempo real en la hoja de cálculo de Google Drive. Al alcanzar <strong>80 puntos o más</strong>, el sistema genera tu <strong>Certificado Oficial con código QR</strong>, el cual puedes imprimir o despachar directamente a tu correo SoySENA con el botón <strong>"Enviar por Gmail"</strong>.
            </p>
          </section>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <SenaLogo className="w-5 h-5 object-contain" />
            <span>Documento disponible en la raíz del proyecto como <strong>manual</strong> y <strong>manual.md</strong></span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
          >
            Entendido / Cerrar
          </button>
        </div>

      </div>
    </div>
  );
};
