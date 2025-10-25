import { useState, useEffect } from 'react';

export default function useLocalStorage<initial>(key: string, initialValue: initial) {
  const [value, setValue] = useState<initial>(() => {
    try {
      const items = localStorage.getItem(key);
      return items ? (JSON.parse(items) as initial) : initialValue;
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
