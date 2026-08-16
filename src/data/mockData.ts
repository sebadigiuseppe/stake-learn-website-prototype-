import { Course, StudentProject, MentorshipBooking, UserWallet } from '../types';

export const INITIAL_WALLET: UserWallet = {
  balance: 85,
  depositedInCourses: 20,
  totalRefunded: 40,
  totalInvestedInMentorships: 20,
  totalTipped: 10,
  role: 'student',
  userName: 'Santiago Scanevaro',
  userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-rpg-music',
    title: 'Composición de Música para Juegos RPG',
    subtitle: 'Domina leitmotifs, orquestación interactiva y bucles de audio para video juegos de rol',
    category: 'Música & Videojuegos',
    depositAmount: 20,
    durationHours: 8,
    difficulty: 'Intermedio',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
    description: 'Aprende las técnicas profesionales que usan los compositores de Square Enix y Nintendo para crear bandas sonoras memorables. En este curso no pagas una matrícula tradicional: depositas $20 como garantía de compromiso. Al completar el curso y enviar tu proyecto final, recuperas el 100% de tu dinero al dejar una reseña, o puedes elegir regalárselo al profesor o convertirlo directamente en una mentoría privada 1 a 1.',
    learningObjectives: [
      'Creación de Leitmotifs memorables para personajes y reinos RPG',
      'Técnicas de Bucle Perfecto (Seamless Loop) en DAWs como Reaper, Ableton y Logic',
      'Estructura de música de batalla adaptativa y capas de intensidad',
      'Configuración de FMOD / Wwise para sincronización con motores de juegos',
      'Orquestación híbrida combinando instrumentos acústicos y sintetizadores retro'
    ],
    instructor: {
      id: 'inst-carlos-vance',
      name: 'Prof. Carlos Vance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      title: 'Compositor de Audio para Juegos Indie & RPGs',
      bio: 'Más de 10 años creando bandas sonoras para títulos indies galardonados. Apasionado por la educación basada en proyectos reales y compromiso mutuo.',
      rating: 4.9,
      totalStudents: 342,
      mentorshipPrice: 20,
      availableSlots: ['Mañana 16:00', 'Mañana 18:00', 'Viernes 10:00', 'Viernes 15:00', 'Sábado 11:00']
    },
    totalEnrolled: 184,
    completionRate: 94,
    modules: [
      {
        id: 'mod-1',
        title: 'Módulo 1: Anatomía de la Música de Fantasía RPG',
        lessons: [
          {
            id: 'les-101',
            title: 'Introducción al Modelo de Depósito & Estructura del Curso',
            duration: '8 min',
            type: 'video',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            content: 'Bienvenido a StakeLearn. Tu depósito de $20 está protegido en depósito de garantía. Al completar las 6 lecciones y tu proyecto de composición de la Taberna RPG, podrás decidir el destino de tu dinero.'
          },
          {
            id: 'les-102',
            title: 'El Poder del Leitmotif: Asignación de Identidad Sonora',
            duration: '15 min',
            type: 'video',
            content: 'Un leitmotif es un tema musical recurrente asociado a una persona, lugar o idea. Analizaremos ejemplos clásicos como Chrono Trigger, Final Fantasy VII y Zelda: Ocarina of Time.',
            quiz: {
              question: '¿Cuál es la función principal de un Leitmotif en un RPG?',
              options: [
                'Hacer que la canción suene más fuerte en las batallas',
                'Crear una asociación emocional inmediata con un personaje o ubicación',
                'Evitar el uso de instrumentos de viento',
                'Reducir el tamaño del archivo de audio exportado'
              ],
              correctAnswerIndex: 1
            }
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Módulo 2: Composición del Tema de Exploración & Bucle Continuo',
        lessons: [
          {
            id: 'les-201',
            title: 'Estructura Armónica para Ambientes de Pueblo y Taberna',
            duration: '22 min',
            type: 'video',
            content: 'Las zonas pacíficas requieren modos musicales particulares (como el modo Dórico o Lidio) que transmiten misterio, calidez o nostalgia sin fatigar el oído del jugador tras horas de juego.'
          },
          {
            id: 'les-202',
            title: 'Técnica de Loop Perfecto sin Clics ni Cortes',
            duration: '18 min',
            type: 'exercise',
            content: 'Guía paso a paso para configurar los puntos de inicio y fin en tu DAW. Aprende a duplicar la cola de reverberación (reverb tail) al inicio para que el bucle sea 100% imperceptible.'
          }
        ]
      },
      {
        id: 'mod-3',
        title: 'Módulo 3: Música de Batalla y Proyecto Final',
        lessons: [
          {
            id: 'les-301',
            title: 'Transición Adaptativa de Paz a Combate',
            duration: '20 min',
            type: 'video',
            content: 'Cómo usar marcas de compás y transiciones verticales/horizontales para que la música responda dinámicamente cuando un enemigo avista al jugador.'
          },
          {
            id: 'les-302',
            title: 'Instrucciones del Proyecto Final: Banda Sonora de la Taberna',
            duration: '12 min',
            type: 'text',
            content: 'Para completar el curso y desbloquear la devolución o canje de tu depósito de $20, debes exportar una pieza musical de 1 a 2 minutos en bucle con temática de Taberna o Pueblo RPG. Sube tu archivo audio (o link Soundcloud/Drive) a continuación.'
          }
        ]
      }
    ],
    projectPrompt: {
      title: 'Composición de la Banda Sonora para "La Taberna del Dragón Ebrio"',
      description: 'Crea una pieza de 1 a 2 minutos apta para una taberna acogedora de un videojuego RPG. Debe incluir un leitmotif reconocible, bucle perfecto de audio y mezcla equilibrada.',
      deliverableType: 'audio',
      exampleUrl: 'https://soundcloud.com/example/rpg-tavern-loop'
    },
    reviews: [
      {
        id: 'rev-1',
        studentName: 'Lucía Fernández',
        studentAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        comment: '¡Increíble sistema! Deposité $20 con miedo de no terminarlo, pero la motivación de recuperar mi dinero me hizo completar el curso en 3 días. La lección de bucles perfectos vale oro.',
        date: 'Hace 3 días',
        wasRefunded: true
      },
      {
        id: 'rev-2',
        studentName: 'Mateo Rossi',
        studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        comment: 'En lugar de pedir mi reembolso, usé los $20 para la mentoría 1 a 1 con Carlos. Revisó mi pista en vivo y me dio consejos de mezcla brutales.',
        date: 'Hace 1 semana',
        wasRefunded: false
      }
    ]
  },
  {
    id: 'course-fullstack-react',
    title: 'Desarrollo Web Fullstack con React & Node.js',
    subtitle: 'Construye aplicaciones modernas con arquitectura limpia, APIs REST y base de datos',
    category: 'Desarrollo Web',
    depositAmount: 30,
    durationHours: 12,
    difficulty: 'Intermedio',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    description: 'Un bootcamp intensivo enfocado en la práctica real. Depositas $30 de garantía. Si completas el proyecto y dejas tu feedback, te devolvemos tus $30 o puedes agendar una revisión de código personalizada de 45 minutos con Elena.',
    learningObjectives: [
      'Arquitectura de componentes reusables en React 19 y TypeScript',
      'Creación de servidores Express seguros con validaciones y autenticación JWT',
      'Modelado de datos en base de datos PostgreSQL / SQLite',
      'Despliegue continuo en la nube (Vite + Cloud Run / Vercel)',
      'Buenas prácticas de UX y optimización de rendimiento'
    ],
    instructor: {
      id: 'inst-elena-rostova',
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      title: 'Senior Staff Frontend Architect',
      bio: 'Ex-Tech Lead en startups de Silicon Valley. Apasionada por enseñar código limpio y escalable.',
      rating: 4.95,
      totalStudents: 820,
      mentorshipPrice: 30,
      availableSlots: ['Mañana 15:00', 'Jueves 11:00', 'Viernes 17:00']
    },
    totalEnrolled: 410,
    completionRate: 91,
    modules: [
      {
        id: 'mod-fs-1',
        title: 'Módulo 1: Fundamentos de React & TypeScript',
        lessons: [
          {
            id: 'les-fs-1',
            title: 'Arquitectura de Componentes & Estado Global',
            duration: '25 min',
            type: 'video',
            content: 'Cómo estructurar aplicaciones de React sin caer en prop drilling excesivo ni sobre-ingeniería.'
          }
        ]
      },
      {
        id: 'mod-fs-2',
        title: 'Módulo 2: Proyecto Final App SaaS',
        lessons: [
          {
            id: 'les-fs-2',
            title: 'Instrucciones del Proyecto Fullstack',
            duration: '15 min',
            type: 'text',
            content: 'Envía el repositorio GitHub o enlace de despliegue de tu aplicación CRUD completa.'
          }
        ]
      }
    ],
    projectPrompt: {
      title: 'Aplicación Fullstack de Gestión de Tareas con API Backend',
      description: 'Desarrolla un dashboard interactivo con autenticación, filtrado de datos y consumo de API REST.',
      deliverableType: 'code',
      exampleUrl: 'https://github.com/example/fullstack-app'
    },
    reviews: [
      {
        id: 'rev-fs-1',
        studentName: 'Andrés Castro',
        studentAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        comment: 'Excelente dinámica. Al saber que mi dinero estaba en juego, completé el proyecto en tiempo récord.',
        date: 'Hace 4 días',
        wasRefunded: true
      }
    ]
  },
  {
    id: 'course-ui-ux-mobile',
    title: 'Diseño de Interfaces UI/UX para Apps Móviles',
    subtitle: 'Crea sistemas de diseño refinados, microinteracciones y prototipos interactivos en Figma',
    category: 'Diseño & UI/UX',
    depositAmount: 25,
    durationHours: 6,
    difficulty: 'Principiante',
    coverImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80',
    description: 'Aprende las reglas de oro de la jerarquía visual, espaciado, teoría del color y accesibilidad móvil. Completa tu prototipo interactivo para liberar tu depósito de $25 o canjearlo por una crítica de diseño 1 a 1.',
    learningObjectives: [
      'Jerarquía tipográfica y escalas proporcionales para pantallas táctiles',
      'Uso estratégico de Auto-Layout y variables de componentes en Figma',
      'Creación de Design Tokens y modos claro/oscuro',
      'Prototipado de microinteracciones fluidas y animaciones de transición',
      'Evaluación de accesibilidad WCAG AA y contraste de color'
    ],
    instructor: {
      id: 'inst-mateo-benitez',
      name: 'Mateo Benítez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      title: 'Lead Product Designer @ Studio Pixel',
      bio: 'Diseñador de producto con más de 8 años de experiencia en fintechs y apps de consumo.',
      rating: 4.88,
      totalStudents: 215,
      mentorshipPrice: 25,
      availableSlots: ['Hoy 19:00', 'Mañana 14:00', 'Viernes 12:00']
    },
    totalEnrolled: 156,
    completionRate: 96,
    modules: [
      {
        id: 'mod-ui-1',
        title: 'Módulo 1: Fundamentos de UI Móvil',
        lessons: [
          {
            id: 'les-ui-1',
            title: 'Sistemas de Grillas y Objetivos Táctiles (44px Rule)',
            duration: '18 min',
            type: 'video',
            content: 'Aprende las dimensiones clave para evitar errores de usabilidad en dispositivos iOS y Android.'
          }
        ]
      }
    ],
    projectPrompt: {
      title: 'Rediseño de Pantalla de Finanzas Personales en Figma',
      description: 'Crea un prototipo interactivo de 3 pantallas con modo claro y oscuro.',
      deliverableType: 'design',
      exampleUrl: 'https://figma.com/file/example'
    },
    reviews: [
      {
        id: 'rev-ui-1',
        studentName: 'Camila Morales',
        studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        rating: 5,
        comment: 'Preferí convertir mis $25 en una mentoría con Mateo. Sus correcciones a mi portafolio me ayudaron a conseguir mi primer trabajo.',
        date: 'Hace 2 semanas',
        wasRefunded: false
      }
    ]
  },
  {
    id: 'course-ai-prompting',
    title: 'IA Aplicada & Prompt Engineering para Creadores',
    subtitle: 'Automatiza flujos de trabajo, genera prototipos y potencia tu productividad con modelos LLM',
    category: 'Inteligencia Artificial',
    depositAmount: 15,
    durationHours: 5,
    difficulty: 'Principiante',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80',
    description: 'Descubre cómo integrar herramientas de IA en tus proyectos sin código o con scripts sencillos. Deposita $15, realiza las 4 prácticas y recupera tu dinero dejando tu opinión honesta.',
    learningObjectives: [
      'Técnicas avanzadas de Few-Shot Prompting y Chain-of-Thought',
      'Creación de asistentes personalizados con contexto específico',
      'Generación de imágenes y assets visuales estructurados',
      'Automatización de tareas repetitivas mediante APIs de IA',
      'Ética, detección de alucinaciones y verificación de datos'
    ],
    instructor: {
      id: 'inst-alejandro-silva',
      name: 'Dr. Alejandro Silva',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
      title: 'Investigador en IA & Consultor Tecnológico',
      bio: 'Doctor en Ciencias de la Computación, enfocado en democratizar el uso práctico de modelos generativos.',
      rating: 4.92,
      totalStudents: 530,
      mentorshipPrice: 15,
      availableSlots: ['Mañana 11:00', 'Jueves 16:00', 'Sábado 10:00']
    },
    totalEnrolled: 290,
    completionRate: 98,
    modules: [
      {
        id: 'mod-ai-1',
        title: 'Módulo 1: Prompting Estructurado',
        lessons: [
          {
            id: 'les-ai-1',
            title: 'De Prompts Genéricos a Instrucciones del Sistema',
            duration: '20 min',
            type: 'video',
            content: 'Cómo especificar roles, restricciones, formatos JSON y ejemplos concretos.'
          }
        ]
      }
    ],
    projectPrompt: {
      title: 'Agente Personalizado de Asistencia Educativa',
      description: 'Diseña las instrucciones del sistema y ejemplos para un agente experto en una disciplina específica.',
      deliverableType: 'link',
      exampleUrl: 'https://example.com/ai-agent'
    },
    reviews: []
  }
];

export const MOCK_PROJECTS: StudentProject[] = [
  {
    id: 'proj-1',
    courseId: 'course-rpg-music',
    courseTitle: 'Composición de Música para Juegos RPG',
    studentName: 'Gabriel Torres',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    projectTitle: 'Banda Sonora: "La Taberna del Cuervo Solitario"',
    description: 'Composición en bucle de 1:45 min con laúd, flauta celta y acordeón suave. Ajustado con Reverb de ambiente de madera.',
    deliverableUrl: 'https://soundcloud.com/example/lonely-raven-tavern',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=medieval-fantasy-113083.mp3',
    submittedAt: 'Ayer, 18:30',
    status: 'approved',
    feedback: {
      instructorName: 'Prof. Carlos Vance',
      text: '¡Hermosa orquestación, Gabriel! El bucle es totalmente imperceptible y la melodía de flauta evoca mucha calidez. Proyecto aprobado con honores.',
      score: 10,
      date: 'Ayer, 20:15'
    }
  },
  {
    id: 'proj-2',
    courseId: 'course-rpg-music',
    courseTitle: 'Composición de Música para Juegos RPG',
    studentName: 'Santiago Scanevaro (Tú)',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    projectTitle: 'Tema de Taberna de Montaña "Noche Nevada"',
    description: 'Pista ambiental con piano acústico, violonchelo y percusión sutil de madera. Diseñada para un RPG retro de 16-bits.',
    deliverableUrl: 'https://soundcloud.com/santiago/snowy-tavern-theme',
    audioPreviewUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a85638.mp3?filename=fantasy-orchestral-10118.mp3',
    submittedAt: 'Hace 2 horas',
    status: 'pending'
  },
  {
    id: 'proj-3',
    courseId: 'course-fullstack-react',
    courseTitle: 'Desarrollo Web Fullstack con React & Node.js',
    studentName: 'Valentina Díaz',
    studentAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    projectTitle: 'Dashboard de Finanzas Personales con Exportación CSV',
    description: 'Frontend React + Tailwind con backend Express y almacenamiento local persistente.',
    deliverableUrl: 'https://github.com/valentina/finance-app',
    submittedAt: 'Hace 1 día',
    status: 'approved',
    feedback: {
      instructorName: 'Elena Rostova',
      text: 'Código muy limpio y bien modularizado. Excelente manejo de estados asíncronos.',
      score: 9.5,
      date: 'Hace 12 horas'
    }
  }
];

export const MOCK_MENTORSHIP_BOOKINGS: MentorshipBooking[] = [
  {
    id: 'ment-101',
    instructorId: 'inst-carlos-vance',
    instructorName: 'Prof. Carlos Vance',
    instructorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    instructorTitle: 'Compositor de Audio para Juegos Indie',
    studentId: 'user-current',
    studentName: 'Santiago Scanevaro',
    courseTitle: 'Composición de Música para Juegos RPG',
    date: 'Mañana, 15 de Agosto',
    timeSlot: '16:00 - 16:45 hs',
    topic: 'Revisión técnica de mezcla de audio, masterización para FMOD y portfolio para estudios indies.',
    status: 'scheduled',
    meetingLink: 'https://meet.jit.si/StakeLearn-CarlosVance-Consultoria',
    fundedBy: 'deposit_conversion',
    amount: 20
  }
];
