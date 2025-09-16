"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Checkbox,
  Select,
  Input,
  Button,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea
} from "@helgadigitals/vera-ui"

// Profile Settings Form Example
export function ProfileSettingsFormExample() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      country: "",
      website: "",
      newsletter: false
    }
  })

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="John" />
            </FormControl>
          </FormItem>

          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Doe" />
            </FormControl>
          </FormItem>
        </div>

        <FormItem>
          <FormLabel>Bio</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Tell us about yourself..."
              className="resize-none"
            />
          </FormControl>
          <FormDescription>
            Brief description for your profile. Maximum 500 characters.
          </FormDescription>
        </FormItem>

        <FormItem>
          <FormLabel>Country</FormLabel>
          <FormControl>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Website</FormLabel>
          <FormControl>
            <Input 
              type="url" 
              placeholder="https://yourwebsite.com" 
            />
          </FormControl>
          <FormDescription>
            Your personal or professional website (optional)
          </FormDescription>
        </FormItem>

        <FormItem>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <FormLabel htmlFor="newsletter">Subscribe to newsletter</FormLabel>
          </div>
          <FormDescription>
            Receive updates about new features and announcements.
          </FormDescription>
        </FormItem>

        <div className="flex gap-4">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="outline">
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}

// Dynamic Fields Form Example
export function DynamicFieldsFormExample() {
  const [emails, setEmails] = useState([""])
  const form = useForm({
    defaultValues: {
      name: ""
    }
  })

  const addEmail = () => {
    setEmails([...emails, ""])
  }

  const removeEmail = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index))
  }

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails]
    newEmails[index] = value
    setEmails(newEmails)
  }

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Your name" />
          </FormControl>
        </FormItem>

        <div className="space-y-4">
          <FormLabel>Email Addresses</FormLabel>
          {emails.map((email, index) => (
            <FormItem key={index}>
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    className="flex-1"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => updateEmail(index, e.target.value)}
                  />
                </FormControl>
                {emails.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeEmail(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </FormItem>
          ))}
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addEmail}
          >
            Add Email
          </Button>
        </div>

        <FormItem>
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <FormLabel htmlFor="terms">I agree to the terms and conditions</FormLabel>
          </div>
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

// File Upload Form Example
export function FileUploadFormExample() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      public: false
    }
  })

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormItem>
          <FormLabel>Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter title" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Input placeholder="Enter description" />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Attachments</FormLabel>
          <FormControl>
            <Input
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx"
            />
          </FormControl>
          <FormDescription>
            Upload images, PDFs, or documents (max 10MB each)
          </FormDescription>
        </FormItem>

        <FormItem>
          <div className="flex items-center space-x-2">
            <Checkbox id="public" />
            <FormLabel htmlFor="public">Make files publicly accessible</FormLabel>
          </div>
          <FormDescription>
            Allow others to view and download these files.
          </FormDescription>
        </FormItem>

        <Button type="submit">Upload Files</Button>
      </form>
    </Form>
  )
}

// Custom Validation Messages Example
export function CustomValidationFormExample() {
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      privacy: false
    }
  })

  const validateForm = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    
    const newErrors: {[key: string]: string} = {}
    
    if (!username) {
      newErrors.username = "Username is required"
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores"
    }
    
    if (!email) {
      newErrors.email = "Email is required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully!")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={validateForm} className="space-y-6">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input 
              name="username"
              placeholder="Enter username" 
              className={errors.username ? "border-red-500" : ""}
            />
          </FormControl>
          {errors.username && (
            <FormMessage>{errors.username}</FormMessage>
          )}
        </FormItem>

        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input 
              name="email"
              type="email" 
              placeholder="Enter email" 
              className={errors.email ? "border-red-500" : ""}
            />
          </FormControl>
          {errors.email && (
            <FormMessage>{errors.email}</FormMessage>
          )}
        </FormItem>

        <FormItem>
          <div className="flex items-center space-x-2">
            <Checkbox id="privacy" />
            <FormLabel htmlFor="privacy">I accept the privacy policy</FormLabel>
          </div>
          <FormDescription>
            Read our privacy policy to understand how we handle your data.
          </FormDescription>
        </FormItem>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

// Async Validation Example
export function AsyncValidationFormExample() {
  const [isChecking, setIsChecking] = useState(false)
  const [usernameError, setUsernameError] = useState("")
  const form = useForm({
    defaultValues: {
      username: "",
      notifications: false
    }
  })
  
  // Mock API call
  const checkUsernameAvailability = async (username: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return username !== "admin" && username !== "test"
  }

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    
    if (!value) {
      setUsernameError("Username is required")
      return
    }
    
    if (value.length < 3) {
      setUsernameError("Username must be at least 3 characters")
      return
    }
    
    setIsChecking(true)
    setUsernameError("")
    
    try {
      const isAvailable = await checkUsernameAvailability(value)
      if (!isAvailable) {
        setUsernameError("Username is already taken")
      }
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <div className="relative">
              <Input 
                placeholder="Enter username"
                onChange={handleUsernameChange}
                className={usernameError ? "border-red-500" : ""}
              />
              {isChecking && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription>
            Choose a unique username for your account.
          </FormDescription>
          {usernameError && (
            <FormMessage>{usernameError}</FormMessage>
          )}
        </FormItem>

        <FormItem>
          <div className="flex items-center space-x-2">
            <Checkbox id="notifications" />
            <FormLabel htmlFor="notifications">Enable notifications</FormLabel>
          </div>
          <FormDescription>
            Receive email notifications for account activity.
          </FormDescription>
        </FormItem>

        <Button 
          type="submit" 
          disabled={isChecking || !!usernameError}
        >
          Submit
        </Button>
      </form>
    </Form>
  )
}