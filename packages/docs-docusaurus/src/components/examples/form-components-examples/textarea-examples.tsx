"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { useForm, Controller } from "react-hook-form"
import { Textarea, Label, Button } from "@helgadigitals/vera-ui"

export function DifferentSizesExample() {
  return (
    <div className="space-y-6">
      {/* Small textarea */}
      <div className="space-y-2">
        <Label htmlFor="small">Small Textarea</Label>
        <Textarea
          id="small"
          placeholder="Small textarea..."
          className="min-h-[80px] w-[300px]"
        />
      </div>

      {/* Default textarea */}
      <div className="space-y-2">
        <Label htmlFor="default">Default Textarea</Label>
        <Textarea
          id="default"
          placeholder="Default textarea..."
          className="w-[300px]"
        />
      </div>

      {/* Large textarea */}
      <div className="space-y-2">
        <Label htmlFor="large">Large Textarea</Label>
        <Textarea
          id="large"
          placeholder="Large textarea..."
          className="min-h-[150px] w-[300px]"
        />
      </div>
    </div>
  )
}

export function DisabledReadonlyStatesExample() {
  return (
    <div className="space-y-6">
      {/* Disabled textarea */}
      <div className="space-y-2">
        <Label htmlFor="disabled">Disabled Textarea</Label>
        <Textarea
          id="disabled"
          placeholder="This textarea is disabled"
          disabled
          className="w-[300px]"
        />
      </div>

      {/* Read-only textarea */}
      <div className="space-y-2">
        <Label htmlFor="readonly">Read-only Textarea</Label>
        <Textarea
          id="readonly"
          value="This textarea is read-only and cannot be edited."
          readOnly
          className="w-[300px]"
        />
      </div>
    </div>
  )
}

export function FormIntegrationExample() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm()

  const watchedValues = watch()

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="feedback">Feedback *</Label>
        <Controller
          name="feedback"
          control={control}
          rules={{
            required: "Feedback is required",
            minLength: {
              value: 10,
              message: "Feedback must be at least 10 characters"
            }
          }}
          render={({ field }) => (
            <Textarea
              id="feedback"
              placeholder="Please share your feedback..."
              className={`w-[300px] ${errors.feedback ? "border-destructive" : ""}`}
              {...field}
            />
          )}
        />
        {errors.feedback && (
          <p className="text-sm text-destructive">
            {errors.feedback.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="comments">Additional Comments</Label>
        <Controller
          name="comments"
          control={control}
          render={({ field }) => (
            <Textarea
              id="comments"
              placeholder="Any additional comments (optional)..."
              className="w-[300px]"
              {...field}
            />
          )}
        />
      </div>

      <Button type="submit" className="w-[300px]">Submit Feedback</Button>
      
      {/* Display current form values */}
      {(watchedValues.feedback || watchedValues.comments) && (
        <div className="text-sm text-muted-foreground">
          <p><strong>Form data:</strong></p>
          <pre className="text-xs">{JSON.stringify(watchedValues, null, 2)}</pre>
        </div>
      )}
    </form>
  )
}

function AutoResizeTextarea({ value, onChange, ...props }: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to get accurate scrollHeight
      textareaRef.current.style.height = 'auto'
      // Set height to scrollHeight
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [value])

  return (
    <Textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      className="resize-none overflow-hidden w-[300px]"
      {...props}
    />
  )
}

export function AutoResizeExample() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-2">
      <Label htmlFor="auto-resize">Auto-resizing Textarea</Label>
      <AutoResizeTextarea
        id="auto-resize"
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
        placeholder="Start typing and watch the textarea grow..."
      />
      <p className="text-sm text-muted-foreground">
        Lines: {value.split('\n').length} | Characters: {value.length}
      </p>
    </div>
  )
}

export function WithHelperTextExample() {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")

  const validateInput = (text: string) => {
    if (text.length > 0 && text.length < 5) {
      setError("Description must be at least 5 characters long")
    } else if (text.length > 500) {
      setError("Description cannot exceed 500 characters")
    } else {
      setError("")
    }
  }

  const handleChange = (e: any) => {
    const newValue = e.target.value
    setValue(newValue)
    validateInput(newValue)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="description">Product Description</Label>
      <Textarea
        id="description"
        value={value}
        onChange={handleChange}
        placeholder="Describe your product..."
        className={`w-[300px] ${error ? "border-destructive focus-visible:ring-destructive/20" : ""}`}
      />
      <div className="flex justify-between text-sm">
        <div className="space-y-1">
          <p className="text-muted-foreground">
            Provide a detailed description of your product&apos;s features and benefits.
          </p>
          {error && (
            <p className="text-destructive">{error}</p>
          )}
        </div>
        <span className="text-muted-foreground shrink-0">
          {value.length}/500
        </span>
      </div>
    </div>
  )
}

export function MessageComposerExample() {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      console.log("Sending message:", message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message... (Cmd/Ctrl + Enter to send)"
        className="border-0 shadow-none resize-none focus-visible:ring-0 p-0 w-[300px]"
        rows={3}
      />
      
      <div className="flex justify-between items-center">
        <p className="text-xs text-muted-foreground">
          {message.length > 0 && `${message.length} characters`}
        </p>
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          size="sm"
          className="gap-2"
        >
          <Send className="h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  )
}

export function CodeEditorExample() {
  const [code, setCode] = useState(`function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`)

  return (
    <div className="space-y-2">
      <Label htmlFor="code">JavaScript Code</Label>
      <Textarea
        id="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter your code here..."
        className="font-mono text-sm min-h-[200px] bg-muted/30 w-[300px]"
        spellCheck={false}
      />
      <p className="text-sm text-muted-foreground">
        Lines: {code.split('\n').length} | Characters: {code.length}
      </p>
    </div>
  )
}