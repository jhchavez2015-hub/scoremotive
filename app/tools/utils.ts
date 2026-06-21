// FIX #1 (original): protege contra fallos de localStorage (Safari privado,
// storage lleno, políticas de empresa, etc.) en vez de llamar setItem directo.
export function safeLocalStorageSet(key: string, value: string) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch (err) {
    console.warn(`No se pudo guardar "${key}" en localStorage:`, err);
  }
}