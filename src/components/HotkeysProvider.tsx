import { type ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';

import { dispatch } from '@/hooks/useHotkeys';

export function HotkeysProvider({ children }: { children: ComponentChildren }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => dispatch(event);

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return <>{children}</>;
}
