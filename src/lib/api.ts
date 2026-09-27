// src/lib/api.ts

// Arahkan ke endpoint proxy Next.js
const BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://hmif.if.unram.ac.id/api/v3').replace(/\/+$/, '');
const PROJECT = process.env.NEXT_PUBLIC_PROJECT_ID || 'bonggoo';
const KEY = process.env.NEXT_PUBLIC_API_KEY || 'pk_bonggoo_002f7db5cccb9c86';

interface ApiFetchOptions {
  method?: string;
  body?: any;
  token?: string;
}

export async function apiFetch(path: string, options: ApiFetchOptions = {}) {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    Accept: 'application/json',
    'X-API-Key': KEY,
  };

  if (token) headers.Authorization = 'Bearer ' + token;

  let verb = method.toUpperCase();
  let suffix = '';

  if (verb === 'PUT' || verb === 'DELETE') {
    headers['X-HTTP-Method-Override'] = verb;
    suffix = (path.indexOf('?') === -1 ? '?' : '&') + '_method=' + verb;
    verb = 'POST';
  }

  if (body) headers['Content-Type'] = 'application/json';

  let cleanPath = path.startsWith('/') ? path : '/' + path;

  const projectPrefix = '/' + PROJECT;
  if (cleanPath.startsWith(projectPrefix)) {
    cleanPath = cleanPath.slice(projectPrefix.length);
  }

  const targetUrl = `${BASE}/${PROJECT}${cleanPath}${suffix}`;

  try {
    const res = await fetch(targetUrl, {
      method: verb,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      console.warn(`[API Warning ${res.status}] pada ${targetUrl}:`, data);
      return {
        success: false,
        error: true,
        message: data.message || data.error || res.statusText,
        data: [],
      };
    }

    return data;
  } catch (err) {
    console.error(`[API Error] pada ${targetUrl}:`, err);
    return {
      success: false,
      error: true,
      message: 'Server API tidak dapat dijangkau',
      data: [],
    };
  }
}