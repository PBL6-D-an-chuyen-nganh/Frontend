// src/api/chatbot.js
import { useAuthStore } from '../store/useAuthStore';

const CHATBOT_API = import.meta.env.VITE_AI_API_URL;

export async function chatSend(message, sessionId) {
  // Lấy token + user từ Zustand (không dùng hook trong module này → dùng getState)
  const { token, user } = useAuthStore.getState();
  const creatorId =
    user?.id ?? user?.userId ?? user?._id ?? user?.accountId ?? null;

  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (creatorId) headers['X-User-Id'] = String(creatorId);

  const res = await fetch(`${CHATBOT_API}/api/chat`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      session_id: sessionId,
      message,
      creator_id: creatorId ? String(creatorId) : null, // dự phòng nếu BE đọc từ body
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}

export async function chatReset(sessionId) {
  const res = await fetch(`${CHATBOT_API}/api/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json();
}
