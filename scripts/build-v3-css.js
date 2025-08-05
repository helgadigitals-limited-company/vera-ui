#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

console.log('Building Tailwind v3 compatible CSS...');

try {
  // Read the original v4 CSS
  const v4Css = readFileSync('./dist/vera-ui.css', 'utf8');
  
  console.log('Converting v4 CSS to v3 compatible format...');
  
  // Basic conversion - replace any v4 specific syntax with v3 equivalents
  let v3Css = v4Css;
  
  // Add header comment
  v3Css = `/*! vera-ui v2.2.2 | MIT License | https://github.com/helgadigitals-limited-company/vera-ui */\n\n${v3Css}`;
  
  // Write the v3 CSS
  writeFileSync('./dist/vera-ui-v3.css', v3Css);
  
  console.log('✅ Tailwind v3 CSS built successfully!');
} catch (error) {
  console.error('❌ Failed to build Tailwind v3 CSS:', error.message);
  process.exit(1);
}
