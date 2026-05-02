# Graph Report - .  (2026-05-02)

## Corpus Check
- 175 files · ~101,781 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 624 nodes · 706 edges · 24 communities detected
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.79)
- Token cost: 18,500 input · 4,200 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Core UI Examples Hub|Core UI Examples Hub]]
- [[_COMMUNITY_UI Component Library Core|UI Component Library Core]]
- [[_COMMUNITY_Build & Docs Infrastructure|Build & Docs Infrastructure]]
- [[_COMMUNITY_Form System & Design Guidelines|Form System & Design Guidelines]]
- [[_COMMUNITY_File Upload Utilities|File Upload Utilities]]
- [[_COMMUNITY_Source Code Extractor|Source Code Extractor]]
- [[_COMMUNITY_Sidebar Navigation System|Sidebar Navigation System]]
- [[_COMMUNITY_Form Input Examples|Form Input Examples]]
- [[_COMMUNITY_Utility Functions|Utility Functions]]
- [[_COMMUNITY_Form Examples|Form Examples]]
- [[_COMMUNITY_Textarea Examples|Textarea Examples]]
- [[_COMMUNITY_Combobox Selection Handlers|Combobox Selection Handlers]]
- [[_COMMUNITY_Multi-Select Handlers|Multi-Select Handlers]]
- [[_COMMUNITY_Sidebar Type Definitions|Sidebar Type Definitions]]
- [[_COMMUNITY_Vite Build Assets|Vite Build Assets]]
- [[_COMMUNITY_React Brand Assets|React Brand Assets]]
- [[_COMMUNITY_Vera UI Brand Identity|Vera UI Brand Identity]]
- [[_COMMUNITY_Carousel Component|Carousel Component]]
- [[_COMMUNITY_Theme & Toast Provider|Theme & Toast Provider]]
- [[_COMMUNITY_Extracted Code Cache|Extracted Code Cache]]
- [[_COMMUNITY_App Examples Index|App Examples Index]]
- [[_COMMUNITY_Root Changelog|Root Changelog]]
- [[_COMMUNITY_Favicon README|Favicon README]]
- [[_COMMUNITY_String Split Utility|String Split Utility]]

## God Nodes (most connected - your core abstractions)
1. `lucide-react Icon Library` - 51 edges
2. `@helgadigitals/vera-ui Package` - 21 edges
3. `React Hook Form` - 15 edges
4. `packages/ui (@helgadigitals/vera-ui)` - 14 edges
5. `Table Component` - 12 edges
6. `AutoExtractPreview Component` - 11 edges
7. `Contributing Guide` - 10 edges
8. `Form Component System` - 10 edges
9. `RadioGroup Component` - 9 edges
10. `Forms Components Index` - 9 edges

## Surprising Connections (you probably didn't know these)
- `AutoExtractPreview Component` --semantically_similar_to--> `Component Documentation Template`  [INFERRED] [semantically similar]
  CLAUDE.md → packages/docs/COMPONENT_DOCUMENTATION_TEMPLATE.md
- `Docker-based Deployment Setup` --semantically_similar_to--> `Docker Guide for Vera UI Docs`  [INFERRED] [semantically similar]
  DOCKER_DEPLOYMENT.md → DOCKER.md
- `onSubmit()` --calls--> `Alert()`  [INFERRED]
  docs/components/form-components-examples/radio-group-examples.tsx → ui/src/components/ui/alert.tsx
- `onSubmit()` --calls--> `Alert()`  [INFERRED]
  docs/components/form-components-examples/input-otp-examples.tsx → ui/src/components/ui/alert.tsx
- `handleResend()` --calls--> `Alert()`  [INFERRED]
  docs/components/form-components-examples/input-otp-examples.tsx → ui/src/components/ui/alert.tsx

## Hyperedges (group relationships)
- **Documentation Build Pipeline** — claude_extract_code_script, componentpreview_extracted_code_json, claude_packages_docs [EXTRACTED 0.95]
- **Sidebar Navigation Type System** — claude_sidebaritem_type, claude_group_type, claude_mixedsidebaritem_type, sidebar_reusablesidebar [EXTRACTED 1.00]
- **Component Library Technology Stack** — claude_radix_ui, claude_tailwind_v4, claude_cva, claude_packages_ui [EXTRACTED 1.00]
- **Form Controls with Radix UI Accessibility Pattern** — checkbox_component, switch_component, radiogroup_component, label_component, radix_ui_primitives [EXTRACTED 0.95]
- **Data Table and Pagination Pattern for Tabular Data** — datatable_component, table_component, pagination_component [EXTRACTED 0.90]
- **User Feedback and Notification Components Pattern** — alert_component, toast_component, badge_component [INFERRED 0.75]
- **Form System: React Hook Form + Zod + Form Components** — form_component, form_react_hook_form, form_zod_integration, form_formfield [EXTRACTED 1.00]
- **Sidebar Type System: SidebarItem, Group, MixedSidebarItem, Type Guards** — sidebar_item_type, sidebar_group_type, sidebar_mixed_item_type, utils_isgrouparray, utils_ismixedarray, utils_isgroup, utils_issidebaritem [EXTRACTED 1.00]
- **Component Styling Pattern: cn + cva + Tailwind CSS v4** — utils_cn, contributing_cva, installation_tailwindcss_v4 [INFERRED 0.85]

## Communities

### Community 0 - "Core UI Examples Hub"
Cohesion: 0.02
Nodes (8): AlertDescription, AlertTitle, Alert Component, HomePage(), getVeraUiLatestVersion(), lucide-react Icon Library, SidebarLayout Component, MixedSidebarItem Type

### Community 1 - "UI Component Library Core"
Cohesion: 0.07
Nodes (47): AccordionContent, AccordionItem, AccordionTrigger, Accordion Component, AutoExtractPreview Component, AvatarFallback, AvatarImage, Avatar Component (+39 more)

### Community 2 - "Build & Docs Infrastructure"
Cohesion: 0.07
Nodes (47): AutoExtractPreview Component, Library Build Output (dist/), cn() Utility (clsx + tailwind-merge), class-variance-authority (cva), pnpm extract-code Script, Fumadocs MDX, Vera UI Monorepo (pnpm workspace), packages/docs (Next.js Documentation Site) (+39 more)

### Community 3 - "Form System & Design Guidelines"
Cohesion: 0.07
Nodes (40): Combobox Component, Combobox Option Object, Combobox Built-in Search Functionality, Component Development Template, class-variance-authority (cva) Component Pattern, Contributing Guidelines, Radix UI Primitives for Components, Form Component System (+32 more)

### Community 4 - "File Upload Utilities"
Cohesion: 0.16
Nodes (14): createFileWithPreview(), generateFileId(), getFileIcon(), handleDrop(), handleInputChange(), isArchive(), isAudio(), isDocument() (+6 more)

### Community 5 - "Source Code Extractor"
Cohesion: 0.25
Nodes (7): extractFunction(), extractFunctionFromFile(), extractImports(), getCachedComponentSource(), getComponentSource(), CodeExtractor, main()

### Community 6 - "Sidebar Navigation System"
Cohesion: 0.24
Nodes (15): Group Type, MixedSidebarItem Type, react-router-dom, Sidebar Component System, SidebarItem Type, lucide-react (Icon Library), Navigation Components Overview, Reusable Sidebar Component Documentation (+7 more)

### Community 7 - "Form Input Examples"
Cohesion: 0.17
Nodes (5): handleResend(), onSubmit(), onSubmit(), onSubmit(), Alert()

### Community 14 - "Utility Functions"
Cohesion: 0.29
Nodes (2): isGroup(), isMixedArray()

### Community 16 - "Form Examples"
Cohesion: 0.29
Nodes (2): checkUsernameAvailability(), handleUsernameChange()

### Community 17 - "Textarea Examples"
Cohesion: 0.32
Nodes (4): handleChange(), handleKeyDown(), handleSend(), validateInput()

### Community 20 - "Combobox Selection Handlers"
Cohesion: 0.33
Nodes (2): cn(), renderButtonContent()

### Community 21 - "Multi-Select Handlers"
Cohesion: 0.33
Nodes (2): handleClear(), toggleAll()

### Community 27 - "Sidebar Type Definitions"
Cohesion: 0.33
Nodes (7): Sidebar Group Type, SidebarItem Type, MixedSidebarItem Type, isGroup Type Guard, isGroupArray Type Guard, isMixedArray Type Guard, isSidebarItem Type Guard

### Community 28 - "Vite Build Assets"
Cohesion: 0.33
Nodes (7): Vite Build Tool, Cyan-to-Purple Gradient (Outer Chevron), Yellow-to-Orange Gradient (Inner Flame), Iconify Logos Icon Set, Vite Logo SVG, Public Static Asset, Component Library Package (packages/ui)

### Community 29 - "React Brand Assets"
Cohesion: 0.47
Nodes (6): Iconify Logos Icon Set, React Atomic/Orbital Icon, React Brand Identity, React Cyan Color (#00D8FF), React Logo, Vite Scaffold Default Asset

### Community 30 - "Vera UI Brand Identity"
Cohesion: 0.47
Nodes (6): Blue Brand Color (#0066FF), Circuit Board Pattern, Documentation Concept, Vera UI Logo, Open Book Icon, Technology / Digital Concept

### Community 32 - "Carousel Component"
Cohesion: 0.5
Nodes (2): CarouselNext(), useCarousel()

### Community 45 - "Theme & Toast Provider"
Cohesion: 0.5
Nodes (2): useTheme(), Toaster()

### Community 46 - "Extracted Code Cache"
Cohesion: 0.67
Nodes (2): getExtractedCode(), hasExtractedCode()

### Community 50 - "App Examples Index"
Cohesion: 0.67
Nodes (3): Authentication Forms Example, Dashboard Layout Example, Examples Index Page

### Community 95 - "Root Changelog"
Cohesion: 1.0
Nodes (1): Vera UI Root CHANGELOG

### Community 96 - "Favicon README"
Cohesion: 1.0
Nodes (1): Favicon Setup README

### Community 97 - "String Split Utility"
Cohesion: 1.0
Nodes (1): splitStringByUnderscore Utility

## Knowledge Gaps
- **67 isolated node(s):** `Library Build Output (dist/)`, `Vera UI Root CHANGELOG`, `GitHub Actions Workflow (docs-deploy.yml)`, `vera-ui-docs Docker Container`, `Health Endpoint (/api/health)` (+62 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Utility Functions`** (8 nodes): `cn()`, `isGroup()`, `isGroupArray()`, `isMixedArray()`, `isSidebarItem()`, `splitStringByUnderscore()`, `transformToSelectOptions()`, `utils.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Form Examples`** (8 nodes): `form-examples.tsx`, `addEmail()`, `checkUsernameAvailability()`, `handleUsernameChange()`, `onSubmit()`, `removeEmail()`, `updateEmail()`, `validateForm()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Combobox Selection Handlers`** (7 nodes): `cn()`, `handleClear()`, `handleInputKeyDown()`, `handleSelectOption()`, `handleTogglePopover()`, `renderButtonContent()`, `combobox.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Multi-Select Handlers`** (7 nodes): `clearExtraOptions()`, `handleClear()`, `handleInputKeyDown()`, `handleTogglePopover()`, `toggleAll()`, `toggleOption()`, `Multi-select.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Carousel Component`** (5 nodes): `Carousel()`, `CarouselNext()`, `cn()`, `useCarousel()`, `carousel.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Theme & Toast Provider`** (4 nodes): `useTheme()`, `Toaster()`, `sonner.tsx`, `use-theme.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Extracted Code Cache`** (4 nodes): `extracted-code-utils.ts`, `getAllExtractedCode()`, `getExtractedCode()`, `hasExtractedCode()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Root Changelog`** (1 nodes): `Vera UI Root CHANGELOG`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Favicon README`** (1 nodes): `Favicon Setup README`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `String Split Utility`** (1 nodes): `splitStringByUnderscore Utility`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `lucide-react Icon Library` connect `Core UI Examples Hub` to `UI Component Library Core`, `File Upload Utilities`, `Form Input Examples`, `Select Component`, `Sheet Component`, `Menubar Component`, `Toast Examples`, `Menubar Examples`, `Textarea Examples`, `App Pages & Routing`, `Pagination Component`, `Combobox Selection Handlers`, `Multi-Select Handlers`, `Breadcrumb Component`, `Card Examples`, `Sidebar Examples`, `Select Examples`, `TabsContainer Core`, `Carousel Component`, `Context Menu Component`, `Button Examples`?**
  _High betweenness centrality (0.244) - this node is a cross-community bridge._
- **Why does `React Hook Form` connect `UI Component Library Core` to `Form Primitives`, `Form Input Examples`, `Form Examples`, `Textarea Examples`, `Checkbox Examples`, `Select Examples`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Why does `@helgadigitals/vera-ui Package` connect `UI Component Library Core` to `Core UI Examples Hub`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `Library Build Output (dist/)`, `Vera UI Root CHANGELOG`, `GitHub Actions Workflow (docs-deploy.yml)` to the rest of the system?**
  _67 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core UI Examples Hub` be split into smaller, more focused modules?**
  _Cohesion score 0.02 - nodes in this community are weakly interconnected._
- **Should `UI Component Library Core` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Build & Docs Infrastructure` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._