import { EditorView } from 'codemirror';

import { type EditorStatus, editorStatus } from '@/stores/editor';

function readStatus(view: EditorView): Omit<EditorStatus, 'path'> {
  const position = view.state.selection.main.head;
  const line = view.state.doc.lineAt(position);
  const text = view.state.doc.toString();

  return {
    line: line.number,
    column: position - line.from + 1,
    encoding: 'UTF-8',
    lineEnding: text.includes('\r\n') ? 'CRLF' : 'LF',
  };
}

export const status = EditorView.updateListener.of(update => {
  editorStatus.value = { ...editorStatus.value, ...readStatus(update.view) };
});
