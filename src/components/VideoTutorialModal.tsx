import React from 'react';
import { X, Video, ExternalLink, Play, Film, Sparkles } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoTutorialModal: React.FC<VideoTutorialModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const originalVideoUrl = 'https://docs.google.com/videos/d/1JXAxlEj8SSfvG1F6t8oHTckF9n-B1aaCuGxHtnMAYgs/edit?usp=sharing';
  // Standard embeddable preview player with playback controls for Google Drive / Docs video
  const embedVideoUrl = 'https://drive.google.com/file/d/1JXAxlEj8SSfvG1F6t8oHTckF9n-B1aaCuGxHtnMAYgs/preview';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-[#007832] dark:text-emerald-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#007832] dark:text-emerald-400 uppercase tracking-wider">
                  Guía Multimedia · Inducción SENA
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-emerald-100/70 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold">
                  <Play className="w-2.5 h-2.5 fill-current" /> Con Controles
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Video Tutorial: Cómo Utilizar la Plataforma
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={originalVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Abrir video en Google Drive"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Abrir en Drive</span>
            </a>
            <button
              onClick={onClose}
              title="Cerrar reproductor"
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="p-3 sm:p-5 bg-black/95 flex flex-col items-center justify-center">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-800">
            <iframe
              src={embedVideoUrl}
              title="Video Tutorial Inducción SENA"
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* Modal Footer with quick instructions */}
        <div className="px-5 sm:px-6 py-3.5 bg-slate-50 dark:bg-slate-800/90 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400 shrink-0">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <Film className="w-4 h-4 text-[#39A900] shrink-0" />
            <span>
              Aprende a navegar los 5 módulos temáticos, presentar la evaluación y descargar tu certificado oficial con QR.
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-1.5 bg-[#39A900] hover:bg-[#007832] text-white text-xs font-semibold rounded-lg transition-colors shrink-0"
          >
            Cerrar Video
          </button>
        </div>

      </div>
    </div>
  );
};
