import { useMemo, useState } from 'react';
import { useGraphData } from '../context/GraphDataContext';
import { useViewSettings } from '../context/ViewSettingsContext';
import { styles } from './OverviewPanel.styles';

export function OverviewPanel() {
  const { nodes, edges } = useGraphData();
  const { visibleNodeTypes, visibleEdgeTypes, toggleNodeType, toggleEdgeType,
          overviewListsCollapsed } = useViewSettings();

  const [nodeTypesOpen, setNodeTypesOpen] = useState(!overviewListsCollapsed);
  const [edgeTypesOpen, setEdgeTypesOpen] = useState(!overviewListsCollapsed);

  const allNodeTypes = useMemo(
    () => [...new Set(nodes.flatMap(n => n.types))].sort(),
    [nodes]
  );
  const allEdgeTypes = useMemo(
    () => [...new Set(edges.map(e => e.label))].sort(),
    [edges]
  );

  return (
    <div style={styles.panel}>
      <section style={styles.section}>
        <button style={styles.heading} onClick={() => setNodeTypesOpen(o => !o)}>
          <span style={styles.chevron}>{nodeTypesOpen ? '▾' : '▸'}</span>
          Node types
        </button>
        {nodeTypesOpen && (
          allNodeTypes.length === 0
            ? <p style={styles.empty}>No types found</p>
            : allNodeTypes.map(type => (
              <label key={type} style={styles.row}>
                <input
                  type="checkbox"
                  checked={visibleNodeTypes.has(type)}
                  onChange={() => toggleNodeType(type)}
                  style={styles.checkbox}
                />
                {type}
              </label>
            ))
        )}
      </section>
      <section style={styles.section}>
        <button style={styles.heading} onClick={() => setEdgeTypesOpen(o => !o)}>
          <span style={styles.chevron}>{edgeTypesOpen ? '▾' : '▸'}</span>
          Relationship types
        </button>
        {edgeTypesOpen && (
          allEdgeTypes.length === 0
            ? <p style={styles.empty}>No relationships found</p>
            : allEdgeTypes.map(type => (
              <label key={type} style={styles.row}>
                <input
                  type="checkbox"
                  checked={visibleEdgeTypes.has(type)}
                  onChange={() => toggleEdgeType(type)}
                  style={styles.checkbox}
                />
                {type}
              </label>
            ))
        )}
      </section>
    </div>
  );
}

