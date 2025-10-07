

import Link from 'next/link';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge } from '@helgadigitals/vera-ui';
import { ArrowRight } from 'lucide-react';

const getVeraUiLatestVersion = async () => {
  try {
    const res = await fetch("https://registry.npmjs.org/@helgadigitals/vera-ui/latest", {
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    if (!res.ok) return "1.0.0";
    const data = await res.json();
    return data.version || "1.0.0";
  } catch {
    return "1.0.0";
  }
}

export default async function HomePage() {
  const version = await getVeraUiLatestVersion();


  return (
    <main className="bg-fade-grid min-h-screen w-full relative">
      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 dark:from-primary/10 dark:to-accent/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <Badge variant="outline" className="mb-8 gap-2 px-4 py-1.5">
              <span className="inline-block size-2 bg-primary rounded-full animate-pulse"></span>
              Latest version : {version}
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-primary to-accent-foreground bg-clip-text text-transparent mb-6">
              Vera UI
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Build beautiful, accessible React applications with a comprehensive component library designed for modern development workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button asChild size="lg">
                <Link href="/docs/getting-started/installation">
                  Get Started
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/docs/components">
                  View Components
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Components</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">TypeScript</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">A11Y</div>
                <div className="text-sm text-muted-foreground">Accessible</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">WCAG</div>
                <div className="text-sm text-muted-foreground">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Vera UI?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for modern teams who need reliable, accessible, and beautiful components
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <CardTitle className="mb-2">Design System Ready</CardTitle>
                <CardDescription>Built with design tokens and theming. Consistent spacing, typography, and color systems across all components.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">♿</span>
                </div>
                <CardTitle className="mb-2">Accessibility First</CardTitle>
                <CardDescription>Every component follows WCAG guidelines with proper ARIA attributes, keyboard navigation, and screen reader support.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔧</span>
                </div>
                <CardTitle className="mb-2">Highly Customizable</CardTitle>
                <CardDescription>Extensive customization options with CSS variables, Tailwind CSS integration, and component composition patterns.</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="size-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📱</span>
                </div>
                <CardTitle className="mb-2">Responsive by Default</CardTitle>
                <CardDescription>All components work seamlessly across different screen sizes and devices with mobile-first design principles.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Component Categories */}
      <section className="relative z-10 py-24 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Component Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive collection of components organized by functionality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/docs/components/forms" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📝</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">Forms</CardTitle>
                  </div>
                  <CardDescription>Input controls, validation, and form management components for user interaction.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/docs/components/navigation" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🧭</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">Navigation</CardTitle>
                  </div>
                  <CardDescription>Sidebar, menus, breadcrumbs, and navigation patterns for site navigation.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/docs/components/data-display" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">📊</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">Data Display</CardTitle>
                  </div>
                  <CardDescription>Tables, cards, badges, and components for presenting information beautifully.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/docs/components/layout" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🏗️</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">Layout</CardTitle>
                  </div>
                  <CardDescription>Grid systems, containers, and structural components for page organization.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/docs/components/feedback" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">💬</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">Feedback</CardTitle>
                  </div>
                  <CardDescription>Alerts, toasts, progress bars, and components for user feedback.</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/docs/components/overlays" className="group">
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-lg">🎭</span>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">Overlays</CardTitle>
                  </div>
                  <CardDescription>Modals, popovers, tooltips, and components that appear above other content.</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="relative z-10 py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Quick Start
            </h2>
            <p className="text-lg text-muted-foreground">
              Get up and running with Vera UI in minutes
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Install the package</h3>
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <code className="text-sm text-foreground font-mono">npm install @helgadigitals/vera-ui</code>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Import and use components</h3>
                <div className="bg-muted/50 rounded-lg p-4 border">
                  <pre className="text-sm text-foreground font-mono overflow-x-auto">
{`import { Button, Card, CardContent, CardHeader, CardTitle } from '@helgadigitals/vera-ui'

function App() {
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Hello Vera UI</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Get Started</Button>
      </CardContent>
    </Card>
  )
}`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 size-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-2">Start building</h3>
                <p className="text-muted-foreground">
                  Explore our comprehensive component library and build amazing user interfaces!
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/docs/getting-started/installation">
                Read the Full Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using Vera UI to create beautiful, accessible applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/docs/getting-started/installation">
                Get Started Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/docs/examples">
                View Examples
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
