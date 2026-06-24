import { EditorView } from 'codemirror';

import { editorStatus } from '@/stores/editor';
import { saveSession } from '@/utils/session';

/** 文档变更监听器，每次内容变化时自动保存会话状态。 */
export const session = EditorView.updateListener.of(async update => {
  if (update.docChanged) {
    await saveSession({
      path: editorStatus.value.path,
      text: update.state.doc.toString(),
    });
  }
});
