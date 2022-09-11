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
