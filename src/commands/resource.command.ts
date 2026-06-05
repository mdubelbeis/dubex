import { Command } from 'commander';
import { generateBoilerPlate } from '../generators/resource/resource.generator.js';

export function createResourceCommand() {
  const command = new Command('resource');

  command
    .argument('<entity>', 'Resource/entity name, such as User or Bug')
    .description('Generate Express resource boilerplate')
    .action((entity: string) => generateBoilerPlate(entity));

  return command;
}
