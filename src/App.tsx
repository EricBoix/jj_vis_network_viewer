import { useEffect } from 'react';
import { GraphProvider } from './context/GraphContext';
import { GraphCanvas } from './components/GraphCanvas';
import { LoadRdfButton } from './components/LoadRdfButton';
import { SettingsMenu } from './components/SettingsMenu';
import { Sidebar } from './components/Sidebar';
import { useRdfStore } from './hooks/useRdfStore';
import { styles } from './styles/App.styles';
import sampleTtl from './data/sample.ttl?raw';

function AppContent() {
  const { loadRdfFromString } = useRdfStore();

  useEffect(() => {
    loadRdfFromString(sampleTtl);
  }, [loadRdfFromString]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Knowledge Graph Visualization</h1>
        <div style={styles.toolbar}>
          <LoadRdfButton />
          <SettingsMenu />
        </div>
      </header>
      <div style={styles.main}>
        <div style={styles.canvasContainer}>
          <GraphCanvas />
        </div>
        <Sidebar />
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
