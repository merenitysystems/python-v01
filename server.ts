import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint for AI-powered Python code explanation
app.post('/api/explain-code', async (req, res) => {
  try {
    const { code, chapterContext } = req.body;
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({ error: 'Valid Python code is required for explanation.' });
    }

    const contextNote = chapterContext ? `The student is currently learning: ${chapterContext}.\n` : '';

    const prompt = `You are a supportive, insightful senior Python tutor teaching a beginner programmer.
${contextNote}
Explain the following Python code in clean, accessible natural language:

\`\`\`python
${code.trim()}
\`\`\`

Structure your explanation clearly:
1. **Overview**: In 1-2 friendly sentences, describe what this code does and its real-world purpose.
2. **Step-by-Step Breakdown**: Walk through the variables, logic flow, loops, conditionals, or functions.
3. **Core Concept & Mental Model**: Explain how Python handles this under the hood (e.g. data types, memory references, execution order).
4. **Try It Out / Pro Tip**: Suggest a small tweak or question to help the student experiment and deepen understanding.

Keep formatting clean with Markdown headers, bullet points, and inline code formatting.`;

    // Attempt generation with automatic model fallback if one experiences transient high demand
    const candidateModels = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
    let explanation = '';
    let lastError: any = null;

    for (const model of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
        });
        if (response && response.text) {
          explanation = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${model} unavailable, trying fallback:`, err?.message);
      }
    }

    if (!explanation) {
      throw lastError || new Error('High demand on AI models. Please retry in a few moments.');
    }

    return res.json({ explanation });
  } catch (error: any) {
    console.error('Error in /api/explain-code:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate code explanation from Gemini API.',
    });
  }
});

// Mount Vite middleware in development or serve static in production
if (process.env.NODE_ENV !== 'production') {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true, port: 3000, host: '0.0.0.0' },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
