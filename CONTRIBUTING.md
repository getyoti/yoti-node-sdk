# Contributing

After cloning the repository, run `npm install` to install dependencies.

## Testing

Running the tests:

```shell
npm test
```

The following Node.js versions have been tested:

* 4.0.0
* 4.8.7
* 5.12.0
* 6.13.0
* 8.9.4
* 9.5.0

To test a Node.js version. install [nvm](https://github.com/creationix/nvm) and run the following command:

```shell
nvm use <version> && npm rebuild && npm test
```

The `npm rebuild` requirement is necesary because the [ursa module](https://www.npmjs.com/package/ursa) needs to be recompiled against a different `Node.js` version.

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
