import { useCallback, useEffect, useState } from 'react';
import type { SavedBuildState } from '../types/codex';

const STORAGE_KEY = 'pbz_wulin_codex_prefs_v3';

interface CodexPrefs {
  spoilerShield: boolean;
  savedBuild: SavedBuildState;
}

const DEFAULT_BUILD: SavedBuildState = {
  weapon1: 'sanguine',
  weapon2: 'white-serpent',
  edge1: 'dread-axe',
  edge2: 'chain-sickle',
  accessories: ['reflex-device', 'counterstrike-bracers', 'battle-wraps', 'lingran-pendant'],
  polished: true,
};

const DEFAULT_PREFS: CodexPrefs = {
  spoilerShield: true,
  savedBuild: DEFAULT_BUILD,
};

function loadPrefs(): CodexPrefs {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<CodexPrefs>;
    return {
      spoilerShield: parsed.spoilerShield ?? true,
      savedBuild: {
        ...DEFAULT_BUILD,
        ...(parsed.savedBuild ?? {}),
      },
    };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function useCodexProgress() {
  const [prefs, setPrefs] = useState<CodexPrefs>(loadPrefs);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage quota errors
    }
  }, [prefs]);

  const toggleSpoilerShield = useCallback(() => {
    setPrefs((prev) => ({ ...prev, spoilerShield: !prev.spoilerShield }));
  }, []);

  const updateBuild = useCallback((updater: (prev: SavedBuildState) => SavedBuildState) => {
    setPrefs((prev) => ({
      ...prev,
      savedBuild: updater(prev.savedBuild),
    }));
  }, []);

  return {
    spoilerShield: prefs.spoilerShield,
    savedBuild: prefs.savedBuild,
    toggleSpoilerShield,
    updateBuild,
  };
}
