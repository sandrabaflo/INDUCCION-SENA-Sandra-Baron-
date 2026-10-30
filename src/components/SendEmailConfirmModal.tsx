import React, { useState } from 'react';
import { Mail, AlertCircle, CheckCircle2, Loader2, X, Send } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';

interface SendEmailConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSend: (recipient: string, cc?: string) => Promise<{ success: boolean; messageId?: string }>;
  defaultRecipient: string;
  defaultSubject: string;
  defaultCc?: string;
  previewSummary: {
    apprenticeName?: string;
    documentNumber?: string;
    ficha?: string;
    score?: number;
    program?: string;
    type: 'certificate' | 'digest';
  };
  googleUser?: FirebaseUser | null;
  onGoogleSignIn?: () => void;
}

export const SendEmailConfirmModal: React.FC<SendEmailConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirmSend,
  defaultRecipient,
  defaultSubject,
  defaultCc = '',
  previewSummary,
  googleUser,
  onGoogleSignIn
}) => {
  const [recipient, setRecipient] = useState(defaultRecipient);
  const [cc, setCc] = useState(defaultCc);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message?: string }>({ type: 'idle' });

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      setStatus({ type: 'error', message: 'Por favor ingrese una dirección de correo válida.' });
      return;
    }

    try {
      setIsSending(true);
      setStatus({ type: 'idle' });
      const res = await onConfirmSend(recipient.trim(), cc.trim() || undefined);
      if (res.success) {
        setStatus({
          type: 'success',
          message: `¡Correo enviado exitosamente a través de Gmail! (ID: ${res.messageId || 'OK'})`
        });
        setTimeout(() => {
          onClose();
          setStatus({ type: 'idle' });
        }, 2200);
      }
    } catch (err: any) {
      console.error('Error al enviar correo:', err);
      setStatus({
        type: 'error',
        message: err.message || 'Error al comunicarse con la API de Gmail. Verifique su conexión y permisos.'
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-[#007832] dark:text-emerald-400">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Confirmar Envío por Gmail
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Se enviará utilizando la API oficial de Gmail en Google Workspace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isSending}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSend} className="p-6 space-y-4">
          {!googleUser && (
            <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center justify-between gap-3 text-xs text-amber-800 dark:text-amber-300">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Debe conectar su cuenta de Google para enviar correos vía Gmail.</span>
              </div>
              {onGoogleSignIn && (
                <button
                  type="button"
                  onClick={onGoogleSignIn}
                  className="px-3 py-1 bg-amber-600 text-white rounded-lg font-bold text-[11px] hover:bg-amber-700 shrink-0"
                >
                  Conectar
                </button>
              )}
            </div>
          )}

          {googleUser && (
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400">Remitente:</span>
              <strong className="font-mono text-slate-800 dark:text-slate-200 text-[11px]">
                {googleUser.email || googleUser.displayName}
              </strong>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Destinatario (Para): *
            </label>
            <input
              type="email"
              required
              value={recipient}
              onChange={e => setRecipient(e.target.value)}
              placeholder="aprendiz@soy.sena.edu.co"
              className="w-full px-3.5 py-2 text-xs font-mono border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-[#39A900] focus:outline-none"
            />
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 block">
              Correo institucional del aprendiz con dominio @soy.sena.edu.co o correo personal registrado.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Con Copia (Cc): (Opcional)
            </label>
            <input
              type="email"
              value={cc}
              onChange={e => setCc(e.target.value)}
              placeholder="instructor@sena.edu.co"
              className="w-full px-3.5 py-2 text-xs font-mono border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-[#39A900] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Asunto:
            </label>
            <div className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-300 font-medium truncate">
              {defaultSubject}
            </div>
          </div>

          {/* Preview Card */}
          <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 rounded-xl space-y-1.5 text-xs">
            <div className="text-[10px] font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">
              Vista previa del contenido a despachar:
            </div>
            {previewSummary.type === 'certificate' ? (
              <div className="space-y-1 text-slate-700 dark:text-slate-300">
                <div>Aprendiz: <strong>{previewSummary.apprenticeName}</strong></div>
                <div>Documento: <strong className="font-mono">{previewSummary.documentNumber}</strong> · Ficha: <strong className="font-mono">{previewSummary.ficha}</strong></div>
                <div>Calificación Acreditada: <strong className="text-[#007832] font-mono">{previewSummary.score}/100 PUNTOS</strong></div>
                <div className="text-[11px] text-slate-500 italic">Incluye constancia formal con sello digital SENA y código QR de verificación.</div>
              </div>
            ) : (
              <div className="space-y-1 text-slate-700 dark:text-slate-300">
                <div>Reporte oficial consolidado para Ficha: <strong className="font-mono">{previewSummary.ficha}</strong></div>
                <div>Incluye lista de aprendices, notas de apropiación y enlace a Google Sheets.</div>
              </div>
            )}
          </div>

          {/* Status Message */}
          {status.type === 'success' && (
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 text-[#007832] dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {status.type === 'error' && (
            <div className="p-3 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{status.message}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSending || !googleUser}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Enviando por Gmail...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirmar y Enviar vía Gmail</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
