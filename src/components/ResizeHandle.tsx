import { useState } from 'react';

// Draggable vertical bar between the graph canvas and the sidebar.
interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

export function ResizeHandle({ onMouseDown }: ResizeHandleProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseDown={onMouseDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.handle,
        backgroundColor: hovered ? '#bdbdbd' : '#e0e0e0',
      }}
      title="Drag to resize"
    >
      <div style={{ ...styles.grip, backgroundColor: hovered ? '#888' : '#bbb' }} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  handle: {
    width: '6px',
    cursor: 'col-resize',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  grip: {
    width: '2px',
    height: '32px',
    borderRadius: '1px',
  },
};
