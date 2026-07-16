import { colors } from '../styles/theme';
import { useGraphData } from '../context/GraphDataContext';
import { useViewSettings } from '../context/ViewSettingsContext';
import { getLocalName, uriToPrefixedName } from '../services/rdfParser';
import { config } from '../config';
import { DocumentMentions } from './DocumentMentionsInfoPanel';

const NEO_ID_PREDICATE = config.rdf.neo4jIdPredicateUri;

export function NodeInfoPanel() {
  const { selectedNode, namespaces } = useGraphData();
  const { nodeLabelMode } = useViewSettings();

  if (!selectedNode) return null;

  const title = nodeLabelMode === 'neoId'
    ? (selectedNode.metadata[NEO_ID_PREDICATE]?.[0] ?? selectedNode.label)
    : selectedNode.label;

  return (
    <>
      <h3 style={styles.title}>Node: {title}</h3>
      {selectedNode.types.length > 0 && (
        <div style={styles.section}>
          <strong>Type:</strong>
          <span style={styles.value}>{selectedNode.types.join(', ')}</span>
        </div>
      )}
      <div style={styles.section}>
        <strong>URI:</strong>
        <p style={styles.uri} title={selectedNode.uri}>{uriToPrefixedName(selectedNode.uri, namespaces)}</p>
      </div>
      {Object.keys(selectedNode.metadata).length > 0 && (
        <div style={styles.section}>
          <strong>Properties:</strong>
          <ul style={styles.list}>
            {Object.entries(selectedNode.metadata).map(([predicateUri, values]) => (
              <li key={predicateUri}>
                <span style={styles.key}>{getLocalName(predicateUri)}:</span>
                <span style={styles.value}>
                  {values.map(v => uriToPrefixedName(v, namespaces)).join(', ')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <DocumentMentions />
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
