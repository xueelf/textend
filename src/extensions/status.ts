import { EditorView } from 'codemirror';

import { type EditorStatus, setEditorStatus } from '@/stores/editor';

// 从 EditorView 读取光标位置和编码。
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

/** 光标位置与文档信息监听器，在编辑器状态变化时更新 status signal。 */
export const status = EditorView.updateListener.of(update => {
  setEditorStatus(readStatus(update.view));
});
