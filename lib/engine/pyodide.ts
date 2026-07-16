export interface Py { runPython(code: string): unknown }

declare global { interface Window { loadPyodide?: (o: { indexURL: string }) => Promise<Py> } }

let instance: Promise<Py> | null = null;
const VERSION = "0.26.4";
const BASE = `https://cdn.jsdelivr.net/pyodide/v${VERSION}/full/`;

export function loadPy(): Promise<Py> {
  if (instance) return instance;
  instance = new Promise<Py>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `${BASE}pyodide.js`;
    s.onload = () => window.loadPyodide!({ indexURL: BASE }).then(resolve, reject);
    s.onerror = () => reject(new Error("Failed to load Python runtime. Check your connection and reload."));
    document.head.appendChild(s);
  });
  return instance;
}
