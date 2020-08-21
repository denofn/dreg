<p align="center">
   <img src="https://github.com/denofn/dreg/raw/main/.github/dreg_logo_transparent.png" alt="dreg logo" />
</p>
<p align="center"><code>https://cdn.dreg.dev/package/PACKAGENAME@VERSION</code></p>
<p align="center"><i>A safe registry for importing NPM packages in Deno as ES Modules.</i></p>

---

This project spawned as a necessary tool for [denopack](https://github.com/denofn/denopack) to use predefined Rollup plugins. The goal is to be as generic as possible and to only use a target like jspm/skypack with transpile cjs bundles when it's absolutely necessary. Primary target for proxying is jsdelivr, with automatic rewrites happening in the runtime.

This registry follows the same principles as deno.land/x and nest.land - only versioned packages are allowed. You can check available packages in [registry.json](./registry.json).

## Analyzer

The analyzer currently creates the registry entries for `registry.json`. The best way to use it currently would be to clone the project and - assuming you're using Velociraptor - run `vr analyzer -d <packageName>`.

Available flags:

- `-d <name>`: package name
- `-v <version>`: predefined version to check. Not using this flag means analyzer will check the latest available version.
- `--doSanityCheck`: spot potential compiler errors
- `--persist`: writes to `registry.json`. Run `vr generate` afterwards to persist in `registry.ts` as well

## Runtime

The backbone for the CDN. Code is loaded and rewritten ad-hoc thanks to the registry.

## Loading in types

Failures on loading dependencies from dreg can sometimes be resolved with running `--no-check` the first time a package is loaded. This is a known issue that has been logged on Deno's Github page: https://github.com/denoland/deno/issues/7145

## Acknowledgements

- The brick emoji is courtesy of [Twemoji](https://twemoji.twitter.com/)
