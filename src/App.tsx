import { useEffect, useRef, useState } from 'react';
import { GraphProvider } from './context/GraphContext';
import { GraphCanvas } from './components/GraphCanvas';
import { LoadRdfButton } from './components/LoadRdfButton';
import { PhysicsToggle } from './components/PhysicsToggle';
import { SettingsMenu } from './components/SettingsMenu';
import { Sidebar } from './components/Sidebar';
import { ResizeHandle } from './components/ResizeHandle';
import { useRdfStore } from './hooks/useRdfStore';
import { styles } from './styles/App.styles';
import sampleTtl from './data/sample.ttl?raw';

const SIDEBAR_MIN = 150;
const SIDEBAR_MAX = 700;
const SIDEBAR_DEFAULT = 300;

function AppContent() {
  const { loadRdfFromString } = useRdfStore();
  const [sidebarWidth, setSidebarWidth] = useState(SIDEBAR_DEFAULT);
  const sidebarWidthRef = useRef(sidebarWidth);

  useEffect(() => {
    loadRdfFromString(sampleTtl);
  }, [loadRdfFromString]);

  function onHandleMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = sidebarWidthRef.current;

    function onMouseMove(ev: MouseEvent) {
      const newWidth = Math.max(SIDEBAR_MIN, Math.min(SIDEBAR_MAX, startWidth + startX - ev.clientX));
      sidebarWidthRef.current = newWidth;
      setSidebarWidth(newWidth);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Knowledge Graph Visualization</h1>
        <div style={styles.toolbar}>
          <LoadRdfButton />
          <PhysicsToggle />
          <SettingsMenu />
        </div>
      </header>
      <div style={styles.main}>
        <div style={styles.canvasContainer}>
          <GraphCanvas />
        </div>
        <ResizeHandle onMouseDown={onHandleMouseDown} />
        <Sidebar width={sidebarWidth} />
      </div>
    </div>
  );
}

function App() {
  return (
    <GraphProvider>
      <AppContent />
    </GraphProvider>
  );
}

export default App;
