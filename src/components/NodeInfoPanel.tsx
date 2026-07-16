import { useGraphData } from '../context/GraphDataContext';
import { NodeDetails } from './NodeDetails';

export function NodeInfoPanel() {
  const { selectedNode } = useGraphData();
  if (!selectedNode) return null;
  return <NodeDetails node={selectedNode} />;
}
