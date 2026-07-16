import { colors } from '../styles/theme';
import { useGraphData } from '../context/GraphDataContext';
import { getLocalName } from '../services/rdfParser';

export function InfoPanel() {
  const { selection, selectedNode, selectedEdge } = useGraphData();

  if (!selection.type) {
    return (
      <div style={styles.panel}>
        <p style={styles.placeholder}>Click a node or edge to view details</p>
      </div>
    );
  }

  if (selection.type === 'node') {
    if (!selectedNode) return null;
    return (
      <div style={styles.panel}>
        <h3 style={styles.title}>Node: {selectedNode.label}</h3>
        {selectedNode.types.length > 0 && (
          <div style={styles.section}>
            <strong>Type:</strong>
            <span style={styles.value}>{selectedNode.types.join(', ')}</span>
          </div>
        )}
        <div style={styles.section}>
          <strong>URI:</strong>
          <p style={styles.uri}>{selectedNode.uri}</p>
        </div>
        {Object.keys(selectedNode.metadata).length > 0 && (
          <div style={styles.section}>
            <strong>Properties:</strong>
            <ul style={styles.list}>
              {Object.entries(selectedNode.metadata).map(([predicateUri, values]) => (
                <li key={predicateUri}>
                  <span style={styles.key}>{getLocalName(predicateUri)}:</span>
                  <span style={styles.value}>{values.join(', ')}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  if (selection.type === 'edge') {
    if (!selectedEdge) return null;
    return (
      <div style={styles.panel}>
        <h3 style={styles.title}>Edge: {selectedEdge.label}</h3>
        <div style={styles.section}>
          <strong>Predicate URI:</strong>
          <p style={styles.uri}>{selectedEdge.predicateUri}</p>
        </div>
        <div style={styles.section}>
          <strong>From:</strong>
          <p style={styles.uri}>{selectedEdge.from}</p>
        </div>
        <div style={styles.section}>
          <strong>To:</strong>
          <p style={styles.uri}>{selectedEdge.to}</p>
        </div>
      </div>
    );
  }

  return null;
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
  title: {
    margin: '0 0 16px 0',
    fontSize: '18px',
    borderBottom: '1px solid #eee',
    paddingBottom: '8px',
  },
  section: {
    marginBottom: '12px',
  },
  uri: {
    fontSize: '12px',
    wordBreak: 'break-all',
    color: colors.textMuted,
    margin: '4px 0',
  },
  list: {
    margin: '8px 0',
    paddingLeft: '20px',
  },
  value: {
    display: 'block',
    wordBreak: 'break-all',
    overflowWrap: 'break-word',
  },
  key: {
    fontWeight: 'bold',
    color: colors.textKey,
  },
} satisfies Record<string, React.CSSProperties>;
