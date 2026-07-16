import type { CSSProperties } from 'react';
import { colors } from '../styles/theme';

export const styles = {
  wrapper: {
    position: 'relative',
  },
  gearButton: {
    backgroundColor: 'white',
    color: colors.primary,
    border: 'none',
    padding: '6px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    right: 0,
    backgroundColor: 'white',
    border: `1px solid ${colors.border}`,
    borderRadius: '4px',
    padding: '12px 16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    zIndex: 100,
    color: colors.textDark,
  },
  divider: {
    border: 'none',
    borderTop: `1px solid ${colors.border}`,
    margin: '10px 0',
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  checkbox: {
    cursor: 'pointer',
    flexShrink: 0,
  },
  sectionLabel: {
    margin: '0 0 6px 0',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: colors.textSubtle,
  },
  typeList: {
    margin: 0,
    paddingLeft: '16px',
    fontSize: '13px',
    color: colors.textMuted,
  },
  typeItem: {
    padding: '1px 0',
  },
} satisfies Record<string, CSSProperties>;
