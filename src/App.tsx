import { useHotkeys } from '@/hooks/useHotkeys';
import { Editor } from '@/views/Editor';
import { StatusBar } from '@/views/StatusBar';

import './App.css';

function App() {
  useHotkeys('Mod-w', () => {});

  return (
    <>
      <Editor />
      <StatusBar />
    </>
  );
}

export default App;
