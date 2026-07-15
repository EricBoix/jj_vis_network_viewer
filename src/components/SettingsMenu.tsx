import { useEffect, useRef, useState } from 'react';
import { useViewSettings } from '../context/ViewSettingsContext';
import { NodeLabelMode } from '../types/graph.types';

const GearIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.03 7.03 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.47.47 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.47.47 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.37 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
  </svg>
);

const SEGMENTS: { value: NodeLabelMode; label: string }[] = [
  { value: 'neoId',  label: 'neo:id'     },
  { value: 'name',   label: 'node-name'  },
];

export function SettingsMenu() {
  const { nodeLabelMode, setNodeLabelMode } = useViewSettings();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return (
    <div ref={wrapperRef} style={styles.wrapper}>
      <button
        onClick={() => setOpen(s => !s)}
        style={styles.gearButton}
        title="Settings"
        aria-label="Settings"
      >
        <GearIcon />
      </button>
      {open && (
        <div style={styles.dropdown}>
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
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: 'relative',
  },
  gearButton: {
    backgroundColor: 'white',
    color: '#2B7CE9',
    border: 'none',
    padding: '6px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    right: 0,
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '12px 16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 100,
    color: '#333',
  },
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
    border: '1px solid #2B7CE9',
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
    borderRight: '1px solid #2B7CE9',
  },
  segmentLast: {},
  segmentActive: {
    backgroundColor: '#2B7CE9',
    color: 'white',
  },
  segmentInactive: {
    backgroundColor: 'white',
    color: '#2B7CE9',
  },
} satisfies Record<string, React.CSSProperties>;
