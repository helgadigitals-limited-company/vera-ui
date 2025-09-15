"use client";

import { Progress } from "@helgadigitals/vera-ui";
import { Button } from "@helgadigitals/vera-ui";
import { Badge } from "@helgadigitals/vera-ui";
import { useState } from "react";
import { Check, Circle, Upload, FileText, CheckCircle, XCircle } from "lucide-react";

export function BasicProgressExample() {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progress</span>
          <span>25%</span>
        </div>
        <Progress value={25} className="w-full" />
      </div>
      
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Loading</span>
          <span>60%</span>
        </div>
        <Progress value={60} className="w-full" />
      </div>
      
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Complete</span>
          <span>100%</span>
        </div>
        <Progress value={100} className="w-full" />
      </div>
    </div>
  );
}

export function AnimatedProgressExample() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startProgress = () => {
    setProgress(0);
    setIsRunning(true);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetProgress = () => {
    setProgress(0);
    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Download Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
      
      <div className="flex gap-2">
        <Button 
          onClick={startProgress} 
          disabled={isRunning}
          className="flex-1"
        >
          {isRunning ? 'Downloading...' : 'Start Download'}
        </Button>
        <Button 
          onClick={resetProgress} 
          variant="outline"
          disabled={isRunning}
        >
          Reset
        </Button>
      </div>
      
      {progress === 100 && (
        <div className="text-sm text-green-600 font-medium">
          ✓ Download completed!
        </div>
      )}
    </div>
  );
}

export function ProgressSizesExample() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Small (h-1)</p>
        <Progress value={75} className="w-full h-1" />
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default (h-2)</p>
        <Progress value={75} className="w-full" />
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Medium (h-3)</p>
        <Progress value={75} className="w-full h-3" />
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Large (h-4)</p>
        <Progress value={75} className="w-full h-4" />
      </div>
    </div>
  );
}

export function ColoredProgressExample() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground mb-2">Default</p>
        <Progress value={60} className="w-full" />
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Success</p>
        <Progress 
          value={85} 
          className="w-full [&>div]:bg-green-500" 
        />
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Warning</p>
        <Progress 
          value={45} 
          className="w-full [&>div]:bg-yellow-500" 
        />
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Danger</p>
        <Progress 
          value={25} 
          className="w-full [&>div]:bg-red-500" 
        />
      </div>
      
      <div>
        <p className="text-sm text-muted-foreground mb-2">Info</p>
        <Progress 
          value={70} 
          className="w-full [&>div]:bg-blue-500" 
        />
      </div>
    </div>
  );
}

export function MultiStepProgressExample() {
  const [currentStep, setCurrentStep] = useState(2);
  
  const steps = [
    "Account Setup",
    "Profile Information", 
    "Preferences",
    "Verification",
    "Complete"
  ];

  const progress = (currentStep / (steps.length - 1)) * 100;

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Setup Progress</span>
          <span>Step {currentStep + 1} of {steps.length}</span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
      
      <div className="space-y-2">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              {index < currentStep ? (
                <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                  <Check className="w-4 h-4 text-white" />
                </div>
              ) : index === currentStep ? (
                <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                  <Circle className="w-3 h-3 text-white fill-current" />
                </div>
              ) : (
                <div className="flex items-center justify-center w-6 h-6 bg-muted rounded-full">
                  <Circle className="w-3 h-3 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className={`text-sm ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {step}
              </p>
            </div>
            {index < currentStep && (
              <Badge variant="outline" className="text-xs">
                Complete
              </Badge>
            )}
            {index === currentStep && (
              <Badge variant="default" className="text-xs">
                Current
              </Badge>
            )}
          </div>
        ))}
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button 
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
        >
          {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

export function FileUploadProgressExample() {
  const [files, setFiles] = useState([
    { name: "document.pdf", size: "2.4 MB", progress: 100, status: "complete" },
    { name: "image.jpg", size: "1.8 MB", progress: 65, status: "uploading" },
    { name: "video.mp4", size: "15.2 MB", progress: 25, status: "uploading" },
    { name: "archive.zip", size: "5.1 MB", progress: 0, status: "error" },
  ]);

  const [isUploading, setIsUploading] = useState(false);

  const simulateUpload = () => {
    setIsUploading(true);
    const interval = setInterval(() => {
      setFiles(prevFiles => 
        prevFiles.map(file => {
          if (file.status === "uploading" && file.progress < 100) {
            const newProgress = Math.min(100, file.progress + Math.random() * 15);
            return {
              ...file,
              progress: newProgress,
              status: newProgress === 100 ? "complete" : "uploading"
            };
          }
          return file;
        })
      );
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setIsUploading(false);
    }, 5000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return <Badge variant="outline" className="text-green-600 border-green-200">Complete</Badge>;
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Uploading</Badge>;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "complete":
        return "[&>div]:bg-green-500";
      case "error":
        return "[&>div]:bg-red-500";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-2">
          Drop files here or click to browse
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={simulateUpload}
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Simulate Upload'}
        </Button>
      </div>

      <div className="space-y-3">
        {files.map((file, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(file.status)}
                <div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.size}</p>
                </div>
              </div>
              {getStatusBadge(file.status)}
            </div>
            
            {file.status !== "error" && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{Math.round(file.progress)}%</span>
                </div>
                <Progress 
                  value={file.progress} 
                  className={`w-full ${getProgressColor(file.status)}`}
                />
              </div>
            )}
            
            {file.status === "error" && (
              <p className="text-xs text-red-600 mt-1">
                Upload failed. Click to retry.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CircularProgressExample() {
  const CircularProgress = ({ value, size = 120, strokeWidth = 8 }: { value: number, size?: number, strokeWidth?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-primary transition-all duration-300 ease-in-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-semibold">{value}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex justify-center space-x-8">
      <div className="text-center">
        <CircularProgress value={25} />
        <p className="text-sm text-muted-foreground mt-2">Downloads</p>
      </div>
      
      <div className="text-center">
        <CircularProgress value={75} />
        <p className="text-sm text-muted-foreground mt-2">Uploads</p>
      </div>
      
      <div className="text-center">
        <CircularProgress value={100} />
        <p className="text-sm text-muted-foreground mt-2">Complete</p>
      </div>
    </div>
  );
}

export function SkillProgressExample() {
  const skills = [
    { name: "React", level: 90, color: "[&>div]:bg-blue-500" },
    { name: "TypeScript", level: 85, color: "[&>div]:bg-blue-600" },
    { name: "Node.js", level: 75, color: "[&>div]:bg-green-500" },
    { name: "Python", level: 70, color: "[&>div]:bg-yellow-500" },
    { name: "Docker", level: 60, color: "[&>div]:bg-blue-400" },
    { name: "AWS", level: 55, color: "[&>div]:bg-orange-500" },
  ];

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Skill Levels</h4>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{skill.name}</span>
              <span className="text-muted-foreground">{skill.level}%</span>
            </div>
            <Progress 
              value={skill.level} 
              className={`w-full h-2 ${skill.color}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}