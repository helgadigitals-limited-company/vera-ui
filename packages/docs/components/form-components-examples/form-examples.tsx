"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormField,
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

// Basic Form example
export default function FormExample() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

// Named export for consistency
export { FormExample }

// With Zod Example
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export function ZodExample() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  })

  function onSubmit(values: z.infer<typeof schema>) {
    console.log("Form submitted:", values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

// Complete Registration Form
const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don&apos;t match",
  path: ["confirmPassword"],
})

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      newsletter: false,
    },
  })

  async function onSubmit(values: z.infer<typeof registrationSchema>) {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Registration submitted:", values)
      form.reset()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-md">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We&apos;ll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters with uppercase, lowercase, and number.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I accept the terms and conditions
                </FormLabel>
                <FormDescription>
                  You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Subscribe to newsletter
                </FormLabel>
                <FormDescription>
                  Receive updates about new features and releases.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  )
}

// Form with errorstate example
const errorSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  username: z.string().min(3, "Username too short"),
})

export function ErrorStateExample() {
  const form = useForm<z.infer<typeof errorSchema>>({
    resolver: zodResolver(errorSchema),
    defaultValues: { email: "", username: "" },
  })

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  className={fieldState.error ? "border-red-500" : ""}
                />
              </FormControl>
              {fieldState.error && (
                <FormMessage className="text-red-600" />
              )}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage className="text-orange-500 font-medium" />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

// Form with Submissionstate Example
export function SubmissionStateExample() {
  const form = useForm({
    defaultValues: { message: "" },
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (data: { message: string }) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Form submitted:", data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="Enter your message" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  )
}
// Form ConditionalFields Example
export function ConditionalFieldsExample() {
  const form = useForm({
    defaultValues: {
      showAdvanced: false,
      advancedOption: "",
    },
  })

  const showAdvanced = form.watch("showAdvanced")

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="showAdvanced"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Show advanced options</FormLabel>
            </FormItem>
          )}
        />
        
        {showAdvanced && (
          <FormField
            control={form.control}
            name="advancedOption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Advanced Setting</FormLabel>
                <FormControl>
                  <Input placeholder="Enter advanced setting" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

// Form Reset Example
export function FormResetExample() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
    },
  })

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => form.reset()}
          >
            Reset
          </Button>

          <Button 
            type="button"
            variant="outline"
            onClick={() => form.reset({ name: "", email: "user@example.com" })}
          >
            Reset to Template
          </Button>

          <Button 
            type="button"
            variant="outline"
            onClick={() => form.resetField("email")}
          >
            Clear Email
          </Button>
        </div>
      </form>
    </Form>
  )
}

// Custom Layout Form example
export function CustomLayoutExample() {
  const form = useForm({
    defaultValues: {
      horizontal: "",
      inline: "",
    },
  })

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Horizontal form layout */}
        <FormField
          control={form.control}
          name="horizontal"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-4 space-y-0">
              <FormLabel className="w-1/4">Horizontal Label</FormLabel>
              <FormControl className="flex-1">
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Inline form */}
        <FormField
          control={form.control}
          name="inline"
          render={({ field }) => (
            <FormItem className="flex items-center gap-2">
              <FormLabel>Search:</FormLabel>
              <FormControl>
                <Input className="w-auto" {...field} />
              </FormControl>
              <Button size="sm">Go</Button>
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}

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