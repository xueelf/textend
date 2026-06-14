import { foldGutter } from '@codemirror/language';
import { EditorView, lineNumbers } from '@codemirror/view';

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
  event: Event,
) {
  event.preventDefault();
  selectLine(view, line);
  return true;
}

export const gutter = [
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
];
