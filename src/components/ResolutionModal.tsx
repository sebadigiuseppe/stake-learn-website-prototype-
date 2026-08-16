import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  RotateCcw, 
  HeartHandshake, 
  Video, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  Clock, 
  Send,
  MessageSquare
} from 'lucide-react';
import { Course, CourseEnrollment } from '../types';

interface ResolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course;
  enrollment: CourseEnrollment;
  onResolveRefund: (rating: number, comment: string) => void;
  onResolveTip: (thankYouMessage: string) => void;
  onResolveMentorship: (date: string, slot: string, topic: string) => void;
}

export const ResolutionModal: React.FC<ResolutionModalProps> = ({
  isOpen,
  onClose,
  course,
  enrollment,
  onResolveRefund,
  onResolveTip,
  onResolveMentorship
}) => {
  const [selectedOption, setSelectedOption] = useState<'refund' | 'tip' | 'mentorship' | null>(null);
  
  // Refund state
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('¡Excelente curso! El material sobre bucles de audio y leitmotifs es brillante. El modelo de depósito me mantuvo super enfocado.');

  // Tip state
  const [thankYouMessage, setThankYouMessage] = useState<string>('¡Muchas gracias profesor! El curso fue de tremenda calidad y prefiero que conserves el depósito como reconocimiento.');

  // Mentorship state
  const [selectedSlot, setSelectedSlot] = useState<string>(course.instructor.availableSlots[0] || 'Mañana 16:00');
  const [topic, setTopic] = useState<string>('Revisión en vivo de mi proyecto final de audio y consejos para mi portafolio profesional.');

  if (!isOpen) return null;

  // Trigger confetti on open
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleConfirmRefund = () => {
    triggerConfetti();
    onResolveRefund(rating, comment);
  };

  const handleConfirmTip = () => {
    triggerConfetti();
    onResolveTip(thankYouMessage);
  };

  const handleConfirmMentorship = () => {
    triggerConfetti();
    onResolveMentorship('15 de Agosto', selectedSlot, topic);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full text-slate-100 p-6 md:p-8 shadow-2xl relative my-8">
        
        {/* Close */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 mx-auto flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-9 h-9 stroke-[2.5]" />
          </div>
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" /> ¡100% Completado!
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">¡Liberación de Depósito!</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1">
            Has completado todas las lecciones de <strong className="text-white">{course.title}</strong>. Tus <strong className="text-emerald-400">${course.depositAmount} USD</strong> depositados han sido desbloqueados.
          </p>
        </div>

        {/* Option Select Cards if none chosen */}
        {!selectedOption ? (
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-2">
              Elige cómo deseas resolver tu depósito de ${course.depositAmount} USD:
            </div>

            {/* Option A: Refund */}
            <div 
              onClick={() => setSelectedOption('refund')}
              className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 p-5 rounded-2xl cursor-pointer transition-all hover:bg-slate-800/40 group flex items-start gap-4"
            >
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:scale-110 transition-transform">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-emerald-400 transition-colors">
                    Option A: Reclamar Reembolso Total 100%
                  </h3>
                  <span className="text-emerald-400 font-bold text-xs bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    +${course.depositAmount} USD a tu billetera
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Deja una reseña sincera para el curso. Tus ${course.depositAmount} USD se acreditarán inmediatamente en tu saldo disponible.
                </p>
              </div>
            </div>

            {/* Option B: Tip */}
            <div 
              onClick={() => setSelectedOption('tip')}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/50 p-5 rounded-2xl cursor-pointer transition-all hover:bg-slate-800/40 group flex items-start gap-4"
            >
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-amber-400 transition-colors">
                    Option B: Regalárselo al Profesor {course.instructor.name}
                  </h3>
                  <span className="text-amber-400 font-bold text-xs bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                    Incentivo al Creador
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Si el contenido te pareció extraordinario, transfieres tus $${course.depositAmount} como propina directa de agradecimiento.
                </p>
              </div>
            </div>

            {/* Option C: Mentorship */}
            <div 
              onClick={() => setSelectedOption('mentorship')}
              className="bg-slate-950 border border-slate-800 hover:border-indigo-500/50 p-5 rounded-2xl cursor-pointer transition-all hover:bg-slate-800/40 group flex items-start gap-4"
            >
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:scale-110 transition-transform">
                <Video className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition-colors">
                    Option C: Canjear por Mentoría 1 a 1 (45 min)
                  </h3>
                  <span className="text-indigo-400 font-bold text-xs bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    Sesión Privada
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Usa tus $${course.depositAmount} depositados para agendar una videollamada privada en vivo con {course.instructor.name} para revisar tus proyectos.
                </p>
              </div>
            </div>

          </div>
        ) : selectedOption === 'refund' ? (
          /* Form for Option A: Refund */
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
                <RotateCcw className="w-4 h-4" /> Reclamar Reembolso de ${course.depositAmount} USD
              </div>
              <button onClick={() => setSelectedOption(null)} className="text-xs text-slate-400 hover:text-white underline">
                Cambiar opción
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Valora el curso (Calificación para el Profesor):
              </label>
              <div className="flex items-center gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-amber-400 hover:scale-125 transition-transform"
                  >
                    <Star className={`w-6 h-6 ${star <= rating ? 'fill-amber-400' : 'text-slate-700'}`} />
                  </button>
                ))}
                <span className="text-xs text-slate-400 ml-2 font-bold">{rating} / 5 estrellas</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Escribe tu reseña honesta:
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                placeholder="¿Qué te pareció el curso? ¿Cómo te ayudó el sistema de depósito a mantener la disciplina?"
              />
            </div>

            <button
              onClick={handleConfirmRefund}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 text-sm"
            >
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
              <span>Confirmar Reseña y Recibir $${course.depositAmount} USD</span>
            </button>
          </div>
        ) : selectedOption === 'tip' ? (
          /* Form for Option B: Tip */
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
                <HeartHandshake className="w-4 h-4" /> Regalar ${course.depositAmount} USD al Profesor {course.instructor.name}
              </div>
              <button onClick={() => setSelectedOption(null)} className="text-xs text-slate-400 hover:text-white underline">
                Cambiar opción
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Mensaje personal de agradecimiento:
              </label>
              <textarea
                value={thankYouMessage}
                onChange={(e) => setThankYouMessage(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              onClick={handleConfirmTip}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Enviar $${course.depositAmount} USD como Regalo al Profesor</span>
            </button>
          </div>
        ) : (
          /* Form for Option C: Mentorship */
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-indigo-400 text-sm">
                <Video className="w-4 h-4" /> Canjear por Mentoría 1a1 con {course.instructor.name}
              </div>
              <button onClick={() => setSelectedOption(null)} className="text-xs text-slate-400 hover:text-white underline">
                Cambiar opción
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-2">
                Selecciona tu horario disponible:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {course.instructor.availableSlots.map((slot, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left flex items-center gap-2 transition-all ${
                      selectedSlot === slot
                        ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500 font-bold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                ¿Qué tema te gustaría tratar en la consulta?
              </label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={2}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleConfirmMentorship}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 text-sm"
            >
              <Calendar className="w-4 h-4" />
              <span>Confirmar Reserva de Mentoría 1a1 (${course.depositAmount} USD)</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
