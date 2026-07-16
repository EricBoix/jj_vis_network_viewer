import { colors } from '../styles/theme';
import { useEffect, useRef, useCallback } from 'react';
import { Network, Options } from 'vis-network';
import { DataSet } from 'vis-data';
import { GraphNode, GraphEdge, Selection, NodeLabelMode } from '../types/graph.types';

const NEO_ID_PREDICATE = 'http://example.org/neo4j/id';

interface UseVisNetworkProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  nodeLabelMode: NodeLabelMode;
  physicsEnabled: boolean;
  onSelect: (selection: Selection) => void;
}

const networkOptions: Options = {
  nodes: {
    shape: 'dot',
    size: 20,
    font: {
      size: 14,
      color: colors.textDark,
    },
    borderWidth: 2,
    color: {
      border: colors.primary,
      background: colors.nodeBackground,
      highlight: {
        border: colors.primary,
        background: colors.primaryHighlight,
      },
    },
  },
  edges: {
    width: 2,
    color: {
      color: colors.edgeDefault,
      highlight: colors.primary,
    },
    font: {
      size: 12,
      align: 'middle',
    },
    arrows: {
      to: { enabled: true, scaleFactor: 0.5 },
    },
    smooth: {
      enabled: true,
      type: 'continuous',
      roundness: 0.5,
    },
  },
  physics: {
    enabled: true,
    solver: 'forceAtlas2Based',
    forceAtlas2Based: {
      gravitationalConstant: -50,
      centralGravity: 0.01,
      springLength: 100,
      springConstant: 0.08,
    },
    stabilization: {
      iterations: 100,
    },
  },
  interaction: {
    hover: true,
    selectConnectedEdges: false,
  },
};

export function useVisNetwork({ nodes, edges, nodeLabelMode, physicsEnabled, onSelect }: UseVisNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<Network | null>(null);
  const nodesDataSetRef = useRef<DataSet<{ id: string; label: string }>>(new DataSet());
  const edgesDataSetRef = useRef<DataSet<{ id: string; from: string; to: string; label: string }>>(new DataSet());
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  // Initialize network once; event handlers read onSelectRef so they always
  // call the latest callback without recreating the network on every render.
  useEffect(() => {
    if (!containerRef.current) return;

    const network = new Network(
      containerRef.current,
      {
        nodes: nodesDataSetRef.current,
        edges: edgesDataSetRef.current,
      },
      networkOptions
    );

    network.on('selectNode', (params) => {
      if (params.nodes.length > 0) {
        onSelectRef.current({ type: 'node', id: params.nodes[0] });
      }
    });

    network.on('selectEdge', (params) => {
      if (params.edges.length > 0 && params.nodes.length === 0) {
        onSelectRef.current({ type: 'edge', id: params.edges[0] });
      }
    });

    network.on('deselectNode', () => {
      onSelectRef.current({ type: null, id: null });
    });

    network.on('deselectEdge', () => {
      onSelectRef.current({ type: null, id: null });
    });

    networkRef.current = network;

    return () => {
      network.destroy();
      networkRef.current = null;
    };
  }, []);

  // Sync nodes
  useEffect(() => {
    const dataSet = nodesDataSetRef.current;
    const currentIds = new Set(dataSet.getIds());
    const newIds = new Set(nodes.map(n => n.id));

    // Remove old nodes
    const toRemove = [...currentIds].filter(id => !newIds.has(id as string));
    if (toRemove.length > 0) {
      dataSet.remove(toRemove);
    }

    // Update/add nodes
    const updates = nodes.map(n => ({
      id: n.id,
      label: nodeLabelMode === 'neoId'
        ? (n.metadata[NEO_ID_PREDICATE]?.[0] ?? n.label)
        : n.label,
    }));
    dataSet.update(updates);
  }, [nodes, nodeLabelMode]);

  // Sync edges
  useEffect(() => {
    const dataSet = edgesDataSetRef.current;
    const currentIds = new Set(dataSet.getIds());
    const newIds = new Set(edges.map(e => e.id));

    // Remove old edges
    const toRemove = [...currentIds].filter(id => !newIds.has(id as string));
    if (toRemove.length > 0) {
      dataSet.remove(toRemove);
    }

    // Update/add edges
    const updates = edges.map(e => ({ id: e.id, from: e.from, to: e.to, label: e.label }));
    dataSet.update(updates);
  }, [edges]);

  // Sync physics
  useEffect(() => {
    networkRef.current?.setOptions({ physics: { enabled: physicsEnabled } });
  }, [physicsEnabled]);

  const fit = useCallback(() => {
    networkRef.current?.fit();
  }, []);

  return {
    containerRef,
    fit,
  };
}
