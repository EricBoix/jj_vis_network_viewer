import { colors } from '../styles/theme';

const FitScreenIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 3h6v2H5v4H3V3zm12 0h6v6h-2V5h-4V3zM3 15h2v4h4v2H3v-6zm16 4h-4v2h6v-6h-2v4z" />
  </svg>
);

interface FitScreenButtonProps {
  onFit: () => void;
}

export function FitScreenButton({ onFit }: FitScreenButtonProps) {
  return (
    <button onClick={onFit} style={styles.button} title="Fit graph to screen">
      <FitScreenIcon />
      Fit
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: 'white',
    color: colors.primary,
    border: `1px solid ${colors.border}`,
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
  },
} satisfies Record<string, React.CSSProperties>;
