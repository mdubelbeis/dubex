import {
  generateAppFile,
  generateEnvFile,
  generateJsControllerFile,
  generateJsRoutesFile,
  generateModelFile,
  generateServerFile,
  generateTsControllerFile,
  generateTsRoutesFile,
} from './resource.templates.js';

// TODO: Need all routers avail from '/routes' dir for imports on additional resource gen
export const handleAppFile = (entity: string): string => generateAppFile(entity);

export const handleServerFile = (): string => generateServerFile();

export const handleEnvFile = (): string => generateEnvFile();

export const handleControllerFile = (entity: string, typescript?: boolean): string => {
  const entityLowerCase = entity.toLowerCase();

  if (typescript) {
    return generateTsControllerFile(entity);
  }

  return generateJsControllerFile(entity);
};

export const handleRoutesFile = (entity: string, typescript?: boolean): string => {
  if (typescript) {
    return generateTsRoutesFile(entity);
  }

  return generateJsRoutesFile(entity);
};

export const handleModelFile = (entity: string): string => generateModelFile(entity);
