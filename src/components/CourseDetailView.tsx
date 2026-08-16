import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Clock, 
  Star, 
  PlayCircle, 
  CheckCircle2, 
  Lock, 
  Award, 
  FileText, 
  Video, 
  Sparkles, 
  UserCheck, 
  MessageSquare,
  HelpCircle,
  Briefcase
} from 'lucide-react';
import { Course, CourseEnrollment, UserWallet } from '../types';

interface CourseDetailViewProps {
  course: Course;
  enrollment?: CourseEnrollment;
  wallet: UserWallet;
  onBack: () => void;
  onEnroll: (course: Course) => void;
  onStartLesson: (course: Course) => void;
  onOpenExplainer: () => void;
}

export const CourseDetailView: React.FC<CourseDetailViewProps> = ({
  course,
  enrollment,
  wallet,
  onBack,
  onEnroll,
  onStartLesson,
  onOpenExplainer
}) => {
  const isEnrolled = !!enrollment;
  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessonsCount = enrollment?.completedLessonIds.length || 0;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
  
  const hasInsufficientFunds = wallet.balance < course.depositAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      
      {/* Back link */}
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-semibold mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al Catálogo de Cursos
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Main Info & Curriculum */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Banner */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
            
            {/* Category & Deposit guarantee pill */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold border border-slate-700">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Depósito Reembolsable ${course.depositAmount} USD
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white leading-tight mb-3">
              {course.title}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {course.subtitle}
            </p>

            {/* Quick Meta Stats */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{course.instructor.rating}</span>
                <span className="text-slate-500">({course.reviews.length} reseñas verificadas)</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>{course.durationHours} Horas estimadas</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-4 h-4 text-indigo-400" />
                <span>Nivel: {course.difficulty}</span>
              </div>
              <span>•</span>
              <div className="text-slate-300">
                <strong className="text-emerald-400 font-bold">{course.completionRate}%</strong> Estudiantes Completan
              </div>
            </div>

          </div>

          {/* Description & Learning Objectives */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-3">Sobre este Curso</h2>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {course.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-3">
                ¿Qué aprenderás en este curso?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.learningObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-2.5 bg-slate-950/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Syllabus / Modules Accordion */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white">Programa de Lecciones ({totalLessons} lecciones)</h2>
                <p className="text-xs text-slate-400">Acceso completo inmediato tras confirmar tu depósito de garantía</p>
              </div>
              {isEnrolled && (
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">{completedLessonsCount} / {totalLessons} Completadas</div>
                  <div className="w-28 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {course.modules.map((mod, mIdx) => (
                <div key={mod.id} className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 overflow-hidden">
                  <h3 className="font-bold text-sm text-white mb-3 flex items-center justify-between">
                    <span>{mod.title}</span>
                    <span className="text-xs text-slate-400 font-normal">{mod.lessons.length} lecciones</span>
                  </h3>

                  <div className="space-y-2">
                    {mod.lessons.map((les) => {
                      const isCompleted = enrollment?.completedLessonIds.includes(les.id);
                      return (
                        <div 
                          key={les.id}
                          className="flex items-center justify-between bg-slate-900 border border-slate-800/80 p-3 rounded-xl text-xs hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : isEnrolled ? (
                              <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />
                            ) : (
                              <Lock className="w-4 h-4 text-slate-500 shrink-0" />
                            )}
                            <span className={isCompleted ? 'text-slate-400 line-through' : 'text-slate-200 font-medium'}>
                              {les.title}
                            </span>
                          </div>
                          <span className="text-slate-500 font-mono text-[11px]">{les.duration}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final Project Deliverable Requirements Box */}
          <div className="bg-gradient-to-br from-indigo-950/50 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-xl">
                <Briefcase className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-400">Requisito de Liberación de Fondo</span>
                <h3 className="text-lg font-bold text-white">{course.projectPrompt.title}</h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {course.projectPrompt.description}
            </p>
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-center justify-between">
              <span>Tipo de Entregable: <strong className="text-indigo-300 uppercase">{course.projectPrompt.deliverableType}</strong></span>
              <span className="text-emerald-400 font-semibold">Garantía 100% Reembolsable post-entrega</span>
            </div>
          </div>

          {/* Student Reviews Section */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <h2 className="text-lg font-bold text-white mb-4">Reseñas Verificadas de Estudiantes</h2>
            <p className="text-xs text-slate-400 mb-6">
              Las valoraciones son dejadas por estudiantes que completaron el curso antes de reclamar su devolución o canjear su mentoría.
            </p>

            <div className="space-y-4">
              {course.reviews.map((rev) => (
                <div key={rev.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <img src={rev.studentAvatar} alt={rev.studentName} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="text-xs font-bold text-white">{rev.studentName}</div>
                        <div className="text-[10px] text-slate-500">{rev.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{rev.rating}.0</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    "{rev.comment}"
                  </p>
                  <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    {rev.wasRefunded ? 'Depósito Devuelto con Éxito' : 'Convertido a Mentoría 1a1'}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Enrollment CTA & Instructor Card */}
        <div className="space-y-6">
          
          {/* Enrollment / Action Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-24 space-y-6">
            
            {/* Cover Image Preview */}
            <div className="relative h-44 w-full rounded-2xl overflow-hidden bg-slate-950">
              <img src={course.coverImage} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg">
                  <PlayCircle className="w-7 h-7 fill-slate-950 text-emerald-500 ml-0.5" />
                </div>
              </div>
            </div>

            {/* Price / Deposit Box */}
            <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4 text-center">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Garantía de Depósito Reembolsable
              </div>
              <div className="text-3xl font-black text-emerald-400">
                ${course.depositAmount} USD
              </div>
              <p className="text-xs text-slate-300 mt-2 font-medium">
                🔒 No pagas matrícula. Inmovilizas $${course.depositAmount} que recuperas o canjeas al terminar.
              </p>
            </div>

            {/* Explainer link button */}
            <button 
              onClick={onOpenExplainer}
              className="w-full text-center text-xs text-emerald-400 hover:text-emerald-300 underline font-medium flex items-center justify-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Ver cómo funciona la devolución del dinero
            </button>

            {/* Action CTAs */}
            {isEnrolled ? (
              <div className="space-y-3">
                <button
                  onClick={() => onStartLesson(course)}
                  className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>Ir al Aula / Continuar Curso ({progressPercent}%)</span>
                </button>
                <div className="text-[11px] text-slate-400 text-center font-medium">
                  Has completado {completedLessonsCount} de {totalLessons} lecciones.
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {hasInsufficientFunds && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-300">
                    ⚠️ Tu saldo disponible es de ${wallet.balance} USD. Necesitas +${course.depositAmount - wallet.balance} USD para realizar este depósito.
                  </div>
                )}

                <button
                  onClick={() => onEnroll(course)}
                  disabled={hasInsufficientFunds}
                  className={`w-full py-4 px-4 font-black rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm ${
                    hasInsufficientFunds
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                  <span>Depositar ${course.depositAmount} USD e Inscribirme</span>
                </button>

                <p className="text-[11px] text-slate-500 text-center leading-normal">
                  Al hacer click, $${course.depositAmount} USD serán colocados en garantía. Puedes cancelar o recuperar tus fondos al finalizar el curso.
                </p>
              </div>
            )}

            {/* Guarantee checklist */}
            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acceso ilimitado a todo el material</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Opción de reembolso 100% con reseña</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Opción de canje directo por mentoría 1a1</span>
              </div>
            </div>

          </div>

          {/* Instructor Bio Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Tu Profesor</h3>
            <div className="flex items-center gap-3">
              <img src={course.instructor.avatar} alt={course.instructor.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-700" />
              <div>
                <h4 className="font-bold text-white text-sm">{course.instructor.name}</h4>
                <p className="text-xs text-slate-400">{course.instructor.title}</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {course.instructor.bio}
            </p>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
              <span>Valor Mentoría 1a1:</span>
              <strong className="text-indigo-400">${course.instructor.mentorshipPrice} USD / 45 min</strong>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
