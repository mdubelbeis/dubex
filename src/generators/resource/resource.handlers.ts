export const handleAppFile = (entity: string): string => {
  // TODO: Need all routers avail from '/routes' dir for imports on additional resource gen
  const entityLowerCase = entity.toLowerCase();

  return `import express from "express";
import ${entityLowerCase}Router from "./routes/${entityLowerCase}Routes.js";

const app = express();
app.use(express.json());

app.use("/api/v1/${entityLowerCase}", ${entityLowerCase}Router);

export default app;
`;
};

export const handleServerFile = (): string => {
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

export const handleEnvFile = (): string => {
  return `PORT=3000
NODE_ENV=development
DB_USERNAME=
DB_PASSWORD=
DB_LOCAL="mongodb: //127.0.0.1:27017/<db-name>"
DB_CLOUD=
`;
};

export const handleControllerFile = (entity: string): string => {
  const entityLowerCase = entity.toLowerCase();
  return `import ${entity} from "../models/${entity}.js";

export const getAll${entity}s = async (req, res, next) => {
  const ${entityLowerCase}s = await ${entity}.find();

  res.status(200).json({
    status: "success",
    data: {
      ${entityLowerCase},
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

export const handleRoutesFile = (entity: string): string => {
  return `import express from 'express';
import { getAll${entity}s, get${entity}ById, create${entity}, update${entity}, delete${entity}}  from "../controllers/${entity.toLowerCase()}Controller.js";

const router = express.Router();

router.route('/').get(getAll${entity}s).post(create${entity});
router.route('/:id').get(get${entity}ById).delete(delete${entity}).patch(update${entity});

export default router;
`;
};

export const handleModelFile = (entity: string): string => {
  return `import mongoose from 'mongoose';

const ${entity.toLocaleLowerCase()}Schema = new mongoose.Schema({});

const ${entity} = mongoose.model('${entity}', ${entity.toLowerCase()}Schema);

export default ${entity};
`;
};
