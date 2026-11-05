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

**Merging a version bump to `master` is a request to release it.**

1. On a branch, bump the version in `package.json` and `package-lock.json`, then raise a PR to `master`:

   ```shell
   npm version patch --no-git-tag-version   # or minor / major / prerelease --preid=rc
   ```

   Do not create a git tag or GitHub release yourself; the workflow does that once the package is published.

2. When the PR is merged, the workflow:
   * **Check for new version:** does nothing unless this version is not yet on npm.
   * **Build and pack:** runs the audit and tests, and packs the tarball.
   * **Publish to npmjs:** waits for a reviewer of the `npm` environment to approve, then publishes with provenance.
     Stable versions go to the `latest` dist-tag; pre-release versions (e.g. `4.17.0-rc.1`) go to `next`.
   * **Tag and create GitHub release:** creates tag `v<version>` and a release with generated notes and the published tarball attached.

3. Approve the deployment: open the workflow run under **Actions** and choose **Review deployments**.
   You cannot approve a release you triggered yourself.

4. Check the new version on [npmjs](https://www.npmjs.com/package/yoti?activeTab=versions). It should show a provenance badge linking back to the workflow run.

### If a release fails

* **Build fails or the deployment is rejected:** nothing is published or tagged. Either fix it on `master` with a new commit,
  or re-run it from **Actions > Publish > Run workflow** on `master`.
* **Publish fails:** re-run the failed jobs from the workflow run.
* **Release step fails after a successful publish:** the package is live. Re-run the failed job, or create the tag and release by hand.
* **A bad version is published:** npm versions cannot be replaced. Release a new patch version with the fix.
  Deprecating or unpublishing a version cannot be done by the workflow and needs an npm org owner.

### Changing the publishing setup

The trusted publisher configured on npmjs is tied to this repository, the workflow filename `publish.yaml` and the `npm` environment.
Renaming the workflow file or the environment breaks publishing until the npmjs settings are updated to match, which requires an npm org owner.
