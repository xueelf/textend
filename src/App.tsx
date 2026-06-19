import { useSignal } from '@preact/signals';

import { useEditor } from '@/hooks';
import { useHotkeys } from '@/hooks/useHotkeys';
import { openFile, saveFile, saveFileAs } from '@/utils/file';
import { Editor } from '@/views/Editor';

import './App.css';

function App() {
  const { setText, getText } = useEditor();
  const filePath = useSignal<string | null>(null);

  useHotkeys('Mod-w', () => {});

  useHotkeys('Mod-o', async () => {
    const result = await openFile();

    if (!result) {
      return;
    }
    filePath.value = result.path;
    setText(result.data);
  });

  useHotkeys('Mod-s', async () => {
    const data = getText();
    const path = filePath.value;

    if (path) {
      await saveFile(path, data);
    } else {
      const newPath = await saveFileAs(data);

      if (newPath) {
        filePath.value = newPath;
      }
    }
  });

  return (
    <>
      <Editor />
    </>
  );
}

export default App;
