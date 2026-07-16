import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import type { ComponentProps } from 'react'
import { Pagination } from './Pagination'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function renderPagination(
  overrides: Partial<ComponentProps<typeof Pagination>> = {}
) {
  const onPageChange = vi.fn()
  const onPageSizeChange = vi.fn()
  const props = {
    currentPage: 1,
    totalPages: 10,
    onPageChange,
    totalItems: 100,
    pageSize: 10,
    onPageSizeChange,
    ...overrides,
  }
  const result = render(<Pagination {...props} />)
  return { ...result, onPageChange, onPageSizeChange, props }
}

describe('Pagination', () => {
  it('disables prev and first controls on the first page', () => {
    renderPagination({ currentPage: 1, totalPages: 5 })

    const buttons = screen.getAllByRole('button')
    // first, prev are the first two when showFirstLast is true
    expect(buttons[0]).toBeDisabled()
    expect(buttons[1]).toBeDisabled()
  })

  it('disables next and last controls on the last page', () => {
    renderPagination({ currentPage: 5, totalPages: 5 })

    const buttons = screen.getAllByRole('button')
    const next = buttons[buttons.length - 2]
    const last = buttons[buttons.length - 1]
    expect(next).toBeDisabled()
    expect(last).toBeDisabled()
  })

  it('renders page numbers and ellipsis for a middle page', () => {
    renderPagination({ currentPage: 5, totalPages: 10, siblingsCount: 1 })

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '10' })).toBeInTheDocument()
    expect(screen.getAllByText('...').length).toBeGreaterThanOrEqual(1)
  })

  it('fires onPageChange with the clicked page number', () => {
    const { onPageChange } = renderPagination({
      currentPage: 3,
      totalPages: 5,
    })

    fireEvent.click(screen.getByRole('button', { name: '4' }))
    expect(onPageChange).toHaveBeenCalledWith(4)
  })

  it('fires onPageChange when next is clicked', () => {
    const { onPageChange } = renderPagination({
      currentPage: 2,
      totalPages: 5,
    })

    const buttons = screen.getAllByRole('button')
    // next is second-to-last when showFirstLast is true
    fireEvent.click(buttons[buttons.length - 2])
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('renders without crashing for a single page', () => {
    renderPagination({ currentPage: 1, totalPages: 1, totalItems: 5 })

    expect(screen.getByText(/Showing 1-5 of 5 items/)).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    expect(buttons[0]).toBeDisabled()
    expect(buttons[buttons.length - 1]).toBeDisabled()
  })

  it('renders without crashing for an empty dataset', () => {
    renderPagination({
      currentPage: 1,
      totalPages: 0,
      totalItems: 0,
      pageSize: 10,
    })

    expect(screen.getByText(/Showing 1-0 of 0 items/)).toBeInTheDocument()
  })
})
