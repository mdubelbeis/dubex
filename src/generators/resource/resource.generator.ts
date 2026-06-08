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

  const trackingResults: GenerationResult = {
    createdFiles: [],
    createdDirs: [],
    skippedFiles: [],
    skippedDirs: [],
    dryRunDirs: [],
    dryRunFiles: [],
    dryRunSkippedDirs: [],
    dryRunSkippedFiles: [],
  };

  const directories = {
    controllers: `${src}/controllers`,
    routes: `${src}/routes`,
    models: `${src}/models`,
  };

  const initFiles = {
    app: `${src}/app.js`,
    server: `${src}/server.js`,
    dotenv: `${src}/.env`,
  };

  const files = {
    controllers: `${directories.controllers}/${lowerCaseEntity}.controller.js`,
    routes: `${directories.routes}/${lowerCaseEntity}.routes.js`,
    models: `${directories.models}/${lowerCaseEntity}.model.js`,
  };

  //* 1. Create directories
  try {
    createDirIfMissing(src, trackingResults, options);
    createDirIfMissing(directories.controllers, trackingResults, options);
    createDirIfMissing(directories.routes, trackingResults, options);
    createDirIfMissing(directories.models, trackingResults, options);

    createFileIfMissing(initFiles.app, handleAppFile(entity, options), trackingResults, options);
    createFileIfMissing(initFiles.server, handleServerFile(options), trackingResults, options);
    createFileIfMissing(initFiles.dotenv, handleEnvFile(), trackingResults, options);

    createFileIfMissing(
      files.controllers,
      handleControllerFile(entity, options),
      trackingResults,
      options
    );
    createFileIfMissing(files.routes, handleRoutesFile(entity, options), trackingResults, options);
    createFileIfMissing(files.models, handleModelFile(entity), trackingResults, options);

    outputGenerationSummary(entity, trackingResults);
  } catch (err) {
    console.log(err);
  }
};
