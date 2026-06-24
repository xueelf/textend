import { foldGutter } from '@codemirror/language';
import { BlockInfo, EditorView, lineNumbers } from '@codemirror/view';

import { setLineSelection } from '@/utils/editor';

// gutter 区域 mousedown 事件处理，阻止默认行为并选中整行。
function selectLineOnMouseDown(
  view: EditorView,
  block: BlockInfo,
  event: Event,
) {
  const line = view.state.doc.lineAt(block.from);

  event.preventDefault();
  setLineSelection(view, line.number);
  return true;
}

/** 行号 + 代码折叠区域。 */
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
