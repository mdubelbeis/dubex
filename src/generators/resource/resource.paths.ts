export const generateDirectories = (src: string) => {
  return {
    controllersDir: `${src}/controllers`,
    routesDir: `${src}/routes`,
    modelsDir: `${src}/models`,
  };
};

export const generateInitFiles = (src: string, typescript: boolean) => {
  return {
    app: typescript ? `${src}/app.ts` : `${src}/app.js`,
    server: typescript ? `${src}/server.ts` : `${src}/server.js`,
    dotenv: `${src}/.env`,
  };
};

export const generateFiles = (entity: string, typescript: boolean, src: string) => {
  const { controllersDir, routesDir, modelsDir } = generateDirectories(src);
  const lowerCaseEntity = entity.toLowerCase();

  return {
    controller: typescript
      ? `${controllersDir}/${lowerCaseEntity}.controller.ts`
      : `${controllersDir}/${lowerCaseEntity}.controller.js`,
    route: typescript
      ? `${routesDir}/${lowerCaseEntity}.routes.ts`
      : `${routesDir}/${lowerCaseEntity}.routes.js`,
    model: typescript
      ? `${modelsDir}/${lowerCaseEntity}.model.ts`
      : `${modelsDir}/${lowerCaseEntity}.model.js`,
  };
};
