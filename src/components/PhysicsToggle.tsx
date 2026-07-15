import { useViewSettings } from '../context/ViewSettingsContext';

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

export function PhysicsToggle() {
  const { physicsEnabled, setPhysicsEnabled } = useViewSettings();

  return (
    <button
      onClick={() => setPhysicsEnabled(!physicsEnabled)}
      style={styles.button}
      title={physicsEnabled ? 'Freeze layout' : 'Resume layout'}
    >
      {physicsEnabled ? <PauseIcon /> : <PlayIcon />}
      {physicsEnabled ? 'Freeze' : 'Animate'}
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: 'white',
    color: '#2B7CE9',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
} satisfies Record<string, React.CSSProperties>;
