"use client";

import { useState } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Badge,
} from "@helgadigitals/vera-ui";
import { 
  AlertTriangle, 
  X, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Megaphone,
  Star,
  Shield,
  Calendar,
  ExternalLink
} from "lucide-react";

export function InteractiveAlertsExample() {
  const [showAlert1, setShowAlert1] = useState(true);
  const [showAlert2, setShowAlert2] = useState(true);

  return (
    <div className="space-y-4">
      {showAlert1 && (
        <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
          <AlertTriangle className="h-4 w-4" />
          <div className="flex-1">
            <AlertTitle>Storage Almost Full</AlertTitle>
            <AlertDescription>
              You&apos;ve used 90% of your storage space. Consider upgrading your plan.
            </AlertDescription>
          </div>
          <div className="flex items-start space-x-2 ml-4">
            <Button size="sm" variant="outline" className="h-8">
              Upgrade
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0"
              onClick={() => setShowAlert1(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      )}

      {showAlert2 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <div className="flex-1">
            <AlertTitle>Payment Failed</AlertTitle>
            <AlertDescription>
              We couldn&apos;t process your payment. Please update your payment method.
            </AlertDescription>
          </div>
          <div className="flex items-start space-x-2 ml-4">
            <Button size="sm" variant="outline" className="h-8 bg-white text-red-600 border-red-300 hover:bg-red-50">
              Update Payment
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-red-600 hover:bg-red-100"
              onClick={() => setShowAlert2(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      )}

      {!showAlert1 && !showAlert2 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">All alerts dismissed</p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              setShowAlert1(true);
              setShowAlert2(true);
            }}
          >
            Show Alerts Again
          </Button>
        </div>
      )}
    </div>
  );
}

export function StatusNotificationsExample() {
  return (
    <div className="space-y-4">
      {/* Processing */}
      <Alert>
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertTitle className="flex items-center gap-2">
          Processing Upload
          <Badge variant="secondary">In Progress</Badge>
        </AlertTitle>
        <AlertDescription>
          Your file is being processed. This may take a few minutes.
        </AlertDescription>
      </Alert>

      {/* Pending */}
      <Alert className="border-blue-200 bg-blue-50 text-blue-800">
        <Clock className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          Review Pending
          <Badge variant="outline" className="border-blue-300 text-blue-700">
            Pending
          </Badge>
        </AlertTitle>
        <AlertDescription>
          Your submission is awaiting review from the moderation team.
        </AlertDescription>
      </Alert>

      {/* Success */}
      <Alert className="border-green-200 bg-green-50 text-green-800">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          Deployment Successful
          <Badge variant="outline" className="border-green-300 text-green-700">
            Complete
          </Badge>
        </AlertTitle>
        <AlertDescription>
          Your application has been deployed to production successfully.
        </AlertDescription>
      </Alert>

      {/* Warning */}
      <Alert className="border-orange-200 bg-orange-50 text-orange-800">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          High Memory Usage
          <Badge variant="outline" className="border-orange-300 text-orange-700">
            Warning
          </Badge>
        </AlertTitle>
        <AlertDescription>
          Your application is using 85% of available memory. Consider scaling up.
        </AlertDescription>
      </Alert>

      {/* Error */}
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          Backup Failed
          <Badge variant="outline" className="border-red-300 text-red-700 bg-red-100">
            Failed
          </Badge>
        </AlertTitle>
        <AlertDescription>
          The scheduled backup could not be completed. Check system logs for details.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export function FormValidationExample() {
  return (
    <div className="space-y-6 max-w-md">
      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please enter a valid email address.
          </AlertDescription>
        </Alert>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Password meets all security requirements.
          </AlertDescription>
        </Alert>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Form Validation</AlertTitle>
        <AlertDescription>
          Please fix the errors above before submitting the form.
        </AlertDescription>
      </Alert>

      <Button className="w-full" disabled>
        Submit Form
      </Button>
    </div>
  );
}

export function SystemAnnouncementsExample() {
  return (
    <div className="space-y-4">
      {/* Feature Announcement */}
      <Alert className="border-purple-200 bg-purple-50 text-purple-800">
        <Star className="h-4 w-4" />
        <div className="col-start-2 flex items-start justify-between">
          <div className="flex-1">
            <AlertTitle>New Feature: Dark Mode</AlertTitle>
            <AlertDescription>
              We&apos;ve added dark mode support! Toggle it in your profile settings.
            </AlertDescription>
          </div>
          <Button size="sm" variant="outline" className="ml-4 border-purple-300 text-purple-700 hover:bg-purple-100">
            Try It Now
          </Button>
        </div>
      </Alert>

      {/* Security Update */}
      <Alert className="border-blue-200 bg-blue-50 text-blue-800">
        <Shield className="h-4 w-4" />
        <div className="col-start-2 flex items-start justify-between">
          <div className="flex-1">
            <AlertTitle>Security Update Available</AlertTitle>
            <AlertDescription>
              A critical security update is available. Please update your application.
            </AlertDescription>
          </div>
          <Button size="sm" variant="outline" className="ml-4 border-blue-300 text-blue-700 hover:bg-blue-100">
            Update Now
          </Button>
        </div>
      </Alert>

      {/* Maintenance Notice */}
      <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
        <Calendar className="h-4 w-4" />
        <div className="col-start-2 flex items-start justify-between">
          <div className="flex-1">
            <AlertTitle>Scheduled Maintenance</AlertTitle>
            <AlertDescription>
              System maintenance is scheduled for March 15, 2024 from 2-4 AM EST.
            </AlertDescription>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="ml-4 border-yellow-300 text-yellow-700 hover:bg-yellow-100"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            Details
          </Button>
        </div>
      </Alert>

      {/* General Announcement */}
      <Alert>
        <Megaphone className="h-4 w-4" />
        <div className="col-start-2 flex items-start justify-between">
          <div className="flex-1">
            <AlertTitle>Join Our Webinar</AlertTitle>
            <AlertDescription>
              Learn about our latest features in our upcoming webinar on March 20th.
            </AlertDescription>
          </div>
          <Button size="sm" variant="outline" className="ml-4">
            Register
          </Button>
        </div>
      </Alert>
    </div>
  );
}