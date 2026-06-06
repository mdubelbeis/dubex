import chalk from 'chalk';
import type { GenerationResult } from '../generators/resource/resource.types.js';

export const outputGenerationSummary = (entity: string, results: GenerationResult) => {
  console.log(`Generated resource: ${chalk.blue(entity)}\n`);

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
