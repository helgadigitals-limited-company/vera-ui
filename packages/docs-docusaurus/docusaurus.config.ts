import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Vera UI',
  tagline: 'A modern, accessible React component library built with Radix UI and Tailwind CSS',
  favicon: 'img/vera-logo.png',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://veraui.helgadigitals.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'helgadigitals', // Usually your GitHub org/user name.
  projectName: 'vera-ui', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/helgadigitals/vera-ui/tree/main/packages/docs-docusaurus/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/helgadigitals/vera-ui/tree/main/packages/docs-docusaurus/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  stylesheets: [
    '/css/vera-ui.css',
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/vera-logo.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Vera UI',
      logo: {
        alt: 'Vera UI Logo',
        src: 'img/vera-logo.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'componentsSidebar',
          position: 'left',
          label: 'Components',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Getting Started',
        },
        {
          href: 'https://github.com/helgadigitals/vera-ui',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://www.npmjs.com/package/@helgadigitals/vera-ui',
          label: 'npm',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs',
            },
            {
              label: 'Components',
              to: '/docs/components',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/helgadigitals/vera-ui',
            },
            {
              label: 'npm Package',
              href: 'https://www.npmjs.com/package/@helgadigitals/vera-ui',
            },
            {
              label: 'Contributing',
              to: '/docs/contributing/guidelines',
            },
          ],
        },
        {
          title: 'Built With',
          items: [
            {
              label: 'Radix UI',
              href: 'https://www.radix-ui.com/',
            },
            {
              label: 'Tailwind CSS',
              href: 'https://tailwindcss.com/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Helga Digitals. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
