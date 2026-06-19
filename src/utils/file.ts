import { open, save } from '@tauri-apps/plugin-dialog';
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';

export interface FileRecord {
  path: string;
  data: string;
}

export async function openFile(): Promise<FileRecord | null> {
  const selected = await open({ multiple: false, directory: false });

  if (typeof selected !== 'string') {
    return null;
  }
  const data = await readTextFile(selected);

  return { path: selected, data };
}

export async function saveFile(path: string, data: string): Promise<void> {
  await writeTextFile(path, data);
}

export async function saveFileAs(data: string): Promise<string | null> {
  const path = await save();

  if (!path) {
    return null;
  }
  await writeTextFile(path, data);

  return path;
}
