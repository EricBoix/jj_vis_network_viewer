interface ResizeHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
}

export function ResizeHandle({ onMouseDown }: ResizeHandleProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      style={styles.handle}
      title="Drag to resize"
    >
      <div style={styles.grip} />
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  handle: {
    width: '6px',
    cursor: 'col-resize',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background-color 0.15s',
  },
  grip: {
    width: '2px',
    height: '32px',
    borderRadius: '1px',
    backgroundColor: '#bbb',
  },
};
