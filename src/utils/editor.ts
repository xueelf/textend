import { EditorSelection } from '@codemirror/state';
import { EditorView } from 'codemirror';

/**
 * 选中指定行的内容。
 *
 * @param view - EditorView
 * @param lineNumber - 行号（从 1 开始）
 */
export function setLineSelection(view: EditorView, lineNumber: number) {
  const line = view.state.doc.line(lineNumber);
  const length = lineNumber < view.state.doc.lines ? line.to + 1 : line.to;

  view.dispatch({
    selection: EditorSelection.range(line.from, length),
  });
}
