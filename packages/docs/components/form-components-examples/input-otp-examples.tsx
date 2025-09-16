"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  Button,
} from "@helgadigitals/vera-ui"

// Form Integration Example
export function FormIntegrationExample() {
  const { control, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = (data: any) => {
    console.log("Verification code:", data.code)
    alert(`Verification code: ${data.code}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Verification Code *
        </label>
        <Controller
          name="code"
          control={control}
          rules={{
            required: "Verification code is required",
            minLength: {
              value: 6,
              message: "Please enter the complete 6-digit code"
            }
          }}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value || ""}
              onChange={field.onChange}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.code && (
          <p className="text-sm text-red-600">
            {errors.code.message as string}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Verify Code
      </Button>
    </form>
  )
}

// With Timer and Resend Example
export function WithTimerAndResendExample() {
  const [value, setValue] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const handleResend = () => {
    // Simulate sending new code
    console.log("Resending code...")
    alert("New verification code sent!")
    setTimeLeft(60)
    setCanResend(false)
    setValue("")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Enter verification code
        </label>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div className="text-center space-y-2">
        {canResend ? (
          <Button variant="outline" onClick={handleResend}>
            Resend Code
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Resend code in {formatTime(timeLeft)}
          </p>
        )}
      </div>
    </div>
  )
}

// Custom Styling Example
export function CustomStylingExample() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-8">
      {/* Large slots */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Large OTP Input</label>
        <InputOTP
          maxLength={4}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot 
              index={0} 
              className="w-12 h-12 text-lg"
            />
            <InputOTPSlot 
              index={1} 
              className="w-12 h-12 text-lg"
            />
            <InputOTPSlot 
              index={2} 
              className="w-12 h-12 text-lg"
            />
            <InputOTPSlot 
              index={3} 
              className="w-12 h-12 text-lg"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Rounded slots */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Rounded OTP Input</label>
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot 
              index={0} 
              className="rounded-full"
            />
            <InputOTPSlot 
              index={1} 
              className="rounded-full"
            />
            <InputOTPSlot 
              index={2} 
              className="rounded-full"
            />
            <InputOTPSlot 
              index={3} 
              className="rounded-full"
            />
            <InputOTPSlot 
              index={4} 
              className="rounded-full"
            />
            <InputOTPSlot 
              index={5} 
              className="rounded-full"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  )
}

// Alphanumeric Code Example
export function AlphanumericCodeExample() {
  const [value, setValue] = useState("")
  const REGEXP_ONLY_CHARS_AND_DIGITS = "^[A-Z0-9]+$"

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Enter backup code (letters and numbers)
        </label>
        <InputOTP
          maxLength={8}
          pattern={REGEXP_ONLY_CHARS_AND_DIGITS}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            <InputOTPSlot index={6} />
            <InputOTPSlot index={7} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        Format: XXXX-XXXX (letters and numbers only)
      </p>
    </div>
  )
}