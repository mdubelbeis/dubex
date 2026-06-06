# Dubex

Dubex is a JavaScript and TypeScript CLI toolkit for generating repetitive project code.

The CLI command is `dbx`.

## Status

Work in progress.

## Current Features

- Generate getters and setters from JavaScript and TypeScript class fields
- Generate Express/Mongoose/MongoDB resource boilerplate
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

Generate Express/Mongoose/MongoDB resource boilerplate for a given entity.

```bash
dbx gen resource User
```

Example:

```bash
dbx gen resource User
dbx gen resource Task
dbx gen resource Todo
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

Example output:

```text
Generated resource: User

Created directories:
  - ./examples/src
  - ./examples/src/controllers
  - ./examples/src/routes
  - ./examples/src/models

Created files:
  - ./examples/src/app.js
  - ./examples/src/server.js
  - ./examples/src/.env
  - ./examples/src/controllers/user.controller.js
  - ./examples/src/routes/user.routes.js
  - ./examples/src/models/user.model.js

Skipped directories:
  - No directories skipped

Skipped files:
  - No files skipped
```

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

Dubex currently supports generating one resource at a time by passing an entity name.

Example:

```bash
dbx gen resource User
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

This allows multiple resources to be generated safely without overwriting existing base project files.

Planned future support includes:

- Generating multiple resources from a config file
- Accepting `.json`, `.js`, or `.ts` resource definitions
- Adding custom schema fields
- Supporting TypeScript output
- Adding `--dry-run` support
- Adding `--force` overwrite support

## Scripts

```bash
pnpm dev
pnpm check
pnpm build
pnpm start
```
