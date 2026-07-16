"use client"

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@helgadigitals/vera-ui"

export function BasicTooltipExample() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function TooltipWithDelayExample() {
  return (
    <TooltipProvider delayDuration={500}>
      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">
              Delayed tooltip
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Appears after 500ms</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm">
              Another action
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Keyboard accessible</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
