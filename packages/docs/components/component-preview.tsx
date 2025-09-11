"use client";

import React from 'react';

interface ComponentPreviewProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  code?: string;
}

export function ComponentPreview({ 
  title, 
  description, 
  children, 
  code 
}: ComponentPreviewProps) {
  return (
    <div className="my-6 border rounded-lg">
      {(title || description) && (
        <div className="border-b p-4">
          {title && <h3 className="text-lg font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-center min-h-[200px] bg-muted/50 rounded-md">
          {children}
        </div>
      </div>
      
      {code && (
        <div className="border-t">
          <pre className="p-4 text-sm overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
