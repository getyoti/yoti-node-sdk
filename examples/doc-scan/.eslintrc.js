module.exports = {
  "plugins": ["node"],
  "extends": ["plugin:node/recommended", "airbnb-base"],
  rules: {
    "no-console": 0,
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "exports": "always-multiline",
      "functions": "never",
      "imports": "always-multiline",
      "objects": "always-multiline"
    }],
    "function-paren-newline": ["error", "multiline-arguments"],
  },
  env: {
    "node": true
  }
};
