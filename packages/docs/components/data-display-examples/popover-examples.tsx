"use client"

import {
  Button,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@helgadigitals/vera-ui"

export function BasicPopoverExample() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-72">
        <PopoverHeader>
          <PopoverTitle>Dimensions</PopoverTitle>
          <PopoverDescription>
            Set the width and height for the layer.
          </PopoverDescription>
        </PopoverHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-2">
            <Label htmlFor="popover-width">Width</Label>
            <Input id="popover-width" defaultValue="100%" className="col-span-2" />
          </div>
          <div className="grid grid-cols-3 items-center gap-2">
            <Label htmlFor="popover-height">Height</Label>
            <Input id="popover-height" defaultValue="25px" className="col-span-2" />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function PopoverAlignmentExample() {
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Align start
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-56">
          <p className="text-sm">Popover aligned to the start of the trigger.</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Align end
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-56">
          <p className="text-sm">Popover aligned to the end of the trigger.</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}
