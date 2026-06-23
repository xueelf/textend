import { EditorView, minimalSetup } from 'codemirror';
import { useRef } from 'preact/hooks';

import { gutter } from '@/extensions/gutter';
import { status } from '@/extensions/status';
import { setLineSelection } from '@/utils/editor';

/**
 * CodeMirror 编辑器操作 hook。
 *
 * @returns 编辑器操作函数集合
 */
export function useEditor() {
  const viewRef = useRef<EditorView | null>(null);

  /**
   * 在指定 DOM 容器中初始化 CodeMirror 编辑器。
   *
   * @param container - 用于挂载编辑器的 DOM 元素
   */
  function initEditor(container: HTMLDivElement) {
    viewRef.current = new EditorView({
      extensions: [gutter, minimalSetup, status],
      parent: container,
    });
  }

  // 获取 EditorView 实例，未初始化时抛出错误。
  function getView(): EditorView {
    const view = viewRef.current;

    if (!view) {
      throw new Error('Editor not initialized');
    }
    return view;
  }

  /**
   * 选中指定行号的整行文本。
   *
   * @param lineNumber - 行号（从 1 开始）
   */
  function selectLineAt(lineNumber: number) {
    setLineSelection(getView(), lineNumber);
  }

  /** 将焦点设置到编辑器。 */
  function focus() {
    getView().focus();
  }

  /**
   * 替换编辑器中的全部文档内容。
   *
   * @param text - 新文档内容
   */
  function setText(text: string) {
    const view = getView();

    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: text },
    });
  }

  /**
   * 获取编辑器中的全部文档内容。
   *
   * @returns 编辑器当前文本
   */
  function getText(): string {
    return getView().state.doc.toString();
  }

  return {
    initEditor,
    selectLineAt,
    focus,
    setText,
    getText,
  };
}
