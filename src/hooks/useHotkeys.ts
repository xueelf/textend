/** 快捷键回调函数类型。 */
type Handler = (event: KeyboardEvent) => void;

const registry = new Map<string, Handler>();

// 将原始输入标准化为 "Mod-Key" 格式，支持 `cmd-w`、`Meta-W` 等写法。
function normalize(raw: string): string {
  const parts = raw.split('-');
  const key = parts.pop() ?? '';
  const mods = new Set(parts.map(p => p.toLowerCase()));
  const ordered: string[] = [];

  if (mods.has('mod') || mods.has('cmd') || mods.has('meta')) { ordered.push('Mod'); }
  if (mods.has('alt')) { ordered.push('Alt'); }
  if (mods.has('shift')) { ordered.push('Shift'); }

  ordered.push(key.length === 1 ? key.toLowerCase() : key);
  return ordered.join('-');
}

// 从 KeyboardEvent 提取标准格式快捷键字符串。
function fromEvent(event: KeyboardEvent): string | null {
  const { key, ctrlKey, altKey, metaKey, shiftKey } = event;

  if (!key || key === 'Unidentified') { return null; }
  if (key === 'Control' || key === 'Alt' || key === 'Shift' || key === 'Meta') { return null; }

  const mods: string[] = [];
  if (metaKey || ctrlKey) { mods.push('Mod'); }
  if (altKey) { mods.push('Alt'); }
  if (shiftKey) { mods.push('Shift'); }

  mods.push(key.length === 1 ? key.toLowerCase() : key);
  return mods.join('-');
}

/**
 * 注册一个全局快捷键。
 *
 * 快捷键格式为 `Mod-Key`（Mod 在 macOS 为 ⌘、Windows/Linux 为 Ctrl），
 * 单字母键小写，命名键（如 Enter）保持原样。
 * 示例：`Mod-w`、`Mod-Shift-s`。
 *
 * @param hotkeys - 快捷键字符串，格式 `Mod-Key`
 * @param callback - 触发时调用的回调函数，接收原始 KeyboardEvent
 */
export function useHotkeys(hotkeys: string, callback: Handler) {
  registry.set(normalize(hotkeys), callback);
}

/**
 * 将键盘事件分发到已注册的快捷键处理器。
 * 由 HotkeysProvider 内部调用，应用代码一般不需要直接使用。
 *
 * @param event - 浏览器 KeyboardEvent
 */
export function dispatch(event: KeyboardEvent) {
  const key = fromEvent(event);
  if (!key) { return; }

  const handler = registry.get(key);
  if (handler) {
    event.preventDefault();
    handler(event);
  }
}
