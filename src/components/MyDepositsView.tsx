import React from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  HeartHandshake, 
  Video, 
  PlayCircle, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Lock
} from 'lucide-react';
import { Course, CourseEnrollment, UserWallet } from '../types';

interface MyDepositsViewProps {
  courses: Course[];
  enrollments: CourseEnrollment[];
  wallet: UserWallet;
  onSelectCourse: (course: Course) => void;
  onOpenExplainer: () => void;
}

export const MyDepositsView: React.FC<MyDepositsViewProps> = ({
  courses,
  enrollments,
  wallet,
  onSelectCourse,
  onOpenExplainer
}) => {
  const activeEnrollments = enrollments.filter(e => e.status === 'active');
  const resolvedEnrollments = enrollments.filter(e => e.status !== 'active');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Panel de Custodia & Garantías
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white mb-2">
              Mis Depósitos de Cursos
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Monitorea en tiempo real el dinero en custodia de tus cursos activos y el historial de devoluciones o canjes.
            </p>
          </div>

          <button
            onClick={onOpenExplainer}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-colors shrink-0 flex items-center gap-2 border border-slate-700"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>¿Cómo funciona la devolución?</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-emerald-500/30 p-5 rounded-2xl">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            En Custodia Activa
          </div>
          <div className="text-3xl font-black text-emerald-400">
            ${wallet.depositedInCourses} USD
          </div>
          <div className="text-xs text-slate-400 mt-1">
            {activeEnrollments.length} {activeEnrollments.length === 1 ? 'curso activo' : 'cursos activos'}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Devoluciones Reclamadas
          </div>
          <div className="text-3xl font-black text-white">
            ${wallet.totalRefunded} USD
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Reembolsos 100% recibidos
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Canjeados en Mentorías 1a1
          </div>
          <div className="text-3xl font-black text-indigo-400">
            ${wallet.totalInvestedInMentorships} USD
          </div>
          <div className="text-xs text-slate-400 mt-1">
            Inversión en sesiones privadas
          </div>
        </div>
      </div>

      {/* Active Escrowed Deposits */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-emerald-400" /> Depósitos Activos en Garantía ({activeEnrollments.length})
        </h2>

        {activeEnrollments.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center text-slate-400 text-xs">
            No tienes depósitos activos en este momento. ¡Explora el catálogo e inscríbete a un curso!
          </div>
        ) : (
          <div className="space-y-4">
            {activeEnrollments.map((en) => {
              const course = courses.find(c => c.id === en.courseId);
              if (!course) return null;

              const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
              const completedCount = en.completedLessonIds.length;
              const percent = Math.round((completedCount / totalLessons) * 100);

              return (
                <div key={en.courseId} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src={course.coverImage} alt={course.title} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mb-1">
                        <ShieldCheck className="w-3 h-3" /> Custodiado desde {en.depositedAt}
                      </div>
                      <h3 className="font-bold text-white text-base">{course.title}</h3>
                      <div className="text-xs text-slate-400 mt-1">
                        {completedCount} / {totalLessons} lecciones completadas ({percent}%)
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Depósito Retenido:</div>
                      <div className="text-lg font-black text-emerald-400">${en.depositedAmount} USD</div>
                    </div>

                    <button
                      onClick={() => onSelectCourse(course)}
                      className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
                    >
                      <span>Ir al Curso</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Resolved History */}
      {resolvedEnrollments.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Historial de Depósitos Resueltos
          </h2>

          <div className="space-y-3">
            {resolvedEnrollments.map((en) => {
              const course = courses.find(c => c.id === en.courseId);
              if (!course) return null;

              return (
                <div key={en.courseId} className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={course.coverImage} alt={course.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-white">{course.title}</div>
                      <div className="text-slate-400 text-[11px]">Prof. {course.instructor.name}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-bold text-emerald-400">${en.depositedAmount} USD</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">
                      {en.status === 'refunded' ? '✓ Reembolsado 100%' : en.status === 'converted_to_mentorship' ? '✓ Convertido a Mentoría 1a1' : '✓ Regalado al Profesor'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
