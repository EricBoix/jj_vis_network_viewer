import { useMemo } from 'react';
import { useGraphData } from '../context/GraphDataContext';
import { useViewSettings } from '../context/ViewSettingsContext';

export function OverviewPanel() {
  const { nodes, edges } = useGraphData();
  const { visibleNodeTypes, visibleEdgeTypes, toggleNodeType, toggleEdgeType } = useViewSettings();

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
        <h4 style={styles.heading}>Node types</h4>
        {allNodeTypes.length === 0
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
        }
      </section>
      <section style={styles.section}>
        <h4 style={styles.heading}>Relationship types</h4>
        {allEdgeTypes.length === 0
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
        }
      </section>
    </div>
  );
}

const styles = {
  panel: {
    padding: '12px 16px',
    overflowY: 'auto',
    height: '100%',
  },
  section: {
    marginBottom: '20px',
  },
  heading: {
    margin: '0 0 8px 0',
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#555',
    borderBottom: '1px solid #eee',
    paddingBottom: '4px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 0',
    fontSize: '14px',
    cursor: 'pointer',
  },
  checkbox: {
    cursor: 'pointer',
    flexShrink: 0,
  },
  empty: {
    color: '#aaa',
    fontStyle: 'italic',
    fontSize: '13px',
  },
} satisfies Record<string, React.CSSProperties>;
