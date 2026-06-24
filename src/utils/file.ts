import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

/** 文件路径 + 文本内容。 */
export interface FileRecord {
  path: string;
  data: string;
}

/**
 * 弹出系统文件选择器，读完返回 path + data。
 * 取消时返回 null。
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
 * 将文本写入磁盘。
 *
 * @param path - 文件路径
 * @param data - 要写入的内容
 */
export async function saveFile(path: string, data: string): Promise<void> {
  await writeTextFile(path, data);
}

/**
 * 弹出另存为对话框，写出到选定路径。
 * 取消时返回 null。
 *
 * @param data - 要写入的内容
 * @returns 选择的保存路径，取消时为 null
 */
export async function saveFileAs(data: string): Promise<string | null> {
  const path = await save();

  if (!path) {
    return null;
  }
  await writeTextFile(path, data);

  return path;
}
