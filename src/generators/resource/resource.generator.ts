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
import type { GenerationResult } from './resource.types.js';

export const generateResource = (entity: string) => {
  const src = './examples/src';
  const lowerCaseEntity = entity.toLowerCase();

  const trackingResults: GenerationResult = {
    createdFiles: [],
    createdDirs: [],
    skippedFiles: [],
    skippedDirs: [],
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
    createDirIfMissing(src, trackingResults);
    createDirIfMissing(directories.controllers, trackingResults);
    createDirIfMissing(directories.routes, trackingResults);
    createDirIfMissing(directories.models, trackingResults);

    createFileIfMissing(initFiles.app, handleAppFile(entity), trackingResults);
    createFileIfMissing(initFiles.server, handleServerFile(), trackingResults);
    createFileIfMissing(initFiles.dotenv, handleEnvFile(), trackingResults);

    createFileIfMissing(files.controllers, handleControllerFile(entity), trackingResults);
    createFileIfMissing(files.routes, handleRoutesFile(entity), trackingResults);
    createFileIfMissing(files.models, handleModelFile(entity), trackingResults);

    outputGenerationSummary(entity, trackingResults);
  } catch (err) {
    console.log(err);
  }
};
