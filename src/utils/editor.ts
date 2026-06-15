import { EditorSelection } from '@codemirror/state';
import { EditorView } from 'codemirror';

export function selectLineAt(view: EditorView, lineNumber: number) {
  const line = view.state.doc.line(lineNumber);
  const length = lineNumber < view.state.doc.lines ? line.to + 1 : line.to;

  view.dispatch({
    selection: EditorSelection.range(line.from, length),
    // effects: EditorView.scrollIntoView(line.from, { y: 'center' }),
  });
  // view.focus();
}
