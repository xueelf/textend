import { minimalSetup, EditorView } from 'codemirror';
import { lineNumbers } from '@codemirror/view';
import { foldGutter } from '@codemirror/language';
import { useEffect, useRef } from 'preact/hooks';

import './App.css';

function selectLine(view: EditorView, line: { from: number; to: number }) {
  const lineInfo = view.state.doc.lineAt(line.from);
  const nextLineStart = lineInfo.to + 1;
  const isLastLine = lineInfo.number === view.state.doc.lines;

  view.dispatch({
    selection: {
      anchor: lineInfo.from,
      head: isLastLine ? view.state.doc.length : nextLineStart,
    },
    effects: EditorView.scrollIntoView(lineInfo.from, { y: 'center' }),
  });
  view.focus();
}

function selectLineOnMouseDown(
  view: EditorView,
  line: { from: number; to: number },
  event: Event
) {
  event.preventDefault();
  selectLine(view, line);
  return true;
}

function App() {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    const view = new EditorView({
      extensions: [
        lineNumbers({
          domEventHandlers: {
            mousedown: selectLineOnMouseDown,
          },
        }),
        foldGutter({
          domEventHandlers: {
            mousedown: selectLineOnMouseDown,
          },
        }),
        minimalSetup,
      ],
      parent: editorRef.current,
    });

    return () => view.destroy();
  }, []);

  return <div ref={editorRef} class="editor" />;
}

export default App;
