import { Command } from 'commander';
import type { GenerateResourceOptions } from '../generators/resource/resource.types.js';
import { generateResourcesFromConfig } from '../generators/resources/resources.generator.js';

export function createResourcesCommand() {
  const command = new Command('resources');

  command
    .argument('<config>', 'Path to a resources config file')
    .option('--dry-run', 'Preview generated files without writing them')
    .option('--typescript', 'Generate .ts files')
    .option('--force', 'Overwrite existing generated files')
    .option('-o, --output-dir <path>', 'Output directory for generated files')
    .description('Generate one or more resources from a config file')
    .action((config: string, options: GenerateResourceOptions) =>
      generateResourcesFromConfig(config, options)
    );

  return command;
}
