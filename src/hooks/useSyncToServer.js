import { useCallback } from 'react';
import { getPlayerCode } from '../utils/localStorage';
import { syncProgressToServer, makeCodeKey } from '../utils/serverSync';
import { getAllGameData } from '../utils/localStorage';

/**
 * Hook voor server sync van voortgang
 * Automatisch opruimen bij challenge/friend events
 */
export function useSyncToServer() {
  const syncProgress = useCallback(async () => {
    try {
      const code = getPlayerCode();
      if (!code || !Array.isArray(code)) {
        console.warn('No player code found, skipping sync');
        return;
      }

      const codeKey = makeCodeKey(code);
      if (!codeKey) {
        console.warn('Could not create code key, skipping sync');
        return;
      }

      const progress = getAllGameData();
      await syncProgressToServer(codeKey, progress);

      console.log('✓ Progress synced to server');
    } catch (error) {
      console.error('Sync error (non-fatal):', error);
      // Niet fataal - offline mode of server down
    }
  }, []);

  return { syncProgress };
}
