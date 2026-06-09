import { Command } from 'commander';
import { createAccessorsCommand } from './accessors.command.js';
import { createResourceCommand } from './resource.command.js';
import { createResourcesCommand } from './resources.command.js';

export function createGenCommand() {
  const gen = new Command('gen');

  gen.description('Generate project code');

  gen.addCommand(createAccessorsCommand());
  gen.addCommand(createResourceCommand());
  gen.addCommand(createResourcesCommand());

  return gen;
}
