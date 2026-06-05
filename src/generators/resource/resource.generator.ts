import fs from 'node:fs';
import {
  handleAppFile,
  handleControllerFile,
  handleEnvFile,
  handleModelFile,
  handleRoutesFile,
  handleServerFile,
} from './resource.handlers.js';

export const generateBoilerPlate = (entity: string) => {
  const src = './examples/exampleSrc';
  const lowerCaseEntity = entity.toLowerCase();

  const directories = {
    controllers: `${src}/controllers`,
    routes: `${src}/routes`,
    models: `${src}/models`,
  };

  const files = {
    app: `${src}/app.js`,
    server: `${src}/server.js`,
    dotenv: `${src}/.env`,
    controllers: `${directories.controllers}/${lowerCaseEntity}Controller.js`,
    routes: `${directories.routes}/${lowerCaseEntity}Routes.js`,
    models: `${directories.models}/${entity}.js`,
  };

  //* 1. Create directories
  try {
    fs.mkdirSync(src, { recursive: true });
    fs.mkdirSync(directories.controllers, { recursive: true });
    fs.mkdirSync(directories.routes, { recursive: true });
    fs.mkdirSync(directories.models, { recursive: true });

    //* 2. Write Boiler-plate to files
    if (!fs.existsSync(files.app)) {
      fs.writeFileSync(files.app, handleAppFile(entity), 'utf-8');
    }

    if (!fs.existsSync(files.server)) {
      fs.writeFileSync(files.server, handleServerFile(), 'utf-8');
    }

    if (!fs.existsSync(files.dotenv)) {
      fs.writeFileSync(files.dotenv, handleEnvFile(), 'utf-8');
    }

    fs.writeFileSync(files.controllers, handleControllerFile(entity), 'utf-8');
    fs.writeFileSync(files.routes, handleRoutesFile(entity), 'utf-8');
    fs.writeFileSync(files.models, handleModelFile(entity), 'utf-8');
  } catch (err) {
    console.log(err);
  }
};
