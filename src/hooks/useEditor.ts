import { EditorView, minimalSetup } from 'codemirror';
import { useRef } from 'preact/hooks';

import { gutter } from '@/extensions/gutter';
import { selectLineAt as selectLineAtUtil } from '@/utils/editor';

export function useEditor() {
  const viewRef = useRef<EditorView | null>(null);

  function initEditor(container: HTMLDivElement) {
    viewRef.current = new EditorView({
      extensions: [gutter, minimalSetup],
      parent: container,
    });
  }

  function getView(): EditorView {
    const view = viewRef.current;

    if (!view) {
      throw new Error('Editor not initialized');
    }
    return view;
  }

  function selectLineAt(lineNumber: number) {
    selectLineAtUtil(getView(), lineNumber);
  }

  function focus() {
    getView().focus();
  }

  function setText(text: string) {
    const view = getView();

    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: text },
    });
  }

  return {
    initEditor,
    selectLineAt,
    focus,
    setText,
  };
}
