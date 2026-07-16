import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { FileUpload } from './file-upload'

beforeEach(() => {
  URL.createObjectURL = vi.fn(() => 'blob:mock')
  URL.revokeObjectURL = vi.fn()
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

function makeFile(
  name: string,
  options: { type?: string; sizeBytes?: number } = {}
) {
  const { type = 'text/plain', sizeBytes = 10 } = options
  const content = new Uint8Array(sizeBytes)
  return new File([content], name, { type })
}

function getFileInput() {
  return document.querySelector('input[type="file"]') as HTMLInputElement
}

describe('FileUpload validation', () => {
  it('calls onError when a file exceeds maxSize', () => {
    const onChange = vi.fn()
    const onError = vi.fn()

    render(
      <FileUpload
        onChange={onChange}
        onError={onError}
        maxSize={1}
        allowedTypes={[]}
      />
    )

    const file = makeFile('big.txt', {
      type: 'text/plain',
      sizeBytes: 2 * 1024 * 1024,
    })
    fireEvent.change(getFileInput(), { target: { files: [file] } })

    expect(onError).toHaveBeenCalledWith('File size exceeds 1MB limit')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('calls onError when file type is not allowed', () => {
    const onChange = vi.fn()
    const onError = vi.fn()

    render(
      <FileUpload
        onChange={onChange}
        onError={onError}
        allowedTypes={['image/png']}
      />
    )

    const file = makeFile('doc.txt', { type: 'text/plain' })
    fireEvent.change(getFileInput(), { target: { files: [file] } })

    expect(onError).toHaveBeenCalledWith(
      'File type not allowed. Accepted: image/png'
    )
    expect(onChange).not.toHaveBeenCalled()
  })

  it('calls onError when too many files are selected', () => {
    const onChange = vi.fn()
    const onError = vi.fn()

    render(
      <FileUpload
        onChange={onChange}
        onError={onError}
        multiple
        maxFiles={2}
        allowedTypes={[]}
      />
    )

    const files = [
      makeFile('a.txt'),
      makeFile('b.txt'),
      makeFile('c.txt'),
    ]
    fireEvent.change(getFileInput(), { target: { files } })

    expect(onError).toHaveBeenCalledWith('Maximum 2 files allowed')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('calls onChange with a valid file', () => {
    const onChange = vi.fn()
    const onError = vi.fn()

    render(
      <FileUpload
        onChange={onChange}
        onError={onError}
        maxSize={5}
        allowedTypes={['text/plain']}
      />
    )

    const file = makeFile('ok.txt', { type: 'text/plain', sizeBytes: 100 })
    fireEvent.change(getFileInput(), { target: { files: [file] } })

    expect(onError).not.toHaveBeenCalled()
    expect(onChange).toHaveBeenCalled()
    const received = onChange.mock.calls[0][0] as File
    expect(received.name).toBe('ok.txt')
    expect(received.type).toBe('text/plain')
  })

  it('renders the upload label', () => {
    render(
      <FileUpload onChange={vi.fn()} label="Upload documents" />
    )
    expect(screen.getByText('Upload documents')).toBeInTheDocument()
  })
})
