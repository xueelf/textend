import { LazyStore } from '@tauri-apps/plugin-store';

export interface Session {
  path: string | null;
  text: string;
}

const store = new LazyStore('session.json');

/**
 * 保存当前会话状态到磁盘。
 *
 * @param session - 会话数据
 */
export async function saveSession(session: Session): Promise<void> {
  await store.set('session', session);
  await store.save();
}

/**
 * 从磁盘加载上次会话状态。
 * 首次运行或文件不存在时返回 null。
 *
 * @returns 上次的会话数据，不存在时为 null
 */
export async function loadSession(): Promise<Session | null> {
  return (await store.get<Session>('session')) ?? null;
}

/**
 * 清空磁盘中的会话状态。
 */
export async function clearSession(): Promise<void> {
  await store.delete('session');
  await store.save();
}
