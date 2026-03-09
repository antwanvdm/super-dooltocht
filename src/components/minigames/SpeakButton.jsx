import { useState, useEffect } from 'react';
import { useSpeech } from '../../hooks/useSpeech';

/**
 * SpeakButton — small 🔊 button that reads text aloud via SpeechSynthesis.
 * Shows ⏹ while speaking so the child can stop it.
 * Automatically stops speech when the component unmounts (e.g. modal closes).
 *
 * Props:
 *   text  — the string to read aloud
 *   lang  — BCP-47 language tag ('nl-NL' or 'en-GB')
 *   className — optional extra classes
 */
function SpeakButton({ text, lang = 'nl-NL', className = '' }) {
  const { speak, stop, speakingRef } = useSpeech();
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speech when component unmounts (e.g. challenge modal closes)
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleClick = () => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      // Use the speak() from useSpeech which has proper voice selection
      // But we need onend/onstart for local state, so we hook into speechSynthesis
      // events after speak() sets everything up.
      stop(); // cancel any previous
      setIsSpeaking(true);

      // We can't easily hook into the utterance events from speak(),
      // so we directly create the utterance but reuse findVoice via speak's logic.
      // Instead: call speak() and poll speakingRef for end.
      speak(text, lang);

      // Watch for speech end via polling (simple & reliable across browsers)
      const check = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsSpeaking(false);
          clearInterval(check);
        }
      }, 200);

      // Safety: clear interval after 30 seconds max
      setTimeout(() => clearInterval(check), 30000);
    }
  };

  if (!window.speechSynthesis) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all
        ${isSpeaking
          ? 'bg-red-100 hover:bg-red-200 text-red-600 ring-2 ring-red-300 animate-pulse'
          : 'bg-blue-100 hover:bg-blue-200 text-blue-600'}
        ${className}`}
      aria-label={isSpeaking ? 'Stop voorlezen' : 'Lees voor'}
      title={isSpeaking ? 'Stop' : 'Lees voor'}
    >
      <span className="text-lg sm:text-xl">{isSpeaking ? '⏹' : '🔊'}</span>
    </button>
  );
}

export default SpeakButton;
