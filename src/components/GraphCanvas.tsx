import { useGraphData } from '../context/GraphDataContext';
import { useViewSettings } from '../context/ViewSettingsContext';
import { useVisNetwork } from '../hooks/useVisNetwork';

export function GraphCanvas() {
  const { nodes, edges, setSelection } = useGraphData();
  const { nodeLabelMode, physicsEnabled, visibleNodeTypes, visibleEdgeTypes } = useViewSettings();

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
    physicsEnabled,
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
