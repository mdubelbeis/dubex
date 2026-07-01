export const exitWithError = (message: string): void => {
  console.error(`Error: ${message}`);
  process.exitCode = 1;
};
