## [2.4.0](https://github.com/helgadigitals-limited-company/vera-ui/compare/v2.3.3...v2.4.0) (2025-09-16)

### 🚀 Features

* add 'use client' directive to multiple components and hooks ([e28b5e0](https://github.com/helgadigitals-limited-company/vera-ui/commit/e28b5e0482168b627891f5586b96fa53c2dc8952))
* add @emotion/is-prop-valid dependency to package.json and pnpm-lock.yaml ([b8c9c4f](https://github.com/helgadigitals-limited-company/vera-ui/commit/b8c9c4fc765a9ee3afb0c0b33036b3ab10f62328))
* add Copilot instructions for Vera UI architecture and development patterns ([cd8cb4b](https://github.com/helgadigitals-limited-company/vera-ui/commit/cd8cb4b82ca96a663bd2720a42cf57e5fe62f9bd))
* add DataTable component and utility functions for string manipulation ([a033981](https://github.com/helgadigitals-limited-company/vera-ui/commit/a033981bb461d873769f85029c20dd9a2c22389b))
* add GitHub Actions workflows for deploying documentation and managing releases ([7e1c960](https://github.com/helgadigitals-limited-company/vera-ui/commit/7e1c960775f321d4ed46e14a119660a365215850))
* add pnpm installation step in docs deployment workflow ([86a85e9](https://github.com/helgadigitals-limited-company/vera-ui/commit/86a85e9d7f83da36d423ca289dcd1bd7e2a10eca))
* **component:** add reusable sidebar component and layout with theming support ([0c5a088](https://github.com/helgadigitals-limited-company/vera-ui/commit/0c5a088f41891820f1ec38b501e64af6273a315d))
* **DataTable:** add loading and empty state handling ([4266553](https://github.com/helgadigitals-limited-company/vera-ui/commit/4266553f630eb2dad6e6adda8f7de97080c06eda))
* **docs:** add meta file for Data Display component documentation ([5b654c0](https://github.com/helgadigitals-limited-company/vera-ui/commit/5b654c07886b094dfbb097c24b0e6591ee84c582))
* **docs:** add meta files for components, contributing, examples, and getting started sections ([7c3fe03](https://github.com/helgadigitals-limited-company/vera-ui/commit/7c3fe037a3340f65f0c402b18dda55cdfdbbae35))
* **docs:** add shared layout and source configuration files ([8379608](https://github.com/helgadigitals-limited-company/vera-ui/commit/8379608aebca84744ba27755095ff6a888ff876e))
* **docs:** add Switch and Textarea components with comprehensive documentation ([476e40a](https://github.com/helgadigitals-limited-company/vera-ui/commit/476e40a329c666d804ea076cc4086e1764f1f96d))
* **docs:** enhance form component documentation with examples and previews ([527965c](https://github.com/helgadigitals-limited-company/vera-ui/commit/527965c74260c1c1021c2aab7cc012c1c5594c8f))
* **docs:** restore meta.json for Navigation Components with complete page list ([e59ea53](https://github.com/helgadigitals-limited-company/vera-ui/commit/e59ea53194327e6fec0f90e59da992914297db72))
* **docs:** update Button documentation and examples for clarity and consistency ([d177342](https://github.com/helgadigitals-limited-company/vera-ui/commit/d17734240f492209b2aceb0e6b7e79afa6c63c81))
* **docs:** Update installation guide and enhance documentation structure ([9b7cdaf](https://github.com/helgadigitals-limited-company/vera-ui/commit/9b7cdaf837c2ea5fa4b9cddac1a54f1c9db6d4aa))
* **Pagination:** add Pagination component with page navigation and page size selection ([1ada997](https://github.com/helgadigitals-limited-company/vera-ui/commit/1ada99724fbe382ec4c47fc8e0569f0d843abdd0))
* removed support for tailwindcss v4, together with other things ([822c77d](https://github.com/helgadigitals-limited-company/vera-ui/commit/822c77db8d377d22a11d33f80bf66ba0ec82e59d))
* reorganize pages in meta.json and update installation instructions in Tabs Container documentation ([fef63bb](https://github.com/helgadigitals-limited-company/vera-ui/commit/fef63bb9debb14ec49ab12f3ba43930ff2eeab79))
* **Sidebar:** add optional icons for groups and enhance mixed content support ([242b942](https://github.com/helgadigitals-limited-company/vera-ui/commit/242b942910613e8fc6e0449b0968d922a1ad1196))
* **theme:** created and added the theme-toggle.tsx component ([c5a4e74](https://github.com/helgadigitals-limited-company/vera-ui/commit/c5a4e7496ddcc33055ea7b4bc54207c6c7c3709f))
* update Sidebar and SidebarLayout components for improved icon handling and add stories for SidebarLayout ([81afd9b](https://github.com/helgadigitals-limited-company/vera-ui/commit/81afd9b9e6514db31b3157d3575056d29c004ef7))

### 🐛 Bug Fixes

* add react, react-dom, and react-router-dom as devDependencies with updated peer dependency specifications ([266b55a](https://github.com/helgadigitals-limited-company/vera-ui/commit/266b55a6f49c04895796825f21328c5177eea20a))
* added react router dom as a dependecey ([78421c2](https://github.com/helgadigitals-limited-company/vera-ui/commit/78421c2bd33c910e28099ef92b4cf8a995c1bd64))
* **DataTable:** add single/multiple selection modes with max selections support ([4108240](https://github.com/helgadigitals-limited-company/vera-ui/commit/4108240ffd284383bc222a7d23a8b469b873547e))
* **DataTable:** enhance row selection accessibility and styling ([bd1f64d](https://github.com/helgadigitals-limited-company/vera-ui/commit/bd1f64d32d6216852dcca1ff8051d32db6a5b116))
* **DataTable:** implement dropdown menu for action buttons instead of Buttons as earlier ([bc1864b](https://github.com/helgadigitals-limited-company/vera-ui/commit/bc1864bab5856fa7af35d35ba59b14797f55593d))
* **docs:** correct meta file reference in documentation patterns ([d8fef82](https://github.com/helgadigitals-limited-company/vera-ui/commit/d8fef8209484a5e0016ede8d0d1af43bcf0f2b90))
* remove react-dom from dependencies ([c5f9922](https://github.com/helgadigitals-limited-company/vera-ui/commit/c5f9922f67c30f325c4da8a5b22f2c87a0c851d3))
* **Sidebar:** add support for mixed arrays of SidebarItems and Groups ([c99e09b](https://github.com/helgadigitals-limited-company/vera-ui/commit/c99e09b8950ad2b678700d730c0d9c38ab83f666))
* **Sidebar:** adjust Chevron position for improved layout ([5c9939f](https://github.com/helgadigitals-limited-company/vera-ui/commit/5c9939f9654c827fec125301941c7f2d9acedaaa))
* **Sidebar:** enhance mixed array handling and preserve item order ([acbd017](https://github.com/helgadigitals-limited-company/vera-ui/commit/acbd017a2cc5ad80d1fe654b3152d3af9a657c36))
* **Sidebar:** implement group functionality for sidebar items with persistent open/closed state ([5171942](https://github.com/helgadigitals-limited-company/vera-ui/commit/5171942a626bef843fedf9269d9f2de654733b2b))
* **SidebarLayout:** add relative positioning to the main content wrapper ([9cb7e02](https://github.com/helgadigitals-limited-company/vera-ui/commit/9cb7e0241d14df1cf4c00b45441f4d3b720efb23))
* **Sidebar:** refactor sidebar item rendering to use SidebarNavItem component, for better managing active routes with some styling to show that it is active ([c3d4ade](https://github.com/helgadigitals-limited-company/vera-ui/commit/c3d4ade909146a86273ef602c123d3a2365d0e71))
* **tsconfig:** ensure strict mode and consistent casing are enforced ([50ea1f2](https://github.com/helgadigitals-limited-company/vera-ui/commit/50ea1f2bd1e31eefcad10ce5ee44b55e05a9d2e2))
* update lockfile after peer dep changes" ([ad74684](https://github.com/helgadigitals-limited-company/vera-ui/commit/ad74684f04905f74d7f5ee94d80aeab64ebe8771))
* update package name and description for consistency ([b022184](https://github.com/helgadigitals-limited-company/vera-ui/commit/b0221840a25aa1af74182aeb10a42cd818d2ee9b))
* update peer dependencies for react and react-dom, and make react-router-dom optional ([d043cf7](https://github.com/helgadigitals-limited-company/vera-ui/commit/d043cf7984c3379ad1a1e30fe2de32194a83afac))
* update peer dependencies in package.json and clean up unused dependencies in vite.config.ts ([60b27e7](https://github.com/helgadigitals-limited-company/vera-ui/commit/60b27e77543f2362e81eae2bc27af8b36dd5f138))
* update sidebar color variables for improved accessibility ([24b2195](https://github.com/helgadigitals-limited-company/vera-ui/commit/24b2195f5f6bf5772ff896284fb4f0134f033428))

### 📚 Documentation

* update Installation and Introduction documentation for clarity and structure ([745c350](https://github.com/helgadigitals-limited-company/vera-ui/commit/745c350bd2049819bcc37d091e92cf7c183de05b))

### ♻️ Refactoring

* **docs:** remove Sidebar documentation to streamline content ([d0757a9](https://github.com/helgadigitals-limited-company/vera-ui/commit/d0757a9151dacb968e767ab4a376eed1ab07a418))
* **docs:** update Tailwind CSS support documentation and remove v3 build script ([44d5c64](https://github.com/helgadigitals-limited-company/vera-ui/commit/44d5c641efc641a65ee258e11b0ff981fdda414f))
* remove react-router-dom dependency and update SidebarLayout to use children prop ([f912b20](https://github.com/helgadigitals-limited-company/vera-ui/commit/f912b204a6aa7bdca32866db4a3ed703c76c7723))
* remove unused PostCSS and Tailwind configuration files ([dd0580a](https://github.com/helgadigitals-limited-company/vera-ui/commit/dd0580a864ebd8bda3ddf310c08295fb1cef0ee3))
* remove unused Tailwind and PostCSS configuration files from package.json ([f0e1729](https://github.com/helgadigitals-limited-company/vera-ui/commit/f0e172988d9b38b553a4d1bf21310c872151833d))
* remove unused theme context and utility functions ([17402e7](https://github.com/helgadigitals-limited-company/vera-ui/commit/17402e744ba948718f9a50b08fb445a037ecb472))

## [2.4.0](https://github.com/helgadigitals-limited-company/vera-ui/compare/v2.3.3...v2.4.0) (2025-09-16)

### 🚀 Features

* add 'use client' directive to multiple components and hooks ([e28b5e0](https://github.com/helgadigitals-limited-company/vera-ui/commit/e28b5e0482168b627891f5586b96fa53c2dc8952))
* add @emotion/is-prop-valid dependency to package.json and pnpm-lock.yaml ([b8c9c4f](https://github.com/helgadigitals-limited-company/vera-ui/commit/b8c9c4fc765a9ee3afb0c0b33036b3ab10f62328))
* add Copilot instructions for Vera UI architecture and development patterns ([cd8cb4b](https://github.com/helgadigitals-limited-company/vera-ui/commit/cd8cb4b82ca96a663bd2720a42cf57e5fe62f9bd))
* add DataTable component and utility functions for string manipulation ([a033981](https://github.com/helgadigitals-limited-company/vera-ui/commit/a033981bb461d873769f85029c20dd9a2c22389b))
* add GitHub Actions workflows for deploying documentation and managing releases ([7e1c960](https://github.com/helgadigitals-limited-company/vera-ui/commit/7e1c960775f321d4ed46e14a119660a365215850))
* **component:** add reusable sidebar component and layout with theming support ([0c5a088](https://github.com/helgadigitals-limited-company/vera-ui/commit/0c5a088f41891820f1ec38b501e64af6273a315d))
* **DataTable:** add loading and empty state handling ([4266553](https://github.com/helgadigitals-limited-company/vera-ui/commit/4266553f630eb2dad6e6adda8f7de97080c06eda))
* **docs:** add meta file for Data Display component documentation ([5b654c0](https://github.com/helgadigitals-limited-company/vera-ui/commit/5b654c07886b094dfbb097c24b0e6591ee84c582))
* **docs:** add meta files for components, contributing, examples, and getting started sections ([7c3fe03](https://github.com/helgadigitals-limited-company/vera-ui/commit/7c3fe037a3340f65f0c402b18dda55cdfdbbae35))
* **docs:** add shared layout and source configuration files ([8379608](https://github.com/helgadigitals-limited-company/vera-ui/commit/8379608aebca84744ba27755095ff6a888ff876e))
* **docs:** add Switch and Textarea components with comprehensive documentation ([476e40a](https://github.com/helgadigitals-limited-company/vera-ui/commit/476e40a329c666d804ea076cc4086e1764f1f96d))
* **docs:** enhance form component documentation with examples and previews ([527965c](https://github.com/helgadigitals-limited-company/vera-ui/commit/527965c74260c1c1021c2aab7cc012c1c5594c8f))
* **docs:** restore meta.json for Navigation Components with complete page list ([e59ea53](https://github.com/helgadigitals-limited-company/vera-ui/commit/e59ea53194327e6fec0f90e59da992914297db72))
* **docs:** update Button documentation and examples for clarity and consistency ([d177342](https://github.com/helgadigitals-limited-company/vera-ui/commit/d17734240f492209b2aceb0e6b7e79afa6c63c81))
* **docs:** Update installation guide and enhance documentation structure ([9b7cdaf](https://github.com/helgadigitals-limited-company/vera-ui/commit/9b7cdaf837c2ea5fa4b9cddac1a54f1c9db6d4aa))
* **Pagination:** add Pagination component with page navigation and page size selection ([1ada997](https://github.com/helgadigitals-limited-company/vera-ui/commit/1ada99724fbe382ec4c47fc8e0569f0d843abdd0))
* removed support for tailwindcss v4, together with other things ([822c77d](https://github.com/helgadigitals-limited-company/vera-ui/commit/822c77db8d377d22a11d33f80bf66ba0ec82e59d))
* reorganize pages in meta.json and update installation instructions in Tabs Container documentation ([fef63bb](https://github.com/helgadigitals-limited-company/vera-ui/commit/fef63bb9debb14ec49ab12f3ba43930ff2eeab79))
* **Sidebar:** add optional icons for groups and enhance mixed content support ([242b942](https://github.com/helgadigitals-limited-company/vera-ui/commit/242b942910613e8fc6e0449b0968d922a1ad1196))
* **theme:** created and added the theme-toggle.tsx component ([c5a4e74](https://github.com/helgadigitals-limited-company/vera-ui/commit/c5a4e7496ddcc33055ea7b4bc54207c6c7c3709f))
* update Sidebar and SidebarLayout components for improved icon handling and add stories for SidebarLayout ([81afd9b](https://github.com/helgadigitals-limited-company/vera-ui/commit/81afd9b9e6514db31b3157d3575056d29c004ef7))

### 🐛 Bug Fixes

* add react, react-dom, and react-router-dom as devDependencies with updated peer dependency specifications ([266b55a](https://github.com/helgadigitals-limited-company/vera-ui/commit/266b55a6f49c04895796825f21328c5177eea20a))
* added react router dom as a dependecey ([78421c2](https://github.com/helgadigitals-limited-company/vera-ui/commit/78421c2bd33c910e28099ef92b4cf8a995c1bd64))
* **DataTable:** add single/multiple selection modes with max selections support ([4108240](https://github.com/helgadigitals-limited-company/vera-ui/commit/4108240ffd284383bc222a7d23a8b469b873547e))
* **DataTable:** enhance row selection accessibility and styling ([bd1f64d](https://github.com/helgadigitals-limited-company/vera-ui/commit/bd1f64d32d6216852dcca1ff8051d32db6a5b116))
* **DataTable:** implement dropdown menu for action buttons instead of Buttons as earlier ([bc1864b](https://github.com/helgadigitals-limited-company/vera-ui/commit/bc1864bab5856fa7af35d35ba59b14797f55593d))
* **docs:** correct meta file reference in documentation patterns ([d8fef82](https://github.com/helgadigitals-limited-company/vera-ui/commit/d8fef8209484a5e0016ede8d0d1af43bcf0f2b90))
* remove react-dom from dependencies ([c5f9922](https://github.com/helgadigitals-limited-company/vera-ui/commit/c5f9922f67c30f325c4da8a5b22f2c87a0c851d3))
* **Sidebar:** add support for mixed arrays of SidebarItems and Groups ([c99e09b](https://github.com/helgadigitals-limited-company/vera-ui/commit/c99e09b8950ad2b678700d730c0d9c38ab83f666))
* **Sidebar:** adjust Chevron position for improved layout ([5c9939f](https://github.com/helgadigitals-limited-company/vera-ui/commit/5c9939f9654c827fec125301941c7f2d9acedaaa))
* **Sidebar:** enhance mixed array handling and preserve item order ([acbd017](https://github.com/helgadigitals-limited-company/vera-ui/commit/acbd017a2cc5ad80d1fe654b3152d3af9a657c36))
* **Sidebar:** implement group functionality for sidebar items with persistent open/closed state ([5171942](https://github.com/helgadigitals-limited-company/vera-ui/commit/5171942a626bef843fedf9269d9f2de654733b2b))
* **SidebarLayout:** add relative positioning to the main content wrapper ([9cb7e02](https://github.com/helgadigitals-limited-company/vera-ui/commit/9cb7e0241d14df1cf4c00b45441f4d3b720efb23))
* **Sidebar:** refactor sidebar item rendering to use SidebarNavItem component, for better managing active routes with some styling to show that it is active ([c3d4ade](https://github.com/helgadigitals-limited-company/vera-ui/commit/c3d4ade909146a86273ef602c123d3a2365d0e71))
* **tsconfig:** ensure strict mode and consistent casing are enforced ([50ea1f2](https://github.com/helgadigitals-limited-company/vera-ui/commit/50ea1f2bd1e31eefcad10ce5ee44b55e05a9d2e2))
* update lockfile after peer dep changes" ([ad74684](https://github.com/helgadigitals-limited-company/vera-ui/commit/ad74684f04905f74d7f5ee94d80aeab64ebe8771))
* update package name and description for consistency ([b022184](https://github.com/helgadigitals-limited-company/vera-ui/commit/b0221840a25aa1af74182aeb10a42cd818d2ee9b))
* update peer dependencies for react and react-dom, and make react-router-dom optional ([d043cf7](https://github.com/helgadigitals-limited-company/vera-ui/commit/d043cf7984c3379ad1a1e30fe2de32194a83afac))
* update peer dependencies in package.json and clean up unused dependencies in vite.config.ts ([60b27e7](https://github.com/helgadigitals-limited-company/vera-ui/commit/60b27e77543f2362e81eae2bc27af8b36dd5f138))
* update sidebar color variables for improved accessibility ([24b2195](https://github.com/helgadigitals-limited-company/vera-ui/commit/24b2195f5f6bf5772ff896284fb4f0134f033428))

### 📚 Documentation

* update Installation and Introduction documentation for clarity and structure ([745c350](https://github.com/helgadigitals-limited-company/vera-ui/commit/745c350bd2049819bcc37d091e92cf7c183de05b))

### ♻️ Refactoring

* **docs:** remove Sidebar documentation to streamline content ([d0757a9](https://github.com/helgadigitals-limited-company/vera-ui/commit/d0757a9151dacb968e767ab4a376eed1ab07a418))
* **docs:** update Tailwind CSS support documentation and remove v3 build script ([44d5c64](https://github.com/helgadigitals-limited-company/vera-ui/commit/44d5c641efc641a65ee258e11b0ff981fdda414f))
* remove react-router-dom dependency and update SidebarLayout to use children prop ([f912b20](https://github.com/helgadigitals-limited-company/vera-ui/commit/f912b204a6aa7bdca32866db4a3ed703c76c7723))
* remove unused PostCSS and Tailwind configuration files ([dd0580a](https://github.com/helgadigitals-limited-company/vera-ui/commit/dd0580a864ebd8bda3ddf310c08295fb1cef0ee3))
* remove unused Tailwind and PostCSS configuration files from package.json ([f0e1729](https://github.com/helgadigitals-limited-company/vera-ui/commit/f0e172988d9b38b553a4d1bf21310c872151833d))
* remove unused theme context and utility functions ([17402e7](https://github.com/helgadigitals-limited-company/vera-ui/commit/17402e744ba948718f9a50b08fb445a037ecb472))
