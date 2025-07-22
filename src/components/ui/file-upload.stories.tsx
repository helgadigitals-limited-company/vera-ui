import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import FileUpload from "./fileUpload";

const meta: Meta<typeof FileUpload> = {
  title: "Components/Forms/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A comprehensive file upload component with drag-and-drop, validation, previews, and progress tracking. Supports multiple files, file type validation, and size limits.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: { type: "boolean" },
      description: "Allow multiple file selection",
    },
    accept: {
      control: { type: "text" },
      description: "Accepted file types (MIME types)",
    },
    maxSize: {
      control: { type: "number" },
      description: "Maximum file size in MB",
    },
    maxFiles: {
      control: { type: "number" },
      description: "Maximum number of files (for multiple)",
    },
    showPreview: {
      control: { type: "boolean" },
      description: "Show file previews",
    },
    dragAndDrop: {
      control: { type: "boolean" },
      description: "Enable drag and drop functionality",
    },
    compact: {
      control: { type: "boolean" },
      description: "Use compact file list display",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the file upload",
    },
    uploadProgress: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Upload progress (0-100)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic single file upload
export const Default: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (newFile: File | File[] | null) => {
      if (Array.isArray(newFile)) {
        setFile(newFile[0] || null);
      } else {
        setFile(newFile);
      }
    };

    return (
      <div className="w-96">
        <FileUpload
          value={file}
          onChange={handleFileChange}
          label="Choose a file"
        />
      </div>
    );
  },
};

// Multiple file upload
export const Multiple: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);

    const handleFilesChange = (newFiles: File | File[] | null) => {
      if (newFiles === null) {
        setFiles(null);
      } else if (Array.isArray(newFiles)) {
        setFiles(newFiles);
      } else {
        setFiles([newFiles]);
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <FileUpload
          value={files}
          onChange={handleFilesChange}
          multiple
          label="Choose multiple files"
          helperText="Select up to 5 files, max 5MB each"
          maxFiles={5}
          maxSize={5}
        />
      </div>
    );
  },
};

// Image upload with previews
export const ImageUpload: Story = {
  render: () => {
    const [images, setImages] = useState<File[] | null>(null);

    const handleImagesChange = (newFiles: File | File[] | null) => {
      if (newFiles === null) {
        setImages(null);
      } else if (Array.isArray(newFiles)) {
        setImages(newFiles);
      } else {
        setImages([newFiles]);
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <FileUpload
          value={images}
          onChange={handleImagesChange}
          multiple
          accept="image/*"
          label="Upload images"
          helperText="PNG, JPG, GIF up to 10MB each"
          maxSize={10}
          showPreview={true}
          allowedTypes={["image/png", "image/jpeg", "image/gif", "image/webp"]}
        />
      </div>
    );
  },
};

// Document upload
export const DocumentUpload: Story = {
  render: () => {
    const [documents, setDocuments] = useState<File[] | null>(null);

    const handleDocumentsChange = (newFiles: File | File[] | null) => {
      if (newFiles === null) {
        setDocuments(null);
      } else if (Array.isArray(newFiles)) {
        setDocuments(newFiles);
      } else {
        setDocuments([newFiles]);
      }
    };

    return (
      <div className="w-full max-w-2xl">
        <FileUpload
          value={documents}
          onChange={handleDocumentsChange}
          multiple
          accept=".pdf,.doc,.docx,.txt"
          label="Upload documents"
          helperText="PDF, Word, or text files only"
          maxSize={20}
          allowedTypes={[
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
          ]}
        />
      </div>
    );
  },
};

// Compact view
export const Compact: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);

    const handleFilesChange = (newFiles: File | File[] | null) => {
      if (newFiles === null) {
        setFiles(null);
      } else if (Array.isArray(newFiles)) {
        setFiles(newFiles);
      } else {
        setFiles([newFiles]);
      }
    };

    return (
      <div className="w-96">
        <FileUpload
          value={files}
          onChange={handleFilesChange}
          multiple
          compact={true}
          label="Choose files (compact view)"
          maxFiles={3}
        />
      </div>
    );
  },
};

// With upload progress
export const WithProgress: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);

    // Simulate upload progress
    const handleFileChange = (newFile: File | File[] | null) => {
      const singleFile = Array.isArray(newFile) ? newFile[0] || null : newFile;
      setFile(singleFile);

      if (singleFile) {
        setProgress(0);
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      }
    };

    return (
      <div className="w-96">
        <FileUpload
          value={file}
          onChange={handleFileChange}
          label="Upload with progress"
          uploadProgress={progress}
        />
      </div>
    );
  },
};

// With validation and error handling
export const WithValidation: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);
    const [error, setError] = useState<string>("");

    const handleFileChange = (newFiles: File | File[] | null) => {
      if (newFiles === null) {
        setFiles(null);
      } else if (Array.isArray(newFiles)) {
        setFiles(newFiles);
      } else {
        setFiles([newFiles]);
      }
      setError(""); // Clear error when files change
    };

    const handleError = (errorMessage: string) => {
      setError(errorMessage);
    };

    return (
      <div className="w-full max-w-2xl">
        <FileUpload
          value={files}
          onChange={handleFileChange}
          onError={handleError}
          multiple
          label="Upload with strict validation"
          helperText="Max 2 files, 1MB each, images only"
          maxFiles={2}
          maxSize={1}
          allowedTypes={["image/jpeg", "image/png"]}
          accept="image/jpeg,image/png"
          error={error}
        />
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (newFile: File | File[] | null) => {
      if (Array.isArray(newFile)) {
        setFile(newFile[0] || null);
      } else {
        setFile(newFile);
      }
    };

    return (
      <div className="w-96">
        <FileUpload
          value={file}
          onChange={handleFileChange}
          label="Upload disabled"
          disabled={true}
        />
      </div>
    );
  },
};

// No drag and drop
export const NoDragDrop: Story = {
  render: () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (newFile: File | File[] | null) => {
      if (Array.isArray(newFile)) {
        setFile(newFile[0] || null);
      } else {
        setFile(newFile);
      }
    };

    return (
      <div className="w-96">
        <FileUpload
          value={file}
          onChange={handleFileChange}
          label="Click to upload (no drag & drop)"
          dragAndDrop={false}
        />
      </div>
    );
  },
};

// Playground
export const Playground: Story = {
  args: {
    label: "Choose files",
    helperText: "Select files to upload",
    multiple: true,
    accept: "*/*",
    maxSize: 10,
    maxFiles: 5,
    showPreview: true,
    dragAndDrop: true,
    compact: false,
    disabled: false,
    uploadProgress: undefined,
  },
  render: (args) => {
    const [files, setFiles] = useState<File | File[] | null>(null);
    const [error, setError] = useState<string>("");

    const handleFileChange = (newFiles: File | File[] | null) => {
      setFiles(newFiles);
    };

    const handleError = (errorMessage: string) => {
      setError(errorMessage);
    };

    return (
      <div className="w-full max-w-2xl">
        <FileUpload
          {...args}
          value={files}
          onChange={handleFileChange}
          onError={handleError}
          error={error}
        />
      </div>
    );
  },
};
