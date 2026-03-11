import { useEffect } from 'react';

const RULES = {
  sudoku: {
    emoji: '🔢',
    title: 'Sudoku',
    intro: 'Vul het raster met getallen zodat elk getal precies één keer voorkomt in elke rij, kolom en blok.',
    rules: [
      { icon: '➡️', text: 'Elk getal mag maar één keer per rij voorkomen.' },
      { icon: '⬇️', text: 'Elk getal mag maar één keer per kolom voorkomen.' },
      { icon: '🔲', text: 'Elk getal mag maar één keer per dik omlijnd blok voorkomen.' },
      { icon: '🔒', text: 'Grijze getallen staan vast en kun je niet veranderen.' },
    ],
    tips: [
      'Begin bij rijen of kolommen waar al veel getallen staan.',
      'Gebruik Hint als je er niet uitkomt!',
    ],
  },
  tectonic: {
    emoji: '🧱',
    title: 'Tectonic',
    intro: 'Vul elk gebied met de getallen 1 tot en met het aantal vakjes in dat gebied.',
    rules: [
      { icon: '🔲', text: 'Elk gekleurd gebied bevat de getallen 1 t/m het aantal vakjes in dat gebied.' },
      { icon: '🚫', text: 'Buren mogen NIET hetzelfde getal hebben — ook niet schuin!' },
      { icon: '🔒', text: 'Grijze getallen staan vast en kun je niet veranderen.' },
    ],
    tips: [
      'Begin met gebiedjes van 1 vakje — die zijn altijd 1.',
      'Kijk goed naar de buren (ook schuin!) om getallen uit te sluiten.',
    ],
  },
  binary: {
    emoji: '0️⃣',
    title: 'Binaire puzzel',
    intro: 'Vul het raster met nullen (0) en enen (1). Tik op een vakje om te wisselen.',
    rules: [
      { icon: '3️⃣', text: 'Er mogen nooit 3 dezelfde cijfers naast elkaar of onder elkaar staan.' },
      { icon: '⚖️', text: 'Elke rij en kolom heeft evenveel nullen als enen.' },
      { icon: '🔒', text: 'Grijze getallen staan vast en kun je niet veranderen.' },
    ],
    tips: [
      'Als er al twee dezelfde naast elkaar staan, moet het volgende vakje het andere cijfer zijn.',
      'Tel hoeveel nullen en enen er al in een rij staan.',
    ],
  },
  chess: {
    emoji: '♟️',
    title: 'Schaken',
    intro: 'Vind de juiste zet(ten) om de koning schaakmat te zetten!',
    rules: [
      { icon: '👆', text: 'Tik op een stuk om het te selecteren. Groene bolletjes tonen waar het heen kan.' },
      { icon: '♔', text: 'Zet de vijandige koning schaakmat — hij mag nergens heen kunnen.' },
      { icon: '🤖', text: 'Bij mat in 2 of 3: de tegenstander speelt automatisch terug.' },
      { icon: '✖', text: 'Er is maar één juiste oplossing. Bij een foute zet kun je opnieuw proberen.' },
    ],
    tips: [
      'Kijk welke stukken de vijandige koning al insluiten.',
      'Gebruik Hint om te zien welk stuk je moet bewegen.',
    ],
  },
};

function PuzzleRulesCard({ puzzleType, onClose, theme }) {
  const data = RULES[puzzleType];

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!data) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className={`${theme?.colors?.primary || 'bg-indigo-600'} px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{data.emoji}</span>
            <h2 className="text-lg sm:text-xl font-bold text-white">Zo werkt {data.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-2xl text-white/80 hover:text-white transition-colors"
            aria-label="Sluiten"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-4">
          <p className="text-sm sm:text-base text-gray-700">{data.intro}</p>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">Regels</h3>
            {data.rules.map((rule, i) => (
              <div key={i} className="flex items-start gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
                <span className="text-lg flex-shrink-0">{rule.icon}</span>
                <p className="text-xs sm:text-sm text-gray-700">{rule.text}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="font-bold text-gray-800 text-sm sm:text-base">💡 Tips</h3>
            {data.tips.map((tip, i) => (
              <p key={i} className="text-xs sm:text-sm text-indigo-700 bg-indigo-50 rounded-xl px-3 py-2 border border-indigo-100">
                {tip}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PuzzleRulesCard;
