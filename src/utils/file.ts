import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

/** 打开文件的结果，绝对路径与已读取的文本内容。 */
export interface FileRecord {
  path: string;
  data: string;
}

/**
 * 弹出原生打开文件对话框，读取内容后返回 FileRecord。
 * 用户取消对话框时返回 null。
 *
 * @returns 文件路径与内容，取消时为 null
 */
export async function openFile(): Promise<FileRecord | null> {
  const selected = await open({ multiple: false, directory: false });

  if (typeof selected !== 'string') {
    return null;
  }
  const data = await readTextFile(selected);

  return { path: selected, data };
}

/**
 * 将文本写入指定路径的磁盘文件。
 *
 * @param path - 文件绝对路径
 * @param data - 要写入的文本内容
 */
export async function saveFile(path: string, data: string): Promise<void> {
  await writeTextFile(path, data);
}

/**
 * 弹出原生另存为对话框，写入文本后返回用户选择的路径。
 * 用户取消对话框时返回 null。
 *
 * @param data - 要写入的文本内容
 * @returns 用户选择的保存路径，取消时为 null
 */
export async function saveFileAs(data: string): Promise<string | null> {
  const path = await save();

  if (!path) {
    return null;
  }
  await writeTextFile(path, data);

  return path;
}
