# @bluvenit/astro-adapter-azure

This is an experimental adapter for the [Astro](https://astro.build) static site builder. It allows you to deploy your Astro site to Azure Static Web Apps including support for API routes. For now API Routes / SSR only supports routes in the `/api` route, this is a limitation of Azure Static Web Apps.

## Setup

1. Install the adapter:

```bash
npm install @bluvenit/astro-adapter-azure @azure/functions
```

2. Add the adapter to your `astro.config.mjs`:

```javascript
import azure from "@bluvenit/astro-adapter-azure";

export default {
  // ...
  output: "hybrid",
  adapters: [azure()],
};
```

3. Add `.api` to your `.gitignore`:

```bash
echo ".api" >> .gitignore
```

## Documentation

## Support

- Check our [Astro Integration Documentation][astro-integration] for more on integrations.

- Submit bug reports and feature requests as [GitHub issues][issues].

## Licence

MIT

Copyright (c) 2024–present [bluvenit AG](bluvenit)

[bluvenit]: https://www.bluvenit.de/
[issues]: https://github.com/bluvenit/astro-adapter-azure/issues
[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/
