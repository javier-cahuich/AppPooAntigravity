import { useState, useCallback } from 'react';
import { OOP_MODULES } from '@/constants/oopModules';

// Simple in-memory progress store (shared via module-level variable)
const _completedSet = new Set<number>();
const _listeners = new Set<() => void>();

function notifyListeners() {
  _listeners.forEach((cb) => cb());
}

export function useProgress() {
  const [, forceUpdate] = useState(0);

  // Register listener to sync across instances
  useState(() => {
    const trigger = () => forceUpdate((n) => n + 1);
    _listeners.add(trigger);
    return () => _listeners.delete(trigger);
  });

  const markComplete = useCallback((id: number) => {
    _completedSet.add(id);
    notifyListeners();
  }, []);

  const markIncomplete = useCallback((id: number) => {
    _completedSet.delete(id);
    notifyListeners();
  }, []);

  const isComplete = useCallback(
    (id: number) => _completedSet.has(id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_completedSet.size]
  );

  const completedCount = _completedSet.size;
  const totalModules = OOP_MODULES.length;
  const completionPercentage = Math.round((completedCount / totalModules) * 100);

  return {
    completedModules: _completedSet,
    markComplete,
    markIncomplete,
    isComplete,
    completedCount,
    totalModules,
    completionPercentage,
  };
}
