"use client"

import { useState } from "react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@helgadigitals/vera-ui"

export function BasicDialogExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          <div className="grid gap-1">
            <Label htmlFor="dialog-name">Name</Label>
            <Input id="dialog-name" defaultValue="Jane Doe" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function DialogWithFormExample() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create account</DialogTitle>
          <DialogDescription>
            Enter your details below to create a new account.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="dialog-email">Email</Label>
            <Input id="dialog-email" type="email" placeholder="you@example.com" />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="dialog-password">Password</Label>
            <Input id="dialog-password" type="password" />
          </div>
          <DialogFooter>
            <Button type="submit">Create account</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export function ControlledDialogExample() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open controlled dialog
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled dialog</DialogTitle>
            <DialogDescription>
              This dialog&apos;s open state is managed externally.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter showCloseButton>
            <Button onClick={() => setOpen(false)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
