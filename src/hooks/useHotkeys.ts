type Handler = (event: KeyboardEvent) => void;

const registry = new Map<string, Handler>();

function normalize(raw: string): string {
  const parts = raw.split('-');
  const key = parts.pop() ?? '';
  const mods = new Set(parts.map(p => p.toLowerCase()));
  const ordered: string[] = [];

  if (mods.has('mod') || mods.has('cmd') || mods.has('meta')) {
    ordered.push('Mod');
  }
  if (mods.has('alt')) {
    ordered.push('Alt');
  }
  if (mods.has('shift')) {
    ordered.push('Shift');
  }
  ordered.push(key.length === 1 ? key.toLowerCase() : key);
  return ordered.join('-');
}

export function fromEvent(event: KeyboardEvent): string | null {
  const { key, ctrlKey, altKey, metaKey, shiftKey } = event;

  if (!key || key === 'Unidentified') {
    return null;
  }
  if (key === 'Control' || key === 'Alt' || key === 'Shift' || key === 'Meta') {
    return null;
  }
  const mods: string[] = [];

  if (metaKey || ctrlKey) {
    mods.push('Mod');
  }
  if (altKey) {
    mods.push('Alt');
  }
  if (shiftKey) {
    mods.push('Shift');
  }
  mods.push(key.length === 1 ? key.toLowerCase() : key);
  return mods.join('-');
}

export function useHotkeys(hotkeys: string, callback: Handler) {
  registry.set(normalize(hotkeys), callback);
}

export function dispatchHotkey(event: KeyboardEvent) {
  const key = fromEvent(event);

  if (!key) {
    return;
  }
  const handler = registry.get(key);

  if (handler) {
    event.preventDefault();
    handler(event);
  }
}
