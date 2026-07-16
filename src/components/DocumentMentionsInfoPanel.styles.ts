import type { CSSProperties } from 'react';
import { colors } from '../styles/theme';

export const styles = {
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '16px 0 12px',
  },
  dividerLine: {
    flex: 1,
    border: 'none',
    borderTop: `1px solid ${colors.border}`,
  },
  dividerLabel: {
    flexShrink: 0,
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: colors.textPlaceholder,
    whiteSpace: 'nowrap',
  },
  list: {
    margin: '8px 0',
    paddingLeft: '20px',
  },
  uri: {
    fontSize: '12px',
    wordBreak: 'break-all',
    color: colors.textMuted,
    margin: '4px 0',
  },
  documentItem: {
    cursor: 'default',
  },
  documentLabel: {
    fontWeight: 'bold',
    color: colors.textSubtle,
  },
  tooltip: {
    position: 'fixed',
    zIndex: 1000,
    background: '#fff',
    border: `1px solid ${colors.border}`,
    borderRadius: '6px',
    padding: '10px 12px',
    boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
    maxWidth: '340px',
    maxHeight: '260px',
    overflowY: 'auto',
    fontSize: '12px',
    lineHeight: '1.5',
    pointerEvents: 'none',
  },
  tooltipSection: {
    marginBottom: '8px',
  },
  tooltipText: {
    margin: '2px 0 0',
    color: colors.textMuted,
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
  },
} satisfies Record<string, CSSProperties>;

export const highlightStyle: CSSProperties = {
  backgroundColor: '#fff176',
  borderRadius: '2px',
  padding: '0 1px',
};
