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
import type { GenerateResourceOptions, GenerationResult } from './resource.types.js';

export const generateResource = (entity: string, options: GenerateResourceOptions) => {
  const src = './examples/src';
  const lowerCaseEntity = entity.toLowerCase();

  const dryRun = options.dryRun === true;
  const typescript = options.typescript === true;
  const force = options.force === true;

  const trackingResults: GenerationResult = {
    createdFiles: [],
    createdDirs: [],
    skippedFiles: [],
    skippedDirs: [],
    dryRunDirs: [],
    dryRunFiles: [],
    dryRunSkippedDirs: [],
    dryRunSkippedFiles: [],
    overwrittenFiles: [],
    dryRunOverwrittenFiles: [],
  };

  const directories = {
    controllers: `${src}/controllers`,
    routes: `${src}/routes`,
    models: `${src}/models`,
  };

  const initFiles = {
    app: typescript ? `${src}/app.ts` : `${src}/app.js`,
    server: typescript ? `${src}/server.ts` : `${src}/server.js`,
    dotenv: `${src}/.env`,
  };

  const files = {
    controllers: typescript
      ? `${directories.controllers}/${lowerCaseEntity}.controller.ts`
      : `${directories.controllers}/${lowerCaseEntity}.controller.js`,
    routes: typescript
      ? `${directories.routes}/${lowerCaseEntity}.routes.ts`
      : `${directories.routes}/${lowerCaseEntity}.routes.js`,
    models: typescript
      ? `${directories.models}/${lowerCaseEntity}.model.ts`
      : `${directories.models}/${lowerCaseEntity}.model.js`,
  };

  //* 1. Create directories
  try {
    createDirIfMissing(src, trackingResults, dryRun);
    createDirIfMissing(directories.controllers, trackingResults, dryRun);
    createDirIfMissing(directories.routes, trackingResults, dryRun);
    createDirIfMissing(directories.models, trackingResults, dryRun);

    createFileIfMissing(initFiles.app, handleAppFile(entity), trackingResults, dryRun);
    createFileIfMissing(initFiles.server, handleServerFile(), trackingResults, dryRun);
    createFileIfMissing(initFiles.dotenv, handleEnvFile(), trackingResults, dryRun);

    createFileIfMissing(
      files.controllers,
      handleControllerFile(entity, typescript),
      trackingResults,
      dryRun,
      force
    );
    createFileIfMissing(
      files.routes,
      handleRoutesFile(entity, typescript),
      trackingResults,
      dryRun,
      force
    );
    createFileIfMissing(files.models, handleModelFile(entity), trackingResults, dryRun, force);

    outputGenerationSummary(entity, trackingResults);
  } catch (err) {
    console.log(err);
  }
};
