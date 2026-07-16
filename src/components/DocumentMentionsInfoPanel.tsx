import { useMemo, useState, useEffect, Fragment } from 'react';
import { colors } from '../styles/theme';
import { useGraphData } from '../context/GraphDataContext';
import { useViewSettings } from '../context/ViewSettingsContext';
import { getLocalName, uriToPrefixedName } from '../services/rdfParser';
import { config } from '../config';
import { GraphNode } from '../types/graph.types';

const NEO_ID_PREDICATE = config.rdf.neo4jIdPredicateUri;
const DOCUMENT_TYPE = 'Document';

function findMeta(metadata: Record<string, string[]>, localName: string): string | undefined {
  const key = Object.keys(metadata).find(uri => getLocalName(uri).toLowerCase() === localName.toLowerCase());
  return key ? metadata[key]?.[0] : undefined;
}

function highlightText(text: string, term: string | undefined): React.ReactNode {
  if (!term) return text;
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1
      ? <span key={i} style={highlightStyle}>{part}</span>
      : <Fragment key={i}>{part}</Fragment>
  );
}

const highlightStyle: React.CSSProperties = {
  backgroundColor: '#fff176',
  borderRadius: '2px',
  padding: '0 1px',
};

interface DocTooltip { node: GraphNode; x: number; y: number }

export function DocumentMentions() {
  const { selectedNode, nodes, edges, namespaces } = useGraphData();
  const { nodeLabelMode } = useViewSettings();

  const neoId = selectedNode?.metadata[NEO_ID_PREDICATE]?.[0];

  const [docTooltip, setDocTooltip] = useState<DocTooltip | null>(null);
  useEffect(() => { setDocTooltip(null); }, [selectedNode]);

  const adjacentDocuments = useMemo((): GraphNode[] => {
    if (!selectedNode) return [];
    const seen = new Set<string>();
    const collect = (candidates: (GraphNode | undefined)[]) =>
      candidates.filter((n): n is GraphNode => {
        if (!n || !n.types.includes(DOCUMENT_TYPE) || seen.has(n.id)) return false;
        seen.add(n.id);
        return true;
      });
    return [
      ...collect(edges.filter(e => e.from === selectedNode.id).map(e => nodes.find(n => n.id === e.to))),
      ...collect(edges.filter(e => e.to   === selectedNode.id).map(e => nodes.find(n => n.id === e.from))),
    ];
  }, [selectedNode, edges, nodes]);

  if (adjacentDocuments.length === 0) return null;

  return (
    <>
      <div style={styles.divider}>
        <hr style={styles.dividerLine} />
        <span style={styles.dividerLabel}>Document mentions</span>
        <hr style={styles.dividerLine} />
      </div>
      <ul style={styles.list}>
        {adjacentDocuments.map(doc => (
          <li
            key={doc.id}
            style={styles.documentItem}
            onMouseEnter={e => setDocTooltip({ node: doc, x: e.clientX, y: e.clientY })}
            onMouseMove={e => setDocTooltip(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
            onMouseLeave={() => setDocTooltip(null)}
          >
            <span style={styles.documentLabel}>{
              nodeLabelMode === 'neoId'
                ? (doc.metadata[NEO_ID_PREDICATE]?.[0] ?? doc.label)
                : doc.label
            }</span>
            <p style={styles.uri} title={doc.uri}>{uriToPrefixedName(doc.uri, namespaces)}</p>
          </li>
        ))}
      </ul>
      {docTooltip && (() => {
        const text   = findMeta(docTooltip.node.metadata, 'text');
        const source = findMeta(docTooltip.node.metadata, 'source');
        if (!text && !source) return null;
        return (
          <div style={{ ...styles.tooltip, left: docTooltip.x + 14, top: docTooltip.y + 14 }}>
            {text && (
              <div style={styles.tooltipSection}>
                <strong>Text</strong>
                <p style={styles.tooltipText}>{highlightText(text, neoId)}</p>
              </div>
            )}
            {source && (
              <div style={styles.tooltipSection}>
                <strong>Source</strong>
                <p style={styles.tooltipText}>{source}</p>
              </div>
            )}
          </div>
        );
      })()}
    </>
  );
}

const styles = {
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '16px 0 12px',
  },
  dividerLine: {
    flex: 1,
    border: 'none',
    borderTop: `1px solid ${colors.border}`,
  },
  dividerLabel: {
    flexShrink: 0,
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.08em',
    color: colors.textPlaceholder,
    whiteSpace: 'nowrap' as const,
  },
  list: {
    margin: '8px 0',
    paddingLeft: '20px',
  },
  uri: {
    fontSize: '12px',
    wordBreak: 'break-all',
    color: colors.textMuted,
    margin: '4px 0',
  },
  documentItem: {
    cursor: 'default',
  },
  documentLabel: {
    fontWeight: 'bold',
    color: colors.textSubtle,
  },
  tooltip: {
    position: 'fixed',
    zIndex: 1000,
    background: '#fff',
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    padding: '10px 12px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    maxWidth: '340px',
    maxHeight: '260px',
    overflowY: 'auto',
    fontSize: '12px',
    lineHeight: '1.5',
    pointerEvents: 'none',
  },
  tooltipSection: {
    marginBottom: '8px',
  },
  tooltipText: {
    margin: '2px 0 0',
    color: colors.textMuted,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
} satisfies Record<string, React.CSSProperties>;
