import { Command } from 'commander';
import { generateResource } from '../generators/resource/resource.generator.js';
import type { GenerateResourceOptions } from '../generators/resource/resource.types.js';

export function createResourceCommand() {
  const command = new Command('resource');

  command
    .argument('<entity>', 'Resource/entity name, such as User or Bug')
    .option('--dry-run', 'Preview generated files without writing them')
    .option('--typescript', 'Generate .ts files')
    .description('Generate Express resource boilerplate')
    .action((entity: string, options: GenerateResourceOptions) =>
      generateResource(entity, options)
    );

  return command;
}
