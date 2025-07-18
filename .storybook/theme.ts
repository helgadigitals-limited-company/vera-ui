import { create } from '@storybook/theming';

export default create({
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
