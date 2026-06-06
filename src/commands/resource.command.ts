import { Command } from 'commander';
import { generateResource } from '../generators/resource/resource.generator.js';

export function createResourceCommand() {
  const command = new Command('resource');

  command
    .argument('<entity>', 'Resource/entity name, such as User or Bug')
    .description('Generate Express resource boilerplate')
    .action((entity: string) => generateResource(entity));

  return command;
}
