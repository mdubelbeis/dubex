import type { GenerationResult } from './resource.types.js';

export const createGenerationResult = (): GenerationResult => ({
  createdFiles: [],
  createdDirs: [],
  skippedFiles: [],
  skippedDirs: [],
  dryRunDirs: [],
  dryRunFiles: [],
  dryRunSkippedDirs: [],
  dryRunSkippedFiles: [],
  overwrittenFiles: [],
  dryRunOverwrittenFiles: [],
});
