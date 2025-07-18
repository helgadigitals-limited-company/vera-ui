# Vera UI

A modern, accessible, and customizable React component library built with **Radix UI** primitives and **Tailwind CSS**. Vera UI provides a comprehensive set of beautifully designed components that are ready to use in your React applications.

## Features

- 🎨 **Beautiful Design**: Clean, modern components with thoughtful design tokens
- ♿ **Accessibility First**: Built on Radix UI primitives for excellent accessibility
- 🎯 **TypeScript Support**: Fully typed components with excellent developer experience
- 🎭 **Theming**: Built-in dark/light theme support with easy customization
- 📱 **Responsive**: Mobile-first design with responsive variants
- 🧩 **Composable**: Flexible components that work well together
- 📚 **Storybook**: Comprehensive documentation and examples
- 🔧 **Developer Experience**: Excellent IDE support with autocomplete and type checking

## Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Radix UI** - Unstyled, accessible component primitives
- **Tailwind CSS 4** - Utility-first CSS framework
- **Class Variance Authority** - Component variant management
- **Lucide React** - Beautiful, customizable icons
- **Storybook** - Component documentation and testing
- **Vite** - Fast build tool and development server

## Components

Vera UI includes 45+ carefully crafted components organized into categories:

### Form Components

- **Button** - Primary, secondary, outline, ghost, and link variants
- **Input** - Text inputs with validation states and icons
- **Label** - Accessible form labels
- **Checkbox** - Custom styled checkboxes with indeterminate state
- **Select** - Dropdown selects with search and multi-select support
- **Radio Group** - Radio button groups
- **Switch** - Toggle switches
- **Textarea** - Multi-line text inputs

### Navigation Components

- **Tabs** - Horizontal and vertical tab navigation
- **Navigation Menu** - Dropdown navigation menus
- **Menubar** - Application menu bars
- **Breadcrumb** - Page navigation breadcrumbs
- **Pagination** - Data pagination controls

### Feedback Components

- **Alert** - Success, warning, error, and info alerts
- **Toast (Sonner)** - Notification toasts
- **Progress** - Progress bars and indicators
- **Skeleton** - Loading placeholders

### Data Display Components

- **Card** - Content containers
- **Table** - Data tables with sorting and filtering
- **Badge** - Status indicators and labels
- **Avatar** - User profile images with fallbacks

### Overlay Components

- **Dialog** - Modal dialogs
- **Popover** - Floating content containers
- **Sheet** - Slide-out panels
- **Drawer** - Mobile-friendly slide-up panels
- **Hover Card** - Hover-triggered content
- **Tooltip** - Contextual help text

### Layout Components

- **Sidebar** - Application sidebars
- **Resizable** - Resizable panel layouts
- **Accordion** - Collapsible content sections
- **Collapsible** - Simple show/hide content
- **Separator** - Visual content dividers
- **Scroll Area** - Custom scrollable areas

### Specialized Components

- **Calendar** - Date picker calendars
- **Chart** - Data visualization charts
- **Command** - Command palette interfaces
- **Multi-select** - Multiple item selection
- **Input OTP** - One-time password inputs

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/jibu-mwakilembe/vera-ui.git
cd vera-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Start Storybook
pnpm storybook
```

### Development Scripts

```bash
# Development
pnpm dev                 # Start Vite development server
pnpm storybook          # Start Storybook on localhost:6006

# Building
pnpm build              # Build for production
pnpm build-storybook    # Build Storybook for deployment

# Code Quality
pnpm lint               # Run ESLint
pnpm preview            # Preview production build
```

## Usage Example

```tsx
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";

export function LoginForm() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <Button className="w-full">Sign In</Button>
      </CardContent>
    </Card>
  );
}
```

## Theming

Vera UI supports both light and dark themes out of the box. The theme system is built on CSS custom properties and can be easily customized:

```tsx
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vera-ui-theme">
      <YourApp />
    </ThemeProvider>
  );
}
```

## Storybook

Comprehensive component documentation and examples are available in Storybook:

```bash
pnpm storybook
```

Visit `http://localhost:6006` to explore all components with:

- Interactive controls
- Multiple story variations
- Accessibility testing
- Design tokens
- Usage examples

## Project Structure

```
vera-ui/
├── src/
│   ├── components/
│   │   ├── theme-provider.tsx
│   │   └── ui/              # All UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   └── stories/             # Storybook stories
├── .storybook/              # Storybook configuration
├── public/                  # Static assets
└── storybook-static/        # Built Storybook
```

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `pnpm test`
5. Lint your code: `pnpm lint`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Adding New Components

1. Create the component in `src/components/ui/`
2. Add comprehensive Storybook stories
3. Include accessibility considerations
4. Update this README if needed
5. Add proper TypeScript types

## Design System

Vera UI follows a systematic approach to design:

- **Design Tokens**: Consistent spacing, typography, and color scales
- **Component Variants**: Multiple visual styles for different contexts
- **Responsive Design**: Mobile-first approach with breakpoint considerations
- **Accessibility**: WCAG 2.1 compliance with proper ARIA attributes
- **Dark Mode**: Built-in support for light and dark themes

## Browser Support

- Chrome ≥ 90
- Firefox ≥ 88
- Safari ≥ 14
- Edge ≥ 90

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- [Radix UI](https://www.radix-ui.com/) - For excellent accessibility primitives
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework
- [Lucide](https://lucide.dev/) - For beautiful icons
- [shadcn/ui](https://ui.shadcn.com/) - For design inspiration

---

Built with ❤️ for the React community
