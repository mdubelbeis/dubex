import fs from 'node:fs';
import type {
  GenerateResourceOptions,
  GenerationResult,
} from '../generators/resource/resource.types.js';
export const createDirIfMissing = (
  path: string,
  results: GenerationResult,
  options: GenerateResourceOptions
): void => {
  if (options.dryRun) {
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
    return;
  }
  results.skippedDirs.push(path);
};

export const createFileIfMissing = (
  path: string,
  content: string,
  results: GenerationResult,
  options: GenerateResourceOptions
): void => {
  if (options.dryRun) {
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
    return;
  }
  results.skippedFiles.push(path);
};
