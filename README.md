# Dubex

Dubex is a small JavaScript and TypeScript CLI toolkit for generating repetitive project code.

The CLI command is `dbx`.

## Status

Work in progress.

## Planned Features

- Generate getters and setters from TypeScript class fields
- Generate Express/Mongoose/MongoDB backend resources
- Provide simple code generation commands through one CLI

## Tech Stack

- Node.js
- TypeScript
- Commander
- pnpm

## Accessor Generation: Accepted Class Format

Dubex currently supports generating getters and setters from simple JavaScript and TypeScript class field declarations.

This feature is intentionally limited in the current version so the parser can remain predictable while the project is still in early development.

### Supported TypeScript Format

Dubex currently supports TypeScript class fields declared directly inside the class body:

```ts
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

```js
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
- Use a leading underscore for backing fields, such as \_firstName
- End with a semicolon
- Be inside a standard class declaration

### Not Yet Supported

The current parser does not yet support every valid JavaScript or TypeScript class style.

Planned future support includes:

- JavaScript fields without leading underscores
- TypeScript fields without leading underscores
- JavaScript private fields using #fieldName
- TypeScript constructor parameter properties
- JavaScript fields assigned inside constructors with this.fieldName
- More flexible formatting and whitespace handling

## Scripts

```bash
pnpm dev
pnpm check
pnpm build
pnpm start
```
