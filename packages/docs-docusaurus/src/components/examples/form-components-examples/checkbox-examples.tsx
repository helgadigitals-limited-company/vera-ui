"use client"

import { useState } from "react"
import { Checkbox, Button  } from "@helgadigitals/vera-ui"
import { useForm, Controller } from "react-hook-form"

// Usage
export function CheckboxExample() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label htmlFor="terms">Accept terms and conditions</label>
    </div>
  )
}

// Basic Example
export function BasicCheckboxExample() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="example" />
      <label htmlFor="example">Example checkbox</label>
    </div>
  )
}

// Disabled Example
export function DisabledExample() {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <label htmlFor="disabled-unchecked">Disabled unchecked</label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled checked />
        <label htmlFor="disabled-checked">Disabled checked</label>
      </div>
    </div>
  )
}

// Checkbox integrated with React Hook Form
export function CheckboxFormExample() {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: Record<string, unknown>) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Controller
        name="newsletter"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label htmlFor="newsletter">Subscribe to newsletter</label>
          </div>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  )
}

// Checkbox with indeterminate state for partial selection
export function CheckboxIndeterminateExample() {
  const [items, setItems] = useState([
    { id: 1, checked: false, label: "Item 1" },
    { id: 2, checked: true, label: "Item 2" },
    { id: 3, checked: false, label: "Item 3" },
  ])

  const allChecked = items.every((item) => item.checked)
  const someChecked = items.some((item) => item.checked) && !allChecked

  const handleSelectAll = (checked: boolean | string) => {
    setItems(items.map((item) => ({ ...item, checked: checked === true })))
  }

  const handleItemChange = (id: number, checked: boolean | string) => {
    setItems(items.map((item) => 
      item.id === id ? { ...item, checked: checked === true } : item
    ))
  }

  return (
    <div className="space-y-2">
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="select-all"
        checked={someChecked ? "indeterminate" : allChecked}
        onCheckedChange={handleSelectAll}
      />
      <label htmlFor="select-all">Select all</label>
    </div>
    <div className="ml-6 space-y-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox 
            id={`item-${item.id}`}
            checked={item.checked}
            onCheckedChange={(checked) => handleItemChange(item.id, checked)}
          />
          <label htmlFor={`item-${item.id}`}>{item.label}</label>
        </div>
      ))}
    </div>
  </div>
  )
}