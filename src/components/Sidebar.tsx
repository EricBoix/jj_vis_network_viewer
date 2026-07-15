import { useState } from 'react';
import { InfoPanel } from './InfoPanel';
import { EditPanel } from './EditPanel';

interface SidebarProps {
  width: number;
}

export function Sidebar({ width }: SidebarProps) {
  const [activePanel, setActivePanel] = useState<'info' | 'edit'>('info');

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
      </div>
      <div style={styles.panelContainer}>
        {activePanel === 'info' ? <InfoPanel /> : <EditPanel />}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    borderLeft: '1px solid #ccc',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #ccc',
  },
  tab: {
    flex: 1,
    padding: '12px',
    border: 'none',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
  },
  activeTab: {
    backgroundColor: 'white',
    borderBottom: '2px solid #2B7CE9',
  },
  panelContainer: {
    flex: 1,
    overflow: 'auto',
  },
};
