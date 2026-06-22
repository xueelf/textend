import { useEffect, useRef } from 'preact/hooks';

import { useEditor } from '@/hooks';
import { useHotkeys } from '@/hooks/useHotkeys';
import { filePath } from '@/stores/editor';
import { openFile, saveFile, saveFileAs } from '@/utils/file';

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const { initEditor, focus, setText, getText } = useEditor();

  useHotkeys('Mod-o', async () => {
    const result = await openFile();

    if (!result) {
      return;
    }
    filePath.value = result.path;

    setText(result.data);
  });

  useHotkeys('Mod-s', async () => {
    const data = getText();
    const path = filePath.value;

    if (path) {
      await saveFile(path, data);
    } else {
      const newPath = await saveFileAs(data);

      if (newPath) {
        filePath.value = newPath;
      }
    }
  });

  useEffect(() => {
    if (editorRef.current) {
      initEditor(editorRef.current);
      focus();
    }
  }, []);

  return <main ref={editorRef} class="editor" />;
}
