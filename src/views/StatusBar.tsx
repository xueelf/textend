import { computed } from '@preact/signals';

import { editorStatus } from '@/stores/editor';

const cursorText = computed(
  () => `Ln ${editorStatus.value.line}, Col ${editorStatus.value.column}`,
);

export function StatusBar() {
  const { path, encoding, lineEnding } = editorStatus.value;

  return (
    <footer class="status-bar">
      {path && <span class="status-bar__path">{path}</span>}
      <span class="status-bar__spacer" />
      <span class="status-bar__item">{cursorText}</span>
      <span class="status-bar__item">{lineEnding}</span>
      <span class="status-bar__item">{encoding}</span>
    </footer>
  );
}
