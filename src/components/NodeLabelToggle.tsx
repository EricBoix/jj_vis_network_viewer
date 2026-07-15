import { colors } from '../styles/theme';
import { useViewSettings } from '../context/ViewSettingsContext';
import { NodeLabelMode } from '../types/graph.types';

const SEGMENTS: { value: NodeLabelMode; label: string }[] = [
  { value: 'neoId', label: 'neo:id'    },
  { value: 'name',  label: 'node-name' },
];

export function NodeLabelToggle() {
  const { nodeLabelMode, setNodeLabelMode } = useViewSettings();

  return (
    <div style={styles.row}>
      <span style={styles.rowLabel}>Node label</span>
      <div style={styles.segmented}>
        {SEGMENTS.map(({ value, label }, i) => (
          <button
            key={value}
            onClick={() => setNodeLabelMode(value)}
            style={{
              ...styles.segment,
              ...(i === 0 ? styles.segmentFirst : styles.segmentLast),
              ...(nodeLabelMode === value ? styles.segmentActive : styles.segmentInactive),
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    whiteSpace: 'nowrap',
  },
  rowLabel: {
    fontSize: '14px',
  },
  segmented: {
    display: 'flex',
    border: `1px solid ${colors.primary}`,
    borderRadius: '4px',
    overflow: 'hidden',
  },
  segment: {
    padding: '4px 10px',
    fontSize: '13px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 500,
  },
  segmentFirst: {
    borderRight: `1px solid ${colors.primary}`,
  },
  segmentLast: {},
  segmentActive: {
    backgroundColor: colors.primary,
    color: 'white',
  },
  segmentInactive: {
    backgroundColor: 'white',
    color: colors.primary,
  },
} satisfies Record<string, React.CSSProperties>;
