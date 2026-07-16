import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { NuqsTestingAdapter } from 'nuqs/adapters/testing'
import { TabsContainer, type TabItem } from './tabs-container'
import type { ComponentProps } from 'react'

const tabs: TabItem[] = [
  { value: 'a', label: 'Tab A', content: <div>Content A</div> },
  { value: 'b', label: 'Tab B', content: <div>Content B</div> },
  { value: 'c', label: 'Tab C', content: <div>Content C</div> },
]

beforeEach(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    } as unknown as typeof ResizeObserver
  }
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

/** Radix TabsTrigger activates on mouseDown with button 0, not click. */
function activateTab(name: string) {
  fireEvent.mouseDown(screen.getByRole('tab', { name }), { button: 0 })
}

function renderTabs(
  props: Partial<ComponentProps<typeof TabsContainer>> = {},
  adapter: {
    searchParams?: string
    onUrlUpdate?: (e: { searchParams: URLSearchParams }) => void
  } = {}
) {
  return render(
    <NuqsTestingAdapter
      searchParams={adapter.searchParams ?? ''}
      onUrlUpdate={adapter.onUrlUpdate}
    >
      <TabsContainer tabs={tabs} {...props} />
    </NuqsTestingAdapter>
  )
}

describe('TabsContainer', () => {
  it('with persistInUrl=false activates the first tab and switches on click', () => {
    const onTabChange = vi.fn()
    renderTabs({ persistInUrl: false, onTabChange })

    expect(screen.getByText('Content A')).toBeVisible()
    activateTab('Tab B')
    expect(screen.getByText('Content B')).toBeVisible()
    expect(onTabChange).toHaveBeenCalledWith('b')
  })

  it('respects defaultTab when persistInUrl is false', () => {
    renderTabs({ persistInUrl: false, defaultTab: 'c' })

    expect(screen.getByRole('tab', { name: 'Tab C' })).toHaveAttribute(
      'data-state',
      'active'
    )
    expect(screen.getByText('Content C')).toBeVisible()
  })

  it('reads the active tab from the URL when persistInUrl is on', async () => {
    const onUrlUpdate = vi.fn()
    renderTabs(
      { persistInUrl: true },
      { searchParams: '?tab=b', onUrlUpdate }
    )

    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute(
      'data-state',
      'active'
    )
    expect(screen.getByText('Content B')).toBeVisible()

    activateTab('Tab A')

    await waitFor(() => {
      expect(onUrlUpdate).toHaveBeenCalled()
    })

    const event = onUrlUpdate.mock.calls.at(-1)?.[0] as {
      searchParams: URLSearchParams
    }
    expect(event.searchParams.get('tab')).toBe('a')
  })

  it('does not render hidden tabs', () => {
    renderTabs({
      persistInUrl: false,
      tabs: [
        { value: 'a', label: 'Tab A', content: <div>Content A</div> },
        {
          value: 'hidden',
          label: 'Hidden',
          content: <div>Hidden content</div>,
          hidden: true,
        },
      ],
    })

    expect(screen.getByRole('tab', { name: 'Tab A' })).toBeInTheDocument()
    expect(screen.queryByRole('tab', { name: 'Hidden' })).not.toBeInTheDocument()
  })

  it('shows empty state when all tabs are hidden', () => {
    renderTabs({
      persistInUrl: false,
      tabs: [
        {
          value: 'a',
          label: 'Tab A',
          content: <div>Content A</div>,
          hidden: true,
        },
      ],
    })

    expect(screen.getByText('No tabs available')).toBeInTheDocument()
  })

  it('falls back to defaultTab when URL value is invalid', () => {
    renderTabs(
      { persistInUrl: true, defaultTab: 'b' },
      { searchParams: '?tab=not-a-real-tab' }
    )

    expect(screen.getByRole('tab', { name: 'Tab B' })).toHaveAttribute(
      'data-state',
      'active'
    )
    expect(screen.getByText('Content B')).toBeVisible()
  })
})
