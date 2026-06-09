# Dubex

Dubex is a JavaScript and TypeScript CLI toolkit for generating repetitive project code.

The CLI command is `dbx`.

## Status

Work in progress.

## Current Features

- Generate getters and setters from JavaScript and TypeScript class fields
- Generate Express/Mongoose/MongoDB resource boilerplate
- Generate multiple resources from a JSON config file
- Generate JavaScript or TypeScript resource files
- Preview generated files with `--dry-run`
- Overwrite generated resource files with `--force`
- Generate repeatable project code through one CLI

## Tech Stack

- Node.js
- TypeScript
- Commander
- pnpm

## Commands

### Generate Accessors

Generate getters and setters from a JavaScript or TypeScript class file.

```bash
dbx gen accessors User.ts
dbx gen accessors User.js
```

### Generate Resource Boilerplate

Generate Express/Mongoose/MongoDB resource boilerplate for a single entity.

```bash
dbx gen resource User
```

Example:

```bash
dbx gen resource User
dbx gen resource Task
dbx gen resource Todo
```

Generate TypeScript output:

```bash
dbx gen resource User --typescript
```

Preview generated files without writing them:

```bash
dbx gen resource User --dry-run
```

Overwrite existing generated resource files:

```bash
dbx gen resource User --force
```

Each resource command generates resource-specific files without overwriting existing base files like `app.js`, `server.js`, or `.env`.

Example generated structure:

```text
src/
  controllers/
    user.controller.js
  models/
    user.model.js
  routes/
    user.routes.js
  app.js
  server.js
  .env
```

### Generate Resources From Config

Generate multiple Express/Mongoose/MongoDB resources from a JSON config file.

```bash
dbx gen resources resources.json
```

Generate TypeScript output:

```bash
dbx gen resources resources.json --typescript
```

Preview generated files without writing them:

```bash
dbx gen resources resources.json --dry-run
```

Overwrite existing generated resource files:

```bash
dbx gen resources resources.json --force
```

Example config:

```json
{
  "resources": [
    {
      "name": "User",
      "fields": [
        { "name": "name", "type": "String", "required": true },
        { "name": "email", "type": "String", "required": true, "unique": true },
        { "name": "password", "type": "String", "required": true, "select": false }
      ]
    },
    {
      "name": "Project",
      "fields": [
        { "name": "title", "type": "String", "required": true },
        { "name": "description", "type": "String" }
      ]
    }
  ]
}
```

The `resources` command generates controller, route, and model files for each resource in the config.

When generating from config, `app.js` or `app.ts` is generated once with route imports and route mounts for the resources in that config file.

Existing `app.js` or `app.ts` files are skipped unless `--force` is used.

## Accessor Generation: Accepted Class Format

Dubex currently supports generating getters and setters from simple JavaScript and TypeScript class field declarations.

This feature is intentionally limited in the current version so the parser can remain predictable while the project is still in early development.

### Supported TypeScript Format

Dubex currently supports TypeScript class fields declared directly inside the class body:

```typescript
class User {
  private _firstName: string;
  private _lastName: string;
  private _email: string;
}
```

Run:

```bash
dbx gen accessors User.ts
```

### Supported JavaScript Format

Dubex currently supports JavaScript class fields declared directly inside the class body:

```javascript
class User {
  _firstName;
  _lastName;
  _email;
}
```

Run:

```bash
dbx gen accessors User.js
```

### Current Requirements

For the current version, class fields should:

- Be declared directly inside the class body
- Use one field per line
- Use a leading underscore for backing fields, such as `_firstName`
- End with a semicolon
- Be inside a standard class declaration

### Not Yet Supported

The current parser does not yet support every valid JavaScript or TypeScript class style.

Planned future support includes:

- JavaScript fields without leading underscores
- TypeScript fields without leading underscores
- JavaScript private fields using `#fieldName`
- JavaScript fields assigned inside constructors with `this.fieldName`
- TypeScript constructor parameter properties
- More flexible formatting and whitespace handling

## Resource Generation Notes

Dubex currently supports generating one resource at a time by passing an entity name, or multiple resources from a JSON config file.

Single resource example:

```bash
dbx gen resource User
```

Config resource example:

```bash
dbx gen resources resources.json
```

Current generated files include:

```text
src/controllers/user.controller.js
src/routes/user.routes.js
src/models/user.model.js
```

Base files are created only if they do not already exist:

```text
src/app.js
src/server.js
src/.env
```

This allows resources to be generated safely without overwriting existing base project files.

Generated projects require Express, Mongoose, and dotenv to be installed in the target project.

Example:

```bash
pnpm add express mongoose dotenv
```

For TypeScript output, install the needed TypeScript tooling and types:

```bash
pnpm add -D typescript tsx @types/node @types/express
```

## Planned Future Support

- Updating existing `app.js` or `app.ts` files with newly generated routes
- Adding a setup/install command for Express/Mongoose dependencies
- Accepting `.js` or `.ts` resource config files
- Improving plural route naming
- Supporting more template options

## Scripts

```bash
pnpm dev
pnpm check
pnpm build
pnpm start
```
