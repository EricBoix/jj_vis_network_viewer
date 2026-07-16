import { useMemo, useState, useEffect, useLayoutEffect, useRef, Fragment } from 'react';
import { useGraphData } from '../context/GraphDataContext';
import { useViewSettings } from '../context/ViewSettingsContext';
import { getLocalName } from '../services/rdfParser';
import { config } from '../config';
import { GraphNode } from '../types/graph.types';
import { NodeDetails } from './NodeDetails';
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

interface NodePopup     { node: GraphNode; x: number; y: number }
interface AnchoredPopup { node: GraphNode; left: number; top: number }

interface Props { node: GraphNode }

export function DocumentMentions({ node }: Props) {
  const { nodes, edges } = useGraphData();
  const { nodeLabelMode } = useViewSettings();

  const neoId = node.metadata[NEO_ID_PREDICATE]?.[0];

  const [nodePopup,     setNodePopup]     = useState<NodePopup | null>(null);
  const [popupLeft,     setPopupLeft]     = useState(0);
  const [anchoredPopup, setAnchoredPopup] = useState<AnchoredPopup | null>(null);
  const [anchoredLeft,  setAnchoredLeft]  = useState(0);
  const popupRef    = useRef<HTMLDivElement>(null);
  const anchoredRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!nodePopup || !popupRef.current) return;
    const w = popupRef.current.offsetWidth;
    setPopupLeft(Math.min(nodePopup.x + 14, window.innerWidth - w - 8));
  }, [nodePopup]);

  useLayoutEffect(() => {
    if (!anchoredPopup || !anchoredRef.current) return;
    const w = anchoredRef.current.offsetWidth;
    setAnchoredLeft(Math.min(anchoredPopup.left, window.innerWidth - w - 8));
  }, [anchoredPopup]);

  useEffect(() => {
    if (!anchoredPopup) return;
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setAnchoredPopup(null); };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [anchoredPopup]);

  useEffect(() => { setNodePopup(null); setAnchoredPopup(null); }, [node]);

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
            title="Click to pin"
            onMouseEnter={e => { setAnchoredPopup(null); setNodePopup({ node: doc, x: e.clientX, y: e.clientY }); }}
            onMouseMove={e  => setNodePopup(prev => prev ? { ...prev, x: e.clientX, y: e.clientY } : null)}
            onMouseLeave={() => setNodePopup(null)}
            onClick={() => {
              setAnchoredPopup({ node: doc, left: popupLeft, top: (nodePopup?.y ?? 0) + 14 });
              setNodePopup(null);
            }}
          >
            <span style={styles.documentLabel}>{
              nodeLabelMode === 'neoId'
                ? (doc.metadata[NEO_ID_PREDICATE]?.[0] ?? doc.label)
                : doc.label
            }</span>
          </li>
        ))}
      </ul>
      {nodePopup && (() => {
        const text   = findMeta(nodePopup.node.metadata, 'text');
        const source = findMeta(nodePopup.node.metadata, 'source');
        const hasTextOrSource = text || source;
        return (
          <div ref={popupRef} style={{ ...styles.popup, left: popupLeft, top: nodePopup.y + 14 }}>
            {hasTextOrSource ? (
              <>
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
              </>
            ) : (
              <NodeDetails node={nodePopup.node} />
            )}
          </div>
        );
      })()}
      {anchoredPopup && (
        <div ref={anchoredRef} style={{ ...styles.anchoredPopup, left: anchoredLeft, top: anchoredPopup.top }}>
          <div style={styles.anchoredHeader}>
            <button style={styles.closeButton} onClick={() => setAnchoredPopup(null)}>✕</button>
          </div>
          <div style={styles.anchoredContent}>
            <NodeDetails node={anchoredPopup.node} />
          </div>
        </div>
      )}
    </>
  );
}
