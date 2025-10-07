
import Link from 'next/link';

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
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 mb-8">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Latest version : {version}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-6">
              Vera UI
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Build beautiful, accessible React applications with a comprehensive component library designed for modern development workflows.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link 
                href="/docs/getting-started/installation" 
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Get Started
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link 
                href="/docs/components" 
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md"
              >
                View Components
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Components</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">100%</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">TypeScript</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">A11Y</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Accessible</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">WCAG</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose Vera UI?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Built for modern teams who need reliable, accessible, and beautiful components
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Design System Ready</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Built with design tokens and theming. Consistent spacing, typography, and color systems across all components.</p>
            </div>

            <div className="text-center p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♿</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Accessibility First</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Every component follows WCAG guidelines with proper ARIA attributes, keyboard navigation, and screen reader support.</p>
            </div>

            <div className="text-center p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Highly Customizable</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Extensive customization options with CSS variables, Tailwind CSS integration, and component composition patterns.</p>
            </div>

            <div className="text-center p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Responsive by Default</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">All components work seamlessly across different screen sizes and devices with mobile-first design principles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Component Categories */}
      <section className="py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Component Categories
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Explore our comprehensive collection of components organized by functionality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/docs/components/forms" className="group block p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                  📝
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">Forms</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Input controls, validation, and form management components for user interaction.</p>
            </Link>

            <Link href="/docs/components/navigation" className="group block p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                  🧭
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">Navigation</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Sidebar, menus, breadcrumbs, and navigation patterns for site navigation.</p>
            </Link>

            <Link href="/docs/components/data-display" className="group block p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50 rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                  📊
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">Data Display</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Tables, cards, badges, and components for presenting information beautifully.</p>
            </Link>

            <Link href="/docs/components/layout" className="group block p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/50 dark:to-red-950/50 rounded-xl border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                  🏗️
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">Layout</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Grid systems, containers, and structural components for page organization.</p>
            </Link>

            <Link href="/docs/components/feedback" className="group block p-6 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/50 dark:to-rose-950/50 rounded-xl border border-pink-200 dark:border-pink-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                  💬
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400">Feedback</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Alerts, toasts, progress bars, and components for user feedback.</p>
            </Link>

            <Link href="/docs/components/overlays" className="group block p-6 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950/50 dark:to-teal-950/50 rounded-xl border border-cyan-200 dark:border-cyan-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                  🎭
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400">Overlays</h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Modals, popovers, tooltips, and components that appear above other content.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Quick Start
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Get up and running with Vera UI in minutes
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Install the package</h3>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                  <code className="text-sm text-slate-800 dark:text-slate-200">npm install @helgadigitals/vera-ui</code>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Import and use components</h3>
                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                  <pre className="text-sm text-slate-800 dark:text-slate-200">
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

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Start building</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Explore our comprehensive component library and build amazing user interfaces!
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/docs/getting-started/installation"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Read the Full Guide
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build something amazing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers using Vera UI to create beautiful, accessible applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/docs/getting-started/installation"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-600 bg-white hover:bg-blue-50 rounded-lg transition-colors"
            >
              Get Started Now
            </Link>
            <Link 
              href="/docs/examples"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white border border-white hover:bg-white hover:text-blue-600 rounded-lg transition-colors"
            >
              View Examples
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
