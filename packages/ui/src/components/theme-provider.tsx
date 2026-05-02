'use client'
import { ThemeProviderContext, type Theme, type DesignTokens } from '@/lib/theme-context'
import * as React from 'react'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  tokens?: DesignTokens
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vera-ui-theme',
  tokens,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(storageKey) as Theme) || defaultTheme
    }
    return defaultTheme
  })

  React.useEffect(() => {
    if (!tokens) return
    const root = window.document.documentElement
    Object.entries(tokens).forEach(([key, value]) => {
      if (value !== undefined) root.style.setProperty(`--${key}`, value)
    })
  }, [tokens])

  React.useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, theme)
      }
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}
