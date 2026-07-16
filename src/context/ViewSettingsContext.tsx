import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { NodeLabelMode } from '../types/graph.types';
import { useGraphData } from './GraphDataContext';
import { config } from '../config';

const { viewSettings } = config;
const hiddenByDefaultSet = new Set(viewSettings.hiddenByDefaultTypes);

interface ViewSettingsContextValue {
  nodeLabelMode: NodeLabelMode;
  physicsEnabled: boolean;
  hideIsolatedNodes: boolean;
  overviewListsCollapsed: boolean;
  visibleNodeTypes: Set<string>;
  visibleEdgeTypes: Set<string>;
  setNodeLabelMode: (mode: NodeLabelMode) => void;
  setPhysicsEnabled: (enabled: boolean) => void;
  setHideIsolatedNodes: (value: boolean) => void;
  setOverviewListsCollapsed: (value: boolean) => void;
  toggleNodeType: (type: string) => void;
  toggleEdgeType: (type: string) => void;
}

const ViewSettingsContext = createContext<ViewSettingsContextValue | null>(null);

export function ViewSettingsProvider({ children }: { children: ReactNode }) {
  const { nodes, edges } = useGraphData();

  const [nodeLabelMode, setNodeLabelMode] = useState<NodeLabelMode>(viewSettings.nodeLabelMode);
  const [physicsEnabled, setPhysicsEnabled] = useState<boolean>(viewSettings.physicsEnabled);
  const [hideIsolatedNodes, setHideIsolatedNodes] = useState<boolean>(viewSettings.hideIsolatedNodes);
  const [overviewListsCollapsed, setOverviewListsCollapsed] = useState<boolean>(viewSettings.overviewListsCollapsed);
  const [visibleNodeTypes, setVisibleNodeTypes] = useState<Set<string>>(new Set());
  const [visibleEdgeTypes, setVisibleEdgeTypes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const allTypes = new Set(nodes.flatMap(n => n.types));
    hiddenByDefaultSet.forEach(t => allTypes.delete(t));
    setVisibleNodeTypes(allTypes);
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
      nodeLabelMode, physicsEnabled, hideIsolatedNodes, overviewListsCollapsed,
      visibleNodeTypes, visibleEdgeTypes,
      setNodeLabelMode, setPhysicsEnabled, setHideIsolatedNodes, setOverviewListsCollapsed,
      toggleNodeType, toggleEdgeType,
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
