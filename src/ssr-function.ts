import type { SSRManifest } from "astro";
import { App } from "astro/app";
import { applyPolyfills } from "astro/app/node";

applyPolyfills();

export const createExports = (manifest: SSRManifest) => {
  const app = new App(manifest);

  function createHandler(integrationConfig: { notFoundContent?: string }) {
    return async function handler(httpRequest: Request): Promise<Response> {
      const routeData = app.match(httpRequest);
      if (
        !routeData &&
        typeof integrationConfig.notFoundContent !== "undefined"
      ) {
        return new Response(integrationConfig.notFoundContent, {
          status: 404,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }

      const response = await app.render(httpRequest, { routeData });

      return response;
    };
  }

  return { default: createHandler };
};
