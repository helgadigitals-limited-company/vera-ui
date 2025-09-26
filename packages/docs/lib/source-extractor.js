import fs from 'fs';
import path from 'path';
/**
 * Extract function code from a TypeScript/JavaScript file
 */
export function extractFunctionFromFile(filePath, functionName) {
    try {
        // Read the file content
        const fullPath = path.resolve(process.cwd(), filePath);
        if (!fs.existsSync(fullPath)) {
            console.warn(`Source file not found: ${fullPath}`);
            return null;
        }
        const content = fs.readFileSync(fullPath, 'utf-8');
        const lines = content.split('\n');
        // Extract imports
        const imports = extractImports(lines);
        // Extract function
        const functionCode = extractFunction(lines, functionName);
        if (!functionCode) {
            console.warn(`Function "${functionName}" not found in ${filePath}`);
            return null;
        }
        // Combine imports and function for full code
        const fullCode = [imports, '', functionCode].filter(Boolean).join('\n');
        return {
            imports,
            function: functionCode,
            full: fullCode
        };
    }
    catch (error) {
        console.error(`Error extracting code from ${filePath}:`, error);
        return null;
    }
}
function extractImports(lines) {
    const imports = [];
    let inMultiLineImport = false;
    for (const line of lines) {
        const trimmed = line.trim();
        // Skip "use client" directive
        if (trimmed === '"use client";' || trimmed === "'use client';") {
            continue;
        }
        // Check if we're starting a new import statement
        if (trimmed.startsWith('import ')) {
            imports.push(line);
            // Check if this is a multi-line import (doesn't end with a quote and semicolon)
            inMultiLineImport = !trimmed.match(/['"].*['"];?\s*$/);
            continue;
        }
        // If we're inside a multi-line import, continue collecting lines
        if (inMultiLineImport) {
            imports.push(line);
            // Check if this line ends the multi-line import
            if (trimmed.endsWith('}') && (trimmed.includes('from ') || line.includes('"') || line.includes("'"))) {
                inMultiLineImport = false;
            }
            continue;
        }
        // Skip empty lines and comments at the top of the file
        if (trimmed === '' || trimmed.startsWith('//') || trimmed.startsWith('/*')) {
            continue;
        }
        // Stop at first non-import, non-comment, non-empty line
        break;
    }
    return imports.join('\n');
}
function extractFunction(lines, functionName) {
    const startPattern = new RegExp(`^export\\s+function\\s+${functionName}\\s*\\(`);
    let startIndex = -1;
    // Find the function start
    for (let i = 0; i < lines.length; i++) {
        if (startPattern.test(lines[i].trim())) {
            startIndex = i;
            break;
        }
    }
    if (startIndex === -1) {
        return null;
    }
    // Find the function end by tracking braces
    let braceCount = 0;
    let endIndex = startIndex;
    let foundFirstBrace = false;
    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i];
        for (const char of line) {
            if (char === '{') {
                braceCount++;
                foundFirstBrace = true;
            }
            else if (char === '}') {
                braceCount--;
            }
        }
        if (foundFirstBrace && braceCount === 0) {
            endIndex = i;
            break;
        }
    }
    // Extract the function and clean up
    const functionLines = lines.slice(startIndex, endIndex + 1);
    // Remove 'export' from the function declaration
    if (functionLines[0]) {
        functionLines[0] = functionLines[0].replace(/^export\s+/, '');
    }
    return functionLines.join('\n');
}
/**
 * Get the source code for a component example
 * This can be used both at build time and runtime
 */
export function getComponentSource(examplePath, functionName) {
    // Convert relative path to absolute
    const basePath = 'packages/docs/components';
    const fullPath = path.join(basePath, examplePath);
    return extractFunctionFromFile(fullPath, functionName);
}
// Cache for extracted code (useful for development)
const codeCache = new Map();
export function getCachedComponentSource(examplePath, functionName) {
    const cacheKey = `${examplePath}#${functionName}`;
    if (codeCache.has(cacheKey)) {
        return codeCache.get(cacheKey);
    }
    const extracted = getComponentSource(examplePath, functionName);
    if (extracted) {
        codeCache.set(cacheKey, extracted);
    }
    return extracted;
}
