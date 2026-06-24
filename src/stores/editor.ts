import { signal } from '@preact/signals';

export type LineEnding = 'LF' | 'CRLF';

export interface EditorStatus {
  path: string | null;
  line: number;
  column: number;
  encoding: string;
  lineEnding: LineEnding;
}

export const editorStatus = signal<EditorStatus>({
  path: null,
  line: 1,
  column: 1,
  encoding: 'UTF-8',
  lineEnding: 'LF',
});

/**
 * 合并更新 editorStatus。
 *
 * @param partial - 要更新的字段
 */
export function setEditorStatus(partial: Partial<EditorStatus>) {
  editorStatus.value = { ...editorStatus.value, ...partial };
}
