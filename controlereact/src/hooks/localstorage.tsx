import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));

      if (typeof value === 'string' && (value === 'light' || value === 'dark')) {
        document.body.dataset.theme = value;
      }
    } catch {}
  }, [key, value]);

  return [value, setValue] as const;
}
