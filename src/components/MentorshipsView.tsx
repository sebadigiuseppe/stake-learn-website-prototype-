import React, { useState } from 'react';
import { 
  Video, 
  Calendar, 
  Clock, 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  ExternalLink, 
  Sparkles, 
  User, 
  MessageSquare,
  Play,
  X
} from 'lucide-react';
import { Course, Instructor, MentorshipBooking, UserWallet } from '../types';

interface MentorshipsViewProps {
  courses: Course[];
  bookings: MentorshipBooking[];
  wallet: UserWallet;
  onBookDirectMentorship: (instructorId: string, date: string, slot: string, topic: string) => void;
}

export const MentorshipsView: React.FC<MentorshipsViewProps> = ({
  courses,
  bookings,
  wallet,
  onBookDirectMentorship
}) => {
  const [activeCallBooking, setActiveCallBooking] = useState<MentorshipBooking | null>(null);

  // Extract unique instructors from courses
  const instructors: Instructor[] = Array.from(
    new Map<string, Instructor>(courses.map(c => [c.instructor.id, c.instructor])).values()
  );

  const [selectedInstructorId, setSelectedInstructorId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>('Mañana 16:00');
  const [topic, setTopic] = useState<string>('Consulta personalizada sobre desarrollo de carrera y revisión técnica de proyectos.');

  const handleConfirmBooking = (inst: Instructor) => {
    onBookDirectMentorship(inst.id, '15 de Agosto', selectedSlot, topic);
    setSelectedInstructorId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 rounded-full text-xs font-bold mb-3">
          <Video className="w-3.5 h-3.5" /> Consultorías & Mentorías Privadas 1 a 1
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white mb-2">
          Sesiones Privadas con Profesores Expertos
        </h1>
        <p className="text-slate-300 text-sm max-w-2xl">
          Puedes agendar una sesión usando directamente tu saldo disponible o convirtiendo el depósito de garantía de un curso completado.
        </p>
      </div>

      {/* Scheduled Bookings Section */}
      {bookings.length > 0 && (
        <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" /> Tus Mentorías Agendadas ({bookings.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((b) => (
              <div key={b.id} className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-md border border-indigo-500/20">
                      {b.fundedBy === 'deposit_conversion' ? 'Financiado por Depósito de Curso' : 'Pago Directo'}
                    </span>
                    <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confirmada
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <img src={b.instructorAvatar} alt={b.instructorName} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h3 className="font-bold text-white text-sm">{b.instructorName}</h3>
                      <p className="text-xs text-slate-400">{b.instructorTitle}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800/80 text-xs space-y-1 text-slate-300 mb-4">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{b.date} • {b.timeSlot}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] line-clamp-2">
                      Tema: "{b.topic}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCallBooking(b)}
                  className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Ingresar a la Sala de Videollamada</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Directory of Instructors */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">Directorio de Profesores para Consultorías</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {instructors.map((inst) => (
            <div key={inst.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <img src={inst.avatar} alt={inst.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-700" />
                    <div>
                      <h3 className="font-bold text-white text-base">{inst.name}</h3>
                      <p className="text-xs text-slate-400">{inst.title}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-emerald-400">${inst.mentorshipPrice} USD</div>
                    <div className="text-[10px] text-slate-500">45 minutos</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  {inst.bio}
                </p>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 mb-4 space-y-2">
                  <div className="text-[11px] font-bold text-slate-400">Horarios Disponibles esta semana:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {inst.availableSlots.map((slot, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-[11px] text-slate-300 rounded-lg">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedInstructorId(inst.id)}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Mentoría 1a1 (${inst.mentorshipPrice} USD)</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Dialog Modal */}
      {selectedInstructorId && (() => {
        const inst = instructors.find(i => i.id === selectedInstructorId);
        if (!inst) return null;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="font-bold text-base">Reservar Mentoría con {inst.name}</h3>
                <button onClick={() => setSelectedInstructorId(null)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">Selecciona horario:</label>
                <div className="grid grid-cols-2 gap-2">
                  {inst.availableSlots.map((slot, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2 rounded-xl text-xs border text-left ${
                        selectedSlot === slot ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 font-bold' : 'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Tema de la consulta:</label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                />
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                <span>Costo de la Sesión:</span>
                <strong className="text-emerald-400">${inst.mentorshipPrice} USD</strong>
              </div>

              <button
                onClick={() => handleConfirmBooking(inst)}
                className="w-full py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs hover:bg-emerald-400"
              >
                Confirmar Reserva con Saldo Disponible
              </button>
            </div>
          </div>
        );
      })()}

      {/* Simulated Video Room Call Modal */}
      {activeCallBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <h3 className="font-bold text-sm">Videollamada en Vivo con {activeCallBooking.instructorName}</h3>
              </div>
              <button onClick={() => setActiveCallBooking(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
              <img src={activeCallBooking.instructorAvatar} alt={activeCallBooking.instructorName} className="w-24 h-24 rounded-full border-2 border-indigo-500 object-cover mb-3" />
              <div className="text-sm font-bold text-white">{activeCallBooking.instructorName} está en la sala</div>
              <p className="text-xs text-slate-400 mt-1">Conexión cifrada a punto • Audio & Video HD Activo</p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong>Notas de la consulta:</strong> {activeCallBooking.topic}
            </div>

            <button
              onClick={() => setActiveCallBooking(null)}
              className="w-full py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 font-bold rounded-xl text-xs"
            >
              Finalizar Videollamada
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
