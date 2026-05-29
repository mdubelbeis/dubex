import { Command } from 'commander';
import { generateAccessors } from '../generators/accessors/accessors.generator.js';

export function createAccessorsCommand() {
  const command = new Command('accessors');

  command
    .argument('<source>', 'Path to a JavaScript or TypeScript class file')
    .description('Generate getters and setters from class fields in a JS/TS file.')
    .action((source: string) => generateAccessors(source));

  return command;
}
