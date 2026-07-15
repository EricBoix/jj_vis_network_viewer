import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { GraphNode, GraphEdge, GraphData, Selection, NodeLabelMode } from '../types/graph.types';

interface GraphContextValue {
  nodes: GraphNode[];
  edges: GraphEdge[];
  selection: Selection;
  nodeLabelMode: NodeLabelMode;
  visibleNodeTypes: Set<string>;
  visibleEdgeTypes: Set<string>;
  setGraphData: (data: GraphData) => void;
  setSelection: (selection: Selection) => void;
  setNodeLabelMode: (mode: NodeLabelMode) => void;
  toggleNodeType: (type: string) => void;
  toggleEdgeType: (type: string) => void;
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
  const [visibleNodeTypes, setVisibleNodeTypes] = useState<Set<string>>(new Set());
  const [visibleEdgeTypes, setVisibleEdgeTypes] = useState<Set<string>>(new Set());

  const setGraphData = useCallback((data: GraphData) => {
    setNodes(data.nodes);
    setEdges(data.edges);
    setSelection({ type: null, id: null });
    setVisibleNodeTypes(new Set(data.nodes.flatMap(n => n.types)));
    setVisibleEdgeTypes(new Set(data.edges.map(e => e.label)));
  }, []);

  const toggleNodeType = useCallback((type: string) => {
    setVisibleNodeTypes(prev => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
  }, []);

  const toggleEdgeType = useCallback((type: string) => {
    setVisibleEdgeTypes(prev => {
      const next = new Set(prev);
      next.has(type) ? next.delete(type) : next.add(type);
      return next;
    });
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
      visibleNodeTypes,
      visibleEdgeTypes,
      setGraphData,
      setSelection,
      setNodeLabelMode,
      toggleNodeType,
      toggleEdgeType,
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
