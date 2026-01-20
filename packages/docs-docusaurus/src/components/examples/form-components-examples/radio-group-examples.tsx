"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { Check } from "lucide-react"
import { RadioGroup, RadioGroupItem, Label, Button } from "@helgadigitals/vera-ui"

export function WithDescriptionsExample() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Choose delivery option</h3>
      <RadioGroup defaultValue="standard" className="space-y-4">
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="standard" id="delivery-standard" className="mt-1" />
          <div className="space-y-1">
            <Label htmlFor="delivery-standard">Standard Delivery</Label>
            <p className="text-sm text-muted-foreground">
              5-7 business days • Free
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="express" id="delivery-express" className="mt-1" />
          <div className="space-y-1">
            <Label htmlFor="delivery-express">Express Delivery</Label>
            <p className="text-sm text-muted-foreground">
              2-3 business days • $9.99
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="overnight" id="delivery-overnight" className="mt-1" />
          <div className="space-y-1">
            <Label htmlFor="delivery-overnight">Overnight Delivery</Label>
            <p className="text-sm text-muted-foreground">
              Next business day • $24.99
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}

export function DisabledStateExample() {
  return (
    <div className="space-y-6">
      {/* Disabled group */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Disabled Group</h3>
        <RadioGroup defaultValue="option1" disabled>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option1" id="disabled-1" />
            <Label htmlFor="disabled-1">Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option2" id="disabled-2" />
            <Label htmlFor="disabled-2">Option 2</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Individual disabled items */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Mixed State</h3>
        <RadioGroup defaultValue="available1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="available1" id="mixed-1" />
            <Label htmlFor="mixed-1">Available Option 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="disabled" id="mixed-2" disabled />
            <Label htmlFor="mixed-2">Disabled Option</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="available2" id="mixed-3" />
            <Label htmlFor="mixed-3">Available Option 2</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

export function FormIntegrationExample() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      contactMethod: "email",
      frequency: "never"
    }
  })

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data)
    alert(`Form submitted! Contact method: ${data.contactMethod}, Frequency: ${data.frequency}`)
  }

  const watchedValues = watch()

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Preferred contact method *</h3>
          <Controller
            name="contactMethod"
            control={control}
            rules={{ required: "Please select a contact method" }}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="contact-email" />
                  <Label htmlFor="contact-email">Email</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="phone" id="contact-phone" />
                  <Label htmlFor="contact-phone">Phone</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sms" id="contact-sms" />
                  <Label htmlFor="contact-sms">SMS</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.contactMethod && (
            <p className="text-sm text-destructive">
              {errors.contactMethod.message as string}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium">Newsletter frequency</h3>
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="freq-daily" />
                  <Label htmlFor="freq-daily">Daily</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="freq-weekly" />
                  <Label htmlFor="freq-weekly">Weekly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="freq-monthly" />
                  <Label htmlFor="freq-monthly">Monthly</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="never" id="freq-never" />
                  <Label htmlFor="freq-never">Never</Label>
                </div>
              </RadioGroup>
            )}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      <div className="mt-4 p-3 bg-muted rounded-md">
        <h4 className="text-sm font-medium mb-2">Current Values:</h4>
        <pre className="text-xs">
          {JSON.stringify({
            contactMethod: watchedValues.contactMethod || "none",
            frequency: watchedValues.frequency || "none"
          }, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export function CardStyleExample() {
  const [selectedTier, setSelectedTier] = useState("pro")

  const plans = [
    {
      value: "free",
      title: "Free",
      description: "Perfect for getting started",
      price: "$0",
      features: ["Up to 3 projects", "Community support"]
    },
    {
      value: "pro",
      title: "Pro",
      description: "Best for professionals",
      price: "$10",
      features: ["Unlimited projects", "Priority support", "Advanced features"]
    },
    {
      value: "enterprise",
      title: "Enterprise",
      description: "For large organizations",
      price: "$50",
      features: ["Everything in Pro", "Custom integrations", "Dedicated support"]
    }
  ]

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Choose your plan</h3>
      <RadioGroup 
        value={selectedTier} 
        onValueChange={setSelectedTier}
        className="space-y-2"
      >
        {plans.map((plan) => (
          <div
            key={plan.value}
            className={`relative flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedTier === plan.value 
                ? "border-primary bg-primary/5" 
                : "border-input hover:bg-accent"
            }`}
          >
            <RadioGroupItem 
              value={plan.value} 
              id={`plan-${plan.value}`}
              className="mt-1"
            />
            <div className="ml-3 flex-1">
              <Label htmlFor={`plan-${plan.value}`} className="font-medium cursor-pointer">
                {plan.title} - {plan.price}/month
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                {plan.description}
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </RadioGroup>
      
      <div className="mt-4 p-3 bg-muted rounded-md">
        <p className="text-sm font-medium">Selected Plan: {selectedTier}</p>
        <p className="text-xs text-muted-foreground">
          {plans.find(p => p.value === selectedTier)?.description}
        </p>
      </div>
    </div>
  )
}