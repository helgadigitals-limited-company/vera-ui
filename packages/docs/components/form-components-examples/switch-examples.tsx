"use client"

import { useState } from "react"
import { Switch, Label, Card } from "@helgadigitals/vera-ui"

export function FeatureTogglesExample() {
  const [features, setFeatures] = useState({
    betaFeatures: false,
    advancedMode: false,
    autoSave: true,
    realTimeSync: false,
  })

  const handleFeatureToggle = (feature: string) => (checked: boolean) => {
    setFeatures(prev => ({ ...prev, [feature]: checked }))
  }

  return (
    <Card className="p-6 max-w-md">
      <h3 className="text-lg font-semibold mb-4">Feature Toggles</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label htmlFor="beta" className="flex-1">
            Beta Features
          </Label>
          <Switch
            id="beta"
            checked={features.betaFeatures}
            onCheckedChange={handleFeatureToggle('betaFeatures')}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="advanced" className="flex-1">
            Advanced Mode
          </Label>
          <Switch
            id="advanced"
            checked={features.advancedMode}
            onCheckedChange={handleFeatureToggle('advancedMode')}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="autosave" className="flex-1">
            Auto Save
          </Label>
          <Switch
            id="autosave"
            checked={features.autoSave}
            onCheckedChange={handleFeatureToggle('autoSave')}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="sync" className="flex-1">
            Real-time Sync
          </Label>
          <Switch
            id="sync"
            checked={features.realTimeSync}
            onCheckedChange={handleFeatureToggle('realTimeSync')}
          />
        </div>
      </div>
    </Card>
  )
}

export function CustomStylingExample() {
  const [isEnabled, setIsEnabled] = useState(false)

  return (
    <div className="space-y-6">
      {/* Large switch */}
      <div className="flex items-center space-x-3">
        <Switch
          id="large"
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          className="h-6 w-11"
        />
        <Label htmlFor="large" className="text-lg">
          Large Switch
        </Label>
      </div>

      {/* Colored switch */}
      <div className="flex items-center space-x-2">
        <Switch
          id="colored"
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          className="data-[state=checked]:bg-green-600"
        />
        <Label htmlFor="colored">
          Custom Color Switch
        </Label>
      </div>

      {/* Switch with custom thumb */}
      <div className="flex items-center space-x-2">
        <Switch
          id="custom-thumb"
          checked={isEnabled}
          onCheckedChange={setIsEnabled}
          className="[&>span]:bg-blue-600 [&>span]:data-[state=checked]:bg-white"
        />
        <Label htmlFor="custom-thumb">
          Custom Thumb Color
        </Label>
      </div>
    </div>
  )
}