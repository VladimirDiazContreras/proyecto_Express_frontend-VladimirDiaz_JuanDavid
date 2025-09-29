/* /scripts/api.js */
(() => {
  const TOKEN_KEY = 'karenflix_token';
  const API_BASE = "https://proyecto-ex-press-backend-s1-santoyo-juan-diaz-vladi-afbtan4mb.vercel.app";


  const api = {
    setBase(url) { localStorage.setItem('API_BASE', url); },
    getBase() { return localStorage.getItem('API_BASE') || API_BASE; },
    setToken(t) { localStorage.setItem(TOKEN_KEY, t); },
    getToken() { return localStorage.getItem(TOKEN_KEY); },
    clearToken() { localStorage.removeItem(TOKEN_KEY); },
    async request(path, { method = 'GET', body, headers = {} } = {}) {
      const h = { 'Content-Type': 'application/json', ...headers };
      const tk = api.getToken();
      if (tk) h['Authorization'] = `Bearer ${tk}`; // Tu backend usa Bearer
      const res = await fetch(`${api.getBase()}${path}`, {
        method, headers: h, body: body ? JSON.stringify(body) : undefined
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.error || data?.msg || res.statusText;
        throw new Error(msg);
      }
      return data;
    }
  };

  window.api = api;
})();

