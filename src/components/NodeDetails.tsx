import { colors } from '../styles/theme';
import { useGraphData } from '../context/GraphDataContext';
import { useViewSettings } from '../context/ViewSettingsContext';
import { getLocalName, uriToPrefixedName } from '../services/rdfParser';
import { config } from '../config';
import { GraphNode } from '../types/graph.types';
import { DocumentMentions } from './DocumentMentionsInfoPanel';

const NEO_ID_PREDICATE = config.rdf.neo4jIdPredicateUri;

interface Props { node: GraphNode }

export function NodeDetails({ node }: Props) {
  const { namespaces } = useGraphData();
  const { nodeLabelMode } = useViewSettings();

  const title = nodeLabelMode === 'neoId'
    ? (node.metadata[NEO_ID_PREDICATE]?.[0] ?? node.label)
    : node.label;

  return (
    <>
      <h3 style={styles.title}>Node: {title}</h3>
      {node.types.length > 0 && (
        <div style={styles.section}>
          <strong>Type:</strong>
          <span style={styles.value}>{node.types.join(', ')}</span>
        </div>
      )}
      <div style={styles.section}>
        <strong>URI:</strong>
        <p style={styles.uri} title={node.uri}>{uriToPrefixedName(node.uri, namespaces)}</p>
      </div>
      {Object.keys(node.metadata).length > 0 && (
        <div style={styles.section}>
          <strong>Properties:</strong>
          <ul style={styles.list}>
            {Object.entries(node.metadata).map(([predicateUri, values]) => (
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
      <DocumentMentions node={node} />
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
