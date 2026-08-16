import React, { useState } from 'react';
import { 
  Briefcase, 
  ExternalLink, 
  Play, 
  Pause, 
  CheckCircle2, 
  Star, 
  MessageSquare, 
  Sparkles,
  Music,
  Code,
  Layout,
  Link as LinkIcon
} from 'lucide-react';
import { StudentProject } from '../types';

interface ProjectsGalleryViewProps {
  projects: StudentProject[];
}

export const ProjectsGalleryView: React.FC<ProjectsGalleryViewProps> = ({ projects }) => {
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const toggleAudio = (id: string, url?: string) => {
    if (!url) return;

    if (playingAudioId === id && audioElement) {
      audioElement.pause();
      setPlayingAudioId(null);
      return;
    }

    if (audioElement) {
      audioElement.pause();
    }

    const newAudio = new Audio(url);
    newAudio.play();
    setAudioElement(newAudio);
    setPlayingAudioId(id);

    newAudio.onended = () => {
      setPlayingAudioId(null);
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Evidencia Real de Aprendizaje
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white mb-2">
          Galería de Proyectos Prácticos
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          El modelo de depósito garantiza que los estudiantes no solo miren videos, sino que entreguen proyectos reales con retroalimentación personalizada.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => {
          const isAudioPlaying = playingAudioId === proj.id;

          return (
            <div 
              key={proj.id}
              className="bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div>
                {/* Course Name */}
                <div className="text-[10px] uppercase font-extrabold text-indigo-400 tracking-wider mb-2">
                  {proj.courseTitle}
                </div>

                {/* Project Title */}
                <h3 className="text-base font-bold text-white mb-2 line-clamp-1">
                  {proj.projectTitle}
                </h3>

                <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Audio Preview Widget if audio URL exists */}
                {proj.audioPreviewUrl && (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={() => toggleAudio(proj.id, proj.audioPreviewUrl)}
                        className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center transition-transform hover:scale-105 shadow-md"
                      >
                        {isAudioPlaying ? (
                          <Pause className="w-4 h-4 fill-slate-950" />
                        ) : (
                          <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                        )}
                      </button>
                      <div className="text-xs">
                        <div className="font-bold text-white">Escuchar Muestra de Audio</div>
                        <div className="text-[10px] text-slate-400">Bucle RPG • Formato MP3</div>
                      </div>
                    </div>
                    <Music className="w-4 h-4 text-emerald-400" />
                  </div>
                )}

                {/* Feedback Box if instructor graded */}
                {proj.feedback ? (
                  <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-3 mb-4 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Aprobado con {proj.feedback.score}/10
                      </span>
                      <span className="text-[10px] text-slate-500">{proj.feedback.instructorName}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 italic">
                      "{proj.feedback.text}"
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 mb-4 text-xs text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pendiente de evaluación del profesor</span>
                  </div>
                )}
              </div>

              {/* Student Footer */}
              <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={proj.studentAvatar} alt={proj.studentName} className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs font-semibold text-slate-200">{proj.studentName}</span>
                </div>

                <a 
                  href={proj.deliverableUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <span>Ver Entregable</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
