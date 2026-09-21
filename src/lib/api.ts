// lib/api.ts

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://hmif.if.unram.ac.id/api/v2';
const PROJECT = process.env.NEXT_PUBLIC_PROJECT_ID || 'bonggoo';
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || 'pk_bonggoo_002f7db5cccb9c86';

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${BASE_URL}/${PROJECT}${cleanEndpoint}`;

  // Ambil token dari localStorage jika dipanggil di Client Component (browser)
  let bearerToken = '';
  if (typeof window !== 'undefined') {
    bearerToken = localStorage.getItem('authToken') || localStorage.getItem('session_token') || '';
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-API-Key': API_KEY, // Layer 1: Akses Backend Kelompok
  };

  if (bearerToken) {
    headers['Authorization'] = `Bearer ${bearerToken}`; // Layer 2: User Session JWT
  }

  const res = await fetch(url, {
    ...options,
    headers: { ...headers, ...options.headers },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || `Request gagal: status ${res.status}`);
  }

  return data;
}