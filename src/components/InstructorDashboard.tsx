import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  PlusCircle, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Briefcase, 
  Video, 
  DollarSign, 
  Users,
  Send,
  Loader2
} from 'lucide-react';
import { Course, StudentProject } from '../types';

interface InstructorDashboardProps {
  courses: Course[];
  projects: StudentProject[];
  onCreateCourse: (newCourse: Course) => void;
  onGradeProject: (projectId: string, score: number, feedbackText: string) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  courses,
  projects,
  onCreateCourse,
  onGradeProject
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'create_course' | 'grade_projects'>('overview');

  // New Course Form state
  const [topicPrompt, setTopicPrompt] = useState<string>('Composición de Música para Videojuegos de Terror & Suspense');
  const [category, setCategory] = useState<string>('Música & Videojuegos');
  const [depositAmount, setDepositAmount] = useState<number>(20);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [generatedSyllabus, setGeneratedSyllabus] = useState<any>(null);

  // Grade state
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(projects[1]?.id || null);
  const [score, setScore] = useState<number>(9.5);
  const [feedbackText, setFeedbackText] = useState<string>('Excelente trabajo con el bucle de audio y la orquestación. ¡Proyecto aprobado!');

  const handleGenerateAiSyllabus = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/ai/generate-syllabus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicPrompt,
          category,
          depositAmount
        })
      });
      const data = await res.json();
      setGeneratedSyllabus(data);
    } catch (err) {
      setGeneratedSyllabus({
        title: `Curso: ${topicPrompt}`,
        subtitle: `Aprende ${topicPrompt} con garantía de depósito`,
        description: `Un programa práctico estructurado con modelo de depósito de $${depositAmount} USD.`,
        learningObjectives: [
          'Dominar la ambientación armónica',
          'Técnicas de mezcla e integración de audio'
        ],
        modules: [
          {
            title: 'Módulo 1: Fundamentos',
            lessons: [{ title: 'Introducción al proyecto', duration: '15 min' }]
          }
        ],
        recommendedProjectPrompt: 'Crea una composición original de 1 minuto en bucle.'
      });
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleSaveCreatedCourse = () => {
    if (!generatedSyllabus) return;

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      title: generatedSyllabus.title,
      subtitle: generatedSyllabus.subtitle,
      category: category,
      depositAmount: depositAmount,
      durationHours: 6,
      difficulty: 'Intermedio',
      coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      description: generatedSyllabus.description,
      learningObjectives: generatedSyllabus.learningObjectives || ['Aprender conceptos clave'],
      totalEnrolled: 1,
      completionRate: 100,
      instructor: {
        id: 'inst-carlos-vance',
        name: 'Prof. Carlos Vance (Tú)',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        title: 'Compositor de Audio & Profesor Creador',
        bio: 'Compositor especializado en audio interactivo para video juegos.',
        rating: 5.0,
        totalStudents: 150,
        mentorshipPrice: depositAmount,
        availableSlots: ['Mañana 16:00', 'Viernes 11:00']
      },
      modules: generatedSyllabus.modules?.map((m: any, mIdx: number) => ({
        id: `mod-${mIdx}`,
        title: m.title,
        lessons: m.lessons?.map((l: any, lIdx: number) => ({
          id: `les-${mIdx}-${lIdx}`,
          title: l.title,
          duration: l.duration || '15 min',
          type: 'video',
          content: 'Lección en video y guía teórica de aplicación práctica.'
        })) || []
      })) || [],
      projectPrompt: {
        title: 'Proyecto Práctico Final',
        description: generatedSyllabus.recommendedProjectPrompt || 'Sube tu entrega final.',
        deliverableType: 'audio'
      },
      reviews: []
    };

    onCreateCourse(newCourse);
    setActiveSubTab('overview');
    setGeneratedSyllabus(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-full text-xs font-bold mb-3">
              <GraduationCap className="w-3.5 h-3.5" /> Panel de Creador & Profesor
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white mb-2">
              Gestión de Cursos con Depósito
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              Crea cursos con aval de compromiso, revisa entregables de estudiantes y monetiza a través de mentorías 1 a 1.
            </p>
          </div>

          <button
            onClick={() => setActiveSubTab('create_course')}
            className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl text-xs transition-colors shrink-0 flex items-center gap-2 shadow-lg shadow-emerald-500/20"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Crear Nuevo Curso con IA</span>
          </button>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 mt-6 border-t border-slate-800 pt-4 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              activeSubTab === 'overview' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Resumen de Métricas
          </button>
          <button
            onClick={() => setActiveSubTab('create_course')}
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              activeSubTab === 'create_course' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Crear Curso (Generador IA)
          </button>
          <button
            onClick={() => setActiveSubTab('grade_projects')}
            className={`px-3.5 py-2 rounded-xl transition-colors ${
              activeSubTab === 'grade_projects' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Revisar Entregables ({projects.filter(p => p.status === 'pending').length})
          </button>
        </div>
      </div>

      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Garantías de Estudiantes en Custodia
              </div>
              <div className="text-3xl font-black text-emerald-400">$3,680 USD</div>
              <div className="text-xs text-slate-500 mt-1">184 estudiantes activos</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Tasa de Finalización
              </div>
              <div className="text-3xl font-black text-white">94%</div>
              <div className="text-xs text-slate-500 mt-1">+40% superior al promedio web</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Ganancias por Regalos/Propinas
              </div>
              <div className="text-3xl font-black text-amber-400">$420 USD</div>
              <div className="text-xs text-slate-500 mt-1">21 depósitos donados por calidad</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Mentorías 1a1 Reservadas
              </div>
              <div className="text-3xl font-black text-indigo-400">$1,240 USD</div>
              <div className="text-xs text-slate-500 mt-1">62 sesiones convertidas</div>
            </div>
          </div>

          {/* List of Instructor's Courses */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Tus Cursos Publicados</h2>
            <div className="space-y-3">
              {courses.map((c) => (
                <div key={c.id} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <img src={c.coverImage} alt={c.title} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-white text-sm">{c.title}</div>
                      <div className="text-slate-400">{c.totalEnrolled} estudiantes • ${c.depositAmount} USD Depósito</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-bold">{c.completionRate}% Finalización</div>
                    <div className="text-slate-500 text-[10px]">Garantía activa</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'create_course' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Generador de Cursos Asistido por IA</h2>
          </div>

          <p className="text-xs text-slate-300">
            Especifica el tema y el monto de depósito reembolsable ($15, $20, $30). Nuestra IA estructurará el programa de lecciones y el proyecto práctico de evaluación.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold text-slate-300">Tema del Curso:</label>
              <input
                type="text"
                value={topicPrompt}
                onChange={(e) => setTopicPrompt(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-300">Depósito Reembolsable ($ USD):</label>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <button
            onClick={handleGenerateAiSyllabus}
            disabled={isGeneratingAi}
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            {isGeneratingAi ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            <span>{isGeneratingAi ? 'Generando Programa con Gemini...' : 'Generar Estructura del Curso'}</span>
          </button>

          {generatedSyllabus && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Propuesta Generada</span>
                <h3 className="text-lg font-bold text-white">{generatedSyllabus.title}</h3>
                <p className="text-xs text-slate-300">{generatedSyllabus.subtitle}</p>
              </div>

              <div className="space-y-2 text-xs">
                <strong className="text-slate-300">Módulos ({generatedSyllabus.modules?.length}):</strong>
                {generatedSyllabus.modules?.map((m: any, i: number) => (
                  <div key={i} className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-slate-300">
                    <div className="font-bold text-white">{m.title}</div>
                    <div className="text-[11px] text-slate-400">{m.lessons?.length} lecciones en video</div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleSaveCreatedCourse}
                className="w-full py-3 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs hover:bg-emerald-400"
              >
                Publicar Curso en el Catálogo ($${depositAmount} USD Depósito)
              </button>
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'grade_projects' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-bold text-white">Entregables Pendientes de Revisión</h2>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400">{proj.courseTitle}</span>
                    <h3 className="text-sm font-bold text-white">{proj.projectTitle}</h3>
                    <p className="text-xs text-slate-400">Por {proj.studentName} • {proj.submittedAt}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    proj.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {proj.status === 'approved' ? '✓ Aprobado' : 'Pendiente'}
                  </span>
                </div>

                <p className="text-xs text-slate-300">{proj.description}</p>
                <div className="text-xs text-emerald-400 underline font-mono">{proj.deliverableUrl}</div>

                {proj.status === 'pending' && (
                  <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3 pt-3">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-bold text-slate-300">Puntaje (1-10):</span>
                      <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(Number(e.target.value))}
                        className="w-16 bg-slate-950 border border-slate-700 rounded p-1 text-center text-white"
                      />
                    </div>
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white"
                      placeholder="Escribe tus comentarios pedagógicos..."
                    />
                    <button
                      onClick={() => onGradeProject(proj.id, score, feedbackText)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Aprobar Entrega del Estudiante</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
