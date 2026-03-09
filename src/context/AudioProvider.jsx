import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Howl, Howler } from 'howler';
import { getUserSettings, saveUserSettings } from '../utils/localStorage';

const AudioContext = createContext(null);

// ══════════════════════════════════════════════════════════════
// FEATURE TOGGLE — set to true to enable music & sound effects
// TTS (voorlees-knop) is NOT affected by this toggle.
// ══════════════════════════════════════════════════════════════
export const AUDIO_FEATURE_ENABLED = false;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
const SOUND_BASE = `${API_URL}/sounds`;

// SFX definitions — small files, pre-loaded when enabled
const SFX_NAMES = ['success', 'wrong', 'friend-found', 'door-locked', 'portal', 'victory', 'challenge-start'];

const NO_OP_VALUE = {
  musicEnabled: false,
  setMusicEnabled: () => {},
  playSound: () => {},
  playMusic: () => {},
  stopMusic: () => {},
  pauseMusic: () => {},
  resumeMusic: () => {},
};

export function AudioProvider({ children }) {
  // When feature is off, skip all Howl setup and provide no-ops
  if (!AUDIO_FEATURE_ENABLED) {
    return (
      <AudioContext.Provider value={NO_OP_VALUE}>
        {children}
      </AudioContext.Provider>
    );
  }

  const [musicEnabled, setMusicEnabledState] = useState(false);

  // Refs so Howl callbacks always see latest state
  const musicEnabledRef = useRef(musicEnabled);
  const sfxRef = useRef({}); // { name: Howl }
  const musicRef = useRef(null); // current Howl instance for background music
  const currentThemeRef = useRef(null);

  // Keep ref in sync (backup for async callbacks like onload)
  useEffect(() => {
    musicEnabledRef.current = musicEnabled;
  }, [musicEnabled]);

  // Pre-load SFX when audio gets enabled
  useEffect(() => {
    if (!musicEnabled) return;

    // Only load once
    if (Object.keys(sfxRef.current).length > 0) return;

    for (const name of SFX_NAMES) {
      sfxRef.current[name] = new Howl({
        src: [`${SOUND_BASE}/sfx/${name}.wav`],
        volume: 0.5,
        preload: true,
      });
    }
  }, [musicEnabled]);

  // Stop everything when disabled
  useEffect(() => {
    if (!musicEnabled) {
      // Fade out and stop current music
      if (musicRef.current) {
        musicRef.current.fade(musicRef.current.volume(), 0, 500);
        const ref = musicRef.current;
        setTimeout(() => { ref.stop(); ref.unload(); }, 600);
        musicRef.current = null;
        currentThemeRef.current = null;
      }
    }
  }, [musicEnabled]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (musicRef.current) {
        musicRef.current.stop();
        musicRef.current.unload();
      }
      Object.values(sfxRef.current).forEach(h => { h.stop(); h.unload(); });
    };
  }, []);

  const setMusicEnabled = useCallback((enabled) => {
    // Update ref immediately so child effects that fire before this
    // component's useEffect (React runs effects bottom-up) already
    // see the new value when they call playMusic / playSound.
    musicEnabledRef.current = enabled;
    setMusicEnabledState(enabled);
    // Persist to localStorage via user settings
    const current = getUserSettings() || {};
    saveUserSettings({ ...current, musicEnabled: enabled });
  }, []);

  const playSound = useCallback((name) => {
    if (!musicEnabledRef.current) return;
    const howl = sfxRef.current[name];
    if (howl) {
      howl.play();
    }
  }, []);

  const playMusic = useCallback((themeId) => {
    if (!musicEnabledRef.current) return;
    if (currentThemeRef.current === themeId && musicRef.current?.playing()) return;

    // Stop previous music
    if (musicRef.current) {
      musicRef.current.fade(musicRef.current.volume(), 0, 400);
      const old = musicRef.current;
      setTimeout(() => { old.stop(); old.unload(); }, 500);
    }

    // Helper: create and start a Howl for the given music URL
    const startHowl = (url) => {
      const howl = new Howl({
        src: [url],
        loop: true,
        volume: 0,
        preload: true,
        onload: () => {
          if (musicEnabledRef.current && currentThemeRef.current === themeId) {
            howl.play();
            howl.fade(0, 0.25, 1000);
          }
        },
        onloaderror: () => {
          howl.unload();
          // If this was the theme-specific file, fall back to generic music.mp3
          if (url !== `${SOUND_BASE}/music/music.mp3`) {
            console.warn(`Music not found for theme "${themeId}", falling back to music.mp3`);
            const fallback = startHowl(`${SOUND_BASE}/music/music.mp3`);
            musicRef.current = fallback;
          } else {
            console.warn('Fallback music.mp3 also not found');
          }
        },
      });
      return howl;
    };

    musicRef.current = startHowl(`${SOUND_BASE}/music/${themeId}.mp3`);
    currentThemeRef.current = themeId;
  }, []);

  const stopMusic = useCallback(() => {
    if (musicRef.current) {
      musicRef.current.fade(musicRef.current.volume(), 0, 500);
      const ref = musicRef.current;
      setTimeout(() => { ref.stop(); ref.unload(); }, 600);
      musicRef.current = null;
      currentThemeRef.current = null;
    }
  }, []);

  // Pause/resume music (for challenge modals)
  const pauseMusic = useCallback(() => {
    if (musicRef.current?.playing()) {
      musicRef.current.fade(musicRef.current.volume(), 0.05, 300);
    }
  }, []);

  const resumeMusic = useCallback(() => {
    if (musicRef.current && musicEnabledRef.current) {
      musicRef.current.fade(musicRef.current.volume(), 0.25, 300);
    }
  }, []);

  const value = {
    musicEnabled,
    setMusicEnabled,
    playSound,
    playMusic,
    stopMusic,
    pauseMusic,
    resumeMusic,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    // Return no-op fallback so components work outside provider (e.g. tests)
    return {
      musicEnabled: false,
      setMusicEnabled: () => {},
      playSound: () => {},
      playMusic: () => {},
      stopMusic: () => {},
      pauseMusic: () => {},
      resumeMusic: () => {},
    };
  }
  return ctx;
}
