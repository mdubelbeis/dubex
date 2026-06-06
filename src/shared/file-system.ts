import fs from 'node:fs';
import type { GenerationResult } from '../generators/resource/resource.types.js';
export const createDirIfMissing = (path: string, results: GenerationResult): void => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    results.createdDirs.push(path);
    return;
  }
  results.skippedDirs.push(path);
};

export const createFileIfMissing = (
  path: string,
  content: string,
  results: GenerationResult
): void => {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, content, 'utf-8');
    results.createdFiles.push(path);
    return;
  }
  results.skippedFiles.push(path);
};
