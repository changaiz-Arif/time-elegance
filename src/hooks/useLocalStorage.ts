import { useEffect, useRef, useState, useCallback } from "react";

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw == null) return initial;
      return JSON.parse(raw) as T;
    } catch {
      // Corrupted / unparsable — reset gracefully
      try { window.localStorage.removeItem(key); } catch {}
      return initial;
    }
  });

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (timer.current) clearTimeout(timer.current);
    // Debounce writes for performance
    timer.current = setTimeout(() => {
      try { window.localStorage.setItem(key, JSON.stringify(value)); } catch {}
    }, 120);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [key, value]);

  const update = useCallback((v: T | ((prev: T) => T)) => setValue(v), []);
  return [value, update] as const;
}