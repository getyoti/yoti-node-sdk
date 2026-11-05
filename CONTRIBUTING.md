# Contributing

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

## Releasing

Releases are published to [npmjs](https://www.npmjs.com/package/yoti) by the [Publish workflow](.github/workflows/publish.yaml), using [npm trusted publishing](https://docs.npmjs.com/trusted-publishers).
No npm tokens are used, and the package cannot be published from a laptop.

1. On a branch, bump the version in `package.json` and `package-lock.json`, then raise a PR to `master`:

   ```shell
   npm version patch --no-git-tag-version   # or minor / major / prerelease --preid=rc
   ```

   Do not create the git tag yourself; the GitHub release creates it.

2. Once the PR is merged, [draft a new release](https://github.com/getyoti/yoti-node-sdk/releases/new):
   * **Tag:** `v<version>`, exactly matching `package.json` (e.g. `v4.16.2`), created on publish, targeting `master`
   * **Title / notes:** the version and a summary of changes
   * Tick **Set as a pre-release** only for versions with a pre-release suffix (e.g. `4.17.0-rc.1`)

3. Publishing the release starts the workflow:
   * **Build and pack** checks the tag matches `package.json` and that the version is not already on npm, runs the audit and tests, and packs the tarball.
   * **Publish to npmjs** waits for approval from a reviewer of the `npm` environment, then publishes with provenance.
     Stable versions go to the `latest` dist-tag; pre-release versions go to `next`.

4. Check the new version on [npmjs](https://www.npmjs.com/package/yoti?activeTab=versions). It should show a provenance badge linking back to the workflow run.

### If a release fails

* **Build fails** (tag mismatch, tests, audit): fix it on `master`, delete the GitHub release **and** its tag, then create the release again.
* **Publish fails:** re-run the failed job from the workflow run. Nothing has been published at this point.
* **A bad version is published:** npm versions cannot be replaced. Release a new patch version with the fix.
  Deprecating or unpublishing a version cannot be done by the workflow and needs an npm org owner.

### Changing the publishing setup

The trusted publisher configured on npmjs is tied to this repository, the workflow filename `publish.yaml` and the `npm` environment.
Renaming the workflow file or the environment breaks publishing until the npmjs settings are updated to match, which requires an npm org owner.
