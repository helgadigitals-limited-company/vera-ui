import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState, type ComponentProps } from 'react'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { FileUpload } from './file-upload'

let createObjectURLMock: ReturnType<typeof vi.fn>
let revokeObjectURLMock: ReturnType<typeof vi.fn>
let objectUrlCounter = 0

beforeEach(() => {
  objectUrlCounter = 0
  createObjectURLMock = vi.fn(() => `blob:mock-${++objectUrlCounter}`)
  revokeObjectURLMock = vi.fn()
  URL.createObjectURL = createObjectURLMock
  URL.revokeObjectURL = revokeObjectURLMock
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

function ControlledFileUpload(
  props: Omit<ComponentProps<typeof FileUpload>, 'value' | 'onChange'> & {
    onChange?: ComponentProps<typeof FileUpload>['onChange']
  }
) {
  const [value, setValue] = useState<File | File[] | null>(null)

  return (
    <FileUpload
      {...props}
      value={value}
      onChange={(next) => {
        setValue(next)
        props.onChange?.(next)
      }}
    />
  )
}

function createdUrls() {
  return createObjectURLMock.mock.results.map((r) => r.value as string)
}

function revokedUrls() {
  return revokeObjectURLMock.mock.calls.map((c) => c[0] as string)
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

describe('FileUpload preview object URL lifecycle', () => {
  it('does not leak object URLs across a controlled value round-trip', async () => {
    render(
      <ControlledFileUpload
        onChange={vi.fn()}
        allowedTypes={[]}
        showPreview
      />
    )

    const file = makeFile('photo.png', { type: 'image/png', sizeBytes: 100 })
    fireEvent.change(getFileInput(), { target: { files: [file] } })

    const img = await screen.findByAltText('photo.png')
    const srcAfterSelect = img.getAttribute('src')
    expect(srcAfterSelect).toMatch(/^blob:mock-/)

    await waitFor(() => {
      expect(screen.getByAltText('photo.png').getAttribute('src')).toBe(
        srcAfterSelect
      )
    })

    const created = createdUrls()
    const revoked = revokedUrls()
    const unrevoked = created.filter((u) => !revoked.includes(u))

    // Every created URL is either still displayed or has been revoked
    expect(unrevoked.length).toBeLessThanOrEqual(1)
    expect(unrevoked).toContain(srcAfterSelect)
    // Preview src must stay stable across the round-trip (no flicker)
    expect(screen.getByAltText('photo.png').getAttribute('src')).toBe(
      srcAfterSelect
    )
  })

  it('revokes the preview URL when a file is removed', async () => {
    render(
      <ControlledFileUpload
        onChange={vi.fn()}
        allowedTypes={[]}
        showPreview
      />
    )

    const file = makeFile('photo.png', { type: 'image/png', sizeBytes: 100 })
    fireEvent.change(getFileInput(), { target: { files: [file] } })

    const img = await screen.findByAltText('photo.png')
    const previewUrl = img.getAttribute('src')!

    fireEvent.click(screen.getByLabelText('Remove photo.png'))

    await waitFor(() => {
      expect(screen.queryByAltText('photo.png')).not.toBeInTheDocument()
    })

    expect(revokedUrls()).toContain(previewUrl)
  })

  it('revokes all preview URLs when value is cleared', async () => {
    function ClearableUpload() {
      const [value, setValue] = useState<File | File[] | null>(null)
      return (
        <>
          <FileUpload
            value={value}
            onChange={setValue}
            allowedTypes={[]}
            showPreview
          />
          <button type="button" onClick={() => setValue(null)}>
            clear-value
          </button>
        </>
      )
    }

    render(<ClearableUpload />)

    const file = makeFile('photo.png', { type: 'image/png', sizeBytes: 100 })
    fireEvent.change(getFileInput(), { target: { files: [file] } })

    const img = await screen.findByAltText('photo.png')
    const previewUrl = img.getAttribute('src')!

    fireEvent.click(screen.getByText('clear-value'))

    await waitFor(() => {
      expect(screen.queryByAltText('photo.png')).not.toBeInTheDocument()
    })

    expect(revokedUrls()).toContain(previewUrl)
  })

  it('revokes preview URLs on unmount', async () => {
    const { unmount } = render(
      <ControlledFileUpload
        onChange={vi.fn()}
        allowedTypes={[]}
        showPreview
      />
    )

    const file = makeFile('photo.png', { type: 'image/png', sizeBytes: 100 })
    fireEvent.change(getFileInput(), { target: { files: [file] } })

    const img = await screen.findByAltText('photo.png')
    const previewUrl = img.getAttribute('src')!

    unmount()

    expect(revokedUrls()).toContain(previewUrl)
  })

  it('does not create an object URL for non-image files', () => {
    render(
      <ControlledFileUpload onChange={vi.fn()} allowedTypes={[]} />
    )

    const file = makeFile('doc.txt', { type: 'text/plain', sizeBytes: 50 })
    fireEvent.change(getFileInput(), { target: { files: [file] } })

    expect(createObjectURLMock).not.toHaveBeenCalled()
  })
})
