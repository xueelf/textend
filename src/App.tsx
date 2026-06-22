import { useHotkeys } from '@/hooks/useHotkeys';
import { Editor } from '@/views/Editor';

import './App.css';

function App() {
  useHotkeys('Mod-w', () => {});

  return (
    <>
      <Editor />
    </>
  );
}

export default App;
