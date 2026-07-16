import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { DataTable } from './DataTable'

type Row = { id: string; name: string; age: number }

const rows: Row[] = [
  { id: '1', name: 'Alice', age: 30 },
  { id: '2', name: 'Bob', age: 25 },
  { id: '3', name: 'Carol', age: 35 },
]

const tenRows: Row[] = Array.from({ length: 10 }, (_, i) => ({
  id: String(i + 1),
  name: `Person ${String.fromCharCode(65 + i)}`,
  age: 20 + i,
}))

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

describe('DataTable happy paths', () => {
  it('renders all column headers and rows for a 10-row dataset', () => {
    render(
      <DataTable
        tableData={tenRows}
        tableColumns={['name', 'age']}
        getRowId={(row) => row.id}
      />
    )

    expect(screen.getByRole('columnheader', { name: /^name$/i })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: /^age$/i })).toBeInTheDocument()

    for (const row of tenRows) {
      expect(screen.getByText(row.name)).toBeInTheDocument()
    }
  })

  it('reorders first-column cell text on uncontrolled sort click', () => {
    const unsorted: Row[] = [
      { id: '1', name: 'Charlie', age: 30 },
      { id: '2', name: 'Alice', age: 25 },
      { id: '3', name: 'Bob', age: 35 },
    ]

    render(
      <DataTable
        tableData={unsorted}
        tableColumns={['name', 'age']}
        getRowId={(row) => row.id}
        sortableColumns={['name']}
      />
    )

    fireEvent.click(nameColumnHeader())

    const bodyRows = screen.getAllByRole('row').slice(1)
    const nameCells = bodyRows.map((row) => within(row).getAllByRole('cell')[0].textContent)
    expect(nameCells).toEqual(['Alice', 'Bob', 'Charlie'])
  })

  it('toggles row selection and fires onSelectionChange', () => {
    const onSelectionChange = vi.fn()

    render(
      <DataTable
        tableData={tenRows}
        tableColumns={['name', 'age']}
        getRowId={(row) => row.id}
        selectable
        selectionMode="multiple"
        selectedRowIds={[]}
        onSelectionChange={onSelectionChange}
      />
    )

    const checkboxes = screen.getAllByRole('checkbox')
    // first checkbox is select-all; row checkboxes follow
    fireEvent.click(checkboxes[1])

    expect(onSelectionChange).toHaveBeenCalledWith(['1'])
  })

  it('narrows visible rows with the global filter', () => {
    render(
      <DataTable
        tableData={tenRows}
        tableColumns={['name', 'age']}
        getRowId={(row) => row.id}
        enableGlobalFilter
      />
    )

    const search = screen.getByPlaceholderText('Search all columns...')
    fireEvent.change(search, { target: { value: 'Person A' } })

    expect(screen.getByText('Person A')).toBeInTheDocument()
    expect(screen.queryByText('Person B')).not.toBeInTheDocument()
  })

  it('toggles expanded content via the expand control', () => {
    render(
      <DataTable
        tableData={tenRows.slice(0, 3)}
        tableColumns={['name', 'age']}
        getRowId={(row) => row.id}
        expandable
        expandedContent={(row) => <div>Details for {row.name}</div>}
      />
    )

    expect(screen.queryByText('Details for Person A')).not.toBeInTheDocument()

    fireEvent.click(screen.getAllByRole('button', { name: 'Expand row' })[0])

    expect(screen.getByText('Details for Person A')).toBeInTheDocument()
  })
})
