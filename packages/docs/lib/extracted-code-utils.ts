import extractedCode from './extracted-code.json';

export interface ExtractedCode {
  imports: string;
  function: string;
  full: string;
}

export interface ComponentSource {
  path: string;
  functionName: string;
  extractedCode: ExtractedCode | null;
}

/**
 * Get extracted code for a component example
 */
export function getExtractedCode(
  filePath: string, 
  functionName: string,
  id?: string
): ExtractedCode | null {
  const key = id || `${filePath}#${functionName}`;
  const source = (extractedCode as Record<string, ComponentSource>)[key];
  
  return source?.extractedCode || null;
}

/**
 * Get all extracted code entries
 */
export function getAllExtractedCode(): Record<string, ComponentSource> {
  return extractedCode as Record<string, ComponentSource>;
}

/**
 * Check if extracted code exists for a component
 */
export function hasExtractedCode(
  filePath: string, 
  functionName: string,
  id?: string
): boolean {
  return getExtractedCode(filePath, functionName, id) !== null;
}