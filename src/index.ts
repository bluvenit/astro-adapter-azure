import type { AstroConfig, AstroIntegration } from "astro";
import { readFile, writeFile } from "fs/promises";

import {
  dotFuncignoreFile,
  hostJson,
  localSettingsJson,
  packageJson,
} from "./constants.js";

export default function azureIntegration(): AstroIntegration {
  let rootDir: URL;
  let outDir: URL;
  let _config: AstroConfig;

  const ssrOutputDir = () => new URL("./.api/src/", rootDir);
  const ssrDir = () => new URL("./.api/", rootDir);

  async function writeHelperFiles() {
    await Promise.all([
      writeFile(new URL("./.funcignore", ssrDir()), dotFuncignoreFile, "utf8"),
      writeFile(new URL("./host.json", ssrDir()), hostJson, "utf8"),
      writeFile(
        new URL("./local.settings.json", ssrDir()),
        localSettingsJson,
        "utf8"
      ),
      writeFile(new URL("./package.json", ssrDir()), packageJson, "utf8"),
    ]);
  }

  async function writeSSRFunction(notFoundContent?: string) {
    const escapedContent = notFoundContent ? JSON.stringify(notFoundContent) : undefined;
    await writeFile(
      new URL("./index.mjs", ssrOutputDir()),
      `
import { app } from "@azure/functions";
import createSSRHandler from "./entry.mjs";

app.http("handler", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  route: "{*segments}",
  handler: createSSRHandler({ notFoundContent: ${escapedContent} }),
});
`
    );
  }

  return {
    name: "@bluvenit/astro-adapter-azure",
    hooks: {
      "astro:config:setup": async ({ config, updateConfig }) => {
        rootDir = config.root;
        outDir = new URL("./dist/", rootDir);

        updateConfig({
          outDir,
          build: {
            redirects: false,
            client: outDir,
            server: ssrOutputDir(),
          },
        });
      },
      "astro:config:done": ({ config, setAdapter }) => {
        rootDir = config.root;
        _config = config;

        setAdapter({
          name: "@bluvenit/astro-adapter-azure",
          serverEntrypoint: "@bluvenit/astro-adapter-azure/ssr-function.js",
          exports: ["default"],
          adapterFeatures: {
            functionPerRoute: false,
            edgeMiddleware: false,
          },
          supportedAstroFeatures: {
            hybridOutput: "experimental",
            staticOutput: "stable",
            serverOutput: "stable",
          },
        });
      },
      "astro:build:done": async ({ dir, logger }) => {
        if (_config.output !== "static") {
          let notFoundContent = undefined;
          try {
            notFoundContent = await readFile(
              new URL("./404.html", dir),
              "utf8"
            );
          } catch {}
          await writeSSRFunction(notFoundContent);
          await writeHelperFiles();
        }
      },
    },
  };
}
