export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type ApiOptions = {
  method?: string;
  body?: any;
  token?: string | null;
  headers?: Record<string, string>;
  cache?: RequestCache;
};

export async function api(path: string, { method = 'GET', body, token, headers = {}, cache = 'no-store' }: ApiOptions = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? (body instanceof FormData ? body : JSON.stringify(body)) : undefined,
    cache,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any).message || 'Request failed');
  return data;
}

export async function uploadToImgbb(file: File) {
  const key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  if (!key) throw new Error('Missing NEXT_PUBLIC_IMGBB_API_KEY');
  const fd = new FormData();
  fd.append('image', file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: 'POST', body: fd });
  const data = await res.json();
  if (!data.success) throw new Error(data.error?.message || 'Image upload failed');
  return data.data.display_url as string;
}
