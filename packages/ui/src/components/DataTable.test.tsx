import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { DataTable } from './DataTable'

type Row = { id: string; name: string; age: number }

const rows: Row[] = [
  { id: '1', name: 'Alice', age: 30 },
  { id: '2', name: 'Bob', age: 25 },
  { id: '3', name: 'Carol', age: 35 },
]

function nameColumnHeader() {
  return screen.getByRole('columnheader', { name: /^name$/i })
}

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe('DataTable row keys', () => {
  it('does not warn about missing unique key props after render and sort', () => {
    // Must run before other DataTable renders: React dedupes this warning per component type.
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const onSortChange = vi.fn()

    render(
      <DataTable
        tableData={rows}
        tableColumns={['name', 'age']}
        getRowId={(row) => row.id}
        sortableColumns={['name']}
        sortState={[{ key: 'name', direction: 'asc' }]}
        onSortChange={onSortChange}
        expandable
        expandedContent={(row) => <div>Details for {row.name}</div>}
      />
    )

    fireEvent.click(nameColumnHeader())

    const keyWarnings = consoleError.mock.calls.filter((args) =>
      args.some(
        (arg) =>
          typeof arg === 'string' &&
          (arg.includes('unique "key" prop') || arg.includes('unique key prop'))
      )
    )
    expect(keyWarnings).toHaveLength(0)
  })
})

describe('DataTable sort state immutability', () => {
  it('does not mutate controlled sortState when toggling sort', () => {
    const original: Array<{ key: keyof Row & string; direction: 'asc' | 'desc' }> = [
      { key: 'name', direction: 'asc' },
    ]
    const onSortChange = vi.fn()

    render(
      <DataTable
        tableData={rows}
        tableColumns={['name', 'age']}
        getRowId={(row) => row.id}
        sortableColumns={['name']}
        multiSort
        sortState={original}
        onSortChange={onSortChange}
      />
    )

    // Additive toggle hits the mutating branch in the unfixed code
    fireEvent.click(nameColumnHeader(), { shiftKey: true })

    expect(onSortChange).toHaveBeenCalled()
    const next = onSortChange.mock.calls[0][0] as typeof original
    expect(next).toEqual([{ key: 'name', direction: 'desc' }])
    expect(original[0].direction).toBe('asc')
  })

  it('does not mutate controlled sortState on additive multi-sort toggle', () => {
    const original: Array<{ key: keyof Row & string; direction: 'asc' | 'desc' }> = [
      { key: 'name', direction: 'asc' },
      { key: 'age', direction: 'asc' },
    ]
    const onSortChange = vi.fn()

    render(
      <DataTable
        tableData={rows}
        tableColumns={['name', 'age']}
        getRowId={(row) => row.id}
        sortableColumns={['name', 'age']}
        multiSort
        sortState={original}
        onSortChange={onSortChange}
      />
    )

    fireEvent.click(nameColumnHeader(), { shiftKey: true })

    expect(onSortChange).toHaveBeenCalled()
    const next = onSortChange.mock.calls[0][0] as typeof original
    expect(next.find((r) => r.key === 'name')).toEqual({
      key: 'name',
      direction: 'desc',
    })
    expect(original[0].direction).toBe('asc')
    expect(original[1].direction).toBe('asc')
  })
})
