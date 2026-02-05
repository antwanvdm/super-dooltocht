const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Valideer code bij de server en laad voortgang
 */
export async function validateCodeWithServer(code) {
  if (!Array.isArray(code) || code.length !== 3) {
    throw new Error('Code moet een array van 3 elementen zijn');
  }

  const response = await fetch(`${API_URL}/api/players/validate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!response.ok) {
    throw new Error('Code validation failed');
  }

  return response.json();
}

/**
 * Maak nieuw avontuur en genereer code
 */
export async function createNewAdventure() {
  const response = await fetch(`${API_URL}/api/players`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    console.log(response);
    throw new Error('Failed to create adventure');
  }

  return response.json();
}

/**
 * Sync progress naar server
 */
export async function syncProgressToServer(codeKey, progress) {
  if (!codeKey || typeof codeKey !== 'string') {
    throw new Error('Invalid code key');
  }

  if (!progress || typeof progress !== 'object') {
    throw new Error('Invalid progress object');
  }

  const response = await fetch(
    `${API_URL}/api/players/${encodeURIComponent(codeKey)}/progress`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to sync progress');
  }

  return response.json();
}

/**
 * Helper: maak codeKey van code array
 */
export function makeCodeKey(codeArray) {
  if (!Array.isArray(codeArray) || codeArray.length !== 3) {
    return null;
  }
  return codeArray.join('-');
}
