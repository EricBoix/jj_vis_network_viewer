import { colors } from '../styles/theme';
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
        backgroundColor: hovered ? colors.resizeHandleHover : colors.resizeHandleDefault,
      }}
      title="Drag to resize"
    >
      <div style={{ ...styles.grip, backgroundColor: hovered ? colors.textPlaceholder : colors.resizeGripDefault }} />
    </div>
  );
}

const styles = {
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
} satisfies Record<string, React.CSSProperties>;
