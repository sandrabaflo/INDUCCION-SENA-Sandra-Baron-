import React, { useState } from 'react';
import { ApprenticeResult } from '../data/senaData';
import { Award, Printer, X, ShieldCheck, QrCode, Mail, CheckCircle2 } from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { SendEmailConfirmModal } from './SendEmailConfirmModal';
import { sendApprenticeCertificateEmail } from '../services/gmailService';
import { auth, googleSignIn } from '../services/googleAuth';

interface CertificateModalProps {
  result: ApprenticeResult;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ result, onClose }) => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailNotification, setEmailNotification] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const verificationCode = `SENA-${result.trainingCard}-${result.documentNumber.slice(-4)}-${Date.now().toString(36).toUpperCase()}`;

  const handleConfirmSendEmail = async (recipient: string, cc?: string) => {
    const res = await sendApprenticeCertificateEmail(result, recipient, cc);
    if (res.success) {
      setEmailNotification(`Certificado enviado exitosamente a ${recipient}`);
      setTimeout(() => setEmailNotification(null), 5000);
    }
    return res;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        {/* Top Action Bar (hidden on print) */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 print:hidden gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
            <Award className="w-4 h-4 text-[#39A900] dark:text-emerald-400" />
            <span>Certificado de Inducción Institucional Generado</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-end">
            <button
              onClick={() => setShowEmailModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#00324D] text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
              title="Enviar copia del certificado por correo Gmail"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Enviar por Gmail</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#39A900] text-white text-xs font-semibold rounded-lg hover:bg-[#007832] transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {emailNotification && (
          <div className="px-6 py-2 bg-emerald-100 dark:bg-emerald-950/80 text-[#007832] dark:text-emerald-300 text-xs font-semibold flex items-center justify-between border-b border-emerald-200 dark:border-emerald-800 print:hidden">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{emailNotification}</span>
            </div>
            <button onClick={() => setEmailNotification(null)} className="opacity-70 hover:opacity-100">✕</button>
          </div>
        )}

        {/* Certificate Printable Area */}
        <div id="certificate-print-area" className="p-8 sm:p-12 text-slate-900 bg-[#FFFFFF] relative">
          {/* Institutional Border Frame */}
          <div className="border-4 border-double border-[#39A900] p-8 sm:p-10 rounded-xl relative overflow-hidden bg-gradient-to-b from-emerald-50/20 via-white to-emerald-50/10">
            
            {/* Header */}
            <div className="text-center space-y-2 mb-8">
              <div className="text-[11px] font-mono tracking-widest uppercase text-slate-500">
                República de Colombia · Ministerio del Trabajo
              </div>
              <div className="flex items-center justify-center gap-3">
                <SenaLogo className="w-12 h-12 object-contain" />
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                  SENA
                </div>
              </div>
              <div className="text-xs font-semibold tracking-wider uppercase text-[#007832]">
                Servicio Nacional de Aprendizaje
              </div>
              <div className="text-[11px] text-slate-500">
                {result.center}
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center my-6 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#39A900] font-bold">
                Constancia de Acreditación Formativa
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 uppercase tracking-wide">
                Inducción y Apropiación Institucional
              </h2>
              <div className="w-24 h-0.5 bg-[#39A900] mx-auto mt-2"></div>
            </div>

            {/* Certificate Body Text */}
            <div className="text-center space-y-4 my-8 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto">
              <p>
                La Coordinación Académica y la Subdirección del Centro de Formación certifican que:
              </p>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 py-1 border-b border-slate-300 inline-block px-4">
                {result.fullName}
              </div>
              <p className="text-xs text-slate-600">
                Identificado con {result.documentType ? `${result.documentType}.` : 'documento'} número <strong className="text-slate-800">{result.documentNumber}</strong>{result.city ? ` de ${result.city}` : ''}, aprendiz matriculado en la Ficha de Caracterización <strong className="text-slate-800">{result.trainingCard}</strong> del programa:
              </p>
              <div className="font-semibold text-slate-900 text-sm italic">
                "{result.program}"
              </div>
              {result.emailSoySena && (
                <div className="text-[11px] font-mono text-emerald-800 bg-emerald-50 py-0.5 px-2 rounded inline-block">
                  Correo Institucional: {result.emailSoySena}
                </div>
              )}
              <p className="text-xs text-slate-600">
                Ha completado satisfactoriamente el proceso de inducción, demostrando apropiación cabal de la <strong>misión, valores institucionales, derechos, deberes y reglamento del aprendiz</strong>, obteniendo una calificación diagnóstica de:
              </p>
              <div className="text-xl font-extrabold text-[#007832] font-mono">
                {result.score} / 100 PUNTOS · COMPETENCIA APROBADA
              </div>
            </div>

            {/* Signatures & Security Footer */}
            <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-slate-200 text-center">
              <div>
                <div className="w-36 h-10 border-b border-slate-400 mx-auto mb-1 flex items-end justify-center pb-1">
                  <span className="font-serif italic text-xs text-slate-600">Firma Digital Registrada</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Subdirección de Centro</div>
                <div className="text-[10px] text-slate-500">SENA Regional Colombia</div>
              </div>

              <div>
                <div className="w-36 h-10 border-b border-slate-400 mx-auto mb-1 flex items-end justify-center pb-1">
                  <span className="font-serif italic text-xs text-slate-600">Gestión de Inducción</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Líder de Bienestar e Inducción</div>
                <div className="text-[10px] text-slate-500">Coordinación de Formación</div>
              </div>
            </div>

            {/* QR and Verification Hash */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-4 border-t border-slate-100 text-[10px] text-slate-500">
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8 text-slate-700" />
                <div className="text-left font-mono">
                  <div>Código de Verificación:</div>
                  <strong className="text-slate-700">{verificationCode}</strong>
                </div>
              </div>
              <div className="text-right font-mono">
                <div>Fecha de Expedición: {result.date}</div>
                <div>Validez Nacional SENA - Decreto 118 de 1957</div>
              </div>
            </div>

          </div>
        </div>

        {/* Send Email Confirmation Dialog */}
        <SendEmailConfirmModal
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onConfirmSend={handleConfirmSendEmail}
          defaultRecipient={result.emailSoySena || ''}
          defaultSubject={`Constancia de Aprobación de Inducción SENA - ${result.fullName} (Ficha ${result.trainingCard})`}
          previewSummary={{
            type: 'certificate',
            apprenticeName: result.fullName,
            documentNumber: `${result.documentType || 'CC'} ${result.documentNumber}`,
            ficha: result.trainingCard,
            score: result.score,
            program: result.program
          }}
          googleUser={auth.currentUser}
          onGoogleSignIn={googleSignIn}
        />
      </div>
    </div>
  );
};
