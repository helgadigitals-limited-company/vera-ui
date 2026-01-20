"use client";

import { toast } from "@helgadigitals/vera-ui";
import { Button } from "@helgadigitals/vera-ui";
import { Star, Heart, Mail } from "lucide-react";

export function BasicToastExample() {
  return (
    <div className="space-y-2">
      <Button onClick={() => toast("Basic toast message")}>Show Basic Toast</Button>
    </div>
  );
}

export function ToastTypesExample() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button onClick={() => toast.success("Success! Operation completed")}>
        Success
      </Button>
      <Button variant={'destructive'} onClick={() => toast.error("Error! Something went wrong")}>
        Error
      </Button>
      <Button variant={'secondary'} onClick={() => toast.warning("Warning! Please check your input")}>
        Warning
      </Button>
      <Button variant={'outline'} onClick={() => toast.info("Info: This is an information message")}>
        Info
      </Button>
    </div>
  );
}

export function ToastWithDescriptionExample() {
  return (
    <div className="space-y-2">
      <Button 
        onClick={() => 
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
          })
        }
      >
        Show with Description
      </Button>
    </div>
  );
}

export function ToastWithActionsExample() {
  return (
    <div className="space-y-2">
      <Button 
        onClick={() => 
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show with Action
      </Button>
    </div>
  );
}

export function ToastWithCustomIconExample() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button 
        onClick={() => 
          toast.success("Starred!", {
            icon: <Star className="h-4 w-4" />,
          })
        }
      >
        Custom Success Icon
      </Button>
      <Button 
        onClick={() => 
          toast("You have mail!", {
            icon: <Mail className="h-4 w-4" />,
          })
        }
      >
        Custom Icon
      </Button>
    </div>
  );
}

export function ToastPositionExample() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button 
        onClick={() => 
          toast("Toast on top-left", {
            position: "top-left",
          })
        }
      >
        Top Left
      </Button>
      <Button 
        onClick={() => 
          toast("Toast on top-right", {
            position: "top-right",
          })
        }
      >
        Top Right
      </Button>
      <Button 
        onClick={() => 
          toast("Toast on bottom-left", {
            position: "bottom-left",
          })
        }
      >
        Bottom Left
      </Button>
      <Button 
        onClick={() => 
          toast("Toast on bottom-right", {
            position: "bottom-right",
          })
        }
      >
        Bottom Right
      </Button>
    </div>
  );
}

export function ToastDurationExample() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button 
        onClick={() => 
          toast("Short duration (1s)", {
            duration: 1000,
          })
        }
      >
        1 Second
      </Button>
      <Button 
        onClick={() => 
          toast("Long duration (10s)", {
            duration: 10000,
          })
        }
      >
        10 Seconds
      </Button>
      <Button 
        onClick={() => 
          toast("Persistent toast", {
            duration: Infinity,
            action: {
              label: "Dismiss",
              onClick: () => {},
            },
          })
        }
      >
        Persistent
      </Button>
    </div>
  );
}

export function ToastPromiseExample() {
  const simulateAsyncOperation = () => {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Success!");
        } else {
          reject("Failed!");
        }
      }, 2000);
    });
  };

  return (
    <div className="space-y-2">
      <Button 
        onClick={() => 
          toast.promise(simulateAsyncOperation(), {
            loading: "Loading...",
            success: (data: string) => `Operation completed: ${data}`,
            error: (error: string) => `Error: ${error}`,
          })
        }
      >
        Promise Toast
      </Button>
    </div>
  );
}

export function ToastCustomExample() {
  return (
    <div className="space-y-2">
      <Button 
        onClick={() => 
          toast.custom((t: string | number) => (
            <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border">
              <Heart className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-semibold">Custom Toast</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is a completely custom toast
                </p>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => toast.dismiss(t)}
              >
                ×
              </Button>
            </div>
          ))
        }
      >
        Custom Toast
      </Button>
    </div>
  );
}