import { foldGutter } from '@codemirror/language';
import { BlockInfo, EditorView, lineNumbers } from '@codemirror/view';

import { setLineSelection } from '@/utils/editor';

// 行号区域 mousedown 事件处理，阻止默认行为并选中整行。
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

/** 行号与代码折叠的 CodeMirror 扩展配置。 */
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
