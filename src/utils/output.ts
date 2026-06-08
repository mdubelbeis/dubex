import chalk from 'chalk';
import type { GenerationResult } from '../generators/resource/resource.types.js';

export const outputGenerationSummary = (entity: string, results: GenerationResult) => {
  console.log(`Generated resource: ${chalk.blue(entity)}\n`);

  if (results.dryRunDirs.length > 0) {
    console.log('Would create directories:');

    for (const dir of results.dryRunDirs) {
      console.log(chalk.magenta(`  - ${dir}`));
    }
  }

  if (results.dryRunFiles.length > 0) {
    console.log('Would create files:');
    for (const file of results.dryRunFiles) {
      console.log(chalk.magenta(`  - ${file}`));
    }
  }

  if (results.dryRunSkippedDirs.length > 0) {
    console.log('Would skip dirs:');
    for (const dir of results.dryRunSkippedDirs) {
      console.log(chalk.grey(`  - ${dir}`));
    }
  }

  if (results.dryRunSkippedFiles.length > 0) {
    console.log('Would skip files:');
    for (const file of results.dryRunSkippedFiles) {
      console.log(chalk.grey(`  - ${file}`));
    }
  }

  if (results.createdDirs.length > 0) {
    console.log('Created directories: ');
    for (const dir of results.createdDirs) {
      console.log(chalk.green(`  - ${dir}`));
    }
  }

  if (results.createdFiles.length > 0) {
    console.log('Created files: ');
    for (const file of results.createdFiles) {
      console.log(chalk.green(`  - ${file}`));
    }
  }

  if (results.skippedDirs.length > 0) {
    console.log('Skipped directories: ');
    for (const dir of results.skippedDirs) {
      console.log(chalk.gray(`  - ${dir}`));
    }
  }

  if (results.skippedFiles.length > 0) {
    console.log('Skipped files: ');
    for (const file of results.skippedFiles) {
      console.log(chalk.grey(`  - ${file}`));
    }
  }
};
