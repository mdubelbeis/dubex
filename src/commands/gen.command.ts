import { Command } from 'commander';
import { createAccessorsCommand } from './accessors.command.js';

export function createGenCommand() {
  const gen = new Command('gen');

  gen.description('Generate project code');

  gen.addCommand(createAccessorsCommand());

  return gen;
}
