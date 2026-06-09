import { createDirIfMissing, createFileIfMissing } from '../../shared/file-system.js';
import { outputGenerationSummary } from '../../utils/output.js';
import {
  handleAppFile,
  handleControllerFile,
  handleEnvFile,
  handleModelFile,
  handleRoutesFile,
  handleServerFile,
} from './resource.handlers.js';
import { generateDirectories, generateFiles, generateInitFiles } from './resource.paths.js';
import { createGenerationResult } from './resource.results.js';
import type { GenerateResourceOptions } from './resource.types.js';

export const generateResource = (entity: string, options: GenerateResourceOptions = {}) => {
  const src = options.outputDir ?? './examples/src';
  const dryRun = options.dryRun === true;
  const typescript = options.typescript === true;
  const force = options.force === true;
  const fields = options.fields ?? [];
  const results = createGenerationResult();

  const { controllersDir, routesDir, modelsDir } = generateDirectories(src);
  const { app, server, dotenv } = generateInitFiles(src, typescript);
  const { controller, route, model } = generateFiles(entity, typescript, src);

  try {
    createDirIfMissing(src, results, dryRun);
    createDirIfMissing(controllersDir, results, dryRun);
    createDirIfMissing(routesDir, results, dryRun);
    createDirIfMissing(modelsDir, results, dryRun);

    if (!options.skipAppFile) {
      createFileIfMissing(app, handleAppFile(entity), results, dryRun);
    }
    createFileIfMissing(server, handleServerFile(), results, dryRun);
    createFileIfMissing(dotenv, handleEnvFile(), results, dryRun);

    createFileIfMissing(
      controller,
      handleControllerFile(entity, typescript),
      results,
      dryRun,
      force
    );
    createFileIfMissing(route, handleRoutesFile(entity, typescript), results, dryRun, force);
    createFileIfMissing(model, handleModelFile(entity, fields), results, dryRun, force);

    outputGenerationSummary(entity, results);
  } catch (err) {
    console.log(err);
  }
};
