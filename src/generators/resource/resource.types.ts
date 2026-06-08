export interface GenerationResult {
  createdFiles: string[];
  createdDirs: string[];
  skippedFiles: string[];
  skippedDirs: string[];
  dryRunDirs: string[];
  dryRunFiles: string[];
  dryRunSkippedDirs: string[];
  dryRunSkippedFiles: string[];
  overwrittenFiles: string[];
  dryRunOverwrittenFiles: string[];
}

export type GenerateResourceOptions = {
  dryRun?: boolean;
  force?: boolean;
  typescript?: boolean;
};
