import { minimalSetup, EditorView } from 'codemirror';
import { useEffect, useRef } from 'preact/hooks';

import './App.css';

function App() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const view = new EditorView({
      extensions: [minimalSetup],
      parent: editorRef.current,
    });

    return () => view.destroy();
  }, []);

  return <div ref={editorRef} class="editor" />;
}

export default App;
