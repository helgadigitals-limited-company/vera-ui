import { create } from '@storybook/theming';

// Light theme
const lightTheme = create({
  base: 'light',
  brandTitle: 'Vera UI',
  brandUrl: 'https://github.com/jibu-mwakilembe/vera-ui',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#020817',
  colorSecondary: '#64748b',

  // UI
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e2e8f0',
  appBorderRadius: 8,

  // Text colors
  textColor: '#0f172a',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#64748b',
  barSelectedColor: '#020817',
  barHoverColor: '#334155',
  barBg: '#f8fafc',

  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e2e8f0',
  inputTextColor: '#0f172a',
  inputBorderRadius: 6,
});

// Dark theme
const darkTheme = create({
  base: 'dark',
  brandTitle: 'Vera UI',
  brandUrl: 'https://github.com/jibu-mwakilembe/vera-ui',
  brandTarget: '_self',

  // Colors
  colorPrimary: '#f8fafc',
  colorSecondary: '#94a3b8',

  // UI
  appBg: '#020817',
  appContentBg: '#020817',
  appPreviewBg: '#020817',
  appBorderColor: '#334155',
  appBorderRadius: 8,

  // Text colors
  textColor: '#f8fafc',
  textInverseColor: '#020817',

  // Toolbar default and active colors
  barTextColor: '#94a3b8',
  barSelectedColor: '#f8fafc',
  barHoverColor: '#cbd5e1',
  barBg: '#1e293b',

  // Form colors
  inputBg: '#1e293b',
  inputBorder: '#334155',
  inputTextColor: '#f8fafc',
  inputBorderRadius: 6,
});

// Export default light theme (Storybook manager uses this)
export default lightTheme;

// Export both themes for potential future use
export { lightTheme, darkTheme };
