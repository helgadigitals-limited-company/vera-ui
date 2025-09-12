import { cn } from "@/lib/utils";
import {
  UploadCloud,
  X,
  File,
  Image,
  FileText,
  Music,
  Video,
  Archive,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Badge } from "./badge";
import { Progress } from "./progress";
import { Input } from "./input";

interface FileUploadProps {
  value?: File | File[] | null;
  onChange: (file: File | File[] | null) => void;
  accept?: string;
  multiple?: boolean;
  id?: string;
  className?: string;
  label?: string;
  error?: string;
  helperText?: string;
  showPreview?: boolean;
  disabled?: boolean;
  maxSize?: number; // in MB
  maxFiles?: number;
  allowedTypes?: string[];
  onError?: (error: string) => void;
  onUploadProgress?: (progress: number) => void;
  uploadProgress?: number;
  dragAndDrop?: boolean;
  compact?: boolean;
}

interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

function isImage(file: File) {
  return file.type.startsWith("image/");
}

function isVideo(file: File) {
  return file.type.startsWith("video/");
}

function isAudio(file: File) {
  return file.type.startsWith("audio/");
}

function isPDF(file: File) {
  return file.type === "application/pdf";
}

function isDocument(file: File) {
  const docTypes = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
  ];
  return docTypes.includes(file.type);
}

function isArchive(file: File) {
  const archiveTypes = [
    "application/zip",
    "application/x-rar-compressed",
    "application/x-7z-compressed",
  ];
  return archiveTypes.includes(file.type);
}

function getFileIcon(file: File) {
  if (isImage(file)) return Image;
  if (isVideo(file)) return Video;
  if (isAudio(file)) return Music;
  if (isPDF(file) || isDocument(file)) return FileText;
  if (isArchive(file)) return Archive;
  return File;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function generateFileId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function FileList({
  files,
  onRemove,
  showPreview,
  compact = false,
}: {
  files: FileWithPreview[];
  onRemove?: (idx: number) => void;
  showPreview?: boolean;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {files.map((file, idx) => (
          <Badge
            key={file.id}
            variant="secondary"
            className="flex items-center gap-1 max-w-[150px]"
          >
            <span className="text-xs truncate" title={file.name}>
              {file.name.length > 15
                ? file.name.slice(0, 12) + "..."
                : file.name}
            </span>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(idx)}
                className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                aria-label={`Remove ${file.name}`}
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </Badge>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
      {files.map((file, idx) => {
        const FileIcon = getFileIcon(file);

        return (
          <div
            key={file.id}
            className="relative flex items-center gap-3 p-3 bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow"
          >
            {/* File Preview/Icon */}
            <div className="flex-shrink-0">
              {showPreview && isImage(file) && file.preview ? (
                <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center">
                  <FileIcon className="w-6 h-6 text-muted-foreground" />
                </div>
              )}
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" title={file.name}>
                {file.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </p>
              {file.type && (
                <p className="text-xs text-muted-foreground uppercase">
                  {file.type.split("/")[1] || file.type}
                </p>
              )}
            </div>

            {/* Status/Actions */}
            <div className="flex items-center gap-2">
              <FileCheck
                className="w-4 h-4 text-green-600"
                aria-label="File ready"
              />
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(idx)}
                  className="p-1 hover:bg-destructive/10 rounded-full text-muted-foreground hover:text-destructive transition-colors"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export  function FileUpload({
  value,
  onChange,
  accept = "*/*",
  multiple = false,
  id = "file-upload",
  className,
  label = "Choose file(s)",
  error,
  helperText,
  showPreview = true,
  disabled = false,
  maxSize = 10, // 10MB default
  maxFiles = 10,
  allowedTypes = [],
  onError,
  uploadProgress,
  dragAndDrop = true,
  compact = false,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const filesRef = useRef<FileWithPreview[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [filesWithPreview, setFilesWithPreview] = useState<FileWithPreview[]>(
    []
  );

  // Keep ref in sync with state
  useEffect(() => {
    filesRef.current = filesWithPreview;
  }, [filesWithPreview]);

  // Convert File to FileWithPreview
  const createFileWithPreview = (file: File): FileWithPreview => {
    const fileWithPreview = Object.assign(file, {
      id: generateFileId(),
      preview: undefined,
    }) as FileWithPreview;

    if (isImage(file)) {
      fileWithPreview.preview = URL.createObjectURL(file);
    }

    return fileWithPreview;
  };

  // Update files with preview when value changes
  useEffect(() => {
    if (value) {
      const files = Array.isArray(value) ? value : [value];
      const newFilesWithPreview = files.map(createFileWithPreview);
      setFilesWithPreview((prev) => {
        // Cleanup old preview URLs
        prev.forEach((file) => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });
        return newFilesWithPreview;
      });
    } else {
      setFilesWithPreview((prev) => {
        // Cleanup preview URLs
        prev.forEach((file) => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });
        return [];
      });
    }
  }, [value]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      filesRef.current.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  // Validation function
  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `File size exceeds ${maxSize}MB limit`;
    }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return `File type not allowed. Accepted: ${allowedTypes.join(", ")}`;
    }

    return null;
  };

  const validateFiles = (files: File[]): string | null => {
    if (maxFiles && files.length > maxFiles) {
      return `Maximum ${maxFiles} files allowed`;
    }

    for (const file of files) {
      const error = validateFile(file);
      if (error) return error;
    }

    return null;
  };

  const processFiles = (newFiles: File[]) => {
    const validationError = validateFiles(newFiles);
    if (validationError) {
      onError?.(validationError);
      return;
    }

    const processedFiles = newFiles.map(createFileWithPreview);
    onChange(multiple ? processedFiles : processedFiles[0] || null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    processFiles(files);
  };

  const handleRemove = (idx: number) => {
    const newFiles = [...filesWithPreview];
    const removedFile = newFiles[idx];

    // Cleanup preview URL
    if (removedFile.preview) {
      URL.revokeObjectURL(removedFile.preview);
    }

    newFiles.splice(idx, 1);

    if (!multiple) {
      onChange(null);
    } else {
      onChange(newFiles.length ? newFiles : null);
    }
  };

  const handleClear = () => {
    // Cleanup all preview URLs
    filesWithPreview.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
    });

    onChange(multiple ? [] : null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && dragAndDrop) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {/* Upload Area */}
      <div
        className={cn(
          "relative flex flex-col items-center gap-4 px-6 py-8 rounded-xl border-2 border-dashed transition-colors",
          isDragOver && dragAndDrop
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
          error && "border-destructive bg-destructive/5",
          disabled && "opacity-60 cursor-not-allowed bg-muted/50"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <UploadCloud
            className={cn(
              "w-10 h-10",
              isDragOver ? "text-primary" : "text-muted-foreground"
            )}
          />

          <div className="space-y-1">
            <p className="text-sm font-medium">
              {isDragOver ? "Drop files here" : label}
            </p>

            {helperText && (
              <p className="text-xs text-muted-foreground">{helperText}</p>
            )}

            {dragAndDrop && !isDragOver && (
              <p className="text-xs text-muted-foreground">
                or drag and drop files here
              </p>
            )}

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {maxSize && <span>Max {maxSize}MB</span>}
              {maxFiles && multiple && <span>Max {maxFiles} files</span>}
              {accept !== "*/*" && <span>Accepts: {accept}</span>}
            </div>
          </div>
        </div>

        <Input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          onChange={handleInputChange}
          disabled={disabled}
        />

        {/* Upload Progress */}
        {uploadProgress !== undefined &&
          uploadProgress > 0 &&
          uploadProgress < 100 && (
            <div className="w-full max-w-xs">
              <div className="flex items-center justify-between text-xs mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
      </div>

      {/* File List */}
      {filesWithPreview.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">
              {filesWithPreview.length} file
              {filesWithPreview.length > 1 ? "s" : ""} selected
            </p>
            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors"
              disabled={disabled}
            >
              Clear all
            </button>
          </div>

          <FileList
            files={filesWithPreview}
            onRemove={handleRemove}
            showPreview={showPreview}
            compact={compact}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
