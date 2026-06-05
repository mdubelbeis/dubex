import { Command } from 'commander';
import { createAccessorsCommand } from './accessors.command.js';
import { createResourceCommand } from './resource.command.js';

export function createGenCommand() {
  const gen = new Command('gen');

  gen.description('Generate project code');

  gen.addCommand(createAccessorsCommand());
  gen.addCommand(createResourceCommand());

  return gen;
}
