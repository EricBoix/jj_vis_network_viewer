import { colors } from '../styles/theme';
import { useGraphData } from '../context/GraphDataContext';
import { uriToPrefixedName } from '../services/rdfParser';

export function EdgeInfoPanel() {
  const { selectedEdge, namespaces } = useGraphData();

  if (!selectedEdge) return null;

  return (
    <>
      <h3 style={styles.title}>Edge: {selectedEdge.label}</h3>
      <div style={styles.section}>
        <strong>Predicate URI:</strong>
        <p style={styles.uri} title={selectedEdge.predicateUri}>{uriToPrefixedName(selectedEdge.predicateUri, namespaces)}</p>
      </div>
      <div style={styles.section}>
        <strong>From:</strong>
        <p style={styles.uri} title={selectedEdge.from}>{uriToPrefixedName(selectedEdge.from, namespaces)}</p>
      </div>
      <div style={styles.section}>
        <strong>To:</strong>
        <p style={styles.uri} title={selectedEdge.to}>{uriToPrefixedName(selectedEdge.to, namespaces)}</p>
      </div>
    </>
  );
}

const styles = {
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
} satisfies Record<string, React.CSSProperties>;
