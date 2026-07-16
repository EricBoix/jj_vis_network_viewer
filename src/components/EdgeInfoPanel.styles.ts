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
    cursor: 'pointer',
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
  anchoredPopup: {
    position: 'fixed',
    zIndex: 1001,
    background: '#fff',
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    boxShadow: '0 4px 18px rgba(0,0,0,0.22)',
    width: '80ch',
    maxHeight: '420px',
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'auto',
  },
  anchoredHeader: {
    flexShrink: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '6px 8px 0',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    color: colors.textMuted,
    lineHeight: 1,
    padding: '2px 4px',
    borderRadius: '3px',
  },
  anchoredContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 14px 12px',
  },
} satisfies Record<string, CSSProperties>;
