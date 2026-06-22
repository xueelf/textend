import { EditorSelection } from '@codemirror/state';
import { EditorView } from 'codemirror';

/**
 * 选中指定行号的整行文本。
 *
 * @param view       - CodeMirror EditorView 实例
 * @param lineNumber - 行号（从 1 开始）
 */
export function setLineSelection(view: EditorView, lineNumber: number) {
  const line = view.state.doc.line(lineNumber);
  const length = lineNumber < view.state.doc.lines ? line.to + 1 : line.to;

  view.dispatch({
    selection: EditorSelection.range(line.from, length),
  });
}

/**
 * 获取光标所在位置的行号和列号。
 *
 * @param view - CodeMirror EditorView 实例
 * @returns 行号（1-based）与列号（1-based）
 */
export function cursorPosition(view: EditorView): {
  line: number;
  column: number;
} {
  const pos = view.state.selection.main.head;
  const line = view.state.doc.lineAt(pos);

  return {
    line: line.number,
    column: pos - line.from + 1,
  };
}

/**
 * 计算文档的 UTF-8 字节大小。
 *
 * @param view - CodeMirror EditorView 实例
 * @returns 字节数
 */
export function byteSize(view: EditorView): number {
  return new TextEncoder().encode(view.state.doc.toString()).length;
}
