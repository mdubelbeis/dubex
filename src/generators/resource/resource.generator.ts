import { createDirIfMissing, createFileIfMissing } from '../../shared/file-system.js';
import { outputGenerationSummary } from '../../utils/output.js';
import {
  handleAppFile,
  handleControllerFile,
  handleEnvFile,
  handleModelFile,
  handleServerFile,
} from './resource.handlers.js';
import type { GenerationResult } from './resource.types.js';

export const generateBoilerPlate = (entity: string) => {
  const src = './examples/exampleSrc';
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
    controllers: `${directories.controllers}/${lowerCaseEntity}Controller.js`,
    routes: `${directories.routes}/${lowerCaseEntity}Routes.js`,
    models: `${directories.models}/${entity}.js`,
  };

  //* 1. Create directories
  try {
    createDirIfMissing(src, trackingResults);
    createDirIfMissing(directories.controllers, trackingResults);
    createDirIfMissing(directories.routes, trackingResults);
    createDirIfMissing(directories.models, trackingResults);
    // fs.mkdirSync(src, { recursive: true });
    // fs.mkdirSync(directories.controllers, { recursive: true });
    // fs.mkdirSync(directories.routes, { recursive: true });
    // fs.mkdirSync(directories.models, { recursive: true });

    //* 2. Write Boiler-plate to files
    createFileIfMissing(initFiles.app, handleAppFile(entity), trackingResults);
    // if (!fs.existsSync(initFiles.app)) {
    //   fs.writeFileSync(initFiles.app, handleAppFile(entity) , 'utf-8');
    // }

    createFileIfMissing(initFiles.server, handleServerFile(), trackingResults);
    // if (!fs.existsSync(initFiles.server)) {
    //   fs.writeFileSync(initFiles.server, handleServerFile(), 'utf-8');
    // }

    createFileIfMissing(initFiles.dotenv, handleEnvFile(), trackingResults);
    // if (!fs.existsSync(initFiles.dotenv)) {
    //   fs.writeFileSync(initFiles.dotenv, handleEnvFile(), 'utf-8');
    // }

    createFileIfMissing(files.controllers, handleControllerFile(entity), trackingResults);
    createFileIfMissing(files.routes, handleControllerFile(entity), trackingResults);
    createFileIfMissing(files.models, handleModelFile(entity), trackingResults);
    // fs.writeFileSync(files.controllers, handleControllerFile(entity), 'utf-8');
    // fs.writeFileSync(files.routes, handleRoutesFile(entity), 'utf-8');
    // fs.writeFileSync(files.models, handleModelFile(entity), 'utf-8');

    outputGenerationSummary(entity, trackingResults);
  } catch (err) {
    console.log(err);
  }
};
