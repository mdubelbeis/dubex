import fs from 'node:fs';
import type { GenerationResult } from '../generators/resource/resource.types.js';
export const createDirIfMissing = (
  path: string,
  results: GenerationResult,
  dryRun?: boolean
): void => {
  if (dryRun) {
    if (!fs.existsSync(path)) {
      results.dryRunDirs.push(path);
    } else {
      results.dryRunSkippedDirs.push(path);
    }
    return;
  }

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    results.createdDirs.push(path);
  } else {
    results.skippedDirs.push(path);
  }
};

export const createFileIfMissing = (
  path: string,
  content: string,
  results: GenerationResult,
  dryRun?: boolean
): void => {
  if (dryRun) {
    if (!fs.existsSync(path)) {
      results.dryRunFiles.push(path);
    } else {
      results.dryRunSkippedFiles.push(path);
    }
    return;
  }

  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, content, 'utf-8');
    results.createdFiles.push(path);
  } else {
    results.skippedFiles.push(path);
  }
};
