import type { CSSProperties } from 'react';
import { colors } from '../styles/theme';

export const styles = {
  panel: {
    padding: '16px',
    height: '100%',
    overflowY: 'auto',
  },
  placeholder: {
    color: colors.textPlaceholder,
    fontStyle: 'italic',
  },
} satisfies Record<string, CSSProperties>;
