export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'text' | 'exercise';
  videoUrl?: string;
  content: string;
  quiz?: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
  };
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseReview {
  id: string;
  studentName: string;
  studentAvatar: string;
  rating: number;
  comment: string;
  date: string;
  wasRefunded: boolean;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
  rating: number;
  totalStudents: number;
  mentorshipPrice: number;
  availableSlots: string[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  instructor: Instructor;
  depositAmount: number;
  durationHours: number;
  difficulty: 'Principiante' | 'Intermedio' | 'Avanzado';
  coverImage: string;
  description: string;
  learningObjectives: string[];
  modules: Module[];
  projectPrompt: {
    title: string;
    description: string;
    deliverableType: 'audio' | 'code' | 'design' | 'link';
    exampleUrl?: string;
  };
  reviews: CourseReview[];
  totalEnrolled: number;
  completionRate: number;
}

export interface CourseEnrollment {
  courseId: string;
  studentId: string;
  depositedAmount: number;
  depositedAt: string;
  status: 'active' | 'completed_pending_resolution' | 'refunded' | 'tipped_instructor' | 'converted_to_mentorship';
  completedLessonIds: string[];
  projectSubmission?: {
    submittedAt: string;
    deliverableUrl: string;
    notes: string;
    audioPreviewUrl?: string;
    instructorFeedback?: {
      instructorName: string;
      text: string;
      score: number;
      date: string;
    };
    status: 'pending' | 'approved' | 'revision';
  };
  resolutionChoice?: 'refund' | 'tip' | 'mentorship';
  reviewLeft?: {
    rating: number;
    comment: string;
    date: string;
  };
  mentorshipBookedId?: string;
}

export interface StudentProject {
  id: string;
  courseId: string;
  courseTitle: string;
  studentName: string;
  studentAvatar: string;
  projectTitle: string;
  description: string;
  deliverableUrl: string;
  audioPreviewUrl?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'needs_feedback';
  feedback?: {
    instructorName: string;
    text: string;
    score: number;
    date: string;
  };
}

export interface MentorshipBooking {
  id: string;
  instructorId: string;
  instructorName: string;
  instructorAvatar: string;
  instructorTitle: string;
  studentId: string;
  studentName: string;
  courseTitle?: string;
  date: string;
  timeSlot: string;
  topic: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink: string;
  fundedBy: 'deposit_conversion' | 'direct_payment';
  amount: number;
}

export interface UserWallet {
  balance: number;
  depositedInCourses: number;
  totalRefunded: number;
  totalInvestedInMentorships: number;
  totalTipped: number;
  role: 'student' | 'instructor';
  userName: string;
  userAvatar: string;
}
