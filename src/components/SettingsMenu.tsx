import { useEffect, useRef, useState } from 'react';
import { useViewSettings } from '../context/ViewSettingsContext';
import { GearIcon } from './GearIcon';
import { NodeLabelToggle } from './NodeLabelToggle';
import { config } from '../config';
import { styles } from './SettingsMenu.styles';

const hiddenByDefault = [...config.viewSettings.hiddenByDefaultTypes].sort();

export function SettingsMenu() {
  const { hideIsolatedNodes, setHideIsolatedNodes,
          overviewListsCollapsed, setOverviewListsCollapsed } = useViewSettings();
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
          <label style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={overviewListsCollapsed}
              onChange={e => setOverviewListsCollapsed(e.target.checked)}
              style={styles.checkbox}
            />
            Collapse overview lists on startup
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

