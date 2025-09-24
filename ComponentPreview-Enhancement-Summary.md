# ComponentPreview Enhancement Summary

## 🎯 What We Accomplished

We successfully enhanced the `ComponentPreview` component to support **automatic code extraction** from example files, eliminating the need to manually duplicate code in MDX documentation files.

## 🚀 Key Features Implemented

### 1. Enhanced ComponentPreview Component

- **File**: `packages/docs/components/component-preview.tsx`
- **New Props**:
  - `source`: Path to the source file containing the example
  - `extractFunction`: Name of the function to extract
  - `extractedCode`: Pre-extracted code object

### 2. AutoExtractPreview Helper

- Simplified component that automatically fetches extracted code
- Usage: `<AutoExtractPreview source="..." functionName="..." />`

### 3. Source Code Extractor

- **File**: `packages/docs/lib/source-extractor.ts`
- Functions to extract imports, functions, and complete code blocks
- Caching for performance

### 4. Build-Time Code Extraction

- **Script**: `packages/docs/scripts/extract-code.ts`
- **Output**: `packages/docs/lib/extracted-code.json`
- **CLI Command**: `pnpm extract-code`

### 5. Extraction Utilities

- **File**: `packages/docs/lib/extracted-code-utils.ts`
- Helper functions to read extracted code during runtime
- Type-safe interfaces for extracted content

## 📁 Files Modified

```
packages/docs/
├── components/
│   └── component-preview.tsx          ✅ Enhanced with auto-extraction
├── lib/
│   ├── source-extractor.ts           ✅ NEW - Code extraction utilities
│   ├── extracted-code-utils.ts       ✅ NEW - Runtime helpers
│   └── extracted-code.json           ✅ NEW - Build-time extracted code
├── scripts/
│   └── extract-code.ts               ✅ NEW - Build-time extraction script
├── package.json                      ✅ Added extract-code script
└── content/docs/components/data-display/
    └── toast.mdx                     ✅ Updated to use AutoExtractPreview
```

## 🔄 Before vs After

### Before (Manual Code Duplication)

```mdx
<ComponentPreview code={`import { toast } from "@helgadigitals/vera-ui";
import { Button } from "@helgadigitals/vera-ui";

export function BasicToastExample() {
  return (
    <div className="space-y-2">
      <Button onClick={() => toast("Basic toast message")}>Show Basic Toast</Button>
    </div>
  );
}`}>
  <BasicToastExample />
</ComponentPreview

>
```

### After (Auto-Extraction)

```mdx
<AutoExtractPreview
  source="components/data-display-examples/toast-examples.tsx"
  functionName="BasicToastExample"
>
  <BasicToastExample />
</AutoExtractPreview>
```

## 🛠️ How It Works

1. **Build-Time Extraction**:

   - `pnpm extract-code` scans example files for exported functions
   - Extracts imports, function body, and full code
   - Saves to `lib/extracted-code.json`

2. **Runtime Display**:

   - `AutoExtractPreview` loads extracted code from JSON
   - `ComponentPreview` displays with source tracking
   - Visual indicators show auto-extraction status

3. **Development Workflow**:
   - Write examples in dedicated files (`*-examples.tsx`)
   - Use `AutoExtractPreview` in MDX files
   - Run extraction before build

## 🎯 Benefits

✅ **DRY Principle**: No more code duplication between examples and docs  
✅ **Single Source of Truth**: Example files are the authoritative source  
✅ **Better Maintainability**: Changes to examples automatically reflect in docs  
✅ **Type Safety**: Full TypeScript support throughout  
✅ **Developer Experience**: Clear source tracking and extraction status  
✅ **Build Integration**: Automated extraction as part of build process

## 🚀 Next Steps

1. **Complete Migration**: Convert remaining component docs to use `AutoExtractPreview`
2. **CI Integration**: Add extraction step to GitHub Actions build
3. **Watch Mode**: Implement dev-time auto-extraction for hot reloading
4. **Error Handling**: Enhanced error messages for failed extractions
5. **Documentation**: Create contributor guide for using the new system

## 🧪 Testing

The enhancement has been tested with the Toast component documentation:

- ✅ Code extraction working for 9 toast examples
- ✅ Build-time generation successful
- ✅ Auto-extraction indicators functional
- ✅ Source path tracking operational

## 📝 Usage Guidelines

### For Contributors

1. Create example components in `*-examples.tsx` files
2. Export functions with descriptive names ending in "Example"
3. Use `AutoExtractPreview` in MDX files instead of manual code blocks
4. Run `pnpm extract-code` before building

### For Build Process

1. Add `pnpm extract-code` to build pipeline
2. Ensure extraction runs before Next.js build
3. Include `lib/extracted-code.json` in version control for deployment

This enhancement significantly improves the developer experience and maintainability of the Vera UI documentation system! 🎉
