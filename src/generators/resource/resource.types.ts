export interface GenerationResult {
  createdFiles: string[];
  createdDirs: string[];
  skippedFiles: string[];
  skippedDirs: string[];
  dryRunDirs: string[];
  dryRunFiles: string[];
  dryRunSkippedDirs: string[];
  dryRunSkippedFiles: string[];
}

export type GenerateResourceOptions = {
  dryRun?: boolean;
  force?: boolean;
  typescript?: boolean;
};
