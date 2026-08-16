/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Navbar 
} from './components/Navbar';
import { 
  DepositExplainerModal 
} from './components/DepositExplainerModal';
import { 
  WalletModal 
} from './components/WalletModal';
import { 
  CourseCard 
} from './components/CourseCard';
import { 
  CourseDetailView 
} from './components/CourseDetailView';
import { 
  LessonPlayerView 
} from './components/LessonPlayerView';
import { 
  ResolutionModal 
} from './components/ResolutionModal';
import { 
  ProjectsGalleryView 
} from './components/ProjectsGalleryView';
import { 
  MentorshipsView 
} from './components/MentorshipsView';
import { 
  InstructorDashboard 
} from './components/InstructorDashboard';
import { 
  MyDepositsView 
} from './components/MyDepositsView';

import { 
  INITIAL_WALLET, 
  MOCK_COURSES, 
  MOCK_PROJECTS, 
  MOCK_MENTORSHIP_BOOKINGS 
} from './data/mockData';

import { 
  Course, 
  CourseEnrollment, 
  StudentProject, 
  MentorshipBooking, 
  UserWallet 
} from './types';

import { 
  ShieldCheck, 
  Sparkles, 
  Search, 
  BookOpen, 
  RotateCcw, 
  HeartHandshake, 
  Video, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<'courses' | 'projects' | 'mentorships' | 'deposits' | 'instructor'>('courses');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  // Wallet & User State
  const [wallet, setWallet] = useState<UserWallet>(INITIAL_WALLET);

  // App Data States
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  
  // Start enrolled in the RPG music course with 4/6 lessons completed!
  const [enrollments, setEnrollments] = useState<CourseEnrollment[]>([
    {
      courseId: 'course-rpg-music',
      studentId: 'user-current',
      depositedAmount: 20,
      depositedAt: 'Ayer',
      status: 'active',
      completedLessonIds: ['les-101', 'les-102', 'les-201', 'les-202'],
      projectSubmission: {
        submittedAt: 'Hace 2 horas',
        deliverableUrl: 'https://soundcloud.com/santiago/snowy-tavern-rpg-loop',
        notes: 'Pista ambiental con piano acústico y flauta celta. Bucle de audio perfecto de 1:30 min.',
        status: 'pending'
      }
    }
  ]);

  const [projects, setProjects] = useState<StudentProject[]>(MOCK_PROJECTS);
  const [mentorships, setMentorships] = useState<MentorshipBooking[]>(MOCK_MENTORSHIP_BOOKINGS);

  // Active View States
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isLearningMode, setIsLearningMode] = useState<boolean>(false);

  // Modal States
  const [isExplainerOpen, setIsExplainerOpen] = useState<boolean>(false);
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);
  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState<boolean>(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Categories list
  const categories = ['Todos', 'Música & Videojuegos', 'Desarrollo Web', 'Diseño & UI/UX', 'Inteligencia Artificial'];

  // Handlers
  const handleEnroll = (course: Course) => {
    if (wallet.balance < course.depositAmount) return;

    // Deduct deposit amount from wallet balance into escrow
    setWallet(prev => ({
      ...prev,
      balance: prev.balance - course.depositAmount,
      depositedInCourses: prev.depositedInCourses + course.depositAmount
    }));

    const newEnrollment: CourseEnrollment = {
      courseId: course.id,
      studentId: 'user-current',
      depositedAmount: course.depositAmount,
      depositedAt: 'Hoy',
      status: 'active',
      completedLessonIds: []
    };

    setEnrollments(prev => [...prev, newEnrollment]);
    setSelectedCourse(course);
    setIsLearningMode(true);
  };

  const handleToggleLessonComplete = (courseId: string, lessonId: string) => {
    setEnrollments(prev => prev.map(en => {
      if (en.courseId !== courseId) return en;

      const isDone = en.completedLessonIds.includes(lessonId);
      const newCompleted = isDone
        ? en.completedLessonIds.filter(id => id !== lessonId)
        : [...en.completedLessonIds, lessonId];

      const targetCourse = courses.find(c => c.id === courseId);
      const totalLessonsCount = targetCourse?.modules.reduce((acc, m) => acc + m.lessons.length, 0) || 0;

      // If all lessons completed, trigger resolution modal!
      if (!isDone && newCompleted.length >= totalLessonsCount && targetCourse) {
        setTimeout(() => {
          setIsResolutionModalOpen(true);
        }, 500);
      }

      return {
        ...en,
        completedLessonIds: newCompleted
      };
    }));
  };

  const handleSubmitProject = (courseId: string, deliverableUrl: string, notes: string) => {
    const targetCourse = courses.find(c => c.id === courseId);
    if (!targetCourse) return;

    setEnrollments(prev => prev.map(en => {
      if (en.courseId !== courseId) return en;
      return {
        ...en,
        projectSubmission: {
          submittedAt: 'Ahora',
          deliverableUrl,
          notes,
          status: 'pending'
        }
      };
    }));

    // Add to community gallery
    const newProject: StudentProject = {
      id: `proj-${Date.now()}`,
      courseId,
      courseTitle: targetCourse.title,
      studentName: 'Santiago Scanevaro (Tú)',
      studentAvatar: wallet.userAvatar,
      projectTitle: targetCourse.projectPrompt.title,
      description: notes,
      deliverableUrl,
      audioPreviewUrl: targetCourse.category.includes('Música') ? 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a85638.mp3?filename=fantasy-orchestral-10118.mp3' : undefined,
      submittedAt: 'Ahora mismo',
      status: 'pending'
    };

    setProjects(prev => [newProject, ...prev]);

    // Check if resolution can open
    const currentEn = enrollments.find(e => e.courseId === courseId);
    const totalCount = targetCourse.modules.reduce((acc, m) => acc + m.lessons.length, 0);
    if (currentEn && currentEn.completedLessonIds.length >= totalCount) {
      setIsResolutionModalOpen(true);
    }
  };

  // Option A Resolution: Refund 100%
  const handleResolveRefund = (rating: number, comment: string) => {
    if (!selectedCourse) return;

    const amount = selectedCourse.depositAmount;

    setWallet(prev => ({
      ...prev,
      balance: prev.balance + amount,
      depositedInCourses: Math.max(0, prev.depositedInCourses - amount),
      totalRefunded: prev.totalRefunded + amount
    }));

    setEnrollments(prev => prev.map(e => {
      if (e.courseId !== selectedCourse.id) return e;
      return {
        ...e,
        status: 'refunded',
        resolutionChoice: 'refund',
        reviewLeft: { rating, comment, date: 'Hoy' }
      };
    }));

    // Add review to course
    setCourses(prev => prev.map(c => {
      if (c.id !== selectedCourse.id) return c;
      return {
        ...c,
        reviews: [
          {
            id: `rev-${Date.now()}`,
            studentName: 'Santiago Scanevaro',
            studentAvatar: wallet.userAvatar,
            rating,
            comment,
            date: 'Hoy',
            wasRefunded: true
          },
          ...c.reviews
        ]
      };
    }));

    setIsResolutionModalOpen(false);
  };

  // Option B Resolution: Tip Instructor
  const handleResolveTip = (thankYouMessage: string) => {
    if (!selectedCourse) return;

    const amount = selectedCourse.depositAmount;

    setWallet(prev => ({
      ...prev,
      depositedInCourses: Math.max(0, prev.depositedInCourses - amount),
      totalTipped: prev.totalTipped + amount
    }));

    setEnrollments(prev => prev.map(e => {
      if (e.courseId !== selectedCourse.id) return e;
      return {
        ...e,
        status: 'tipped_instructor',
        resolutionChoice: 'tip'
      };
    }));

    setIsResolutionModalOpen(false);
  };

  // Option C Resolution: Convert to 1a1 Mentorship
  const handleResolveMentorship = (date: string, slot: string, topic: string) => {
    if (!selectedCourse) return;

    const amount = selectedCourse.depositAmount;

    setWallet(prev => ({
      ...prev,
      depositedInCourses: Math.max(0, prev.depositedInCourses - amount),
      totalInvestedInMentorships: prev.totalInvestedInMentorships + amount
    }));

    const newBooking: MentorshipBooking = {
      id: `ment-${Date.now()}`,
      instructorId: selectedCourse.instructor.id,
      instructorName: selectedCourse.instructor.name,
      instructorAvatar: selectedCourse.instructor.avatar,
      instructorTitle: selectedCourse.instructor.title,
      studentId: 'user-current',
      studentName: 'Santiago Scanevaro',
      courseTitle: selectedCourse.title,
      date,
      timeSlot: slot,
      topic,
      status: 'scheduled',
      meetingLink: `https://meet.jit.si/StakeLearn-${selectedCourse.instructor.name.replace(/\s+/g, '')}`,
      fundedBy: 'deposit_conversion',
      amount
    };

    setMentorships(prev => [newBooking, ...prev]);

    setEnrollments(prev => prev.map(e => {
      if (e.courseId !== selectedCourse.id) return e;
      return {
        ...e,
        status: 'converted_to_mentorship',
        resolutionChoice: 'mentorship',
        mentorshipBookedId: newBooking.id
      };
    }));

    setIsResolutionModalOpen(false);
    setCurrentTab('mentorships');
  };

  // Direct mentorship booking using wallet balance
  const handleBookDirectMentorship = (instructorId: string, date: string, slot: string, topic: string) => {
    const instructorCourse = courses.find(c => c.instructor.id === instructorId);
    if (!instructorCourse) return;

    const price = instructorCourse.instructor.mentorshipPrice;
    if (wallet.balance < price) return;

    setWallet(prev => ({
      ...prev,
      balance: prev.balance - price,
      totalInvestedInMentorships: prev.totalInvestedInMentorships + price
    }));

    const newBooking: MentorshipBooking = {
      id: `ment-${Date.now()}`,
      instructorId,
      instructorName: instructorCourse.instructor.name,
      instructorAvatar: instructorCourse.instructor.avatar,
      instructorTitle: instructorCourse.instructor.title,
      studentId: 'user-current',
      studentName: 'Santiago Scanevaro',
      date,
      timeSlot: slot,
      topic,
      status: 'scheduled',
      meetingLink: `https://meet.jit.si/StakeLearn-${instructorCourse.instructor.name.replace(/\s+/g, '')}`,
      fundedBy: 'direct_payment',
      amount: price
    };

    setMentorships(prev => [newBooking, ...prev]);
    setCurrentTab('mentorships');
  };

  const handleAddFunds = (amount: number) => {
    setWallet(prev => ({ ...prev, balance: prev.balance + amount }));
  };

  const handleCreateCourse = (newCourse: Course) => {
    setCourses(prev => [newCourse, ...prev]);
  };

  const handleGradeProject = (projectId: string, score: number, feedbackText: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        status: 'approved',
        feedback: {
          instructorName: 'Prof. Carlos Vance (Tú)',
          text: feedbackText,
          score,
          date: 'Ahora'
        }
      };
    }));
  };

  // Filtered courses
  const filteredCourses = courses.filter(c => {
    const matchesCat = selectedCategory === 'Todos' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Current active enrollment for selected course
  const currentSelectedEnrollment = enrollments.find(e => e.courseId === selectedCourse?.id);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setSelectedCourse(null);
          setIsLearningMode(false);
        }}
        wallet={wallet}
        onOpenExplainer={() => setIsExplainerOpen(true)}
        onOpenWallet={() => setIsWalletOpen(true)}
        onToggleRole={() => {
          const nextRole = wallet.role === 'student' ? 'instructor' : 'student';
          setWallet(prev => ({ ...prev, role: nextRole }));
          if (nextRole === 'instructor') {
            setCurrentTab('instructor');
          } else {
            setCurrentTab('courses');
          }
        }}
      />

      {/* Main Content Router */}
      <main className="pb-16">
        
        {/* VIEW 1: Learning Player Mode */}
        {selectedCourse && isLearningMode && currentSelectedEnrollment ? (
          <LessonPlayerView
            course={selectedCourse}
            enrollment={currentSelectedEnrollment}
            onBack={() => setIsLearningMode(false)}
            onToggleLessonComplete={handleToggleLessonComplete}
            onSubmitProject={handleSubmitProject}
            onOpenResolutionModal={() => setIsResolutionModalOpen(true)}
          />
        ) : selectedCourse ? (
          /* VIEW 2: Course Detail Overview */
          <CourseDetailView
            course={selectedCourse}
            enrollment={currentSelectedEnrollment}
            wallet={wallet}
            onBack={() => setSelectedCourse(null)}
            onEnroll={handleEnroll}
            onStartLesson={() => setIsLearningMode(true)}
            onOpenExplainer={() => setIsExplainerOpen(true)}
          />
        ) : currentTab === 'projects' ? (
          /* VIEW 3: Projects Gallery */
          <ProjectsGalleryView projects={projects} />
        ) : currentTab === 'mentorships' ? (
          /* VIEW 4: Mentorships & 1a1 Consultancies */
          <MentorshipsView
            courses={courses}
            bookings={mentorships}
            wallet={wallet}
            onBookDirectMentorship={handleBookDirectMentorship}
          />
        ) : currentTab === 'deposits' ? (
          /* VIEW 5: My Escrow Deposits */
          <MyDepositsView
            courses={courses}
            enrollments={enrollments}
            wallet={wallet}
            onSelectCourse={(course) => setSelectedCourse(course)}
            onOpenExplainer={() => setIsExplainerOpen(true)}
          />
        ) : currentTab === 'instructor' || wallet.role === 'instructor' ? (
          /* VIEW 6: Instructor Dashboard */
          <InstructorDashboard
            courses={courses}
            projects={projects}
            onCreateCourse={handleCreateCourse}
            onGradeProject={handleGradeProject}
          />
        ) : (
          /* VIEW 7: Main Courses Catalog Page */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" /> Innovación Educativa • Depósito Reembolsable
                </div>

                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                  No pagas la educación.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Te comprometes con ella.</span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Deposita un aval de garantía ($20-$30 USD) para ingresar al curso. Completa las lecciones y tu proyecto práctico, y tú eliges: <strong className="text-white">reembolso total al 100%</strong>, <strong className="text-white">regalo al profesor</strong> o <strong className="text-white">canje directo por una mentoría 1 a 1</strong>.
                </p>

                {/* 3 Option Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-xs flex items-center gap-2.5">
                    <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg shrink-0">
                      <RotateCcw className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">100% Reembolso</div>
                      <div className="text-[10px] text-slate-400">Al dejar tu reseña</div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-xs flex items-center gap-2.5">
                    <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg shrink-0">
                      <HeartHandshake className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Regalo al Profesor</div>
                      <div className="text-[10px] text-slate-400">Por contenido top</div>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl text-xs flex items-center gap-2.5">
                    <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg shrink-0">
                      <Video className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Mentoría 1 a 1</div>
                      <div className="text-[10px] text-slate-400">45 min privados</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setIsExplainerOpen(true)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1.5"
                  >
                    <span>Ver caso práctico: Profesor de Música RPG & Estudiante</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search & Category Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Categories Pills */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar curso o profesor..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

            </div>

            {/* Courses Catalog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => {
                const enrollment = enrollments.find(e => e.courseId === course.id);
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    enrollment={enrollment}
                    onSelectCourse={(c) => setSelectedCourse(c)}
                  />
                );
              })}
            </div>

          </div>
        )}

      </main>

      {/* Modals */}
      <DepositExplainerModal
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
        onExploreCourses={() => {
          setIsExplainerOpen(false);
          setCurrentTab('courses');
        }}
      />

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        wallet={wallet}
        onAddFunds={handleAddFunds}
      />

      {selectedCourse && currentSelectedEnrollment && (
        <ResolutionModal
          isOpen={isResolutionModalOpen}
          onClose={() => setIsResolutionModalOpen(false)}
          course={selectedCourse}
          enrollment={currentSelectedEnrollment}
          onResolveRefund={handleResolveRefund}
          onResolveTip={handleResolveTip}
          onResolveMentorship={handleResolveMentorship}
        />
      )}

    </div>
  );
}
