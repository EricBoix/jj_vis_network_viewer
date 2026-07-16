import { colors } from '../styles/theme';
import { useGraphData } from '../context/GraphDataContext';
import { NodeInfoPanel } from './NodeInfoPanel';
import { EdgeInfoPanel } from './EdgeInfoPanel';

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

const styles = {
  panel: {
    padding: '16px',
    height: '100%',
    overflowY: 'auto',
  },
  placeholder: {
    color: colors.textPlaceholder,
    fontStyle: 'italic',
  },
} satisfies Record<string, React.CSSProperties>;
