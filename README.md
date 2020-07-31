<p align="center">
   <img src="https://github.com/denofn/dreg/raw/main/.github/dreg_logo_transparent.png" alt="dreg logo" />
</p>
<p align="center"><i>A safe registry for importing NPM packages in Deno as ES Modules</i></p>

---

> dreg? no no it's pronounced dee-reg.

## Goal

We want dreg to become a safe registry to import NPM packages in Deno, without having to use the `std/node/module.ts` functionality.

_Wait, what's wrong with that?_

Nothing, but we shouldn't have to use a node_modules. `std/node/module.ts` works for local files, but not for urls and bypasses the compiler fetching and checking it beforehand. The latter is a big dealbreaker for this project.

_So, how are you going to do this then?_

Short term:

- analyze an npm package's **source code** entry point (this is a **major win** if the source is Typescript or ESM!)
- transpile extension-less imports to extension-rich imports
- vet packages and store in a registry database (much like deno.land/x/ does it right now)
- serve on an edge CDN
- fallback to jspm/skypack with types attached
- improve analysis to also start from npm package name (to streamline vetting)

Long term:

- transpile cjs to esm
- allow resolving from unpkg or jsdelivr/npm (compiled npm packages) in addition to jsdelivr/gh

## Checklist

- [x] add script to analyze if code file is a(n) (es) module

run from URL:

```
deno run --unstable --allow-net https://cdn.jsdelivr.net/gh/denofn/dreg@latest/analyzer/mod.ts urlToFile[.js|.ts|.tsx|.jsx|.d.ts]
```

or clone and use Velociraptor:

```sh
git clone https://github.com/denofn/dreg && cd dreg;
vr start urlToFile[.js|.ts|.tsx|.jsx|.d.ts];
```

- [ ] transpile extensionless node module syntax to extension-rich esm (typescript or rollup)
- [ ] set up registry.json and host endpoint on fly.io

## Acknowledgements

- The brick emoji is courtesy of [Twemoji](https://twemoji.twitter.com/)
