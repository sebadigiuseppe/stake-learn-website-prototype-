import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  ShieldCheck, 
  RotateCcw, 
  HeartHandshake, 
  Video, 
  PlusCircle, 
  ArrowUpRight, 
  CheckCircle2
} from 'lucide-react';
import { UserWallet } from '../types';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: UserWallet;
  onAddFunds: (amount: number) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  onAddFunds
}) => {
  const [customAmount, setCustomAmount] = useState<string>('20');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAdd = (amount: number) => {
    onAddFunds(amount);
    setSuccessMsg(`¡Se han añadido +$${amount} USD a tu saldo disponible!`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full text-slate-100 p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Billetera Educativa</h3>
              <p className="text-xs text-slate-400">Fondos en Custodia & Historial de Depósitos</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Balance Cards Summary */}
        <div className="grid grid-cols-2 gap-3 my-5">
          <div className="bg-slate-950 border border-emerald-500/30 rounded-2xl p-4">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Saldo Disponible
            </div>
            <div className="text-2xl font-black text-emerald-400">
              ${wallet.balance} USD
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Listo para avalar nuevos cursos</div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              En Depósito Activo
            </div>
            <div className="text-2xl font-black text-amber-400">
              ${wallet.depositedInCourses} USD
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Retenidos en cursos en progreso</div>
          </div>
        </div>

        {/* Lifetime Activity Stats */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-3.5 space-y-2 mb-5 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
              Total Depósitos Devoluciones:
            </span>
            <span className="font-bold text-emerald-400">+${wallet.totalRefunded} USD</span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Video className="w-3.5 h-3.5 text-indigo-400" />
              Canjeados en Mentorías 1a1:
            </span>
            <span className="font-bold text-indigo-300">${wallet.totalInvestedInMentorships} USD</span>
          </div>

          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 text-slate-400">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-400" />
              Regalados a Profesores:
            </span>
            <span className="font-bold text-amber-300">${wallet.totalTipped} USD</span>
          </div>
        </div>

        {/* Quick Add Balance Section */}
        <div className="border-t border-slate-800 pt-4">
          <label className="block text-xs font-bold text-slate-300 mb-2">
            Simular Carga de Saldo (Tarjeta Mock):
          </label>

          {successMsg && (
            <div className="mb-3 p-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="flex gap-2 mb-3">
            {[20, 30, 50].map((amt) => (
              <button
                key={amt}
                onClick={() => handleAdd(amt)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-emerald-500/50 rounded-xl text-xs font-bold text-slate-200 transition-all"
              >
                +${amt} USD
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder="Otro monto..."
              className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => {
                const val = parseFloat(customAmount);
                if (val > 0) handleAdd(val);
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Recargar
            </button>
          </div>
        </div>

        <div className="mt-5 text-[11px] text-slate-500 text-center">
          🔒 Todos los depósitos en garantía están protegidos de acuerdo al código de transparencia de StakeLearn.
        </div>

      </div>
    </div>
  );
};
