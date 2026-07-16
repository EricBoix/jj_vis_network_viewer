import { colors } from '../styles/theme';
import { useEffect, useRef, useState } from 'react';
import { useViewSettings } from '../context/ViewSettingsContext';
import { GearIcon } from './GearIcon';
import { NodeLabelToggle } from './NodeLabelToggle';
import { config } from '../config';

const hiddenByDefault = [...config.viewSettings.hiddenByDefaultTypes].sort();

export function SettingsMenu() {
  const { hideIsolatedNodes, setHideIsolatedNodes } = useViewSettings();
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
          <NodeLabelToggle />
          <hr style={styles.divider} />
          <label style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={hideIsolatedNodes}
              onChange={e => setHideIsolatedNodes(e.target.checked)}
              style={styles.checkbox}
            />
            Hide isolated nodes
          </label>
          <hr style={styles.divider} />
          <p style={styles.sectionLabel}>Hidden by default</p>
          <ul style={styles.typeList}>
            {hiddenByDefault.map(t => (
              <li key={t} style={styles.typeItem}>{t}</li>
            ))}
          </ul>
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
    color: colors.primary,
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
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    padding: '12px 16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 100,
    color: colors.textDark,
  },
  divider: {
    border: 'none',
    borderTop: `1px solid ${colors.border}`,
    margin: '10px 0',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  checkbox: {
    cursor: 'pointer',
    flexShrink: 0,
  },
  sectionLabel: {
    margin: '0 0 6px 0',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: colors.textSubtle,
  },
  typeList: {
    margin: 0,
    paddingLeft: '16px',
    fontSize: '13px',
    color: colors.textMuted,
  },
  typeItem: {
    padding: '1px 0',
  },
} satisfies Record<string, React.CSSProperties>;
