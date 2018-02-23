module.exports = {
  "plugins": ["node"],
  "extends": ["plugin:node/recommended", "airbnb-base"],
  rules: {
    "node/exports-style": ["error", "module.exports"],
    "prefer-destructuring": ["error", {"object": false, "array": false}],
    "strict": 0,
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "exports": "always-multiline",
      "functions": "never",
      "imports": "always-multiline",
      "objects": "always-multiline"
    }],
    "no-console": 0
  },
  env: {
    "node": true,
    "mocha": true
  },
  "overrides": [{
    "files": "tests/*.spec.js",
    "rules": {
        "node/no-unpublished-require": 0,
        "node/no-missing-require": 0
    }
  }]
};
