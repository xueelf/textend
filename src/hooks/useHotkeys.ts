/** 快捷键回调类型。 */
type Handler = (event: KeyboardEvent) => void;

const registry = new Map<string, Handler>();

// 把用户输入的快捷键字符串规范化为 Mod-Key 格式，支持 cmd-w / Meta-W 等写法。
function normalize(raw: string): string {
  const parts = raw.split('-');
  const key = parts.pop() ?? '';
  const mods = new Set(parts.map(part => part.toLowerCase()));
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

// 从 KeyboardEvent 提取标准化的快捷键字符串。
function fromEvent(event: KeyboardEvent): string | null {
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

/**
 * 注册全局快捷键。
 *
 * 格式：`Mod-Key`。Mod 在 macOS 映射到 Cmd，Windows/Linux 映射到 Ctrl。
 * 单字母键小写，命名键（Escape、Enter 等）保持原样。
 * 示例：`Mod-w`、`Mod-Shift-s`。
 *
 * @param hotkeys - 快捷键字符串，格式为 `Mod-Key`
 * @param callback - 触发时的回调，接收原始 KeyboardEvent
 */
export function useHotkeys(hotkeys: string, callback: Handler) {
  registry.set(normalize(hotkeys), callback);
}

/**
 * 将键盘事件派发给已注册的快捷键处理器。
 * 由 HotkeysProvider 调用。
 *
 * @param event - KeyboardEvent
 */
export function dispatch(event: KeyboardEvent) {
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
