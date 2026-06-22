import { signal } from '@preact/signals';

/** 当前打开的文档路径，未打开时为 null。 */
export const filePath = signal<string | null>(null);
