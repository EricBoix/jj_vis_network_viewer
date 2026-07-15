import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { NodeLabelMode } from '../types/graph.types';
import { useGraphData } from './GraphDataContext';

interface ViewSettingsContextValue {
  nodeLabelMode: NodeLabelMode;
  physicsEnabled: boolean;
  visibleNodeTypes: Set<string>;
  visibleEdgeTypes: Set<string>;
  setNodeLabelMode: (mode: NodeLabelMode) => void;
  setPhysicsEnabled: (enabled: boolean) => void;
  toggleNodeType: (type: string) => void;
  toggleEdgeType: (type: string) => void;
}

const ViewSettingsContext = createContext<ViewSettingsContextValue | null>(null);

export function ViewSettingsProvider({ children }: { children: ReactNode }) {
  const { nodes, edges } = useGraphData();

  const [nodeLabelMode, setNodeLabelMode] = useState<NodeLabelMode>('name');
  const [physicsEnabled, setPhysicsEnabled] = useState(true);
  const [visibleNodeTypes, setVisibleNodeTypes] = useState<Set<string>>(new Set());
  const [visibleEdgeTypes, setVisibleEdgeTypes] = useState<Set<string>>(new Set());

  useEffect(() => {
    setVisibleNodeTypes(new Set(nodes.flatMap(n => n.types)));
    setVisibleEdgeTypes(new Set(edges.map(e => e.label)));
  }, [nodes, edges]);

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

  return (
    <ViewSettingsContext.Provider value={{
      nodeLabelMode, physicsEnabled, visibleNodeTypes, visibleEdgeTypes,
      setNodeLabelMode, setPhysicsEnabled, toggleNodeType, toggleEdgeType,
    }}>
      {children}
    </ViewSettingsContext.Provider>
  );
}

export function useViewSettings() {
  const context = useContext(ViewSettingsContext);
  if (!context) throw new Error('useViewSettings must be used within ViewSettingsProvider');
  return context;
}
