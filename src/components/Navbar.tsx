import React from 'react';
import { 
  ShieldCheck, 
  BookOpen, 
  Briefcase, 
  Video, 
  Wallet, 
  HelpCircle, 
  UserCheck, 
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { UserWallet } from '../types';

interface NavbarProps {
  currentTab: 'courses' | 'projects' | 'mentorships' | 'deposits' | 'instructor';
  setCurrentTab: (tab: 'courses' | 'projects' | 'mentorships' | 'deposits' | 'instructor') => void;
  wallet: UserWallet;
  onOpenExplainer: () => void;
  onOpenWallet: () => void;
  onToggleRole: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  wallet,
  onOpenExplainer,
  onOpenWallet,
  onToggleRole
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('courses')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-md shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">Stake<span className="text-emerald-400">Learn</span></span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                  Sin Matrícula
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Aprende con Depósito Reembolsable & Mentorías</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 p-1.5 rounded-xl border border-slate-700/50">
            <button
              onClick={() => setCurrentTab('courses')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'courses'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Cursos
            </button>

            <button
              onClick={() => setCurrentTab('projects')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'projects'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              Proyectos
            </button>

            <button
              onClick={() => setCurrentTab('mentorships')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'mentorships'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Video className="w-4 h-4" />
              Consultorías 1a1
            </button>

            <button
              onClick={() => setCurrentTab('deposits')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all relative ${
                currentTab === 'deposits'
                  ? 'bg-emerald-500 text-slate-950 shadow-sm font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              Mis Depósitos
              {wallet.depositedInCourses > 0 && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping absolute top-1 right-1" />
              )}
            </button>
          </nav>

          {/* Right Action Tools & Wallet */}
          <div className="flex items-center gap-2.5">
            
            {/* Info How it works button */}
            <button
              onClick={onOpenExplainer}
              className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="¿Cómo funciona el depósito?"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span className="hidden lg:inline">¿Cómo funciona?</span>
            </button>

            {/* Wallet pill */}
            <button
              onClick={onOpenWallet}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 transition-all hover:border-emerald-500/50"
            >
              <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <Wallet className="w-3.5 h-3.5" />
              </div>
              <div className="text-left leading-tight">
                <div className="text-[10px] text-slate-400">Saldo Disponible</div>
                <div className="text-emerald-400 font-bold">${wallet.balance} USD</div>
              </div>
            </button>

            {/* Role switch toggle */}
            <button
              onClick={onToggleRole}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                wallet.role === 'instructor'
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20'
                  : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/20'
              }`}
            >
              {wallet.role === 'instructor' ? (
                <>
                  <GraduationCap className="w-4 h-4 text-amber-400" />
                  <span>Modo Profesor</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <span>Modo Estudiante</span>
                </>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile navigation tabbar */}
      <div className="md:hidden flex items-center justify-around bg-slate-950/80 border-t border-slate-800 py-2 px-2 text-xs">
        <button
          onClick={() => setCurrentTab('courses')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${
            currentTab === 'courses' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Cursos</span>
        </button>
        <button
          onClick={() => setCurrentTab('projects')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${
            currentTab === 'projects' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Proyectos</span>
        </button>
        <button
          onClick={() => setCurrentTab('mentorships')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${
            currentTab === 'mentorships' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Video className="w-4 h-4" />
          <span>Consultorías</span>
        </button>
        <button
          onClick={() => setCurrentTab('deposits')}
          className={`flex flex-col items-center gap-1 px-3 py-1 rounded-lg ${
            currentTab === 'deposits' ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Mis Depósitos</span>
        </button>
      </div>
    </header>
  );
};
