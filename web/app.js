const API_URL = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  ? 'http://localhost:3000/api/chat'
  : '/api/chat'; // quando hospedares juntos

const messagesEl = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('prompt');

const messages = [
  { role: 'system', content: 'Responde sempre em português de Portugal de forma simples e direta.' }
];

function addMsg(text, who) {
  const div = document.createElement('div');
  div.className = `msg ${who}`;
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const prompt = input.value.trim();
  if (!prompt) return;

  input.value = '';
  addMsg(prompt, 'user');

  const body = { messages: [...messages, { role: 'user', content: prompt }] };

  try {
    form.querySelector('button').disabled = true;
    addMsg('a pensar...', 'ai');

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    const last = messagesEl.querySelector('.msg.ai:last-child');
    last.textContent = data.reply || 'sem resposta';

    messages.push({ role: 'user', content: prompt });
    messages.push({ role: 'assistant', content: data.reply });
  } catch (err) {
    const last = messagesEl.querySelector('.msg.ai:last-child');
    last.textContent = 'falhou a conversa com a IA';
  } finally {
    form.querySelector('button').disabled = false;
  }
});
