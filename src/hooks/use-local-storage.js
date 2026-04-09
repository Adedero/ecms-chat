import { useState, useEffect, useCallback } from "react";

export default function useLocalStorage(key, initialValue) {
  const isClient = typeof window !== "undefined";

  const [storedValue, setStoredValue] = useState(() => {
    if (!isClient) return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`useLocalStorage: Error reading key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value) => {
      try {
        setStoredValue((prev) => {
          const valueToStore = value instanceof Function ? value(prev) : value;
          if (isClient) {
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
          }
          return valueToStore;
        });
      } catch (error) {
        console.warn(`useLocalStorage: Error setting key "${key}":`, error);
      }
    },
    [key, isClient],
  );

  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue);
      if (isClient) {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.warn(`useLocalStorage: Error removing key "${key}":`, error);
    }
  }, [key, initialValue, isClient]);

  useEffect(() => {
    if (!isClient) return;

    const handleStorageChange = (e) => {
      if (e.key === key && e.storageArea === window.localStorage) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch {
          setStoredValue(initialValue);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, isClient, initialValue]);

  return [storedValue, setValue, removeValue];
}
