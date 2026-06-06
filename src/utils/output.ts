import chalk from 'chalk';
import type { GenerationResult } from '../generators/resource/resource.types.js';

export const outputGenerationSummary = (entity: string, results: GenerationResult) => {
  console.log();
  console.log(`* Generated resource: ${chalk.blue(entity)}\n`);

  console.log('* Directories created: ');
  if (results.createdDirs.length > 0) {
    for (const dir of results.createdDirs) {
      console.log(chalk.green(` - ${dir}`));
    }
  } else {
    console.log(' - No new directories created');
  }
  console.log();

  console.log('* Files Created: ');
  if (results.createdFiles.length > 0) {
    for (const file of results.createdFiles) {
      console.log(chalk.green(` - ${file}`));
    }
  } else {
    console.log(' - No new directories created');
  }
  console.log();

  console.log('* Skipped Directories: ');
  if (results.skippedDirs.length > 0) {
    for (const dir of results.skippedDirs) {
      console.log(chalk.gray(` - ${dir}`));
    }
  } else {
    console.log(' - No directories skipped');
  }
  console.log();

  console.log('* Skipped Files:');
  if (results.skippedFiles.length > 0) {
    for (const file of results.skippedFiles) {
      console.log(chalk.grey(` - ${file}`));
    }
  } else {
    console.log(' - No files skipped');
  }
};
