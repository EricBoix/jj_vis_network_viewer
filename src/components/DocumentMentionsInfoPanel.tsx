import { useMemo, useState, useEffect, Fragment } from 'react';
import { useGraphData } from '../context/GraphDataContext';
import { useViewSettings } from '../context/ViewSettingsContext';
import { getLocalName, uriToPrefixedName } from '../services/rdfParser';
import { config } from '../config';
import { GraphNode } from '../types/graph.types';
import { styles, highlightStyle } from './DocumentMentionsInfoPanel.styles';

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

interface DocTooltip { node: GraphNode; x: number; y: number }

interface Props { node: GraphNode }

export function DocumentMentions({ node }: Props) {
  const { nodes, edges, namespaces } = useGraphData();
  const { nodeLabelMode } = useViewSettings();

  const neoId = node.metadata[NEO_ID_PREDICATE]?.[0];

  const [docTooltip, setDocTooltip] = useState<DocTooltip | null>(null);
  useEffect(() => { setDocTooltip(null); }, [node]);

  const adjacentDocuments = useMemo((): GraphNode[] => {
    const seen = new Set<string>();
    const collect = (candidates: (GraphNode | undefined)[]) =>
      candidates.filter((n): n is GraphNode => {
        if (!n || !n.types.includes(DOCUMENT_TYPE) || seen.has(n.id)) return false;
        seen.add(n.id);
        return true;
      });
    return [
      ...collect(edges.filter(e => e.from === node.id).map(e => nodes.find(n => n.id === e.to))),
      ...collect(edges.filter(e => e.to   === node.id).map(e => nodes.find(n => n.id === e.from))),
    ];
  }, [node, edges, nodes]);

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

