"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Code, Database, Globe, Smartphone, Mail, Phone, MessageSquare } from "lucide-react"
import { MultiSelect, Button } from "@helgadigitals/vera-ui"

export function BasicMultiSelectExample() {
  const [selectedFruits, setSelectedFruits] = useState<string[]>([])

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
    { value: "strawberry", label: "Strawberry" },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Choose your favorite fruits</label>
        <MultiSelect
          options={fruits}
          onValueChange={setSelectedFruits}
          defaultValue={selectedFruits}
          placeholder="Select fruits"
          className="w-full max-w-md"
        />
      </div>
      
      {selectedFruits.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Selected fruits:</p>
          <ul className="text-sm text-muted-foreground">
            {selectedFruits.map((value) => {
              const fruit = fruits.find(f => f.value === value)
              return <li key={value}>• {fruit?.label}</li>
            })}
          </ul>
        </div>
      )}
    </div>
  )
}

export function WithIconsExample() {
  const [selectedTech, setSelectedTech] = useState<string[]>([])

  const technologies = [
    { value: "frontend", label: "Frontend", icon: Globe },
    { value: "backend", label: "Backend", icon: Database },
    { value: "mobile", label: "Mobile", icon: Smartphone },
    { value: "devops", label: "DevOps", icon: Code },
  ]

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Technology areas</label>
      <MultiSelect
        options={technologies}
        onValueChange={setSelectedTech}
        defaultValue={selectedTech}
        placeholder="Select technology areas"
        className="w-full max-w-md"
      />
    </div>
  )
}

export function ContactMethodsExample() {
  const [selectedMethods, setSelectedMethods] = useState<string[]>([])

  const contactMethods = [
    { value: "email", label: "Email", icon: Mail },
    { value: "phone", label: "Phone", icon: Phone },
    { value: "sms", label: "SMS", icon: MessageSquare },
    { value: "web", label: "Website", icon: Globe },
  ]

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Preferred contact methods</label>
        <MultiSelect
          options={contactMethods}
          onValueChange={setSelectedMethods}
          defaultValue={selectedMethods}
          placeholder="Select contact methods"
          className="w-full max-w-md"
        />
      </div>
      
      {selectedMethods.length > 0 && (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Save Preferences
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setSelectedMethods([])}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}

export function WithAnimationExample() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])

  const countries = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
  ]

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Countries (with animation)</label>
      <MultiSelect
        options={countries}
        onValueChange={setSelectedCountries}
        defaultValue={selectedCountries}
        placeholder="Select countries"
        animation={0.5}
        className="w-full max-w-md"
      />
      <p className="text-xs text-muted-foreground">
        Click the sparkle icon to animate selected badges
      </p>
    </div>
  )
}

export function MaxCountExample() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedSkills2, setSelectedSkills2] = useState<string[]>([])

  const skills = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
  ]

  return (
    <div className="space-y-4">
      {/* Show only 2 badges */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Skills (max 2 visible)</label>
        <MultiSelect
          options={skills}
          onValueChange={setSelectedSkills}
          defaultValue={selectedSkills}
          placeholder="Select skills"
          maxCount={2}
          className="w-full max-w-md"
        />
      </div>

      {/* Show 5 badges */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Skills (max 5 visible)</label>
        <MultiSelect
          options={skills}
          onValueChange={setSelectedSkills2}
          defaultValue={selectedSkills2}
          placeholder="Select skills"
          maxCount={5}
          className="w-full max-w-md"
        />
      </div>
    </div>
  )
}

export function FormIntegrationExample() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm()

  const interests = [
    { value: "technology", label: "Technology" },
    { value: "sports", label: "Sports" },
    { value: "music", label: "Music" },
    { value: "art", label: "Art" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food" },
  ]

  const skills = [
    { value: "coding", label: "Coding" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "management", label: "Management" },
  ]

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data)
    alert(`Form submitted! Check console for details.`)
  }

  const watchedValues = watch()

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Interests *</label>
          <Controller
            name="interests"
            control={control}
            rules={{
              required: "Please select at least one interest",
              validate: (value) => 
                value?.length >= 2 || "Please select at least 2 interests"
            }}
            render={({ field }) => (
              <MultiSelect
                options={interests}
                onValueChange={field.onChange}
                formValue={field.value || []}
                placeholder="Select your interests"
                className="w-full max-w-md"
              />
            )}
          />
          {errors.interests && (
            <p className="text-sm text-destructive">
              {errors.interests.message as string}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Skills (Optional)</label>
          <Controller
            name="skills"
            control={control}
            render={({ field }) => (
              <MultiSelect
                options={skills}
                onValueChange={field.onChange}
                formValue={field.value || []}
                placeholder="Select your skills"
                maxCount={2}
                className="w-full max-w-md"
              />
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      {(watchedValues.interests || watchedValues.skills) && (
        <div className="mt-4 p-3 bg-muted rounded-md">
          <h4 className="text-sm font-medium mb-2">Current Values:</h4>
          <pre className="text-xs">
            {JSON.stringify({ interests: watchedValues.interests || [], skills: watchedValues.skills || [] }, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export function ModalPopoverExample() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const languages = [
    { value: "en", label: "English" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
    { value: "ja", label: "Japanese" },
    { value: "zh", label: "Chinese" },
  ]

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Languages (modal)</label>
      <MultiSelect
        options={languages}
        onValueChange={setSelectedLanguages}
        defaultValue={selectedLanguages}
        placeholder="Select languages"
        modalPopover={true}
        className="w-full max-w-md"
      />
      <p className="text-xs text-muted-foreground">
        Modal popover blocks interaction with other elements
      </p>
    </div>
  )
}

export function LargeDatasetExample() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

  // Generate a large list of options
  const generateOptions = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      value: `option-${i + 1}`,
      label: `Option ${i + 1}`,
    }))
  }

  const options = generateOptions(100)

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Large dataset (100 options) - use search to filter
      </label>
      <MultiSelect
        options={options}
        onValueChange={setSelectedOptions}
        defaultValue={selectedOptions}
        placeholder="Search and select options"
        maxCount={5}
        className="w-full max-w-md"
      />
      {selectedOptions.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Selected {selectedOptions.length} options
        </p>
      )}
    </div>
  )
}