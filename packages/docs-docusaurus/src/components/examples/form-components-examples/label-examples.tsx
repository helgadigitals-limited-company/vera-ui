"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form"
import { User } from "lucide-react"
import { 
  Label, 
  Input, 
  Button,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from "@helgadigitals/vera-ui"

export function WithDescriptionExample() {
  return (
    <div className="space-y-2">
      <div>
        <Label htmlFor="api-key" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          API Key
        </Label>
        <p className="text-sm text-muted-foreground">
          Your API key is used to authenticate requests
        </p>
      </div>
      <Input id="api-key" type="text" placeholder="Enter your API key" />
      <Button type="button" variant="outline" size="sm">
        Generate New Key
      </Button>
    </div>
  )
}

export function FormIntegrationExample() {
  const form = useForm({
    defaultValues: {
      standalone: "",
      integrated: ""
    }
  })

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Using standalone Label */}
        <div className="space-y-2">
          <Label htmlFor="standalone" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Standalone Label
          </Label>
          <Input id="standalone" type="text" placeholder="Enter standalone value" />
        </div>

        {/* Using FormLabel (automatically integrated) */}
        <FormField
          control={form.control}
          name="integrated"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Integrated Form Label
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter integrated value" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex gap-2">
          <Button type="submit">Submit Form</Button>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
        </div>
      </form>
    </Form>
  )
}

export function CustomStylingExample() {
  return (
    <div className="space-y-6">
      {/* Large label */}
      <div className="space-y-2">
        <Label htmlFor="large" className="text-base font-semibold flex items-center gap-2">
          <User className="h-5 w-5" />
          Large Label
        </Label>
        <Input id="large" type="text" placeholder="Large label input" />
        <Button variant="secondary" size="sm">
          Update Large Field
        </Button>
      </div>

      {/* Colored label */}
      <div className="space-y-2">
        <Label htmlFor="colored" className="text-blue-600 font-medium flex items-center gap-2">
          <User className="h-4 w-4 text-blue-600" />
          Colored Label
        </Label>
        <Input id="colored" type="text" placeholder="Colored label input" />
        <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
          Save Colored Field
        </Button>
      </div>

      {/* Label with background */}
      <div className="space-y-2">
        <Label 
          htmlFor="background" 
          className="bg-muted px-2 py-1 rounded text-sm flex items-center gap-2 w-fit"
        >
          <User className="h-4 w-4" />
          Label with Background
        </Label>
        <Input id="background" type="text" placeholder="Background label input" />
        <div className="flex gap-2">
          <Button size="sm">Submit</Button>
          <Button variant="ghost" size="sm">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}