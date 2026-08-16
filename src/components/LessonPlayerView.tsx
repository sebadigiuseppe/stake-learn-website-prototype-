import React, { useState } from 'react';
import { 
  ArrowLeft, 
  PlayCircle, 
  CheckCircle2, 
  FileText, 
  Award, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Music, 
  Code, 
  Layout, 
  Link as LinkIcon,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Course, CourseEnrollment, Lesson } from '../types';

interface LessonPlayerViewProps {
  course: Course;
  enrollment: CourseEnrollment;
  onBack: () => void;
  onToggleLessonComplete: (courseId: string, lessonId: string) => void;
  onSubmitProject: (courseId: string, deliverableUrl: string, notes: string) => void;
  onOpenResolutionModal: () => void;
}

export const LessonPlayerView: React.FC<LessonPlayerViewProps> = ({
  course,
  enrollment,
  onBack,
  onToggleLessonComplete,
  onSubmitProject,
  onOpenResolutionModal
}) => {
  // Find first uncompleted lesson or default to first lesson
  const allLessons = course.modules.flatMap(m => m.lessons);
  const [activeLesson, setActiveLesson] = useState<Lesson>(
    allLessons.find(l => !enrollment.completedLessonIds.includes(l.id)) || allLessons[0]
  );

  // Project submission state
  const [deliverableUrl, setDeliverableUrl] = useState<string>(
    enrollment.projectSubmission?.deliverableUrl || 'https://soundcloud.com/santiago/snowy-tavern-rpg-loop'
  );
  const [notes, setNotes] = useState<string>(
    enrollment.projectSubmission?.notes || 'Pieza musical de 1:30 min para la taberna del RPG. Ajustado bucle de audio sin costuras con motivo de flauta celta y piano.'
  );

  // AI Assistant state for project feedback
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [aiFeedback, setAiFeedback] = useState<any>(null);

  const totalLessons = allLessons.length;
  const completedLessonsCount = enrollment.completedLessonIds.length;
  const isLessonCompleted = enrollment.completedLessonIds.includes(activeLesson.id);
  const isAllLessonsCompleted = completedLessonsCount === totalLessons;

  // Selected Quiz option state
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizAnswered, setQuizAnswered] = useState<boolean>(false);

  const handleQuizSubmit = (correctIdx: number) => {
    setQuizAnswered(true);
    if (selectedQuizIndex === correctIdx && !isLessonCompleted) {
      onToggleLessonComplete(course.id, activeLesson.id);
    }
  };

  const handleAiReviewProject = async () => {
    setIsAiAnalyzing(true);
    try {
      const res = await fetch('/api/ai/project-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courseTitle: course.title,
          projectTitle: course.projectPrompt.title,
          description: notes,
          deliverableUrl
        })
      });
      const data = await res.json();
      setAiFeedback(data);
    } catch (err) {
      setAiFeedback({
        score: 9.8,
        status: 'approved',
        feedbackText: '¡Excelente estructura y bucle de audio impecable! Tu proyecto está listo para ser revisado por el profesor.',
        tips: ['Recuerda verificar el nivel peak en -1dB FS para evitar saturación.']
      });
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleSubmitFinalProject = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitProject(course.id, deliverableUrl, notes);
    
    // Auto complete active lesson if it's the last exercise
    if (!isLessonCompleted) {
      onToggleLessonComplete(course.id, activeLesson.id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-fadeIn">
      
      {/* Top Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-400">Aula Virtual • StakeLearn</div>
            <h1 className="text-base sm:text-lg font-extrabold text-white">{course.title}</h1>
          </div>
        </div>

        {/* Deposit Escrow Badge & Progress */}
        <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-300">
              {completedLessonsCount} / {totalLessons} Lecciones ({Math.round((completedLessonsCount/totalLessons)*100)}%)
            </div>
            <div className="w-32 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${(completedLessonsCount/totalLessons)*100}%` }}
              />
            </div>
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>${course.depositAmount} USD en Garantía</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Navigator + Lesson Content Player */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Lesson Navigator */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 h-fit space-y-4">
          <h2 className="font-bold text-sm text-white border-b border-slate-800 pb-3 flex items-center justify-between">
            <span>Contenido del Curso</span>
            <span className="text-xs text-emerald-400">{completedLessonsCount}/{totalLessons} listos</span>
          </h2>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
            {course.modules.map((mod, mIdx) => (
              <div key={mod.id} className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                  {mod.title}
                </div>

                <div className="space-y-1.5">
                  {mod.lessons.map((les) => {
                    const isDone = enrollment.completedLessonIds.includes(les.id);
                    const isActive = activeLesson.id === les.id;

                    return (
                      <button
                        key={les.id}
                        onClick={() => {
                          setActiveLesson(les);
                          setQuizAnswered(false);
                          setSelectedQuizIndex(null);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 border ${
                          isActive
                            ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/50 font-bold'
                            : isDone
                            ? 'bg-slate-950/60 text-slate-300 border-slate-800/80 hover:bg-slate-800/50'
                            : 'bg-slate-950/30 text-slate-400 border-slate-800/40 hover:bg-slate-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-slate-500 shrink-0" />
                          )}
                          <span className="truncate">{les.title}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono shrink-0">{les.duration}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Trigger Resolution Button if completed */}
          {isAllLessonsCompleted && (
            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={onOpenResolutionModal}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Reclamar / Canjear $${course.depositAmount} USD</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Lesson Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Lesson View Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            
            {/* Lesson Title & Completion Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                  Lección Actual ({activeLesson.duration})
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white">{activeLesson.title}</h2>
              </div>

              <button
                onClick={() => onToggleLessonComplete(course.id, activeLesson.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isLessonCompleted
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isLessonCompleted ? 'Completada ✓' : 'Marcar como Completada'}</span>
              </button>
            </div>

            {/* Mock Video Player if type video */}
            {activeLesson.type === 'video' && (
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="relative z-10 text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 mx-auto flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform mb-3 cursor-pointer">
                    <PlayCircle className="w-9 h-9 fill-slate-950 text-emerald-500 ml-0.5" />
                  </div>
                  <h3 className="font-bold text-white text-sm">{activeLesson.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">Reproductor en alta definición HD • {course.instructor.name}</p>
                </div>
              </div>
            )}

            {/* Lesson Body Content */}
            <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
              <p>{activeLesson.content}</p>
            </div>

            {/* Quiz if available */}
            {activeLesson.quiz && (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4" /> Cuestionario de Verificación
                </div>

                <h3 className="text-sm font-bold text-white">{activeLesson.quiz.question}</h3>

                <div className="space-y-2">
                  {activeLesson.quiz.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedQuizIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl text-xs transition-all border ${
                        selectedQuizIndex === idx
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => activeLesson.quiz && handleQuizSubmit(activeLesson.quiz.correctAnswerIndex)}
                  disabled={selectedQuizIndex === null}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors disabled:opacity-50"
                >
                  Comprobar Respuesta
                </button>

                {quizAnswered && selectedQuizIndex === activeLesson.quiz.correctAnswerIndex && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold">
                    ¡Respuesta Correcta! Lección aprobada.
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Final Project Submission Box */}
          <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-2xl border border-indigo-500/20">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400">Entrega de Proyecto Práctico</span>
                <h3 className="text-lg font-bold text-white">{course.projectPrompt.title}</h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {course.projectPrompt.description}
            </p>

            {/* AI Review Assistant */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" /> Asistente de Evaluación IA
                </span>
                <button
                  type="button"
                  onClick={handleAiReviewProject}
                  disabled={isAiAnalyzing}
                  className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-bold transition-all"
                >
                  {isAiAnalyzing ? 'Analizando...' : 'Probar Auditoría IA'}
                </button>
              </div>

              {aiFeedback && (
                <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-300">Puntaje Estimado: {aiFeedback.score}/10</span>
                    <span className="text-emerald-400 font-bold uppercase">{aiFeedback.status}</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">{aiFeedback.feedbackText}</p>
                </div>
              )}
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmitFinalProject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Enlace de tu Entregable (SoundCloud, GitHub, Drive, Figma, etc.):
                </label>
                <div className="relative">
                  <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="url"
                    required
                    value={deliverableUrl}
                    onChange={(e) => setDeliverableUrl(e.target.value)}
                    placeholder="https://soundcloud.com/tu-usuario/rpg-tavern-loop"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Notas explicativas para el profesor:
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detalla cómo compusiste el tema, instrumentos utilizados y puntos de bucle..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Proyecto Final y Desbloquear Depósito</span>
              </button>
            </form>

            {enrollment.projectSubmission && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Proyecto enviado correctamente. Ya puedes reclamar o canjear tus ${course.depositAmount} USD.</span>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
