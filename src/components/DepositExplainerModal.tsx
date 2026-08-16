import React from 'react';
import { 
  X, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  HeartHandshake, 
  Video, 
  Music, 
  CheckCircle2, 
  Sparkles,
  Lock
} from 'lucide-react';

interface DepositExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreCourses: () => void;
}

export const DepositExplainerModal: React.FC<DepositExplainerModalProps> = ({
  isOpen,
  onClose,
  onExploreCourses
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full text-slate-100 p-6 md:p-8 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400">
            <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Modelo Educativo Basado en Compromiso
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">¿Cómo funciona el Depósito Reembolsable?</h2>
          </div>
        </div>

        <p className="text-slate-300 text-sm sm:text-base mt-2 mb-6 leading-relaxed">
          En <strong className="text-emerald-400">StakeLearn</strong> eliminamos la barrera de las matrículas caras y la falta de compromiso. No compras cursos: <strong className="text-white">depositas un aval de garantía</strong> que mantienes protegido durante tu aprendizaje.
        </p>

        {/* 3 Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          {/* Step 1 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm mb-3">
              01
            </div>
            <div className="flex items-center gap-2 font-bold text-white mb-2">
              <Lock className="w-4 h-4 text-emerald-400" /> Depositas el Aval
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Eliges un curso e inmovilizas el depósito requerido (ej. $20 USD). Ese dinero se custodia de forma transparente en tu cuenta.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-sm mb-3">
              02
            </div>
            <div className="flex items-center gap-2 font-bold text-white mb-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400" /> Completas y Entregas
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consumes el material del curso y entregas tu proyecto práctico. Esto garantiza que aprendiste y aprovechaste el contenido.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-sm mb-3">
              03
            </div>
            <div className="flex items-center gap-2 font-bold text-white mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Tú Decides el Destino
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Al finalizar, desbloqueas el 100% de tus fondos depositados y eliges entre 3 opciones de resolución inmediata.
            </p>
          </div>

        </div>

        {/* 3 Resolution Options Detail Box */}
        <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Tus 3 Opciones de Resolución al Completar:
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg w-fit mb-2">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">1. Reembolso Total 100%</h4>
                <p className="text-xs text-slate-400">
                  Dejas una reseña y valoración honesta para el profesor y recuperas tus $20 completos en tu billetera.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg w-fit mb-2">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">2. Regalo al Profesor</h4>
                <p className="text-xs text-slate-400">
                  Si el curso superó tus expectativas, puedes regalar el depósito al profesor como incentivo a su trabajo.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
              <div>
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg w-fit mb-2">
                  <Video className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white mb-1">3. Mentoría 1 a 1</h4>
                <p className="text-xs text-slate-400">
                  Conviertes tus $20 en una sesión privada en vivo de 45 min con el profesor para revisar tu proyecto o carrera.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Real Example Case Study Box */}
        <div className="bg-gradient-to-r from-purple-950/40 to-slate-900 border border-purple-500/30 rounded-2xl p-4 sm:p-5 mb-6 flex items-start gap-4">
          <div className="p-3 bg-purple-500/20 text-purple-300 rounded-xl hidden sm:flex items-center justify-center">
            <Music className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-purple-300 uppercase tracking-wide mb-1">Ejemplo Práctico en la Plataforma:</div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Un profesor de música de videojuegos crea el curso <em>"Música para Juegos RPG"</em> con un depósito de $20. El estudiante deposita $20 y accede a todas las lecciones. Al terminar y componer su pista de la taberna, decide utilizar esos $20 para pedir una <strong>mentoría 1 a 1</strong> con el profesor para recibir feedback directo sobre sus mezclas. De esta forma, el dinero depositado va al profesor a cambio de un valor personalizado de alto nivel.
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={() => {
              onClose();
              onExploreCourses();
            }}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            Explorar Cursos Disponibles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
