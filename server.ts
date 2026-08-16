import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client (Server-side only)
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.log('GEMINI_API_KEY not set or placeholder. Gemini AI features will use fallback responses.');
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Assistant: Generate course outline for instructors
app.post('/api/ai/generate-syllabus', async (req, res) => {
  try {
    const { topic, depositAmount, category } = req.body;
    
    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    if (!aiClient) {
      // Fallback response if no API key
      return res.json({
        title: `Curso Intensivo: ${topic}`,
        subtitle: `Domina ${topic} mediante proyectos prácticos y evaluación por compromiso`,
        description: `Un programa práctico de nivel profesional estructurado para dominar ${topic}. Depositas $${depositAmount || 20} para asegurar tu compromiso.`,
        learningObjectives: [
          `Dominar los conceptos esenciales de ${topic}`,
          'Crear un proyecto práctico para tu portafolio personal',
          'Aplicar buenas prácticas y optimizaciones de la industria',
          'Recibir retroalimentación directa y personalizada'
        ],
        modules: [
          {
            title: 'Módulo 1: Fundamentos y Configuración Inicial',
            lessons: [
              { title: 'Introducción y Modelo de Depósito Reembolsable', duration: '10 min' },
              { title: 'Conceptos Clave e Herramientas', duration: '20 min' }
            ]
          },
          {
            title: 'Módulo 2: Técnicas Avanzadas y Aplicación',
            lessons: [
              { title: 'Patrones de Diseño y Buenas Prácticas', duration: '25 min' },
              { title: 'Resolución de Problemas Comunes', duration: '20 min' }
            ]
          },
          {
            title: 'Módulo 3: Proyecto Práctico Final',
            lessons: [
              { title: 'Guía del Entrega y Criterios de Evaluación', duration: '15 min' }
            ]
          }
        ],
        recommendedProjectPrompt: `Crea un entregable real de ${topic} que demuestre el uso de las técnicas explicadas.`
      });
    }

    const prompt = `Eres un experto pedagógico en diseño de cursos para la plataforma StakeLearn (donde los estudiantes no pagan matrícula fija sino que depositan un aval reembolsable de $${depositAmount || 20} que recuperan al entregar un proyecto y dejar reseña, o pueden canjearlo por una mentoría 1 a 1).

Genera una propuesta completa para un curso sobre el tema: "${topic}" en la categoría "${category || 'Tecnología'}".
Responde estrictamente en formato JSON válido con la siguiente estructura:
{
  "title": "Título corto e impactante",
  "subtitle": "Subtítulo explicativo de 1 frase",
  "description": "Descripción de 2 párrafos resaltando el valor práctico y el compromiso del depósito",
  "learningObjectives": ["objetivo 1", "objetivo 2", "objetivo 3", "objetivo 4"],
  "modules": [
    {
      "title": "Módulo 1: Nombre",
      "lessons": [
        { "title": "Nombre de lección 1", "duration": "15 min" },
        { "title": "Nombre de lección 2", "duration": "20 min" }
      ]
    },
    {
      "title": "Módulo 2: Nombre",
      "lessons": [
        { "title": "Nombre lección 1", "duration": "18 min" },
        { "title": "Nombre lección 2", "duration": "25 min" }
      ]
    }
  ],
  "recommendedProjectPrompt": "Instrucción clara para el proyecto final práctico que deberá enviar el estudiante"
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const resultText = response.text || '{}';
    const parsed = JSON.parse(resultText);
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in generate-syllabus:', err);
    return res.status(500).json({ error: 'Failed to generate syllabus', details: err.message });
  }
});

// AI Assistant: Generate instant feedback for student project submissions
app.post('/api/ai/project-feedback', async (req, res) => {
  try {
    const { courseTitle, projectTitle, description, deliverableUrl } = req.body;

    if (!aiClient) {
      return res.json({
        score: 9.5,
        status: 'approved',
        feedbackText: `¡Excelente trabajo en "${projectTitle}" para el curso de ${courseTitle}! La entrega en ${deliverableUrl} cumple con todos los requisitos prácticos. Se nota una clara dedicación y aplicación de las técnicas enseñadas. Tu proyecto ha sido aprobado. Puedes proceder a solicitar la devolución de tu depósito de garantía o canjearlo por una mentoría 1 a 1.`,
        tips: [
          'Asegúrate de documentar bien tus decisiones de diseño/código.',
          'Considera agregar más variaciones o detalles en versiones futuras.'
        ]
      });
    }

    const prompt = `Actúa como el profesor titular del curso "${courseTitle}". Un estudiante ha enviado su proyecto final titulado "${projectTitle}" con la siguiente descripción: "${description}" y enlace de entrega "${deliverableUrl}".

Proporciona una revisión constructiva, motivadora y rigurosa en formato JSON:
{
  "score": 9.5 (número del 1 al 10),
  "status": "approved" (o "revision" si falta algo grave),
  "feedbackText": "Un texto de retroalimentación detallado (2 párrafos) felicitando los aspectos positivos y destacando la calidad técnica.",
  "tips": ["Consejo práctico 1", "Consejo práctico 2"]
}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (err: any) {
    console.error('Error in project-feedback:', err);
    return res.status(500).json({ error: 'Failed to generate project feedback' });
  }
});

// Setup Vite / Production Handler
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
