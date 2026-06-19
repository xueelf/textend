import { foldGutter } from '@codemirror/language';
import { BlockInfo, EditorView, lineNumbers } from '@codemirror/view';

import { selectLineAt } from '@/utils/editor';

function selectLineOnMouseDown(
  view: EditorView,
  block: BlockInfo,
  event: Event,
) {
  const line = view.state.doc.lineAt(block.from);

  event.preventDefault();
  selectLineAt(view, line.number);
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
