import fs from 'node:fs';
import { createFileIfMissing } from '../../shared/file-system.js';
import { outputGenerationSummary } from '../../utils/output.js';
import { generateResource } from '../resource/resource.generator.js';
import { generateInitFiles } from '../resource/resource.paths.js';
import { createGenerationResult } from '../resource/resource.results.js';
import { generateAppFileFromResources } from '../resource/resource.templates.js';
import type { GenerateResourceOptions } from '../resource/resource.types.js';
import type { DubexResourceConfig } from './resources.types.js';

export const generateResourcesFromConfig = (config: string, options: GenerateResourceOptions) => {
  const data: DubexResourceConfig = JSON.parse(fs.readFileSync(config, 'utf-8'));

  const resourceNames = data.resources.map((resource) => resource.name);

  for (const resource of data.resources) {
    generateResource(resource.name, {
      ...options,
      fields: resource.fields ?? [],
      skipAppFile: true,
    });
  }

  const src = options.outputDir ?? './examples/src';
  const typescript = options.typescript === true;
  const dryRun = options.dryRun === true;
  const force = options.force === true;
  const results = createGenerationResult();

  const { app } = generateInitFiles(src, typescript);

  createFileIfMissing(app, generateAppFileFromResources(resourceNames), results, dryRun, force);

  outputGenerationSummary('app routes', results);
};
