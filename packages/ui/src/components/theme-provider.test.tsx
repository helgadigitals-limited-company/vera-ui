import { render } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { ThemeProvider } from './theme-provider'

beforeEach(() => {
  document.documentElement.style.cssText = ''
})

describe('ThemeProvider tokens prop', () => {
  it('applies CSS variables to document root when tokens are provided', () => {
    render(
      <ThemeProvider tokens={{ primary: 'oklch(0.5 0.2 150)', radius: '0.75rem' }}>
        <div />
      </ThemeProvider>
    )

    const root = document.documentElement
    expect(root.style.getPropertyValue('--primary')).toBe('oklch(0.5 0.2 150)')
    expect(root.style.getPropertyValue('--radius')).toBe('0.75rem')
  })

  it('does not set CSS variables when no tokens are provided', () => {
    render(
      <ThemeProvider>
        <div />
      </ThemeProvider>
    )

    expect(document.documentElement.style.cssText).toBe('')
  })

  it('applies all supported token keys as CSS variables', () => {
    const tokens = {
      background: 'oklch(1 0 0)',
      foreground: 'oklch(0.2 0 0)',
      primary: 'oklch(0.5 0.2 150)',
      'font-sans': 'Roboto, sans-serif',
    }

    render(
      <ThemeProvider tokens={tokens}>
        <div />
      </ThemeProvider>
    )

    const root = document.documentElement
    expect(root.style.getPropertyValue('--background')).toBe('oklch(1 0 0)')
    expect(root.style.getPropertyValue('--foreground')).toBe('oklch(0.2 0 0)')
    expect(root.style.getPropertyValue('--primary')).toBe('oklch(0.5 0.2 150)')
    expect(root.style.getPropertyValue('--font-sans')).toBe('Roboto, sans-serif')
  })
})
