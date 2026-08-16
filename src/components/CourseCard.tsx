import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Star, 
  Users, 
  Sparkles, 
  CheckCircle,
  Video,
  ArrowRight
} from 'lucide-react';
import { Course, CourseEnrollment } from '../types';

interface CourseCardProps {
  course: Course;
  enrollment?: CourseEnrollment;
  onSelectCourse: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  enrollment,
  onSelectCourse
}) => {
  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.status === 'completed_pending_resolution' || enrollment?.status === 'refunded' || enrollment?.status === 'converted_to_mentorship' || enrollment?.status === 'tipped_instructor';

  return (
    <div 
      onClick={() => onSelectCourse(course)}
      className="bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 flex flex-col justify-between cursor-pointer group"
    >
      <div>
        {/* Course Image & Badges Overlay */}
        <div className="relative h-48 w-full overflow-hidden bg-slate-950">
          <img 
            src={course.coverImage} 
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Category Tag */}
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/80 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-slate-200">
            {course.category}
          </div>

          {/* Deposit Tag Header */}
          <div className="absolute top-3 right-3 bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-lg text-xs font-black shadow-md flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>${course.depositAmount} USD Depósito</span>
          </div>

          {/* Enrolled Status Overlay if enrolled */}
          {isEnrolled && (
            <div className="absolute bottom-3 left-3 bg-emerald-500/90 text-slate-950 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Curso Completado' : 'Inscrito Actualmente'}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              {course.durationHours} hrs
            </span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-medium">
              {course.difficulty}
            </span>
            <span>•</span>
            <span className="text-slate-300 font-medium">{course.completionRate}% Tasa Finalización</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-emerald-400 transition-colors line-clamp-2">
            {course.title}
          </h3>

          <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
            {course.subtitle}
          </p>

          {/* Instructor & Rating */}
          <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
            <div className="flex items-center gap-2.5">
              <img 
                src={course.instructor.avatar} 
                alt={course.instructor.name} 
                className="w-7 h-7 rounded-full object-cover border border-slate-700"
              />
              <span className="text-xs font-medium text-slate-300">{course.instructor.name}</span>
            </div>

            <div className="flex items-center gap-1 text-xs text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{course.instructor.rating}</span>
              <span className="text-slate-500 text-[10px]">({course.reviews.length})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Call to Action */}
      <div className="p-5 pt-0">
        <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex items-center justify-between text-xs mb-3">
          <div className="text-slate-400">
            <div className="text-[10px] uppercase font-bold text-slate-500">Garantía Al Completar</div>
            <span className="text-slate-200 font-medium">Reembolso / Mentoría 1a1</span>
          </div>
          <div className="text-emerald-400 font-bold text-right">
            0% Costo Real
          </div>
        </div>

        <button 
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
            isEnrolled 
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/10'
          }`}
        >
          <span>{isEnrolled ? 'Continuar Curso' : 'Ver Curso y Depositar'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
