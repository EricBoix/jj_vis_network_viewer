import { colors } from '../styles/theme';
import { useState } from 'react';
import { InfoPanel } from './InfoPanel';
import { EditPanel } from './EditPanel';
import { OverviewPanel } from './OverviewPanel';

interface SidebarProps {
  width: number;
}

export function Sidebar({ width }: SidebarProps) {
  const [activePanel, setActivePanel] = useState<'info' | 'edit' | 'overview'>('info');

  return (
    <div style={{ ...styles.sidebar, width }}>
      <div style={styles.tabs}>
        <button
          onClick={() => setActivePanel('info')}
          style={{ ...styles.tab, ...(activePanel === 'info' ? styles.activeTab : {}) }}
        >
          Info
        </button>
        <button
          onClick={() => setActivePanel('edit')}
          style={{ ...styles.tab, ...(activePanel === 'edit' ? styles.activeTab : {}) }}
        >
          Edit
        </button>
        <button
          onClick={() => setActivePanel('overview')}
          style={{ ...styles.tab, ...(activePanel === 'overview' ? styles.activeTab : {}) }}
        >
          Overview
        </button>
      </div>
      <div style={styles.panelContainer}>
        {activePanel === 'info' && <InfoPanel />}
        {activePanel === 'edit' && <EditPanel />}
        {activePanel === 'overview' && <OverviewPanel />}
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    borderLeft: `1px solid ${colors.border}`,
  },
  tabs: {
    display: 'flex',
    borderBottom: `1px solid ${colors.border}`,
  },
  tab: {
    flex: 1,
    padding: '12px',
    border: 'none',
    backgroundColor: colors.backgroundTab,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  activeTab: {
    backgroundColor: 'white',
    borderBottom: `2px solid ${colors.primary}`,
  },
  panelContainer: {
    flex: 1,
    overflow: 'auto',
  },
} satisfies Record<string, React.CSSProperties>;
