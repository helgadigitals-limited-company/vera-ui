"use client";

import { Badge } from "@helgadigitals/vera-ui";
import { X } from "lucide-react";
import { useState } from "react";

export function InteractiveBadgeExample() {
  const [tags, setTags] = useState([
    "React", "TypeScript", "Tailwind", "Next.js"
  ]);

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Removable Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 hover:bg-black/10 rounded-full p-0.5"
                aria-label={`Remove ${tag} tag`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Clickable Categories</h4>
        <div className="flex flex-wrap gap-2">
          <Badge asChild>
            <button className="cursor-pointer hover:opacity-80">
              Frontend
            </button>
          </Badge>
          <Badge asChild variant="secondary">
            <button className="cursor-pointer hover:opacity-80">
              Backend
            </button>
          </Badge>
          <Badge asChild variant="outline">
            <button className="cursor-pointer hover:opacity-80">
              DevOps
            </button>
          </Badge>
        </div>
      </div>
    </div>
  );
}