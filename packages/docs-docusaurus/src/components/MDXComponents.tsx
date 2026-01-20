import React from 'react';
import Admonition from '@theme/Admonition';

/**
 * Callout - Maps Fumadocs Callout to Docusaurus Admonition
 * Usage: <Callout type="info">content</Callout>
 */
export function Callout({ 
  type = 'info', 
  children,
  title,
}: { 
  type?: 'note' | 'tip' | 'info' | 'warning' | 'danger';
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <Admonition type={type} title={title} children={children}>
      {children}
    </Admonition>
  );
}

/**
 * TypeTable - Component for displaying prop tables
 * Maps Fumadocs TypeTable to a simple table format
 */
export function TypeTable({ 
  type,
}: { 
  type: Record<string, {
    description?: string;
    type?: string;
    default?: string;
  }>;
}) {
  const entries = Object.entries(type);
  
  return (
    <table>
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(([key, value]) => (
          <tr key={key}>
            <td><code>{key}</code></td>
            <td><code>{value.type || 'any'}</code></td>
            <td>{value.default ? <code>{value.default}</code> : '—'}</td>
            <td>{value.description || ''}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/**
 * Steps - Component for step-by-step instructions
 */
export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <div className="steps-container">
      {children}
    </div>
  );
}

export function Step({ children }: { children: React.ReactNode }) {
  return (
    <div className="step-item">
      {children}
    </div>
  );
}

/**
 * Card and Cards - For displaying card-based content
 */
export function Cards({ children }: { children: React.ReactNode }) {
  return <div className="cards-grid">{children}</div>;
}

export function Card({ 
  title,
  description,
  href,
  children,
}: { 
  title?: string;
  description?: string;
  href?: string;
  children?: React.ReactNode;
}) {
  const content = (
    <>
      {title && <h3>{title}</h3>}
      {description && <p>{description}</p>}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className="card-link">
        <div className="card">{content}</div>
      </a>
    );
  }

  return <div className="card">{content}</div>;
}
