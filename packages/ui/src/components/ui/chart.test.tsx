import { cleanup, render } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import * as RechartsPrimitive from 'recharts'
import { ChartContainer, type ChartConfig } from './chart'

afterEach(() => {
  cleanup()
})

function renderChart(
  config: ChartConfig,
  id?: string
) {
  return render(
    <ChartContainer id={id} config={config}>
      <RechartsPrimitive.LineChart data={[]} />
    </ChartContainer>
  )
}

function styleText(): string {
  return document.querySelector('style')?.textContent ?? ''
}

const LEGITIMATE_COLORS = [
  'hsl(var(--chart-1))',
  'var(--chart-2)',
  '#8884d8',
  'oklch(0.5 0.2 150)',
  'rgb(255 0 0 / 0.5)',
  'red',
  'color-mix(in oklab, red 50%, blue)',
] as const

describe('ChartStyle injection hardening', () => {
  it('does not emit style breakout from a hostile color value', () => {
    const hostile = 'red;} </style><img src=x onerror=alert(1)>'
    renderChart({ series: { color: hostile, label: 'Series' } })

    const text = styleText()
    expect(text).not.toContain('</style')
    expect(text).not.toContain('onerror')
  })

  it('sanitizes a hostile id prop so selector breakout cannot appear', () => {
    const hostileId = 'x] { } body { background: red } [data-chart=x'
    renderChart({ series: { color: 'red', label: 'Series' } }, hostileId)

    const text = styleText()
    // Payload braces/brackets stripped from id; no rule breakout survives
    expect(text).not.toContain('{ }')
    expect(text).not.toContain('background: red')
    expect(text).not.toContain('[data-chart=x]')
    const chartEl = document.querySelector('[data-chart]')
    const dataChart = chartEl?.getAttribute('data-chart') ?? ''
    expect(dataChart).toMatch(/^chart-[a-zA-Z0-9-_]*$/)
    expect(dataChart).not.toContain('{')
    expect(dataChart).not.toContain('}')
    expect(dataChart).not.toContain(']')
    expect(text).toContain(`[data-chart=${dataChart}]`)
  })

  it('does not emit rule breakout from a hostile config key', () => {
    const hostileKey = 'foo;}body{color:red'
    const config = {
      [hostileKey]: { color: 'blue', label: 'Series' },
    } as unknown as ChartConfig
    renderChart(config)

    const text = styleText()
    expect(text).not.toContain(';}body{')
    expect(text).not.toContain('color:red')
    expect(text).toContain('--color-foobodycolorred')
  })

  it.each(LEGITIMATE_COLORS)(
    'renders legitimate color %s verbatim',
    (color) => {
      renderChart({ series: { color, label: 'Series' } })
      expect(styleText()).toContain(color)
    }
  )

  it('uses a sanitized useId-based chart id when no id prop is passed', () => {
    renderChart({ series: { color: 'red', label: 'Series' } })

    const chartEl = document.querySelector('[data-chart]')
    const dataChart = chartEl?.getAttribute('data-chart') ?? ''
    expect(dataChart).toMatch(/^chart-[a-zA-Z0-9-_]+$/)
    expect(styleText()).toContain(`[data-chart=${dataChart}]`)
  })
})
