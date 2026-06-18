import { useEffect, useRef } from 'preact/hooks';

import { useEditor } from '@/hooks';

export function Editor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const { initEditor, focus } = useEditor();

  useEffect(() => {
    if (editorRef.current) {
      initEditor(editorRef.current);
      focus();
    }
  }, []);

  return <main ref={editorRef} class="editor" />;
}
