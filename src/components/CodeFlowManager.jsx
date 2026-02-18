import { useState } from 'react';
import CodeInputModal from './CodeInputModal';
import CodeDisplayModal from './CodeDisplayModal';
import { 
  getPlayerCode, 
  setPlayerCode, 
  restoreAllGameData,
  clearAllData,
  clearGameState,
} from '../utils/localStorage';
import { createNewAdventure } from '../utils/serverSync';

export default function CodeFlowManager({ onReady }) {
  const [codeModalOpen, setCodeModalOpen] = useState(true);
  const [displayCodeModalOpen, setDisplayCodeModalOpen] = useState(false);
  const [newCode, setNewCode] = useState(null);
  const [error, setError] = useState('');

  const handleCodeValidated = async (validationData) => {
    try {
      const { code, progress } = validationData;
      
      // Opslaan code + progress in localStorage
      setPlayerCode(code);
      restoreAllGameData(progress);

      // Sluit code modal en ga door - Home.jsx handelt resume modal af
      setCodeModalOpen(false);
      onReady();
    } catch (err) {
      console.error('Error validating code:', err);
      setError('Oeps! Er ging iets mis bij het laden van je voortgang. Probeer het opnieuw.');
    }
  };

  const handleNewAdventure = async () => {
    setError('');
    
    try {
      // Genereer nieuwe code
      const { code } = await createNewAdventure();
      
      // Clear alle andere game data EERST (schone start)
      clearAllData();
      clearGameState();
      
      // Sla code op NA het wissen (clearAllData wist ook de code!)
      setPlayerCode(code);
      
      // Toon code display modal
      setCodeModalOpen(false);
      setNewCode(code);
      setDisplayCodeModalOpen(true);
    } catch (err) {
      console.error('Error creating adventure:', err);
      setError('De server slaapt even 😴 Probeer het zo nog eens!');
    }
  };

  const handleCodeDisplayConfirmed = () => {
    setDisplayCodeModalOpen(false);
    setNewCode(null);
    onReady();
  };

  return (
    <>
      <CodeInputModal 
        isOpen={codeModalOpen}
        onCodeValidated={handleCodeValidated}
        onNewAdventure={handleNewAdventure}
        prefillCode={getPlayerCode()}
        serverError={error}
      />
      
      <CodeDisplayModal 
        isOpen={displayCodeModalOpen}
        code={newCode}
        onConfirm={handleCodeDisplayConfirmed}
      />
    </>
  );
}
