# Contributing

## CI and dependency audits

Pull requests are tested with the unprivileged `pull_request` event and a
read-only repository token. Checkouts do not persist credentials. SonarCloud
receives its token only on pushes to the upstream repository.
Do not run contributor code under `pull_request_target` with repository secrets.

The primary test and lint jobs install the committed dependency graph with
`npm ci --ignore-scripts --no-audit`. The compatibility matrix additionally
installs Jest 29 because Jest 30 does not support Node 14/16.

`npm run audit` checks production dependencies at moderate severity or above.
It does not certify the development toolchain. To inspect all dependencies, run
`npx audit-ci --config ./audit-ci.jsonc`; that configuration has no advisory
exceptions. Development-tool findings must be reviewed separately.

If an upstream check still shows `pull_request_target` and the base commit, a
maintainer must adopt the safe workflow change before that check can validate
the PR. A passing fork run is evidence for the PR commit, not a replacement
for upstream approval.

After cloning the repository, run 

```shell
# Install dependencies
npm install

# Enable git hooks
npx husky install
```

## Node version

Use one of the following version:

* v14 (use npm v7, run `npm i -g npm@7`)
* v16
* v18


## Testing

Running the tests:

```shell
npm test
```



## Code coverage

Please check the code coverage before submitting new code by opening the generated [Istanbul](https://istanbul.js.org/) files:

 ```shell
 open coverage/lcov-report/index.html
 ```

## Style guide

The JavaScript style guide is configured in the [.eslintrc.js](.eslintrc.js) file and can be verified by running:

```shell
npm run lint
```
