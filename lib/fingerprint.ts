// Custom fingerprinting utility
export async function generateMachineId(): Promise<string> {
  if (typeof window === 'undefined') {
    return 'server-side';
  }

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    navigator.hardwareConcurrency,
    (navigator as any).deviceMemory || 'unknown',
    navigator.platform,
    navigator.cookieEnabled ? 'cookies-on' : 'cookies-off',
    navigator.doNotTrack || 'unknown',
    window.innerWidth + 'x' + window.innerHeight,
  ];

  // Add canvas fingerprint
  try {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Machine fingerprint', 2, 2);
      components.push(canvas.toDataURL());
    }
  } catch (e) {
    components.push('canvas-error');
  }

  // Create hash from components
  const combined = components.join('|');
  const encoder = new TextEncoder();
  const data = encoder.encode(combined);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex.substring(0, 16); // Return first 16 characters for shorter ID
}

export function getStoredMachineId(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('machineId');
}

export function storeMachineId(id: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('machineId', id);
}

export async function getOrCreateMachineId(): Promise<string> {
  const stored = getStoredMachineId();
  if (stored) return stored;
  
  const newId = await generateMachineId();
  storeMachineId(newId);
  return newId;
} 