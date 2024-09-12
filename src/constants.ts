export const dotFuncignoreFile = `
*.js.map
*.ts
.git*
.vscode
__azurite_db*__.json
__blobstorage__
__queuestorage__
local.settings.json
test
tsconfig.json
`;

export const hostJson = `
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "excludedTypes": "Request"
      }
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"
  }
}
`;

export const localSettingsJson = `
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsFeatureFlags": "EnableWorkerIndexing"
  }
}
`;

export const packageJson = `
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "scripts": {
    "start": "func start",
    "test": "echo 'No tests yet...'"
  },
  "dependencies": {
    "@bluvenit/astro-adapter-azure": "^0.0.4",
    "@azure/functions": "^4.0.0"
  },
  "devDependencies": {},
  "main": "src/index.mjs"
}
`;
