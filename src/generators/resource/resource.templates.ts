import type { ResourceField } from '../resources/resources.types.js';

export const generateJsControllerFile = (entity: string): string => {
  const entityLowerCase = entity.toLowerCase();

  return `import ${entity} from "../models/${entityLowerCase}.model.js";

export const getAll${entity}s = async (req, res, next) => {
  const ${entityLowerCase}s = await ${entity}.find();

  res.status(200).json({
    status: "success",
    data: {
      ${entityLowerCase}s,
    },
  });
};

export const get${entity}ById = async (req, res, next) => {
  const ${entityLowerCase} = await ${entity}.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      ${entityLowerCase},
    },
  });
};

export const create${entity} = async (req, res, next) => {
  const ${entityLowerCase} = await ${entity}.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      ${entityLowerCase},
    },
  });
};

export const update${entity} = async (req, res, next) => {
  const ${entityLowerCase} = await ${entity}.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      ${entityLowerCase},
    },
  });
};

export const delete${entity} = async (req, res, next) => {
  const ${entityLowerCase} = await ${entity}.findByIdAndDelete(req.params.id)

  res.status(204).send();
};
`;
};

export const generateTsControllerFile = (entity: string): string => {
  const entityLowerCase = entity.toLowerCase();
  return `import ${entity} from "../models/${entityLowerCase}.model.js";
import type {Request, Response, NextFunction} from 'express';

export const getAll${entity}s = async (req: Request, res: Response, next: NextFunction) => {
  const ${entityLowerCase}s = await ${entity}.find();

  res.status(200).json({
    status: "success",
    data: {
      ${entityLowerCase}s,
    },
  });
};

export const get${entity}ById = async (req: Request, res: Response, next: NextFunction) => {
  const ${entityLowerCase} = await ${entity}.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      ${entityLowerCase},
    },
  });
};

export const create${entity} = async (req: Request, res: Response, next: NextFunction) => {
  const ${entityLowerCase} = await ${entity}.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      ${entityLowerCase},
    },
  });
};

export const update${entity} = async (req: Request, res: Response, next: NextFunction) => {
  const ${entityLowerCase} = await ${entity}.findByIdAndUpdate(req.params.id, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      ${entityLowerCase},
    },
  });
};

export const delete${entity} = async (req: Request, res: Response, next: NextFunction) => {
  const ${entityLowerCase} = await ${entity}.findByIdAndDelete(req.params.id)

  res.status(204).send();
};
`;
};

export const generateJsRoutesFile = (entity: string): string => {
  return `import express from 'express';
import { getAll${entity}s, get${entity}ById, create${entity}, update${entity}, delete${entity}}  from "../controllers/${entity.toLowerCase()}.controller.js";

const router = express.Router();

router.route('/').get(getAll${entity}s).post(create${entity});
router.route('/:id').get(get${entity}ById).delete(delete${entity}).patch(update${entity});

export default router;
`;
};

export const generateTsRoutesFile = (entity: string): string => {
  return `import express, {Router} from 'express';
import { getAll${entity}s, get${entity}ById, create${entity}, update${entity}, delete${entity}}  from "../controllers/${entity.toLowerCase()}.controller.js";

const router: Router = express.Router();

router.route('/').get(getAll${entity}s).post(create${entity});
router.route('/:id').get(get${entity}ById).delete(delete${entity}).patch(update${entity});

export default router;
`;
};

export const generateModelFile = (entity: string): string => {
  return `import mongoose from 'mongoose';

const ${entity.toLocaleLowerCase()}Schema = new mongoose.Schema({});

const ${entity} = mongoose.model('${entity}', ${entity.toLowerCase()}Schema);

export default ${entity};`;
};

const populateSchemaField = (field: ResourceField): string => {
  const options: string[] = [`type: ${field.type}`];

  if (field.required !== undefined) {
    options.push(`required: ${field.required}`);
  }

  if (field.unique !== undefined) {
    options.push(`unique: ${field.unique}`);
  }

  if (field.select !== undefined) {
    options.push(`select: ${field.select}`);
  }

  if (field.default !== undefined) {
    const defaultValue = typeof field.default === 'string' ? `'${field.default}'` : field.default;

    options.push(`default: ${defaultValue}`);
  }

  if (field.enum !== undefined) {
    const enumValues = field.enum.map((value) => `'${value}'`).join(', ');
    options.push(`enum: [${enumValues}]`);
  }

  if (field.ref !== undefined) {
    options.push(`ref: '${field.ref}'`);
  }

  return `  ${field.name}: {
    ${options.join(',\n    ')}
  }`;
};

export const generateAndPopulateModelFile = (entity: string, fields: ResourceField[]): string => {
  const schemaFields = fields.map(populateSchemaField).join(',\n');

  return `import mongoose from 'mongoose';

const ${entity.toLocaleLowerCase()}Schema = new mongoose.Schema({
${schemaFields}
});

const ${entity} = mongoose.model('${entity}', ${entity.toLowerCase()}Schema);

export default ${entity};`;
};

export const generateEnvFile = (): string => {
  return `PORT=3000
NODE_ENV=development
DB_USERNAME=
DB_PASSWORD=
DB_LOCAL="mongodb: //127.0.0.1:27017/<db-name>"
DB_CLOUD=
`;
};

export const generateServerFile = (): string => {
  return `import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const PORT = process.env.PORT || 8000;

const { default: app } = await import("./app.js");

const DB_LOCAL = process.env.DB_LOCAL || "mongodb: //127.0.0.1:27017/<db-name>";
const DB_ClOUD = process.env.DB_CLOUD;

mongoose
  .connect(DB_LOCAL)
  .then(conn => console.log("Successfull Database Connection"))
  .catch(err => console.log("Failed Database Connection: " + err.message));

app.listen(PORT, () => {
  console.log("Server listening on port: " + PORT);
});
`;
};

export const generateAppFile = (entity: string): string => {
  const entityLowerCase = entity.toLowerCase();

  return `import express from "express";
import ${entityLowerCase}Router from "./routes/${entityLowerCase}.routes.js";

const app = express();
app.use(express.json());

app.use("/api/v1/${entityLowerCase}s", ${entityLowerCase}Router);

export default app;
`;
};

export const generateAppFileFromResources = (resources: string[]): string => {
  const imports = resources
    .map((resource) => {
      const resourceLower = resource.toLowerCase();
      return `import ${resourceLower}Router from "./routes/${resourceLower}.routes.js";`;
    })
    .join('\n');

  const routeMounts = resources
    .map((resource) => {
      const resourceLower = resource.toLowerCase();
      return `app.use("/api/v1/${resourceLower}s", ${resourceLower}Router);`;
    })
    .join('\n');

  return `import express from "express";
${imports}

const app = express();

app.use(express.json());

${routeMounts}

export default app;
`;
};
