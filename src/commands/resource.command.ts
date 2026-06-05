import { Command } from 'commander';
import fs from 'node:fs';

export function createResourceCommand() {
  const command = new Command('resource');

  command
    .argument('<entity>', 'Resource/entity name, such as User or Bug')
    .description('Generate Express resource boilerplate')
    .action((entity: string) => {
      const src = './examples/exampleSrc';

      const directories = {
        controllers: `${src}/controllers`,
        routes: `${src}/routes`,
        models: `${src}/models`,
        utils: `${src}/utils`,
        middleware: `${src}/middleware`,
      };

      const lowerCaseEntity = entity.toLowerCase();

      //* 1. Create directories from entity name
      //  - controllers / models / routes
      try {
        fs.mkdirSync(src);
        fs.mkdirSync(directories.controllers);
        fs.mkdirSync(directories.routes);
        fs.mkdirSync(directories.models);
        fs.mkdirSync(directories.utils);
        fs.mkdirSync(directories.middleware);
        //* 2. Create files from entity name
        //    - requires (--ts or --js flag)
        //  - controllers/entityController.js/ts
        //  - models/Entity.js/ts
        //  - routes/entityRoutes.js/ts
      } catch (err) {
        console.log(err);
      }
      // ============================================================

      // ============================================================
      //*3. Create boiler-plate code for created entity files
      //  - add boilerplate code for controllers/entityController.js/ts
      //  - add boilerplate code for routes/entityRoutes.js/ts
      // ====
      //  - if typeof entity === string without .js/.ts/.json - boilerplate purposes with intent to fill out Model manually.
      //  - if typeof entity === file (.js/.ts/.json) - populate each entity with it's model using key:value pairs in entity object.
      //  - Ex:
      // const schema = {
      //   user: {
      //     firstName: String,
      //     lastName: String,
      //     email: String,
      //   },
      //   task: {
      //     title: String,
      //     desc: String,
      //   }
      // }
    });

  return command;
}
