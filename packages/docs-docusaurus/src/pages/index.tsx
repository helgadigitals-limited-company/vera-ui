import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { ArrowRight } from 'lucide-react';

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const version = '1.3.1'; // You can fetch this dynamically if needed

  return (
    <Layout
      title="Vera UI - Modern React Component Library"
      description="A modern, accessible React component library built with Radix UI and Tailwind CSS. Production-ready components with excellent TypeScript support.">
      <main className="vera-landing">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-gradient" />
          
          <div className="hero-content">
            <div className="hero-inner">
              <div className="version-badge">
                <span className="version-dot"></span>
                Latest version: {version}
              </div>
              
              <h1 className="hero-title">
                Vera UI
              </h1>
              
              <p className="hero-subtitle">
                Build beautiful, accessible React applications with a comprehensive component library designed for modern development workflows.
              </p>
              
              <div className="hero-buttons">
                <Link
                  className="button button--primary button--lg"
                  to="/docs/getting-started/installation">
                  Get Started
                  <ArrowRight size={16} style={{marginLeft: '0.5rem'}} />
                </Link>
                <Link
                  className="button button--secondary button--lg"
                  to="/docs/components">
                  View Components
                </Link>
              </div>

              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Components</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">TypeScript</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">A11Y</div>
                  <div className="stat-label">Accessible</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">WCAG</div>
                  <div className="stat-label">Compliant</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Why Choose Vera UI?
              </h2>
              <p className="section-description">
                Built for modern teams who need reliable, accessible, and beautiful components
              </p>
            </div>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3 className="feature-title">Design System Ready</h3>
                <p className="feature-description">Built with design tokens and theming. Consistent spacing, typography, and color systems across all components.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">♿</div>
                <h3 className="feature-title">Accessibility First</h3>
                <p className="feature-description">Every component follows WCAG guidelines with proper ARIA attributes, keyboard navigation, and screen reader support.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔧</div>
                <h3 className="feature-title">Highly Customizable</h3>
                <p className="feature-description">Extensive customization options with CSS variables, Tailwind CSS integration, and component composition patterns.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Responsive by Default</h3>
                <p className="feature-description">All components work seamlessly across different screen sizes and devices with mobile-first design principles.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Component Categories */}
        <section className="categories-section">
          <div className="section-container">
            <div className="section-header">
              <h2 className="section-title">
                Component Categories
              </h2>
              <p className="section-description">
                Explore our comprehensive collection of components organized by functionality
              </p>
            </div>

            <div className="categories-grid">
              <Link to="/docs/components/forms" className="category-card">
                <div className="category-icon">📝</div>
                <h3 className="category-title">Forms</h3>
                <p className="category-description">Input controls, validation, and form management components for user interaction.</p>
              </Link>

              <Link to="/docs/components/navigation" className="category-card">
                <div className="category-icon">🧭</div>
                <h3 className="category-title">Navigation</h3>
                <p className="category-description">Sidebar, menus, breadcrumbs, and navigation patterns for site navigation.</p>
              </Link>

              <Link to="/docs/components/data-display" className="category-card">
                <div className="category-icon">📊</div>
                <h3 className="category-title">Data Display</h3>
                <p className="category-description">Tables, cards, badges, and components for presenting information beautifully.</p>
              </Link>

              <Link to="/docs/components/layout" className="category-card">
                <div className="category-icon">🏗️</div>
                <h3 className="category-title">Layout</h3>
                <p className="category-description">Grid systems, containers, and structural components for page organization.</p>
              </Link>

              <Link to="/docs/components/data-display" className="category-card">
                <div className="category-icon">💬</div>
                <h3 className="category-title">Feedback</h3>
                <p className="category-description">Alerts, toasts, progress bars, and components for user feedback.</p>
              </Link>

              <Link to="/docs/components/data-display" className="category-card">
                <div className="category-icon">🎭</div>
                <h3 className="category-title">Overlays</h3>
                <p className="category-description">Modals, popovers, tooltips, and components that appear above other content.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="quickstart-section">
          <div className="quickstart-container">
            <div className="section-header">
              <h2 className="section-title">
                Quick Start
              </h2>
              <p className="section-description">
                Get up and running with Vera UI in minutes
              </p>
            </div>

            <div className="quickstart-steps">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3 className="step-title">Install the package</h3>
                  <div className="code-block">
                    <code>npm install @helgadigitals/vera-ui</code>
                  </div>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3 className="step-title">Import and use components</h3>
                  <div className="code-block">
                    <pre>{`import { Button, Card } from '@helgadigitals/vera-ui'

function App() {
  return (
    <Card>
      <Button>Get Started</Button>
    </Card>
  )
}`}</pre>
                  </div>
                </div>
              </div>

              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3 className="step-title">Start building</h3>
                  <p className="step-description">
                    Explore our comprehensive component library and build amazing user interfaces!
                  </p>
                </div>
              </div>
            </div>

            <div className="quickstart-cta">
              <Link
                className="button button--primary button--lg"
                to="/docs/getting-started/installation">
                Read the Full Guide
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">
              Ready to build something amazing?
            </h2>
            <p className="cta-description">
              Join thousands of developers using Vera UI to create beautiful, accessible applications.
            </p>
            <div className="cta-buttons">
              <Link
                className="button button--secondary button--lg"
                to="/docs/getting-started/installation">
                Get Started Now
              </Link>
              <Link
                className="button button--outline button--lg"
                to="/docs/examples">
                View Examples
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
