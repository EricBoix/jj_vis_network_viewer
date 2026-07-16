import type { CSSProperties } from 'react';
import { colors } from '../styles/theme';

export const styles = {
  title: {
    margin: '0 0 16px 0',
    fontSize: '18px',
    borderBottom: '1px solid #eee',
    paddingBottom: '8px',
  },
  section: {
    marginBottom: '12px',
  },
  predicateSection: {
    marginBottom: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    columnGap: '4px',
  },
  uri: {
    fontSize: '12px',
    wordBreak: 'break-all',
    color: colors.textMuted,
  },
  hoverable: {
    cursor: 'help',
    textDecoration: 'underline dotted',
    textDecorationColor: colors.textPlaceholder,
  },
  popup: {
    position: 'fixed',
    zIndex: 1000,
    background: '#fff',
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    padding: '12px 14px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    width: '80ch',
    maxHeight: '420px',
    overflowY: 'auto',
    pointerEvents: 'none',
  },
} satisfies Record<string, CSSProperties>;
