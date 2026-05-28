#!/usr/bin/env node
// Run with: pnpm dev:accessors -- User.ts

import { Command } from 'commander';

const program = new Command();

program
  .name('Dubex')
  .description(
    'A JavaScript and TypeScript CLI toolkit for generating boilerplate, accessors, and backend resources.'
  )
  .version('0.1.0');

program.parse();
