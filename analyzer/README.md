## Analyze dependencies - starting point

- Start with package name + version
- Fetch info from package.json
- Analyze if entryfile is a module or not
- Map native dependencies
- Map local modules
- Map external dependencies (get versions from package.json)

## Next

- Give choice between github and npm entrypoint (package.json or .{j,t}s file) from jsdelivr
- Dive local dependencies and repeat process
- Map function used from native dependencies and map against polyfillable targets
