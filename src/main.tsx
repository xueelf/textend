import { render } from 'preact';

import App from '@/App';
import { HotkeysProvider } from '@/components/HotkeysProvider';

render(
  <HotkeysProvider>
    <App />
  </HotkeysProvider>,
  document.getElementById('app')!,
);
