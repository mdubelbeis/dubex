import { Command } from 'commander';
import { generateAccessors } from '../generators/accessors/accessors.generator.js';
import type { GenerateAccessorsOptions } from '../generators/accessors/accessors.types.js';

export function createAccessorsCommand() {
  const command = new Command('accessors');

  command
    .argument('<source>', 'Path to a JavaScript or TypeScript class file')
    .option('--under-score', 'Class field has underscore prefix: ex: _fieldName>')
    .option('--private', 'Class contains private fields ex: #fieldName')
    .option('--static', 'Class contains static fields ex: static fieldName')
    .option('--dry-run', '')
    .description('Generate getters and setters from your Javascript/Typescript class.')
    .action((source: string, options: GenerateAccessorsOptions) =>
      generateAccessors(source, options)
    );

  return command;
}
