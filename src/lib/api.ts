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

export async function uploadImage(file: File, token?: string | null) {
  const image = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to read image'));
    reader.readAsDataURL(file);
  });
  const data: any = await api('/api/upload', { method: 'POST', token, body: { image } });
  return data.url as string;
}
