import { filePath } from '@/stores/editor';

export function StatusBar() {
  return (
    <footer class="status-bar">
      <span class="status-bar__path" title={filePath.value ?? ''}>
        {filePath.value ?? ''}
      </span>
    </footer>
  );
}
