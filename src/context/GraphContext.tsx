import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { GraphNode, GraphEdge, GraphData, Selection, NodeLabelMode } from '../types/graph.types';

interface GraphContextValue {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selection: Selection;
  nodeLabelMode: NodeLabelMode;
  setGraphData: (data: GraphData) => void;
  setSelection: (selection: Selection) => void;
  setNodeLabelMode: (mode: NodeLabelMode) => void;
  updateNode: (id: string, updates: Partial<Pick<GraphNode, 'label' | 'metadata'>>) => void;
  updateEdge: (id: string, updates: Partial<Pick<GraphEdge, 'label'>>) => void;
  getSelectedNode: () => GraphNode | undefined;
  getSelectedEdge: () => GraphEdge | undefined;
}

const GraphContext = createContext<GraphContextValue | null>(null);

export function GraphProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [edges, setEdges] = useState<GraphEdge[]>([]);
  const [selection, setSelection] = useState<Selection>({ type: null, id: null });
  const [nodeLabelMode, setNodeLabelMode] = useState<NodeLabelMode>('name');

  const setGraphData = useCallback((data: GraphData) => {
    setNodes(data.nodes);
    setEdges(data.edges);
    setSelection({ type: null, id: null });
  }, []);

  const updateNode = useCallback((id: string, updates: Partial<Pick<GraphNode, 'label' | 'metadata'>>) => {
    setNodes(prev => prev.map(node =>
      node.id === id ? { ...node, ...updates } : node
    ));
  }, []);

  const updateEdge = useCallback((id: string, updates: Partial<Pick<GraphEdge, 'label'>>) => {
    setEdges(prev => prev.map(edge =>
      edge.id === id ? { ...edge, ...updates } : edge
    ));
  }, []);

  const getSelectedNode = useCallback(() => {
    if (selection.type === 'node' && selection.id) {
      return nodes.find(n => n.id === selection.id);
    }
    return undefined;
  }, [selection, nodes]);

  const getSelectedEdge = useCallback(() => {
    if (selection.type === 'edge' && selection.id) {
      return edges.find(e => e.id === selection.id);
    }
    return undefined;
  }, [selection, edges]);

  return (
    <GraphContext.Provider value={{
      nodes,
      edges,
      selection,
      nodeLabelMode,
      setGraphData,
      setSelection,
      setNodeLabelMode,
      updateNode,
      updateEdge,
      getSelectedNode,
      getSelectedEdge,
    }}>
      {children}
    </GraphContext.Provider>
  );
}

export function useGraph() {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error('useGraph must be used within GraphProvider');
  }
  return context;
}
