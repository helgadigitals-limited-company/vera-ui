"use client"

import { Button } from "@helgadigitals/vera-ui"
import { PlusIcon } from "lucide-react"

// Basic Usage Button
export function ButtonUsageExample() {
  return <Button>Click me</Button>
}

// Button Variants Example
export function ButtonVariantsExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}

// Button Sizes Example
export function ButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  )
}

// Button with accessibility icon
export function ButtonIconExample() {
  return (
    <Button size="icon" aria-label="Add new item">
      <PlusIcon className="h-4 w-4" />
    </Button>
  )
}