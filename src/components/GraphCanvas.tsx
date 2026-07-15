import { useGraph } from '../context/GraphContext';
import { useVisNetwork } from '../hooks/useVisNetwork';

export function GraphCanvas() {
  const { nodes, edges, nodeLabelMode, visibleNodeTypes, visibleEdgeTypes, setSelection } = useGraph();

  const visibleNodes = nodes.filter(n =>
    n.types.length === 0 || n.types.some(t => visibleNodeTypes.has(t))
  );
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));
  const visibleEdges = edges.filter(e =>
    visibleEdgeTypes.has(e.label) &&
    visibleNodeIds.has(e.from) &&
    visibleNodeIds.has(e.to)
  );

  const { containerRef } = useVisNetwork({
    nodes: visibleNodes,
    edges: visibleEdges,
    nodeLabelMode,
    onSelect: setSelection,
  });

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        border: '1px solid #ccc',
        backgroundColor: '#fafafa',
      }}
    />
  );
}
