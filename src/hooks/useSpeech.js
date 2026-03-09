import { useCallback, useRef, useEffect } from 'react';

/**
 * Get the current list of voices fresh from the browser.
 * We deliberately do NOT cache, because voices can load asynchronously
 * and an early snapshot may be incomplete.
 */
function getVoices() {
  return window.speechSynthesis?.getVoices() || [];
}

function findVoice(lang) {
  const voices = getVoices();
  if (voices.length === 0) return null;

  const langLower = lang.toLowerCase();
  const prefix = langLower.substring(0, 2);

  // 1. Exact locale match (e.g. "nl-nl") — prefer non-local (premium/network) voice
  const exactRemote = voices.find(
    (v) =>
      v.lang.toLowerCase().replace('_', '-') === langLower && !v.localService,
  );
  if (exactRemote) return exactRemote;

  // 2. Exact locale match, any voice
  const exact = voices.find(
    (v) => v.lang.toLowerCase().replace('_', '-') === langLower,
  );
  if (exact) return exact;

  // 3. Name-based heuristic: on macOS "Xander" is nl_NL, "Ellen" is nl_BE
  if (prefix === 'nl') {
    const xander = voices.find((v) => v.name === 'Xander');
    if (xander) return xander;
  }

  // 4. Fallback: any voice with the same language prefix
  return (
    voices.find(
      (v) => v.lang.toLowerCase().startsWith(prefix) && !v.localService,
    ) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ||
    null
  );
}

/**
 * useSpeech — lightweight wrapper around SpeechSynthesis for TTS.
 *
 * Usage:
 *   const { speak, stop, speaking } = useSpeech();
 *   speak('hallo', 'nl-NL');
 *   speak('hello', 'en-GB');
 */
export function useSpeech() {
  const speakingRef = useRef(false);

  // Trigger an initial getVoices() so the browser starts loading them.
  // Chrome fires 'voiceschanged' asynchronously; we don't cache, so
  // we just need the event to have fired before the user taps 🔊.
  useEffect(() => {
    if (!window.speechSynthesis) return;
    getVoices(); // kick-start voice loading
  }, []);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      speakingRef.current = false;
    }
  }, []);

  const speak = useCallback((text, lang = 'nl-NL') => {
    if (!window.speechSynthesis || !text) return;

    // Cancel any ongoing speech first
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.85; // Slightly slower for children
    utterance.pitch = 1.0;

    const voice = findVoice(lang);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      speakingRef.current = true;
    };
    utterance.onend = () => {
      speakingRef.current = false;
    };
    utterance.onerror = () => {
      speakingRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  return { speak, stop, speakingRef };
}
