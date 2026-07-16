import { useGraphData } from '../context/GraphDataContext';
import { NodeInfoPanel } from './NodeInfoPanel';
import { EdgeInfoPanel } from './EdgeInfoPanel';
import { styles } from './InfoPanel.styles';

export function InfoPanel() {
  const { selection } = useGraphData();

  return (
    <div style={styles.panel}>
      {!selection.type && (
        <p style={styles.placeholder}>Click a node or edge to view details</p>
      )}
      {selection.type === 'node' && <NodeInfoPanel />}
      {selection.type === 'edge' && <EdgeInfoPanel />}
    </div>
  );
}

