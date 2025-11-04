import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body; // [{role:'user'|'assistant'|'system', content:'...'}]
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'mensagens inválidas' });
    }

    const completion = await openai.chat.completions.create({
      model: MODEL,
      messages,
      temperature: 0.6
    });

    const answer = completion.choices?.[0]?.message?.content ?? 'sem resposta';
    res.json({ reply: answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'falha a falar com a IA' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ servidor no ar em http://localhost:${port}`);
});
