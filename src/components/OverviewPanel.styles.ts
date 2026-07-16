import type { CSSProperties } from 'react';
import { colors } from '../styles/theme';

export const styles = {
  panel: {
    padding: '12px 16px',
    overflowY: 'auto',
    height: '100%',
  },
  section: {
    marginBottom: '20px',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    width: '100%',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid #eee',
    paddingBottom: '4px',
    marginBottom: '8px',
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: colors.textSubtle,
    cursor: 'pointer',
    textAlign: 'left',
  },
  chevron: {
    fontSize: '1.75em',
    flexShrink: 0,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '4px 0',
    fontSize: '14px',
    cursor: 'pointer',
  },
  checkbox: {
    cursor: 'pointer',
    flexShrink: 0,
  },
  empty: {
    color: colors.textFaint,
    fontStyle: 'italic',
    fontSize: '13px',
  },
} satisfies Record<string, CSSProperties>;
