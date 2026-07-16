export const colors = {
  // Brand
  primary:          '#2B7CE9',
  primaryHighlight: '#D2E5FF',

  // Graph nodes/edges
  nodeBackground:   '#97C2FC',
  edgeDefault:      '#848484',

  // Text hierarchy
  textDark:        '#333',
  textKey:         '#444',
  textSubtle:      '#555',
  textMuted:       '#666',
  textPlaceholder: '#888',
  textFaint:       '#aaa',

  // UI backgrounds
  backgroundCanvas: '#fafafa',
  backgroundTab:    '#f5f5f5',

  // Borders / lines
  border: '#ccc',

  // Resize handle
  resizeHandleDefault: '#e0e0e0',
  resizeHandleHover:   '#bdbdbd',
  resizeGripDefault:   '#bbb',

  // Node type highlight — dimmed state (Overview tab)
  nodeTypeDimmed:       '#d0d0d0',
  nodeTypeDimmedBorder: '#aaaaaa',
} as const;

// Palette of visually distinct colors for multi-type highlighting.
// Each entry: [background, border].
export const nodeHighlightPalette = [
  { background: '#ffb300', border: '#e65100' }, // amber
  { background: '#66bb6a', border: '#2e7d32' }, // green
  { background: '#ef5350', border: '#b71c1c' }, // red
  { background: '#ab47bc', border: '#6a1b9a' }, // purple
  { background: '#26c6da', border: '#00838f' }, // cyan
  { background: '#ff7043', border: '#bf360c' }, // deep orange
  { background: '#26a69a', border: '#004d40' }, // teal
  { background: '#ec407a', border: '#880e4f' }, // pink
  { background: '#1565c0', border: '#0d47a1' }, // deep blue
] as const;
