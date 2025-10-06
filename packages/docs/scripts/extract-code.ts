import fs from 'fs';
import path from 'path';
import { extractFunctionFromFile } from '../lib/source-extractor.js';

interface ComponentSource {
  path: string;
  functionName: string;
  extractedCode: {
    imports: string;
    function: string;
    full: string;
  } | null;
}

/**
 * Build-time code extraction for component examples
 */
export class CodeExtractor {
  private sources: Map<string, ComponentSource> = new Map();
  private outputPath: string;

  constructor(outputPath = 'lib/extracted-code.json') {
    this.outputPath = outputPath;
  }

  /**
   * Register a component example for code extraction
   */
  registerComponent(
    filePath: string, 
    functionName: string, 
    id?: string
  ): void {
    const key = id || `${filePath}#${functionName}`;
    
    const extracted = extractFunctionFromFile(filePath, functionName);
    
    this.sources.set(key, {
      path: filePath,
      functionName,
      extractedCode: extracted
    });
  }

  /**
   * Extract all registered components and save to output file
   */
  async extractAll(): Promise<void> {
    const extracted: Record<string, ComponentSource> = {};
    
    for (const [key, source] of this.sources) {
      extracted[key] = source;
    }
    
    const outputDir = path.dirname(this.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(
      this.outputPath, 
      JSON.stringify(extracted, null, 2),
      'utf-8'
    );
    
    console.log(`✅ Extracted ${this.sources.size} component examples to ${this.outputPath}`);
  }

  /**
   * Auto-discover and extract component examples from a directory
   */
  async autoExtractFromDirectory(
    directory: string,
    pattern = /export function (\w+Example)\(/g
  ): Promise<void> {
    const files = this.getTypeScriptFiles(directory);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const functions = this.extractFunctionNames(content, pattern);
      
      for (const functionName of functions) {
        const relativePath = path.relative(process.cwd(), file);
        this.registerComponent(relativePath, functionName);
      }
    }
  }

  private getTypeScriptFiles(directory: string): string[] {
    const files: string[] = [];
    
    function traverse(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          traverse(fullPath);
        } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    }
    
    traverse(directory);
    return files;
  }

  private extractFunctionNames(content: string, pattern: RegExp): string[] {
    const functions: string[] = [];
    let match;
    
    while ((match = pattern.exec(content)) !== null) {
      functions.push(match[1]);
    }
    
    return functions;
  }
}

// Manual execution when run directly
async function main() {
  const extractor = new CodeExtractor('lib/extracted-code.json');
  
  // Auto-extract from examples directories
  await extractor.autoExtractFromDirectory('components/data-display-examples');
  await extractor.autoExtractFromDirectory('components/form-components-examples');
  
  // Use a more inclusive pattern for form components that might not end with "Example"
  await extractor.autoExtractFromDirectory(
    'components/form-components-examples', 
    /export function (\w+)/g
  );
  
  // Manually register form functions that don't follow the naming pattern
  extractor.registerComponent('components/form-components-examples/form-examples.tsx', 'FormExample');
  extractor.registerComponent('components/form-components-examples/form-examples.tsx', 'RegistrationForm');
  
  // Manually register button functions that don't follow the naming pattern
  extractor.registerComponent('components/form-components-examples/button-examples.tsx', 'ButtonUsageExample');
  
  
  // Extract all and save
  await extractor.extractAll();
}

// Run if this file is executed directly
if (process.argv[1] === import.meta.url.replace('file://', '')) {
  main().catch(console.error);
}