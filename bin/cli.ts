#!/usr/bin/env node

import { Command } from 'commander';
import { createGenCommand } from '../src/commands/gen.command.js';

const program = new Command();

program
  .name('dbx')
  .description(
    'A JavaScript and TypeScript CLI toolkit for generating boilerplate, accessors, and backend resources.'
  )
  .version('0.1.0');

program.addCommand(createGenCommand());

program.parse();
