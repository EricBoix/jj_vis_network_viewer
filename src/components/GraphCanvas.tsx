import { colors } from '../styles/theme';
import { useMemo } from 'react';
import { useGraphData } from '../context/GraphDataContext';
import { useViewSettings } from '../context/ViewSettingsContext';
import { useVisNetwork } from '../hooks/useVisNetwork';
import { NodeCount } from './NodeCount';

export function GraphCanvas() {
  const { nodes, edges, setSelection } = useGraphData();
  const { nodeLabelMode, physicsEnabled, hideIsolatedNodes, visibleNodeTypes, visibleEdgeTypes } = useViewSettings();

  const visibleNodes = useMemo(
    () => nodes.filter(n => n.types.length === 0 || n.types.some(t => visibleNodeTypes.has(t))),
    [nodes, visibleNodeTypes]
  );

  const visibleNodeIds = useMemo(
    () => new Set(visibleNodes.map(n => n.id)),
    [visibleNodes]
  );

  const visibleEdges = useMemo(
    () => edges.filter(e =>
      visibleEdgeTypes.has(e.label) &&
      visibleNodeIds.has(e.from) &&
      visibleNodeIds.has(e.to)
    ),
    [edges, visibleEdgeTypes, visibleNodeIds]
  );

  // Second filter pass: drop nodes whose every edge connects to a Document node.
  const displayedNodes = useMemo(() => {
    if (!hideIsolatedNodes) return visibleNodes;
    const documentIds = new Set(
      visibleNodes.filter(n => n.types.includes('Document')).map(n => n.id)
    );
    const connectedToNonDoc = new Set<string>();
    for (const edge of visibleEdges) {
      if (!documentIds.has(edge.from) || !documentIds.has(edge.to)) {
        connectedToNonDoc.add(edge.from);
        connectedToNonDoc.add(edge.to);
      }
    }
    return visibleNodes.filter(n => documentIds.has(n.id) || connectedToNonDoc.has(n.id));
  }, [visibleNodes, visibleEdges, hideIsolatedNodes]);

  const displayedNodeIds = useMemo(
    () => new Set(displayedNodes.map(n => n.id)),
    [displayedNodes]
  );

  const displayedEdges = useMemo(
    () => visibleEdges.filter(e => displayedNodeIds.has(e.from) && displayedNodeIds.has(e.to)),
    [visibleEdges, displayedNodeIds]
  );

  const { containerRef } = useVisNetwork({
    nodes: displayedNodes,
    edges: displayedEdges,
    nodeLabelMode,
    physicsEnabled,
    onSelect: setSelection,
  });

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          border: `1px solid ${colors.border}`,
          backgroundColor: colors.backgroundCanvas,
        }}
      />
      <NodeCount displayed={displayedNodes.length} total={nodes.length} />
    </div>
  );
}
