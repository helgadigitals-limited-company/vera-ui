import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, it, expect } from 'vitest'
import { MultiSelect } from './Multi-select'

afterEach(() => {
  cleanup()
})

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
]

describe('MultiSelect', () => {
  it('preserves defaultValue when uncontrolled (no formValue)', () => {
    render(
      <MultiSelect
        options={options}
        defaultValue={['apple']}
        onValueChange={() => {}}
      />
    )

    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('applies controlled formValue on mount', () => {
    render(
      <MultiSelect
        options={options}
        formValue={['banana']}
        onValueChange={() => {}}
      />
    )

    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('propagates formValue updates', () => {
    const { rerender, container } = render(
      <MultiSelect
        options={options}
        formValue={['banana']}
        onValueChange={() => {}}
      />
    )

    expect(within(container).getByText('Banana')).toBeInTheDocument()

    rerender(
      <MultiSelect
        options={options}
        formValue={['apple']}
        onValueChange={() => {}}
      />
    )

    expect(within(container).getByText('Apple')).toBeInTheDocument()
  })
})